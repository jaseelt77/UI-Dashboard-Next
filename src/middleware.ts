// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { routeAccessMap } from "./lib/settings";

// const matchers = Object.keys(routeAccessMap).map((route) => ({
//     matcher: createRouteMatcher([route]),
//     allowedRoles: routeAccessMap[route],
// }));
// console.log(matchers);

// // const isProtectedRoute = createRouteMatcher(["/admin", "/teacher"]);

// export default clerkMiddleware((auth, req) => {
// //   if (isProtectedRoute(req)) return auth.protect();
// const { sessionClaims} = auth;

// const role = (sessionClaims?.metadata as { role?: string})?.role;
//  for (const { matcher, allowedRoles} of matchers) {
//      if(matcher(req) && !allowedRoles.includes(role!)) { 
//         return NextResponse.redirect(new URL(`/${role}`, req.url));
//      }
//  }
// });


// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };


import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { routeAccessMap } from "./lib/settings";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

export default clerkMiddleware(async (auth, req) => {
  // Make sure user is signed in
  const { sessionClaims } = await auth();

  const role = (sessionClaims?.metadata as { role?: string })?.role;

  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req) && (!role || !allowedRoles.includes(role))) {
      // If no role or not allowed, send them to a fallback (like /sign-in or /)
      return NextResponse.redirect(new URL(`/${role}`,  req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
