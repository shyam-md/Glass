import { NextRequest, NextResponse } from 'next/server';
import { searchMovies } from '@/lib/data';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') ?? undefined;
  const genre = request.nextUrl.searchParams.get('genre') ?? undefined;
  const quality = request.nextUrl.searchParams.get('quality') ?? undefined;

  return NextResponse.json({ items: searchMovies({ q, genre, quality }) });
}
