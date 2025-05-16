// src/app/api/news/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "CIA";

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
    query
  )}&lang=en&max=10&sortby=publishedAt&token=${process.env.GNEWS_API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ GNews fetch failed:", err);
    return NextResponse.json({ articles: [] }, { status: 500 });
  }
}
