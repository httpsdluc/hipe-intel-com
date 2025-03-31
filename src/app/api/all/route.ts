import { connectDB } from "@/lib/db";
import { Profile } from "@/models/Profile";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const profiles = await Profile.find(
    {},
    "userId occupation major school expertise aspiration"
  );

  return NextResponse.json(profiles);
}
