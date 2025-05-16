//src/app/api/posts/route.ts
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth(); // ✅ This checks the Clerk token

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.json();
  // Handle the data securely...
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
