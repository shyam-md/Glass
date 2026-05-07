import { NextRequest, NextResponse } from 'next/server';
import { getRole } from '@/lib/data';
import { syncTelegramLibrary } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  const role = await getRole();
  if (role !== 'admin') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  const result = await syncTelegramLibrary();
  return NextResponse.json(result);
}
