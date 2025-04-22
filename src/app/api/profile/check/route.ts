// src/app/api/profile/check/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Profile } from "@/models/Profile";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  await connectToDatabase();
  const profile = await Profile.findOne({ userId });

  return NextResponse.json({ exists: !!profile });
}
