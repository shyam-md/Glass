import { getRole, movies } from '@/lib/data';
import { GlassPanel } from '@/components/GlassPanel';

export default async function AdminPage() {
  const role = await getRole();
  const denied = role !== 'admin';

  return (
    <div className="space-y-6 pt-8">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Control center</p>
        <h1 className="text-3xl font-semibold text-white">Admin dashboard</h1>
      </div>

      {denied ? (
        <GlassPanel className="p-6">
          <h2 className="text-xl font-semibold text-white">Admin access required</h2>
          <p className="mt-2 text-sm text-slate-300">Sign in as admin from the mock login page to unlock Telegram sync and catalog management.</p>
        </GlassPanel>
      ) : (
        <>
          <GlassPanel className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Telegram library sync</h2>
                <p className="mt-2 text-sm text-slate-300">Triggers your authorized file index refresh. Replace the stubbed route with channel parsing or your file-store bot service.</p>
              </div>
              <form action="/api/telegram/sync" method="post">
                <button className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-950 transition hover:bg-slate-100">Run sync</button>
              </form>
            </div>
          </GlassPanel>

          <GlassPanel className="overflow-hidden p-0">
            <div className="border-b border-white/10 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Catalog overview</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-200">
                <thead className="bg-white/5 text-slate-300">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Quality</th>
                    <th className="px-6 py-4">Download</th>
                    <th className="px-6 py-4">Telegram file ID</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie.id} className="border-t border-white/5">
                      <td className="px-6 py-4">{movie.title}</td>
                      <td className="px-6 py-4">{movie.quality}</td>
                      <td className="px-6 py-4">{movie.isDownloadable ? 'Enabled' : 'Disabled'}</td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-300">{movie.telegramFileId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassPanel>
        </>
      )}
    </div>
  );
}
