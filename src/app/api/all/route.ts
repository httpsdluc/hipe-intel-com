// src/app/api/all/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import { Profile } from "@/models/Profile";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  const profiles = await Profile.find(
    {},
    "userId occupation major school expertise aspiration"
  );

  return NextResponse.json(profiles);
}
