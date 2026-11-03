import { useRef, type CSSProperties, type PointerEvent } from 'react';
import { hero, images } from '../../content';
import { usePrefersReducedMotion } from '../../lib/hooks';
import { useIntro } from '../../lib/intro';
import { gsap, useScrollFx } from '../../lib/scroll';
import { ImageSlot } from '../ui/ImageSlot';
import { Logo } from '../ui/Logo';
import { Magnetic } from '../ui/Magnetic';
import { SplitText } from '../ui/SplitText';
import { Sticker } from '../ui/Sticker';
import { TornLabel } from '../ui/TornLabel';

/** Stagger for the CSS `.rise` transitions. */
const delay = (s: number) => ({ '--delay': `${s}s` }) as CSSProperties;

export function Hero() {
  const { ready } = useIntro();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  // Scroll-out parallax: the giant word slides, the photo floats up.
  useScrollFx(ref, () => {
    if (reduced) return;
    gsap
      .timeline({ scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
      .to('[data-hero-word]', { xPercent: -14, ease: 'none' }, 0)
      .to('[data-hero-photo]', { yPercent: -30, rotate: 10, ease: 'none' }, 0)
      .to('[data-hero-logo]', { yPercent: 40, scale: 0.9, ease: 'none' }, 0);
  });

  // Spotlight follows the pointer (vars live on the spotlight only, so nothing else restyles).
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const spot = spotRef.current;
    if (!spot) return;
    const r = e.currentTarget.getBoundingClientRect();
    spot.style.setProperty('--spot-x', `${((e.clientX - r.left) / r.width) * 100}%`);
    spot.style.setProperty('--spot-y', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  // The copy is painted under the loader (good for LCP); CSS transitions
  // keyed off data-ready move it into place when the curtain lifts.
  return (
    <section
      id="top"
      ref={ref}
      tabIndex={-1}
      onPointerMove={onMove}
      data-ready={ready}
      className="curtain-folds relative isolate flex min-h-[100svh] flex-col overflow-hidden text-paper outline-none"
      aria-labelledby="hero-title"
    >
      <div
        ref={spotRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(42rem 30rem at var(--spot-x, 50%) var(--spot-y, 35%), rgb(255 225 74 / 0.22), transparent 70%)',
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1800px] flex-1 flex-col px-4 pb-10 pt-24 sm:px-8 sm:pt-28">
        <div className="rise flex flex-wrap gap-2" style={delay(0.1)}>
          {hero.eyebrow.map((item, i) => (
            <TornLabel key={item} className={i % 2 ? 'rotate-1' : '-rotate-2'}>
              {item}
            </TornLabel>
          ))}
        </div>

        <h1 id="hero-title" data-hero-logo className="mx-auto mt-8 w-[min(72vw,560px)] sm:mt-4">
          <span className="zoom-in block">
            <Logo tone="light" priority />
          </span>
        </h1>

        <p className="relative mt-2 text-center">
          <SplitText
            text={hero.taglineLead}
            show={ready}
            delay={0.25}
            className="block font-display text-[clamp(1.6rem,4.2vw,3.6rem)] italic leading-none"
          />
          <span data-hero-word className="block">
            <SplitText
              text={hero.taglineWord}
              mode="letters"
              wobble
              swashFirst
              show={ready}
              delay={0.4}
              stagger={0.06}
              className="block font-display text-[clamp(5.2rem,21vw,23rem)] font-black leading-[0.82] tracking-[-0.045em] text-paper [text-shadow:0.04em_0.04em_0_var(--color-diva)]"
            />
          </span>
          <span className="rise mt-3 inline-block" style={delay(0.9)}>
            <TornLabel className="rotate-1 px-5 py-2.5 text-sm sm:text-base">{hero.taglineTail}</TornLabel>
          </span>
        </p>

        <div className="mt-8 grid items-end gap-8 lg:mt-auto lg:grid-cols-[1fr_auto_1fr]">
          <p className="rise max-w-[44ch] text-base leading-relaxed text-paper/90 sm:text-lg" style={delay(1)}>
            {hero.intro}
          </p>

          <div className="rise flex flex-wrap justify-center gap-4" style={delay(1.1)}>
            <Magnetic>
              <a
                href={hero.ctas.watch.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-label="YouTube"
                className="inline-flex items-center gap-3 rounded-full border-2 border-ink bg-paper px-7 py-4 font-body text-lg font-extrabold uppercase tracking-wide text-ink shadow-[5px_5px_0_var(--color-ink)] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                  <path d="M7 4.5v15l12-7.5-12-7.5Z" fill="currentColor" />
                </svg>
                {hero.ctas.watch.label}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={hero.ctas.listen.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-label="Spotify"
                className="inline-flex items-center gap-3 rounded-full border-2 border-ink bg-diva px-7 py-4 font-body text-lg font-extrabold uppercase tracking-wide text-ink shadow-[5px_5px_0_var(--color-ink)] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                  <path
                    fill="currentColor"
                    d="M12 3a7 7 0 0 0-7 7v5a3 3 0 0 0 3 3h1v-7H7v-1a5 5 0 0 1 10 0v1h-2v7h1a3 3 0 0 0 3-3v-5a7 7 0 0 0-7-7Z"
                  />
                </svg>
                {hero.ctas.listen.label}
              </a>
            </Magnetic>
          </div>

          <a
            href="#story"
            className="rise hidden items-center gap-3 justify-self-end font-body text-xs font-bold uppercase tracking-[0.3em] lg:flex"
            style={delay(1.2)}
          >
            {hero.scrollCue}
            <span aria-hidden className="animate-bob text-lg">
              ↓
            </span>
          </a>
        </div>
      </div>

      {/* Polaroid of the hosts: GSAP moves the wrapper, CSS the card. */}
      <div data-hero-photo className="absolute right-[3vw] top-[20vh] z-10 hidden w-[min(27vw,440px)] xl:block">
        <div className="pop-in relative bg-paper p-3 pb-10 shadow-[10px_10px_0_var(--color-ink)]">
          <ImageSlot image={images.hero} priority hover sizes="440px" />
          <span className="absolute bottom-2.5 left-0 right-0 text-center font-display text-lg italic text-ink">
            {hero.polaroid}
          </span>
        </div>
      </div>

      <div className="relative mx-auto -mt-2 mb-12 w-[min(90vw,520px)] rotate-2 bg-paper p-3 pb-10 shadow-[8px_8px_0_var(--color-ink)] xl:hidden">
        <ImageSlot image={images.hero} hover sizes="(min-width: 640px) 520px, 90vw" />
        <span className="absolute bottom-2.5 left-0 right-0 text-center font-display text-lg italic text-ink">
          {hero.polaroid}
        </span>
      </div>

      <Sticker bounds={ref} variant="burst" rotate={-12} className="left-[3vw] top-[30vh] hidden text-spot md:block">
        {hero.stickers[0]}
      </Sticker>
      <Sticker bounds={ref} variant="torn" rotate={5} className="left-[8vw] top-[64vh] hidden lg:block">
        {hero.stickers[1]}
      </Sticker>
      <Sticker bounds={ref} variant="circle" rotate={0} className="right-[6vw] top-[68vh] hidden md:block">
        {hero.stickers[2]}
      </Sticker>
    </section>
  );
}
