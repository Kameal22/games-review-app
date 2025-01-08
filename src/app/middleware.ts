import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of protected routes
const protectedRoutes = ['/protected-content'];

export function middleware(req: NextRequest) {
  const token = sessionStorage.getItem("user");

  // Check if the request is for a protected route
  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    // Redirect to login if not authenticated
    const loginUrl = new URL('/auth/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Continue to the requested route if authenticated or not protected
  return NextResponse.next();
}

export const config = {
  matcher: ['/protected-content/:path*'], // Apply middleware only to protected paths
};