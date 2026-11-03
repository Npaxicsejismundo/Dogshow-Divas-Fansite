import { useEffect, useRef } from 'react';
import { cn, usePrefersReducedMotion } from '../../lib/hooks';
import { useLenis } from '../../lib/scroll';

interface Props {
  items: string[];
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}

const COPIES = 4;

/**
 * Endless strip on the compositor (Web Animations API). Scrolling speeds it
 * up and flips its direction, without any per-frame JavaScript.
 */
export function Marquee({ items, duration = 24, reverse = false, className, itemClassName }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    const el = track.current;
    if (!el || reduced || !el.animate) return;
    const end = `translateX(-${100 / COPIES}%)`;
    const anim = el.animate(
      reverse ? [{ transform: end }, { transform: 'translateX(0)' }] : [{ transform: 'translateX(0)' }, { transform: end }],
      { duration: duration * 1000, iterations: Infinity },
    );
    if (!lenis) return () => anim.cancel();

    let dir = 1;
    const off = lenis.on('scroll', ({ velocity, direction }: { velocity: number; direction: number }) => {
      if (direction) dir = direction;
      anim.updatePlaybackRate(dir * (1 + Math.min(Math.abs(velocity) / 6, 4)));
    });
    return () => {
      off();
      anim.cancel();
    };
  }, [duration, reverse, reduced, lenis]);

  return (
    <div className={cn('overflow-hidden whitespace-nowrap', className)}>
      <p className="sr-only">{items.join(', ')}</p>
      <div ref={track} aria-hidden className="flex w-max">
        {Array.from({ length: COPIES }, (_, copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span key={item} className={cn('flex items-center', itemClassName)}>
                {item}
                <span className="mx-[0.5em] inline-block text-[0.6em]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
