import { MovieCard } from '@/components/MovieCard';
import { GlassPanel } from '@/components/GlassPanel';
import { searchMovies } from '@/lib/data';

export default async function BrowsePage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; genre?: string; quality?: string }>;
}) {
  const params = await searchParams;
  const list = searchMovies(params);

  return (
    <div className="space-y-6 pt-8">
      <GlassPanel className="p-5 sm:p-6">
        <form className="grid gap-4 md:grid-cols-[1.4fr,0.8fr,0.7fr,auto] md:items-end">
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Search</span>
            <input name="q" defaultValue={params.q} placeholder="Title, genre, description" className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Genre</span>
            <select name="genre" defaultValue={params.genre ?? ''} className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white">
              <option value="">All</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Drama">Drama</option>
              <option value="Mystery">Mystery</option>
              <option value="Action">Action</option>
              <option value="Cyberpunk">Cyberpunk</option>
              <option value="Crime">Crime</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Quality</span>
            <select name="quality" defaultValue={params.quality ?? ''} className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white">
              <option value="">Any</option>
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
              <option value="4K">4K</option>
            </select>
          </label>
          <button className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-950 transition hover:bg-slate-100">Apply</button>
        </form>
      </GlassPanel>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Results</p>
          <h1 className="text-3xl font-semibold text-white">Browse catalog</h1>
        </div>
        <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200">{list.length} titles</span>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
