// src/app/api/profile/[id]/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Profile } from "@/models/Profile";

// @ts-ignore: Next.js App Router requires no types here
export async function GET(req, context) {
  const { id } = context.params;

  await connectToDatabase();
  const profile = await Profile.findOne({ userId: id });

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}
