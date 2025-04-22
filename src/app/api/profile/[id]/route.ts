// src/app/api/profile/[id]/route.ts

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Profile } from "@/models/Profile";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();

  const profile = await Profile.findOne({ userId: params.id });

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}
