// src/app/api/profile/route.ts
import connectToDatabase from "@/lib/mongodb";
import { Profile } from "@/models/Profile";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    if (!body.userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await Profile.findOneAndUpdate(
      { userId: body.userId },
      { $set: body },
      { new: true, upsert: true, runValidators: true }
    );

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    if (!body.userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updated = await Profile.findOneAndUpdate(
      { userId: body.userId },
      { $set: body },
      { new: true, runValidators: true }
    );

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
