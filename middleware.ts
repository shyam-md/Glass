import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeSession(request: NextRequest) {
  const token = request.cookies.get('movie_portal_session')?.value;
  if (!token) return null;

  try {
    return JSON.parse(Buffer.from(token, 'base64url').toString('utf8')) as { role?: string };
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = decodeSession(request);

  const protectedPaths = ['/browse', '/watch', '/admin'];
  const requiresAuth = protectedPaths.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (requiresAuth && !session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith('/admin') && session?.role !== 'admin') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/browse/:path*', '/watch/:path*', '/admin/:path*']
};
