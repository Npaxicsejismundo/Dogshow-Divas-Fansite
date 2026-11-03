import type { ReactNode } from 'react';
import { cn } from '../../lib/hooks';

interface Props {
  children: ReactNode;
  className?: string;
  /** `ink` for labels sitting on white sections. */
  tone?: 'paper' | 'ink';
}

/** Torn paper label, as on the show's thumbnails. */
export function TornLabel({ children, className, tone = 'paper' }: Props) {
  return (
    <span
      className={cn(
        'torn inline-block px-4 py-2 font-body text-[0.7rem] font-extrabold uppercase tracking-[0.18em] sm:text-xs',
        tone === 'ink' ? 'bg-ink text-paper' : 'bg-paper text-ink',
        className,
      )}
    >
      {children}
    </span>
  );
}
