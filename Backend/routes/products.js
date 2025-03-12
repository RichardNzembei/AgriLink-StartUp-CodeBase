const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { db, bucket,admin } = require("../firebaseConfig");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Upload product
router.post("/products", upload.single("image"), async (req, res) => {
  try {
    const { ownerPhone, name, price, unit, supplyAmount } = req.body;

    if (!ownerPhone || !name || !price || !unit || !supplyAmount || !req.file) {
      return res.status(400).json({ error: "Missing product data" });
    }

    console.log("🔄 Uploading image to storage...");
    const fileName = `products/${ownerPhone}/${uuidv4()}_${req.file.originalname}`;
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({ metadata: { contentType: req.file.mimetype } });

    stream.on("error", (err) => res.status(500).json({ error: err.message }));

    stream.on("finish", async () => {
      await file.makePublic();
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      console.log("✅ Image uploaded:", imageUrl);

      const productData = {
        name,
        price: parseFloat(price),
        unit,
        imageUrl,
        ownerPhone,
        supplyAmount,
        createdAt: new Date(),
      };

      const productRef = await db.collection("products").add(productData);
      res.status(200).json({ message: "Product uploaded", product: { id: productRef.id, ...productData } });
    });

    stream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Fetch products by phone number
router.get("/products", async (req, res) => {
  try {
    const { ownerPhone } = req.query;

    if (!ownerPhone) {
      return res.status(400).json({ error: "Owner phone number is required" });
    }

    console.log("🔄 Fetching products for:", ownerPhone);
    const snapshot = await db.collection("products").where("ownerPhone", "==", ownerPhone).get();

    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Fetch all products
router.get("/allproducts", async (req, res) => {
  try {
    console.log("🔄 Fetching all products...");
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/products/:productId/reviews", async (req, res) => {
  try {
    const { productId } = req.params;
    const { userPhone, comment } = req.body;

    if (!userPhone || !comment) {
      return res.status(400).json({ error: "User phone and comment are required" });
    }

    const review = { userPhone, comment, createdAt: new Date() };

    const productRef = db.collection("products").doc(productId);
    const productDoc = await productRef.get();

    if (!productDoc.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Initialize reviews array if it doesn't exist
    const productData = productDoc.data();
    if (!productData.reviews) {
      await productRef.update({ reviews: [review] });
    } else {
      await productRef.update({
        reviews: admin.firestore.FieldValue.arrayUnion(review),
      });
    }

    res.status(200).json({ message: "Review added successfully", review });
  } catch (error) {
    console.error("Error adding product review:", error);
    res.status(500).json({ error: error.message, details: error.stack });
  }
});
router.post("/sellers/:sellerPhone/reviews", async (req, res) => {
  try {
    const { sellerPhone } = req.params;
    const { userPhone, comment } = req.body;

    if (!userPhone || !comment) {
      return res.status(400).json({ error: "User phone and comment are required" });
    }

    const review = { userPhone, comment, createdAt: new Date() };

    const sellerRef = db.collection("sellers").doc(sellerPhone);
    const sellerDoc = await sellerRef.get();

    if (!sellerDoc.exists) {
      // Create seller document if it doesn't exist
      await sellerRef.set({ reviews: [review] });
    } else {
      // Add review to existing seller document
      await sellerRef.update({
        reviews: admin.firestore.FieldValue.arrayUnion(review),
      });
    }

    res.status(200).json({ message: "Seller review added successfully", review });
  } catch (error) {
    console.error("Error adding seller review:", error);
    res.status(500).json({ error: error.message });
  }
});
router.get("/sellers", async (req, res) => {
  try {
    const sellersSnapshot = await db.collection("sellers").get();
    const sellers = [];

    sellersSnapshot.forEach((doc) => {
      sellers.push({ sellerPhone: doc.id, ...doc.data() });
    });

    res.status(200).json(sellers);
  } catch (error) {
    console.error("Error fetching sellers:", error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
