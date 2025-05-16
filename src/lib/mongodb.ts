// src/lib/mongodb.ts
import mongoose from "mongoose";

let isConnected = false;

export default async function connectToDatabase() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI!;
  if (!uri) throw new Error("Missing MONGODB_URI env var");

  await mongoose.connect(uri);
  isConnected = true;
}
