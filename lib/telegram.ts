import { findMovie } from '@/lib/data';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_FILE_BRIDGE_URL = process.env.TELEGRAM_FILE_BRIDGE_URL;
const TELEGRAM_BOT_API = TELEGRAM_BOT_TOKEN ? `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}` : null;

export async function resolveTelegramFileUrl(slug: string) {
  const movie = findMovie(slug);

  if (!movie) {
    throw new Error('Movie not found');
  }

  if (TELEGRAM_FILE_BRIDGE_URL) {
    return `${TELEGRAM_FILE_BRIDGE_URL.replace(/\/$/, '')}/stream/${movie.telegramFileId}`;
  }

  if (!TELEGRAM_BOT_API || !TELEGRAM_BOT_TOKEN) {
    return `https://example.com/secure-stream/${movie.telegramFileId}`;
  }

  const response = await fetch(`${TELEGRAM_BOT_API}/getFile?file_id=${movie.telegramFileId}`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Telegram API request failed');
  }

  const payload = await response.json();
  const filePath = payload?.result?.file_path;

  if (!filePath) {
    throw new Error('Telegram file path not returned');
  }

  return `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`;
}

export async function syncTelegramLibrary() {
  return {
    syncedAt: new Date().toISOString(),
    imported: 4,
    note: 'Replace this stub with your Telegram file-store bot indexer or channel parser.'
  };
}
