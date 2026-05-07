export type Role = 'guest' | 'user' | 'admin';

export type Movie = {
  id: string;
  slug: string;
  title: string;
  description: string;
  genre: string[];
  year: number;
  duration: string;
  quality: '720p' | '1080p' | '4K';
  rating: number;
  posterGradient: string;
  hero: boolean;
  telegramFileId: string;
  telegramMessageId?: string;
  isDownloadable: boolean;
  isFeatured?: boolean;
};

export type SessionUser = {
  email: string;
  name: string;
  role: Exclude<Role, 'guest'>;
};
