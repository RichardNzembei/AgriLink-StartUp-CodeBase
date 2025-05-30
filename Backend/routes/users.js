const express = require("express");
const router = express.Router();
const { db } = require("../firebaseConfig");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { role, phone, first_name, last_name, email, password } = req.body;

  if (!role || !phone || !first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userRef = db.collection("users");
    const userDoc = await db.collection("users").doc(phone).get();
    if (userDoc.exists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await userRef.doc(phone).set({
      role,
      phone,
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  try {
    const userDoc = await db.collection("users").doc(phone).get();

    if (!userDoc.exists) {
      return res
        .status(400)
        .json({ message: "Invalid phone number or password" });
    }

    const user = userDoc.data();
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid phone number or password" });
    }

    res.json({ user: { id: phone, ...user } });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userDoc.data());
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user", async (req, res) => {
  try {
    const usersSnapshot = await db.collection("users").get();
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

module.exports = router;
