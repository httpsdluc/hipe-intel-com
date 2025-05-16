//src/models/Profile.ts
import mongoose from "mongoose";

// src/models/Profile.ts
const ProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true }, // ✅ add this
  occupation: String,
  major: String,
  school: String,
  expertise: String,
  aspiration: String,
  age: String,
  birthday: String,
  gender: String,
  ethnicity: String,
  race: String,
});

export const Profile =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
