// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// ✅ Add /learn-more to public routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/learn-more", // 👈 make this page public
]);

export default clerkMiddleware(async (auth, req) => {
  if (req.nextUrl.pathname.startsWith("/api")) return;

  if (isPublicRoute(req)) return;

  const { userId } = await auth();
  if (!userId) {
    return Response.redirect(new URL("/sign-in", req.url));
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*|api|favicon.ico).*)"],
};
