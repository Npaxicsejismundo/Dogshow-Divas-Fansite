import { motion } from 'framer-motion';
import { useRef } from 'react';
import { liveShows, type LiveShow } from '../../content';
import { cn } from '../../lib/hooks';
import { toneClass } from '../../lib/tones';
import { ImageSlot } from '../ui/ImageSlot';
import { SectionHeading } from '../ui/SectionHeading';
import { Sticker } from '../ui/Sticker';

const tilts = [-3, 2, -1.5, 3];

function Poster({ show, index }: { show: LiveShow; index: number }) {
  const tilt = tilts[index % tilts.length];
  return (
    <motion.li
      initial={{ opacity: 0, y: 80, rotate: tilt * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      whileHover={{ rotate: 0, y: -10, scale: 1.02 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      className="group relative"
    >
      <article
        className={cn(
          'relative flex h-full flex-col border-2 border-ink p-3 shadow-[10px_10px_0_var(--color-ink)]',
          show.tone === 'curtain' ? 'curtain-folds text-paper' : toneClass[show.tone],
        )}
      >
        <div className="relative">
          <ImageSlot
            image={show.image}
            hover
            aspect="3 / 4"
            fit={show.imageFit}
            placeholderTone={show.tone === 'ink' ? 'diva' : 'ink'}
            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 90vw"
          />
          {show.stamp && (
            <span className="absolute right-3 top-3 grid h-20 w-20 rotate-12 place-items-center rounded-full border-[3px] border-diva bg-paper/90 text-center font-body text-[0.65rem] font-extrabold uppercase leading-tight tracking-wide text-diva shadow-[3px_3px_0_var(--color-ink)]">
              {show.stamp}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
          <p className="font-body text-[0.7rem] font-extrabold uppercase tracking-[0.2em] opacity-75">{show.kind}</p>
          <h3 className="mt-1 font-display text-[clamp(2rem,3vw,2.8rem)] font-black italic leading-[0.9] tracking-[-0.03em]">{show.title}</h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed opacity-90">{show.blurb}</p>
          <div className="rule-didone mt-auto flex items-end justify-between gap-3 pt-5">
            <time className="font-display text-xl font-black">{show.date}</time>
            <span className="text-right font-body text-xs font-bold uppercase tracking-[0.12em]">{show.venue}</span>
          </div>
        </div>
      </article>
    </motion.li>
  );
}

export function LiveShows() {
  const ref = useRef<HTMLElement>(null);
  return (
    <section
      id="live"
      ref={ref}
      tabIndex={-1}
      aria-labelledby="live-title"
      className="curtain-folds defer-render relative overflow-hidden py-28 text-paper outline-none"
    >
      {/* Two stage spotlights */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(40rem 60rem at 15% -10%, rgb(255 225 74 / 0.22), transparent 60%), radial-gradient(40rem 60rem at 85% -10%, rgb(255 46 136 / 0.2), transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-[1800px] px-4 sm:px-8">
        <SectionHeading kicker={liveShows.kicker} title={liveShows.title} intro={liveShows.intro} id="live-title" />
        <ul className="mt-16 grid gap-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
          {liveShows.items.map((show, i) => (
            <Poster key={show.title} show={show} index={i} />
          ))}
        </ul>
      </div>
      <Sticker bounds={ref} variant="torn" rotate={-4} className="right-[5vw] top-24 hidden lg:block">
        Front row = roasted
      </Sticker>
    </section>
  );
}
