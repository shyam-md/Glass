import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Download, ShieldCheck } from 'lucide-react';
import { GlassPanel } from '@/components/GlassPanel';
import { findMovie } from '@/lib/data';
import { resolveTelegramFileUrl } from '@/lib/telegram';

export default async function WatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const movie = findMovie(slug);

  if (!movie) {
    notFound();
  }

  let streamUrl = '';
  try {
    streamUrl = await resolveTelegramFileUrl(slug);
  } catch {
    streamUrl = '';
  }

  return (
    <div className="space-y-6 pt-8">
      <div className={`rounded-[36px] border border-white/15 bg-gradient-to-br ${movie.posterGradient} p-7`}>
        <p className="text-sm uppercase tracking-[0.25em] text-white/70">Now streaming</p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-white">{movie.title}</h1>
            <p className="mt-3 max-w-3xl text-slate-100/90">{movie.description}</p>
          </div>
          <div className="flex gap-2 text-sm text-white/90">
            <span className="rounded-full border border-white/20 bg-black/15 px-3 py-1.5">{movie.quality}</span>
            <span className="rounded-full border border-white/20 bg-black/15 px-3 py-1.5">{movie.duration}</span>
            <span className="rounded-full border border-white/20 bg-black/15 px-3 py-1.5">{movie.year}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.7fr,0.8fr]">
        <div className="video-shell p-3">
          {streamUrl ? (
            <video className="aspect-video w-full rounded-[24px] bg-black" controls preload="metadata" src={streamUrl} />
          ) : (
            <div className="grid aspect-video place-items-center rounded-[24px] bg-black/50 text-center text-slate-300">
              <div>
                <p className="text-lg font-medium text-white">Stream URL not resolved</p>
                <p className="mt-2 text-sm">Set TELEGRAM_BOT_TOKEN or TELEGRAM_FILE_BRIDGE_URL to enable playback.</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <GlassPanel className="p-5">
            <h2 className="text-xl font-semibold text-white">Playback details</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>Genres: {movie.genre.join(', ')}</p>
              <p>Telegram file ID: <span className="font-mono text-slate-200">{movie.telegramFileId}</span></p>
              <p>Download enabled: {movie.isDownloadable ? 'Yes' : 'No'}</p>
            </div>
            <div className="mt-5 flex gap-3">
              <Link href={`/api/download/${movie.slug}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 font-medium text-slate-950 transition hover:bg-slate-100">
                <Download className="h-4 w-4" /> Download
              </Link>
              <Link href="/browse" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white transition hover:bg-white/15">
                Browse more
              </Link>
            </div>
          </GlassPanel>

          <GlassPanel className="p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-white/10 p-3"><ShieldCheck className="h-5 w-5 text-cyan-200" /></div>
              <div>
                <h3 className="text-lg font-medium text-white">Production note</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">In production, replace direct Telegram file links with your own secure relay, CDN cache, or short-lived signed URLs to protect source assets and improve performance.</p>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
