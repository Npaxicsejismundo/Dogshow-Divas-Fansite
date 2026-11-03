import { useState } from 'react';
import type { Tone } from '../../content';
import { cn } from '../../lib/hooks';
import { toneClass } from '../../lib/tones';

interface Props {
  id: string;
  title: string;
  tone: Tone;
  /** Local thumbnail; defaults to /images/episodes/<id>.jpg. */
  thumb?: string;
  badge?: string;
  playLabel: string;
}

let warmed = false;
/** Open the connection on first hover so playback starts faster. */
const warm = () => {
  if (warmed) return;
  warmed = true;
  for (const href of ['https://www.youtube-nocookie.com', 'https://i.ytimg.com']) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    document.head.appendChild(link);
  }
};

/**
 * Click-to-load YouTube embed. Nothing from YouTube loads until the
 * visitor presses play. The poster is a local thumbnail; if that file is
 * missing, the CSS-drawn poster underneath shows instead.
 */
export function LiteYouTube({ id, title, tone, thumb, badge, playLabel }: Props) {
  const [playing, setPlaying] = useState(false);
  const [thumbState, setThumbState] = useState<'loading' | 'loaded' | 'missing'>('loading');
  const src = thumb ?? `/images/episodes/${id}.jpg`;

  return (
    <div className="relative aspect-video overflow-hidden bg-ink">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          onPointerEnter={warm}
          onFocus={warm}
          data-cursor="play"
          className={cn(
            'group/play absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden p-4 text-left sm:p-5',
            tone === 'curtain' ? 'curtain-folds text-paper' : toneClass[tone],
          )}
        >
          <span className="sr-only">
            {playLabel}: {title}
          </span>
          <span aria-hidden className="relative z-10 flex items-start justify-between gap-3">
            {badge && (
              <span className="torn bg-paper px-3 py-1 font-body text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-ink">
                {badge}
              </span>
            )}
          </span>
          <span
            aria-hidden
            className="relative line-clamp-3 font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-black italic leading-[0.95] tracking-[-0.02em]"
          >
            {title}
          </span>
          {thumbState !== 'missing' && (
            <img
              src={src}
              alt=""
              width={960}
              height={540}
              loading="lazy"
              decoding="async"
              onLoad={() => setThumbState('loaded')}
              onError={() => setThumbState('missing')}
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 group-hover/play:scale-105',
                thumbState === 'loaded' ? 'opacity-100' : 'opacity-0',
              )}
            />
          )}
          <span
            aria-hidden
            className="absolute bottom-4 right-4 z-10 grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-spot text-ink shadow-[3px_3px_0_var(--color-ink)] transition-transform duration-300 group-hover/play:scale-110 group-hover/play:-rotate-12 sm:h-16 sm:w-16"
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6">
              <path d="M7 4.5v15l12-7.5-12-7.5Z" fill="currentColor" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
