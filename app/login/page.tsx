import { LockKeyhole, ShieldEllipsis } from 'lucide-react';
import { GlassPanel } from '@/components/GlassPanel';

export default function LoginPage() {
  return (
    <div className="grid min-h-[calc(100vh-120px)] place-items-center py-8">
      <GlassPanel className="w-full max-w-md p-8">
        <div className="mb-6 flex items-center gap-3 text-white">
          <div className="rounded-2xl bg-white/10 p-3"><LockKeyhole className="h-5 w-5 text-cyan-200" /></div>
          <div>
            <h1 className="text-2xl font-semibold">Sign in</h1>
            <p className="text-sm text-slate-300">Mock account system for the starter kit.</p>
          </div>
        </div>
        <form action="/api/auth/login" method="post" className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Display name</span>
            <input name="name" required className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400" placeholder="Ava Carter" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Email</span>
            <input name="email" type="email" required className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400" placeholder="ava@studio.example" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Role</span>
            <select name="role" defaultValue="user" className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button className="w-full rounded-2xl bg-white px-4 py-3 font-medium text-slate-950 transition hover:bg-slate-100">Continue</button>
        </form>
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          <ShieldEllipsis className="mt-0.5 h-4 w-4 text-cyan-200" />
          Replace this with NextAuth, Clerk, Supabase Auth, or your existing identity system for production.
        </div>
      </GlassPanel>
    </div>
  );
}
