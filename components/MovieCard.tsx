import Link from 'next/link';
import { Download, PlayCircle, Star } from 'lucide-react';
import { Movie } from '@/lib/types';
import { GlassPanel } from '@/components/GlassPanel';

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <GlassPanel className="overflow-hidden p-0 transition duration-300 hover:-translate-y-1 hover:bg-white/12">
      <div className={`relative h-56 bg-gradient-to-br ${movie.posterGradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_35%)]" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs text-white/90">{movie.quality}</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs text-white/90"><Star className="h-3.5 w-3.5" /> {movie.rating}</span>
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-300">{movie.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-200/90">
          {movie.genre.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-2 text-sm text-slate-300">
          <span>{movie.year}</span>
          <span>{movie.duration}</span>
        </div>
        <div className="flex gap-2">
          <Link href={`/watch/${movie.slug}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-cyan-400/80 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-300">
            <PlayCircle className="h-4 w-4" /> Watch
          </Link>
          <Link href={`/api/download/${movie.slug}`} className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white transition hover:bg-white/15">
            <Download className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </GlassPanel>
  );
}
