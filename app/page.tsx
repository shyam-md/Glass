import Link from 'next/link';
import { ArrowRight, Download, PlayCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { GlassPanel } from '@/components/GlassPanel';
import { MovieCard } from '@/components/MovieCard';
import { getFeaturedMovie, movies } from '@/lib/data';

export default function HomePage() {
  const featured = getFeaturedMovie();
  const spotlight = movies.slice(1, 4);

  return (
    <div className="space-y-8 pt-8">
      <section className={`relative overflow-hidden rounded-[36px] border border-white/15 bg-gradient-to-br ${featured.posterGradient} p-8 shadow-glow sm:p-10`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_25%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.5fr,0.9fr] lg:items-end">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/15 px-4 py-2 text-sm text-white/90">
              <Sparkles className="h-4 w-4" /> iOS glass theme • Telegram-backed delivery
            </span>
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.35em] text-white/70">Featured title</p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">{featured.title}</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-100/90 sm:text-lg">{featured.description}</p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-white/90">
              {featured.genre.map((genre) => (
                <span key={genre} className="rounded-full border border-white/20 bg-black/15 px-3 py-1.5">{genre}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`/watch/${featured.slug}`} className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-medium text-slate-950 transition hover:bg-slate-100">
                <PlayCircle className="h-5 w-5" /> Start streaming
              </Link>
              <Link href={`/api/download/${featured.slug}`} className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-black/15 px-5 py-3 font-medium text-white transition hover:bg-black/20">
                <Download className="h-5 w-5" /> Download
              </Link>
            </div>
          </div>

          <GlassPanel className="space-y-4 p-5">
            <div className="flex items-center gap-3 text-white">
              <div className="rounded-2xl bg-white/10 p-3"><ShieldCheck className="h-5 w-5 text-cyan-200" /></div>
              <div>
                <p className="font-medium">Built for licensed catalogs</p>
                <p className="text-sm text-slate-300">Search, stream, and deliver authorized media from Telegram-linked file IDs.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-300">Playback</p>
                <p className="mt-1 text-xl font-semibold text-white">Adaptive shell</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-300">Delivery</p>
                <p className="mt-1 text-xl font-semibold text-white">Direct links</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-300">Discovery</p>
                <p className="mt-1 text-xl font-semibold text-white">Smart filters</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-300">Admin</p>
                <p className="mt-1 text-xl font-semibold text-white">Telegram sync</p>
              </div>
            </div>
          </GlassPanel>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <GlassPanel className="p-6">
          <p className="text-sm text-slate-300">01</p>
          <h2 className="mt-3 text-xl font-semibold text-white">Stream from Telegram-backed assets</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">Swap the placeholder resolver with your file-store bot or bridge service to fetch secure stream URLs.</p>
        </GlassPanel>
        <GlassPanel className="p-6">
          <p className="text-sm text-slate-300">02</p>
          <h2 className="mt-3 text-xl font-semibold text-white">Direct downloads with gatekeeping</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">Download endpoints enforce authentication and can be extended with entitlements or signed URLs.</p>
        </GlassPanel>
        <GlassPanel className="p-6">
          <p className="text-sm text-slate-300">03</p>
          <h2 className="mt-3 text-xl font-semibold text-white">Search and admin tools</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">Includes browse filters, mock login, and an admin sync action for your Telegram catalog ingestion flow.</p>
        </GlassPanel>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Library</p>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Now showing</h2>
          </div>
          <Link href="/browse" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/15">
            Explore catalog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {spotlight.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
