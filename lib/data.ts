import { cookies } from 'next/headers';
import { Movie, Role, SessionUser } from '@/lib/types';

export const movies: Movie[] = [
  {
    id: '1',
    slug: 'aurora-protocol',
    title: 'Aurora Protocol',
    description: 'A high-stakes sci-fi thriller with encrypted archives, orbital storms, and a rogue transmission that changes everything.',
    genre: ['Sci-Fi', 'Thriller'],
    year: 2026,
    duration: '2h 09m',
    quality: '4K',
    rating: 8.7,
    posterGradient: 'from-cyan-400/60 via-sky-400/20 to-violet-500/60',
    hero: true,
    telegramFileId: 'tg_file_aurora_protocol',
    telegramMessageId: '7001',
    isDownloadable: true,
    isFeatured: true
  },
  {
    id: '2',
    slug: 'silver-tide',
    title: 'Silver Tide',
    description: 'A moody ocean drama with an iOS-inspired premium interface built for immersive long-form viewing.',
    genre: ['Drama', 'Mystery'],
    year: 2025,
    duration: '1h 52m',
    quality: '1080p',
    rating: 7.9,
    posterGradient: 'from-blue-500/60 via-slate-300/10 to-indigo-600/60',
    hero: false,
    telegramFileId: 'tg_file_silver_tide',
    telegramMessageId: '7002',
    isDownloadable: true
  },
  {
    id: '3',
    slug: 'glass-circuit',
    title: 'Glass Circuit',
    description: 'A cyberpunk chase through translucent megacities, designed to showcase vivid hero banners and fast browsing filters.',
    genre: ['Action', 'Cyberpunk'],
    year: 2024,
    duration: '2h 01m',
    quality: '1080p',
    rating: 8.3,
    posterGradient: 'from-fuchsia-500/60 via-pink-300/15 to-cyan-400/50',
    hero: false,
    telegramFileId: 'tg_file_glass_circuit',
    telegramMessageId: '7003',
    isDownloadable: true
  },
  {
    id: '4',
    slug: 'midnight-archive',
    title: 'Midnight Archive',
    description: 'A crime drama centered around hidden tapes, digital vaults, and a curator who knows too much.',
    genre: ['Crime', 'Drama'],
    year: 2023,
    duration: '1h 44m',
    quality: '720p',
    rating: 7.6,
    posterGradient: 'from-emerald-400/55 via-teal-300/10 to-slate-700/60',
    hero: false,
    telegramFileId: 'tg_file_midnight_archive',
    telegramMessageId: '7004',
    isDownloadable: false
  }
];

export function getFeaturedMovie() {
  return movies.find((movie) => movie.hero) ?? movies[0];
}

export function findMovie(slug: string) {
  return movies.find((movie) => movie.slug === slug);
}

export function searchMovies(params: { q?: string; genre?: string; quality?: string }) {
  const q = params.q?.toLowerCase().trim();
  return movies.filter((movie) => {
    const qMatch = !q || [movie.title, movie.description, movie.genre.join(' ')].join(' ').toLowerCase().includes(q);
    const genreMatch = !params.genre || movie.genre.some((item) => item.toLowerCase() === params.genre?.toLowerCase());
    const qualityMatch = !params.quality || movie.quality === params.quality;
    return qMatch && genreMatch && qualityMatch;
  });
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const encoded = cookieStore.get('movie_portal_session')?.value;
  if (!encoded) return null;

  try {
    return JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as SessionUser;
  } catch {
    return null;
  }
}

export async function getRole(): Promise<Role> {
  const session = await getSession();
  return session?.role ?? 'guest';
}
