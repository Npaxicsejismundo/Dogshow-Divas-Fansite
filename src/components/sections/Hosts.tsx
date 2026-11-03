import { LayoutGroup, motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { friends, hosts, hostsSection, versus, type FlipFact, type Host } from '../../content';
import { cn } from '../../lib/hooks';
import { gsap, useScrollFx } from '../../lib/scroll';
import { toneClass } from '../../lib/tones';
import { ImageSlot } from '../ui/ImageSlot';
import { Magnetic } from '../ui/Magnetic';
import { SectionHeading } from '../ui/SectionHeading';
import { SplitText } from '../ui/SplitText';
import { Sticker } from '../ui/Sticker';
import { TornLabel } from '../ui/TornLabel';

function FlipCard({ fact, hint, index }: { fact: FlipFact; hint: string; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={() => setFlipped((v) => !v)}
      data-cursor-label={flipped ? 'Balik' : 'Flip'}
      className="relative h-36 text-left [perspective:1100px] sm:h-40"
    >
      <span className="sr-only">
        {fact.front}: {fact.back}
      </span>
      <motion.span
        aria-hidden
        className="absolute inset-0 block [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 20 }}
      >
        <span className="absolute inset-0 flex flex-col justify-between border-2 border-ink bg-paper p-4 text-ink shadow-[5px_5px_0_var(--color-ink)] [backface-visibility:hidden]">
          <span className="font-body text-[0.65rem] font-extrabold uppercase tracking-[0.2em] opacity-60">
            Fun fact {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-display text-2xl font-black italic leading-[1] sm:text-[1.7rem]">{fact.front}</span>
          <span className="font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-diva">{hint} ↻</span>
        </span>
        <span className="absolute inset-0 flex items-center border-2 border-ink bg-spot p-4 text-ink shadow-[5px_5px_0_var(--color-ink)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="font-body text-[0.98rem] font-semibold leading-snug">{fact.back}</span>
        </span>
      </motion.span>
    </button>
  );
}

/** Keeps a tall sticky chapter scrolling until its bottom is in view. */
function useStickyTop<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`;
    };
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    update();
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);
  return ref;
}

function HostChapter({ host, hint, flip }: { host: Host; hint: string; flip: boolean }) {
  const ref = useStickyTop<HTMLElement>();
  const onCurtain = host.tone === 'curtain';

  return (
    <article
      ref={ref}
      id={`host-${host.id}`}
      data-chapter
      aria-labelledby={`host-${host.id}-name`}
      className={cn(
        'relative overflow-hidden lg:sticky lg:min-h-[100svh]',
        onCurtain ? 'curtain-folds text-paper' : toneClass[host.tone],
      )}
    >
      <div data-chapter-inner className="mx-auto grid max-w-[1800px] gap-10 px-4 py-20 sm:px-8 lg:min-h-[100svh] lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-24">
        <div className={cn('relative lg:col-span-5', flip && 'lg:order-2')}>
          <TornLabel className="absolute -top-4 left-4 z-10 -rotate-3">{host.chapter}</TornLabel>
          <div className={cn('border-2 border-ink bg-paper p-3 shadow-[12px_12px_0_var(--color-ink)]', flip ? 'rotate-2' : '-rotate-2')}>
            <ImageSlot
              image={host.portrait}
              hover
              aspect="4 / 5"
              placeholderTone={onCurtain ? 'diva' : 'curtain'}
              sizes="(min-width: 1024px) 38vw, 90vw"
            />
          </div>
          <Sticker
            bounds={ref}
            variant="burst"
            rotate={flip ? -10 : 12}
            className={cn('-bottom-8 text-spot', flip ? '-left-4' : '-right-4')}
          >
            {host.sticker}
          </Sticker>
        </div>

        <div className={cn('lg:col-span-7', flip && 'lg:order-1')}>
          <h3 id={`host-${host.id}-name`} className="font-display font-black leading-[0.8] tracking-[-0.045em]">
            <SplitText text={host.firstName} mode="letters" wobble swashFirst className="block text-[clamp(5rem,15vw,13rem)]" />
            <SplitText
              text={host.lastName}
              mode="letters"
              delay={0.2}
              className="block text-stroke text-[clamp(3.6rem,10vw,8.5rem)] italic"
            />
          </h3>
          <p className="mt-5 font-body text-sm font-extrabold uppercase tracking-[0.2em]">{host.role}</p>
          <p className="mt-4 max-w-[56ch] text-base leading-relaxed opacity-90 sm:text-lg">{host.intro}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {host.facts.map((fact, i) => (
              <FlipCard key={fact.front} fact={fact} hint={hint} index={i} />
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-3">
            {host.socials.map((s) => (
              <li key={s.href}>
                <Magnetic>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-5 py-2.5 font-body text-sm font-extrabold uppercase tracking-wide text-paper transition-colors hover:bg-paper hover:text-ink"
                  >
                    {s.label} <span aria-hidden>↗</span>
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

type Mode = 'baus' | 'vs' | 'macoy';

const columns: Record<Mode, string> = {
  vs: 'minmax(0,0.9fr) minmax(0,1.4fr) minmax(0,1.4fr)',
  baus: 'minmax(0,0.9fr) minmax(0,2.2fr) minmax(0,0.6fr)',
  macoy: 'minmax(0,0.9fr) minmax(0,0.6fr) minmax(0,2.2fr)',
};

function Versus() {
  const [mode, setMode] = useState<Mode>('vs');
  const modes: Mode[] = ['baus', 'vs', 'macoy'];

  return (
    <div className="mx-auto max-w-[1300px] px-4 sm:px-8">
      <SectionHeading kicker={versus.kicker} title={versus.title} align="center" labelTone="ink" />

      <LayoutGroup>
        <div
          role="radiogroup"
          aria-label={versus.kicker}
          className="mx-auto mt-10 flex w-fit rounded-full border-2 border-ink bg-paper p-1.5 shadow-[5px_5px_0_var(--color-ink)]"
        >
          {modes.map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              onClick={() => setMode(m)}
              className="relative rounded-full px-5 py-2.5 font-body text-sm font-extrabold uppercase tracking-[0.14em] sm:px-8"
            >
              {mode === m && (
                <motion.span
                  layoutId="versus-pill"
                  className={cn('absolute inset-0 rounded-full', m === 'baus' ? 'bg-curtain' : m === 'macoy' ? 'bg-diva' : 'bg-spot')}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className={cn('relative', mode === m && m === 'baus' && 'text-paper')}>{versus.options[m]}</span>
            </button>
          ))}
        </div>
      </LayoutGroup>

      <div aria-live="polite" className="mt-6 h-8 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-display text-xl italic sm:text-2xl"
          >
            {versus.captions[mode]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* A grid with table roles, so the columns can animate their widths. */}
      <div className="no-scrollbar mt-8 overflow-x-auto">
        <div role="table" aria-label={versus.title} className="min-w-[620px]">
          <div
            role="row"
            className="grid transition-[grid-template-columns] duration-500 ease-[var(--ease-diva)]"
            style={{ gridTemplateColumns: columns[mode] }}
          >
            <span role="columnheader" className="sr-only">
              Category
            </span>
            <span
              role="columnheader"
              className={cn(
                'curtain-folds col-start-2 border-2 border-ink px-4 py-4 font-display text-3xl font-black italic text-paper transition-opacity duration-500 sm:text-4xl',
                mode === 'macoy' && 'opacity-40',
              )}
            >
              Baus
            </span>
            <span
              role="columnheader"
              className={cn(
                'border-2 border-l-0 border-ink bg-diva px-4 py-4 font-display text-3xl font-black italic text-ink transition-opacity duration-500 sm:text-4xl',
                mode === 'baus' && 'opacity-40',
              )}
            >
              Macoy
            </span>
          </div>
          {versus.rows.map((row) => (
            <div
              key={row.label}
              role="row"
              className="grid border-b-2 border-ink transition-[grid-template-columns] duration-500 ease-[var(--ease-diva)]"
              style={{ gridTemplateColumns: columns[mode] }}
            >
              <span role="rowheader" className="px-2 py-4 font-body text-xs font-extrabold uppercase tracking-[0.18em] sm:text-sm">
                {row.label}
              </span>
              <span role="cell" className={cn('px-4 py-4 text-base font-semibold transition-opacity duration-500', mode === 'macoy' && 'opacity-35')}>
                {row.baus}
              </span>
              <span role="cell" className={cn('px-4 py-4 text-base font-semibold transition-opacity duration-500', mode === 'baus' && 'opacity-35')}>
                {row.macoy}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Friends() {
  return (
    <div className="mt-28">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-8">
        <TornLabel className="-rotate-2" tone="ink">
          {friends.kicker}
        </TornLabel>
        <h3 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-black italic leading-none tracking-[-0.03em]">
          {friends.title}
        </h3>
      </div>
      <ul className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 sm:px-8" tabIndex={0} aria-label={friends.kicker}>
        {friends.people.map((f, i) => (
          <li
            key={f.name}
            className={cn(
              'w-[220px] shrink-0 snap-start border-2 border-ink bg-paper p-3 shadow-[6px_6px_0_var(--color-ink)] transition-transform duration-300 hover:-translate-y-2 sm:w-[250px]',
              i % 2 ? 'rotate-1' : '-rotate-1',
            )}
          >
            <ImageSlot image={f.image} hover aspect="1 / 1" placeholderTone={i % 3 === 0 ? 'diva' : i % 3 === 1 ? 'curtain' : 'spot'} sizes="250px" />
            <p className="mt-3 font-display text-2xl font-black italic leading-none">{f.name}</p>
            <p className="mt-2 text-sm leading-snug opacity-80">{f.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Hosts() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // As the next chapter slides over, the previous one sinks back.
  useScrollFx(wrapRef, () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const chapters = gsap.utils.toArray<HTMLElement>('[data-chapter]', wrap);
      chapters.slice(0, -1).forEach((chapter, i) => {
        gsap.to(chapter.querySelector('[data-chapter-inner]'), {
          scale: 0.9,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: { trigger: chapters[i + 1], start: 'top bottom', end: 'top top', scrub: true },
        });
      });
    });
    return () => mm.revert();
  });

  return (
    <section id="hosts" tabIndex={-1} aria-labelledby="hosts-title" className="relative bg-paper text-ink outline-none">
      <div className="mx-auto max-w-[1800px] px-4 pb-16 pt-28 sm:px-8">
        <SectionHeading
          kicker={hostsSection.kicker}
          title={hostsSection.title}
          intro={hostsSection.intro}
          id="hosts-title"
          labelTone="ink"
        />
      </div>

      <div ref={wrapRef}>
        {hosts.map((host, i) => (
          <HostChapter key={host.id} host={host} hint={hostsSection.flipHint} flip={i % 2 === 1} />
        ))}
      </div>

      <div className="defer-render relative bg-paper py-28">
        <Versus />
        <Friends />
      </div>
    </section>
  );
}
