import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Match public routes (unprotected)
const isPublicRoute = createRouteMatcher([
  "/", // landing page
  "/sign-in(.*)", // sign-in and anything under it
  "/sign-up(.*)", // sign-up and anything under it
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;

  const { userId } = await auth(); // wait for Clerk auth

  // If not signed in, redirect to sign-in
  if (!userId) {
    return Response.redirect(new URL("/sign-in", req.url));
  }
});

// Required config for Next.js middleware matching
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // ignore _next, static files, etc.
};
