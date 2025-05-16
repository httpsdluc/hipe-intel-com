// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/learn-more", // ✅ public
  "/unauthorized", // ✅ for custom error page
]);

export default clerkMiddleware(async (auth, req) => {
  if (req.nextUrl.pathname.startsWith("/api")) return;

  if (isPublicRoute(req)) return;

  try {
    const { userId } = await auth();

    if (!userId) {
      // ❌ Not signed in, redirect to custom page
      return Response.redirect(new URL("/unauthorized", req.url));
    }
  } catch (err) {
    // ⛔ auth() threw an error
    return Response.redirect(new URL("/unauthorized", req.url));
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*|api|favicon.ico).*)"],
};
