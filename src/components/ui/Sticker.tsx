import { motion, useInView } from 'framer-motion';
import { useId, useRef, type CSSProperties, type ReactNode, type RefObject } from 'react';
import { cn } from '../../lib/hooks';

type Variant = 'burst' | 'torn' | 'circle' | 'pill';

interface Props {
  children: ReactNode;
  variant?: Variant;
  /** Element the sticker can be dragged around in. */
  bounds: RefObject<HTMLElement | null>;
  className?: string;
  style?: CSSProperties;
  rotate?: number;
}

/** Spiky star polygon, like the wedge serifs on the wordmark. */
const burstPoints = (() => {
  const spikes = 16;
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? 50 : 38;
    const a = (Math.PI * i) / spikes - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
})();

/** Decorative sticker you can drag around its section. */
export function Sticker({ children, variant = 'pill', bounds, className, style, rotate = -6 }: Props) {
  const pathId = `sticker-path-${useId().replace(/:/g, '')}`;
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      aria-hidden
      drag
      dragConstraints={bounds}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
      initial={{ rotate }}
      transition={{ type: 'spring', stiffness: 260, damping: 13 }}
      whileHover={{ rotate: rotate + 8, scale: 1.06 }}
      whileDrag={{ scale: 1.14, rotate: rotate - 6, zIndex: 60 }}
      data-cursor="drag"
      className={cn('absolute z-20 touch-none select-none', className)}
      style={style}
    >
      <div className="sticker-pop" data-shown={shown}>
        {variant === 'burst' && (
          <div className="relative grid aspect-square w-28 place-items-center sm:w-36">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full drop-shadow-[4px_4px_0_var(--color-ink)]">
              <polygon points={burstPoints} fill="currentColor" stroke="var(--color-ink)" strokeWidth="1.6" />
            </svg>
            <span className="relative max-w-[70%] text-center font-body text-[0.7rem] font-extrabold uppercase leading-tight tracking-wide text-ink sm:text-xs">
              {children}
            </span>
          </div>
        )}
        {variant === 'torn' && (
          <span className="torn block bg-paper px-5 py-3 font-body text-sm font-extrabold uppercase tracking-[0.12em] text-ink shadow-[0_8px_0_rgb(0_0_0/0.25)] sm:text-base">
            {children}
          </span>
        )}
        {variant === 'circle' && (
          <div className="relative grid aspect-square w-28 place-items-center rounded-full border-2 border-ink bg-paper text-ink shadow-[4px_4px_0_var(--color-ink)] sm:w-32">
            <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-1">
              <defs>
                <path id={pathId} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-current font-body text-[10px] font-extrabold uppercase tracking-[0.2em]">
                <textPath href={`#${pathId}`}>{`${children} ✦ ${children} ✦ `}</textPath>
              </text>
            </svg>
            <span className="font-display text-3xl italic">✦</span>
          </div>
        )}
        {variant === 'pill' && (
          <span className="block rounded-full border-2 border-ink bg-spot px-4 py-2 font-body text-sm font-extrabold uppercase tracking-wide text-ink shadow-[4px_4px_0_var(--color-ink)]">
            {children}
          </span>
        )}
      </div>
    </motion.div>
  );
}
