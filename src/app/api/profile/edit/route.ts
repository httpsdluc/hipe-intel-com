//src/app/api/profile/edit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Profile } from "@/models/Profile";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const data = await req.json();

  try {
    const existing = await Profile.findOne({ userId: data.userId });
    if (existing) {
      await Profile.updateOne({ userId: data.userId }, data);
      return NextResponse.json({ updated: true });
    }

    await Profile.create(data);
    return NextResponse.json({ created: true });
  } catch (err) {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId)
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  const profile = await Profile.findOne({ userId });
  return NextResponse.json(profile);
}
