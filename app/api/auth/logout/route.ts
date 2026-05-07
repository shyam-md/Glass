import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/', request.url));
  response.cookies.set('movie_portal_session', '', { path: '/', expires: new Date(0) });
  return response;
}
