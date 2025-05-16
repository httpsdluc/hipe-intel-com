// src/app/api/profile/edit/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Profile } from "@/models/Profile";

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();

    if (!data.userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const updated = await Profile.findOneAndUpdate(
      { userId: data.userId },
      data,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ updated: true });
  } catch (err) {
    console.error("❌ Error updating profile:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
