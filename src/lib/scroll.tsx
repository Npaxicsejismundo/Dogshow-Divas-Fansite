import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './hooks';
import { useIntro } from './intro';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;
    let instance: Lenis | undefined;
    const tick = (time: number) => instance?.raf(time * 1000);

    // Lenis measures the page on creation; do it in its own task, after first paint.
    const timer = window.setTimeout(() => {
      instance = new Lenis({ duration: 1.15, anchors: true, smoothWheel: true });
      instance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(instance);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      gsap.ticker.remove(tick);
      instance?.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export const useLenis = () => useContext(LenisContext);

/**
 * GSAP scroll effects, set up only once the intro has lifted and webfonts
 * are in. Measuring late keeps layout work off the first paint and means
 * positions are computed once, with final text widths.
 */
export function useScrollFx(scope: RefObject<HTMLElement | null>, setup: () => void | (() => void)) {
  const { ready } = useIntro();
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    let ctx: gsap.Context | undefined;
    let cleanup: void | (() => void);
    let raf = 0;
    const run = () => {
      if (cancelled || !scope.current) return;
      ctx = gsap.context(() => {
        cleanup = setupRef.current();
      }, scope.current);
    };
    const fonts = document.fonts?.ready ?? Promise.resolve();
    fonts.then(() => {
      raf = requestAnimationFrame(run);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (typeof cleanup === 'function') cleanup();
      ctx?.revert();
    };
  }, [ready, scope]);
}

export function scrollToHash(hash: string, lenis: Lenis | null) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  // Deferred sections only know their real height once rendered, so
  // correct the landing spot after the first glide if it moved.
  if (lenis)
    lenis.scrollTo(target, {
      onComplete: () => {
        if (Math.abs(target.getBoundingClientRect().top) > 4) lenis.scrollTo(target, { duration: 0.5 });
      },
    });
  else target.scrollIntoView();
  target.focus({ preventScroll: true });
}

export { gsap, ScrollTrigger };
