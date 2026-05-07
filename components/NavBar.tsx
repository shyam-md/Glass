import Link from 'next/link';
import { Film, LayoutDashboard, LogOut, Search, Sparkles, UserCircle2 } from 'lucide-react';
import { getSession } from '@/lib/data';
import { GlassPanel } from '@/components/GlassPanel';

export async function NavBar() {
  const session = await getSession();

  return (
    <GlassPanel className="sticky top-4 z-40 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
          <Film className="h-5 w-5 text-cyan-200" />
        </div>
        <div>
          <Link href="/" className="text-lg font-semibold tracking-wide text-white">
            GlassFlix
          </Link>
          <p className="text-xs text-slate-300">iOS-inspired streaming portal</p>
        </div>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <Link href="/browse" className="rounded-2xl px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10">
          Browse
        </Link>
        <Link href="/browse" className="rounded-2xl px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10">
          <span className="inline-flex items-center gap-2"><Search className="h-4 w-4" /> Search</span>
        </Link>
        <Link href="/admin" className="rounded-2xl px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10">
          <span className="inline-flex items-center gap-2"><LayoutDashboard className="h-4 w-4" /> Admin</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {session ? (
          <>
            <div className="hidden rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-100 sm:block">
              <span className="inline-flex items-center gap-2"><UserCircle2 className="h-4 w-4" /> {session.name}</span>
            </div>
            <form action="/api/auth/logout" method="post">
              <button className="inline-flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20">
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </form>
          </>
        ) : (
          <Link href="/login" className="inline-flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20">
            <Sparkles className="h-4 w-4" /> Sign in
          </Link>
        )}
      </div>
    </GlassPanel>
  );
}
