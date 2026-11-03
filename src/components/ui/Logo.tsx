import { useState } from 'react';
import { images } from '../../content';
import { cn } from '../../lib/hooks';

interface Props {
  /** `light` turns the black wordmark white for dark backgrounds. */
  tone?: 'dark' | 'light';
  className?: string;
  priority?: boolean;
  /** Compact placeholder for the nav. */
  compact?: boolean;
}

/**
 * The official logo file, untouched. On dark blocks it is inverted and
 * screened, so a black-on-white or black-on-transparent file both read white.
 */
export function Logo({ tone = 'dark', className, priority, compact }: Props) {
  const [missing, setMissing] = useState(false);
  const { logo } = images;

  if (missing) {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center border-2 border-dashed border-current text-center font-body font-extrabold uppercase tracking-[0.14em]',
          compact ? 'px-2 py-1 text-[0.6rem]' : 'w-full px-4 py-6 text-xs sm:text-sm',
          className,
        )}
        style={compact ? undefined : { aspectRatio: `${logo.width} / ${logo.height}` }}
        role="img"
        aria-label={logo.alt}
      >
        {compact ? 'Logo slot' : 'Logo slot · drop the official logo.png in /public/images'}
      </span>
    );
  }

  return (
    <img
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setMissing(true)}
      className={cn(
        'block h-auto w-full select-none object-contain',
        tone === 'light' ? 'mix-blend-screen invert' : 'mix-blend-multiply',
        className,
      )}
      draggable={false}
    />
  );
}
