import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ exists: false });
  }

  const client = await clientPromise;
  const db = client.db("hipe");
  const profile = await db.collection("profiles").findOne({ userId });

  return NextResponse.json({ exists: !!profile });
}
