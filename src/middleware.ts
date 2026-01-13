import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of protected routes
const protectedRoutes = [
  '/dashboard',
  '/game',
  '/review', 
  '/user',
  '/write-review'
];

export function middleware(req: NextRequest) {
  const tokenData = req.cookies.get('auth_token');

  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtected) {
    if (!tokenData) {
      // No token at all - preserve the original URL for redirect after login
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check if token is expired
    try {
      const parsed = JSON.parse(tokenData.value);
      const tokenTimestamp = parsed.timestamp;
      const currentTime = Date.now();
      const tokenAge = currentTime - tokenTimestamp;
      const twelveHoursInMs = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

      if (tokenAge >= twelveHoursInMs) {
        // Token is expired, redirect to login - preserve the original URL
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      // If parsing fails, assume token is invalid - preserve the original URL
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - *.svg (SVG files)
     */
    '/((?!api|_next/static|_next/image|sitemap|robots|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};