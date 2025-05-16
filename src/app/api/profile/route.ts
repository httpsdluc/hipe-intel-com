import connectToDatabase from "@/lib/mongodb";
import { Profile } from "@/models/Profile";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    console.log("📥 POST /api/profile triggered");

    const contentType = req.headers.get("content-type");
    console.log("🧾 Content-Type:", contentType);

    const body = await req.json();
    console.log("📨 Received body:", body);

    if (!body.userId) {
      console.error("❌ Missing userId");
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

    console.log("✅ Mongo result:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("🔥 Error in POST /api/profile:", err.message, err.stack);
    return new Response(
      JSON.stringify({ error: err.message, stack: err.stack }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
