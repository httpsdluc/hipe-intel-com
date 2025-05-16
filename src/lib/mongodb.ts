// src/lib/mongodb.ts
import mongoose from "mongoose";

let isConnected = false;

export default async function connectToDatabase() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI!;
  if (!uri) throw new Error("Missing MONGODB_URI env var");

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // 🔥 avoid 10s Vercel timeout
      dbName: "hipe", // Optional, if you use a DB name
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
}
