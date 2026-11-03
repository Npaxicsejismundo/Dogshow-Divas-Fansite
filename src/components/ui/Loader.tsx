import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { loader } from '../../content';
import { session, usePrefersReducedMotion } from '../../lib/hooks';
import { Logo } from './Logo';

const SEEN_KEY = 'dd-intro-seen';

/**
 * Short branded intro: counter → curtain lifts. Shorter on repeat visits.
 * index.html paints a static copy of this screen before any JS runs; we
 * swap it out on mount.
 */
export function Loader({ onOpen }: { onOpen: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    document.getElementById('boot')?.remove();
  }, []);

  useEffect(() => {
    const total = reduced ? 200 : session.get(SEEN_KEY) ? loader.repeatDurationMs : loader.durationMs;
    const start = performance.now();
    let raf = 0;
    let done = false;
    // Write straight to the DOM: no React render per frame.
    const paint = (v: number) => {
      if (numRef.current) numRef.current.textContent = String(v);
      if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
    };
    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      paint(100);
      session.set(SEEN_KEY, '1');
      setOpen(true);
      onOpen();
    };
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      // Ease in-out, so a longer count keeps moving instead of crawling near 100.
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      paint(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else finish();
    };
    raf = requestAnimationFrame(step);
    // rAF pauses in background tabs; never let the intro hold the page hostage.
    const safety = window.setTimeout(finish, total + 400);
    return () => {
      done = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="loader"
          aria-hidden
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-paper"
          exit={
            reduced
              ? { opacity: 0, transition: { duration: 0.3 } }
              : { y: '-115%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }
          }
        >
          {/* Curved curtain hem that travels with the panel (transform-only exit). */}
          <span aria-hidden className="absolute inset-x-0 top-full h-[15vh] rounded-b-[50%] bg-ink" />
          <div className="w-[min(70vw,420px)]">
            <Logo tone="light" priority />
          </div>
          <p className="mt-6 font-display text-2xl italic sm:text-3xl">{loader.line}</p>
          <p className="mt-2 font-body text-xs uppercase tracking-[0.3em] text-paper/60">{loader.sub}</p>
          <span className="absolute bottom-6 right-6 font-display text-[clamp(4rem,14vw,10rem)] font-black leading-none text-diva tabular-nums">
            <span ref={numRef}>0</span>
            <span className="align-top text-[0.4em]">%</span>
          </span>
          <span ref={barRef} className="absolute bottom-0 left-0 h-1.5 w-full origin-left bg-spot" style={{ transform: 'scaleX(0)' }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
