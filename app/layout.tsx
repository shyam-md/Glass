import './globals.css';
import type { Metadata } from 'next';
import { NavBar } from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'GlassFlix',
  description: 'Authorized movie streaming portal with Telegram-backed file delivery and iOS glassmorphism UI.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto min-h-screen max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  );
}
