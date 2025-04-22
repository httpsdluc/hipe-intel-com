// src/app/api/profile/route.ts
import connectToDatabase from "@/lib/mongodb";
import { Profile } from "@/models/Profile";

export async function GET() {
  await connectToDatabase();
  const profiles = await Profile.find();
  return new Response(JSON.stringify(profiles), { status: 200 });
}

export async function PUT(req: Request) {
  await connectToDatabase();
  const body = await req.json();

  const updated = await Profile.findOneAndUpdate(
    { userId: body.userId },
    { $set: body },
    { new: true, upsert: true }
  );

  return new Response(JSON.stringify(updated), { status: 200 });
}
