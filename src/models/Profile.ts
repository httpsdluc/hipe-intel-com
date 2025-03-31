import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    occupation: String,
    major: String,
    school: String,
    expertise: String,
    aspiration: String,
    age: Number,
    birthday: String,
    gender: String,
    ethnicity: String,
    race: String,
  },
  { timestamps: true }
);

export const Profile =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
