// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are public
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // ✅ Skip middleware for API routes
  if (req.nextUrl.pathname.startsWith("/api")) return;

  if (isPublicRoute(req)) return;

  const { userId } = await auth();

  if (!userId) {
    return Response.redirect(new URL("/sign-in", req.url));
  }
});

// ✅ Updated matcher to exclude /api routes completely
export const config = {
  matcher: ["/((?!_next|.*\\..*|api|favicon.ico).*)"],
};
