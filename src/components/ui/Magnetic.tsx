import { motion, useSpring } from 'framer-motion';
import { useRef, type ReactNode, type PointerEvent } from 'react';
import { cn, useFinePointer, usePrefersReducedMotion } from '../../lib/hooks';

interface Props {
  children: ReactNode;
  className?: string;
  /** 0–1: how far the element follows the cursor. */
  strength?: number;
}

/** Pulls its child toward the cursor, then springs back. */
export function Magnetic({ children, className, strength = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const spring = { stiffness: 220, damping: 14, mass: 0.35 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const onMove = (e: PointerEvent) => {
    if (!fine || reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  );
}
