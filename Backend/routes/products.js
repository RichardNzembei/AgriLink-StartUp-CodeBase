const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { db, bucket } = require("../firebaseConfig");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Upload product
router.post("/products", upload.single("image"), async (req, res) => {
  try {
    const { ownerPhone, name, price } = req.body;

    if (!ownerPhone || !name || !price || !req.file) {
      console.warn("⚠️ Missing required product fields!");
      return res.status(400).json({ error: "Missing product data" });
    }

    console.log("🔄 Uploading image to storage...");
    const fileName = `products/${ownerPhone}/${uuidv4()}_${req.file.originalname}`;
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({ metadata: { contentType: req.file.mimetype } });

    stream.on("error", (err) => {
      console.error("❌ Storage error:", err);
      return res.status(500).json({ error: err.message });
    });

    stream.on("finish", async () => {
      await file.makePublic();
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      console.log("✅ Image uploaded:", imageUrl);

      const productData = {
        name,
        price,
        imageUrl,
        ownerPhone,
        createdAt: new Date(),
      };

      const productRef = await db.collection("products").add(productData);
      console.log("✅ Product saved in Firestore:", productRef.id);

      res.status(200).json({ message: "Product uploaded", product: { id: productRef.id, ...productData } });
    });

    stream.end(req.file.buffer);
  } catch (error) {
    console.error("❌ Upload failed:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Fetch products by phone number
router.get("/products", async (req, res) => {
  try {
    const { ownerPhone } = req.query;

    if (!ownerPhone) {
      console.warn("⚠️ Owner phone number missing in request.");
      return res.status(400).json({ error: "Owner phone number is required" });
    }

    console.log("🔄 Fetching products for:", ownerPhone);
    const snapshot = await db.collection("products").where("ownerPhone", "==", ownerPhone).get();

    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    console.log("✅ Products retrieved:", products.length);
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Fetch error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
