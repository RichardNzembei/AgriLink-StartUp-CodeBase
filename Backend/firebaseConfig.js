require('dotenv').config();
const admin = require("firebase-admin");

let serviceAccount;

try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
} catch (error) {
  console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', error);
  throw new Error('Invalid service account key format');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://agrilink-solutions-default-rtdb.firebaseio.com/",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET // ✅ Fetch from .env
});

const db = admin.firestore();
const bucket = admin.storage().bucket(); // ✅ Initialize Firebase Storage

module.exports = { db, bucket };
