import { useInView } from 'framer-motion';
import { useRef, type CSSProperties } from 'react';
import { cn } from '../../lib/hooks';

interface Props {
  text: string;
  id?: string;
  as?: 'span' | 'p' | 'h2' | 'h3' | 'div';
  className?: string;
  /** Split into letters (wobbly) or words (slide up). */
  mode?: 'letters' | 'words';
  /** Controlled trigger. When omitted, reveals once on scroll into view. */
  show?: boolean;
  /** Seconds before the first piece moves. */
  delay?: number;
  /** Seconds between pieces. */
  stagger?: number;
  /** Extra rotation for a campy wobble. */
  wobble?: boolean;
  /** Italicise the first letter, like the logo's oversized swash capitals. */
  swashFirst?: boolean;
}

/**
 * Text that slides up out of a mask, piece by piece. The motion is a CSS
 * transition (see .reveal-piece), so it runs on the compositor.
 */
export function SplitText({
  text,
  id,
  as = 'span',
  className,
  mode = 'words',
  show,
  delay = 0,
  stagger,
  wobble = false,
  swashFirst = false,
}: Props) {
  // Typed as div for the ref; at runtime it renders whichever tag was asked for.
  const Tag = as as 'div';
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const shown = show ?? inView;
  const words = text.split(' ');
  let index = 0;

  const vars = {
    '--delay': `${delay}s`,
    '--stagger': `${(stagger ?? (mode === 'letters' ? 0.045 : 0.08)) * 1000}ms`,
    '--tilt': wobble ? '14deg' : '4deg',
  } as CSSProperties;

  return (
    <Tag ref={ref} id={id} className={className} data-shown={shown} style={vars}>
      <span className="sr-only">{text}</span>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {(mode === 'letters' ? Array.from(word) : [word]).map((chunk, ci) => {
            const i = index++;
            return (
              <span
                key={ci}
                className="-mx-[0.06em] -mb-[0.14em] inline-block overflow-hidden px-[0.06em] pb-[0.14em] align-bottom"
              >
                <span
                  className={cn('reveal-piece origin-bottom-left', swashFirst && i === 0 && 'italic')}
                  style={{ '--i': i } as CSSProperties}
                >
                  {chunk}
                </span>
              </span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
