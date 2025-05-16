// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/learn-more",
  "/unauthorized",
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip API routes
  if (req.nextUrl.pathname.startsWith("/api")) return;

  if (isPublicRoute(req)) return;

  try {
    const { userId } = await auth();

    if (!userId) {
      // Not signed in — redirect safely
      return Response.redirect(new URL("/unauthorized", req.url));
    }
  } catch (err) {
    console.error("❌ Clerk middleware auth error:", err);
    // Clerk edge runtime failed — redirect instead of crashing
    return Response.redirect(new URL("/unauthorized", req.url));
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*|api|favicon.ico).*)"],
};
