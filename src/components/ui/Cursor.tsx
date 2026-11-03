import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useFinePointer, usePrefersReducedMotion } from '../../lib/hooks';

type Kind = 'default' | 'link' | 'image' | 'drag' | 'play';

const looks: Record<Kind, { size: number; bg: string; label: string }> = {
  default: { size: 18, bg: 'transparent', label: '' },
  link: { size: 64, bg: 'var(--color-spot)', label: 'Click!' },
  image: { size: 104, bg: 'var(--color-diva)', label: 'Tingnan' },
  drag: { size: 88, bg: 'var(--color-paper)', label: 'Drag me' },
  play: { size: 104, bg: 'var(--color-spot)', label: 'Play' },
};

const INTERACTIVE = '[data-cursor], a, button, [role="button"], label, select';

/** Dot + label bubble that reacts to links, images and draggables. */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 600, damping: 42, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 42, mass: 0.4 });

  const [state, setState] = useState<{ kind: Kind; label: string }>({ kind: 'default', label: '' });
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const last = useRef('default|');

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(INTERACTIVE);
      const kind = ((el?.getAttribute('data-cursor') as Kind | null) ?? (el ? 'link' : 'default')) as Kind;
      const label = el?.getAttribute('data-cursor-label') ?? looks[kind]?.label ?? '';
      const key = `${kind}|${label}`;
      if (key !== last.current) {
        last.current = key;
        setState({ kind: looks[kind] ? kind : 'link', label });
      }
    };
    const leave = (e: PointerEvent) => {
      if (!e.relatedTarget) setVisible(false);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    document.addEventListener('pointerout', leave, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerout', leave);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const look = looks[state.kind];
  const isDefault = state.kind === 'default';

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div className="absolute left-0 top-0" style={{ x: sx, y: sy }}>
        <motion.div
          className={
            isDefault
              ? 'grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-paper mix-blend-difference'
              : 'grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-ink shadow-[3px_3px_0_var(--color-ink)]'
          }
          animate={{ width: look.size, height: look.size, backgroundColor: look.bg, scale: pressed ? 0.85 : 1 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        >
          {!isDefault && (
            <motion.span
              key={state.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-1 text-center font-body text-[0.7rem] font-extrabold uppercase leading-none tracking-wide text-ink"
            >
              {state.label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper mix-blend-difference"
        style={{ x, y, opacity: isDefault ? 1 : 0 }}
      />
    </div>
  );
}
