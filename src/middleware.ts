// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/learn-more",
  "/unauthorized", // 👈 custom access-denied page
]);

export default clerkMiddleware(async (auth, req) => {
  if (req.nextUrl.pathname.startsWith("/api")) return;
  if (isPublicRoute(req)) return;

  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*|api|favicon.ico).*)"],
};
