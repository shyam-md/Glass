import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = String(formData.get('name') || 'Guest User');
  const email = String(formData.get('email') || 'guest@example.com');
  const role = formData.get('role') === 'admin' ? 'admin' : 'user';

  const payload = Buffer.from(JSON.stringify({ name, email, role }), 'utf8').toString('base64url');
  const response = NextResponse.redirect(new URL(role === 'admin' ? '/admin' : '/browse', request.url));

  response.cookies.set('movie_portal_session', payload, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });

  return response;
}
