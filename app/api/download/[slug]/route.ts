import { NextRequest, NextResponse } from 'next/server';
import { findMovie, getSession } from '@/lib/data';
import { resolveTelegramFileUrl } from '@/lib/telegram';

export async function GET(_: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }

  const { slug } = await context.params;
  const movie = findMovie(slug);

  if (!movie) {
    return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
  }

  if (!movie.isDownloadable) {
    return NextResponse.json({ error: 'Download disabled for this title' }, { status: 403 });
  }

  const resolved = await resolveTelegramFileUrl(slug);
  return NextResponse.redirect(resolved);
}
