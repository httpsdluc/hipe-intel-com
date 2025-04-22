// src/models/Profile.ts
import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userId: String,
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
