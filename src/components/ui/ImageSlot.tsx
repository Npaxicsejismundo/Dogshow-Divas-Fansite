import { useState } from 'react';
import type { ImageAsset } from '../../content';
import { cn } from '../../lib/hooks';

interface Props {
  image: ImageAsset;
  className?: string;
  imgClassName?: string;
  /** CSS aspect-ratio; defaults to the image's own width/height. */
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  /** Adds the zoom + duotone hover effect. */
  hover?: boolean;
  placeholderTone?: 'curtain' | 'ink' | 'diva' | 'spot' | 'paper';
  /**
   * `contain` shows the whole image (e.g. key art with a title) inside the box,
   * with a blurred copy of it filling the leftover space.
   */
  fit?: 'cover' | 'contain';
}

const placeholderBg = {
  curtain: 'curtain-folds text-paper',
  ink: 'bg-ink text-paper',
  diva: 'bg-diva text-ink',
  spot: 'bg-spot text-ink',
  paper: 'bg-paper text-ink',
};

/**
 * A named image slot. Until a file exists at `image.src`, a styled
 * placeholder shows the filename and alt text. The box is sized up front,
 * so nothing shifts when the real photo arrives.
 */
export function ImageSlot({
  image,
  className,
  imgClassName,
  aspect,
  priority,
  sizes = '(min-width: 1024px) 40vw, 90vw',
  hover,
  placeholderTone = 'curtain',
  fit = 'cover',
}: Props) {
  const [state, setState] = useState<'loading' | 'loaded' | 'missing'>('loading');
  const file = image.src.split('/').pop();

  return (
    <div
      className={cn('group/img relative isolate overflow-hidden', className)}
      style={{ aspectRatio: aspect ?? `${image.width} / ${image.height}` }}
      data-cursor={hover ? 'image' : undefined}
    >
      {state !== 'loaded' && (
        <div
          className={cn('absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center', placeholderBg[placeholderTone])}
          role="img"
          aria-label={image.alt}
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8 opacity-80" aria-hidden>
            <path
              fill="currentColor"
              d="M12 2c.6 3.4 1.9 4.9 5.3 5.5-3.4.6-4.7 2-5.3 5.5-.6-3.4-1.9-4.9-5.3-5.5C10.1 6.9 11.4 5.4 12 2Zm6 11c.3 1.7 1 2.4 2.6 2.7-1.7.3-2.3 1-2.6 2.7-.3-1.7-1-2.4-2.7-2.7 1.7-.3 2.4-1 2.7-2.7Z"
            />
          </svg>
          <span className="torn bg-paper px-3 py-1.5 font-body text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-ink">
            Image slot · {file}
          </span>
          <span className="max-w-[28ch] font-body text-xs leading-snug opacity-80">{image.alt}</span>
        </div>
      )}

      {fit === 'contain' && state === 'loaded' && (
        <img
          src={image.src}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-125 object-cover opacity-70 blur-2xl"
        />
      )}

      {state !== 'missing' && (
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...{ fetchpriority: priority ? 'high' : undefined }}
          onLoad={() => setState('loaded')}
          onError={() => setState('missing')}
          style={{ objectPosition: image.position }}
          className={cn(
            'absolute inset-0 h-full w-full transition-[opacity,transform] duration-700 ease-[var(--ease-diva)]',
            fit === 'contain' ? 'object-contain drop-shadow-[0_6px_14px_rgb(0_0_0/0.35)]' : 'object-cover',
            state === 'loaded' ? 'opacity-100' : 'opacity-0',
            hover && 'group-hover/img:scale-[1.07] group-hover/img:-rotate-1',
            imgClassName,
          )}
        />
      )}

      {hover && state === 'loaded' && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-diva opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover/img:opacity-40"
        />
      )}
    </div>
  );
}
