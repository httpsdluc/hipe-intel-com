// src/app/api/profile/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("hipe");
    const profiles = db.collection("profiles");

    const result = await profiles.insertOne(body);
    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (err) {
    console.error("Failed to save profile:", err);
    return NextResponse.json(
      { success: false, error: "Failed to save" },
      { status: 500 }
    );
  }
}
