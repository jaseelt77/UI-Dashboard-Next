import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes (use (.*) to catch subpaths)
const isProtectedRoute = createRouteMatcher(["/admin", "/teacher"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req))  auth().protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
