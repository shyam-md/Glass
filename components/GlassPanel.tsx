import { PropsWithChildren } from 'react';
import clsx from 'clsx';

export function GlassPanel({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={clsx(
        'rounded-[28px] border border-white/15 bg-white/10 backdrop-blur-xl shadow-glass shadow-glow',
        className
      )}
    >
      {children}
    </div>
  );
}
