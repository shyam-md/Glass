import { NextRequest, NextResponse } from 'next/server';
import { searchMovies } from '@/lib/data';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') ?? '';
  const items = searchMovies({ q }).map((movie) => ({
    title: movie.title,
    slug: movie.slug,
    quality: movie.quality,
    genre: movie.genre
  }));

  return NextResponse.json({ query: q, count: items.length, items });
}
