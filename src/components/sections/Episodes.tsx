import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useState } from 'react';
import { episodes, type Episode, type Tone } from '../../content';
import { cn } from '../../lib/hooks';
import { LiteYouTube } from '../ui/LiteYouTube';
import { Magnetic } from '../ui/Magnetic';
import { SectionHeading } from '../ui/SectionHeading';

const posterTones: Tone[] = ['curtain', 'diva', 'spot', 'paper'];
const SOLO = '__solo__';
const ALL = '__all__';
const OTHERS = '__others__';

function EpisodeCard({ ep, tone, badge }: { ep: Episode; tone: Tone; badge?: string }) {
  const people = [...ep.hosts, ...ep.guests];
  return (
    <article className="flex h-full flex-col border-2 border-paper/90 bg-ink">
      <LiteYouTube id={ep.youtubeId} title={ep.title} tone={tone} thumb={ep.thumb} badge={badge ?? ep.date} playLabel={episodes.playLabel} />
      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <h3 className="font-display text-2xl font-black italic leading-tight">{ep.title}</h3>
        {people.length > 0 && <p className="text-sm leading-snug text-paper/75">with {people.join(', ')}</p>}
        <p className="mt-auto flex items-center gap-3 pt-2 font-body text-xs font-bold uppercase tracking-[0.16em] text-paper/60">
          <span>{ep.duration}</span>
          {ep.date && badge && <span>· {ep.date}</span>}
        </p>
      </div>
    </article>
  );
}

function SpotifyPlayer() {
  const [load, setLoad] = useState(false);
  const { spotify } = episodes;
  return (
    <div className="border-2 border-paper bg-diva p-5 text-ink shadow-[8px_8px_0_var(--color-spot)] sm:p-7">
      <h3 className="font-display text-3xl font-black italic leading-none sm:text-4xl">{spotify.title}</h3>
      <p className="mt-3 max-w-[40ch] leading-relaxed">{spotify.body}</p>
      <div className="mt-5 min-h-[152px]">
        {load ? (
          <iframe
            title="Dogshow Divas on Spotify"
            src={`https://open.spotify.com/embed/show/${spotify.showId}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="block rounded-xl border-0"
          />
        ) : (
          <Magnetic>
            <button
              type="button"
              onClick={() => setLoad(true)}
              className="inline-flex items-center gap-3 rounded-full border-2 border-ink bg-ink px-6 py-3.5 font-body text-sm font-extrabold uppercase tracking-[0.14em] text-paper"
            >
              <span aria-hidden>▶</span> {spotify.button}
            </button>
          </Magnetic>
        )}
      </div>
    </div>
  );
}

export function Episodes() {
  const [filter, setFilter] = useState(ALL);

  // Named chips only for the regulars; everyone else shares one "other guests" chip.
  const named = episodes.filterGuests;
  const hasOthers = (ep: Episode) => ep.guests.some((g) => !named.includes(g));

  const visible = episodes.items.filter((ep) => {
    if (filter === ALL) return true;
    if (filter === SOLO) return ep.guests.length === 0;
    if (filter === OTHERS) return hasOthers(ep);
    return ep.guests.includes(filter);
  });

  const chips = [
    { value: ALL, label: episodes.allLabel },
    { value: SOLO, label: episodes.soloLabel },
    ...named.map((g) => ({ value: g, label: g })),
    ...(episodes.items.some(hasOthers) ? [{ value: OTHERS, label: episodes.othersLabel }] : []),
  ];

  return (
    <section id="episodes" tabIndex={-1} aria-labelledby="episodes-title" className="defer-render relative bg-ink py-28 text-paper outline-none">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-8">
        <SectionHeading kicker={episodes.kicker} title={episodes.title} intro={episodes.intro} id="episodes-title" />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative">
            <span className="torn absolute -top-4 left-4 z-10 -rotate-2 bg-spot px-4 py-1.5 font-body text-xs font-extrabold uppercase tracking-[0.16em] text-ink">
              {episodes.featured.note}
            </span>
            <EpisodeCard ep={episodes.featured} tone="curtain" badge="Episode Zero" />
          </div>
          <SpotifyPlayer />
        </div>

        <div className="mt-16">
          <p id="episode-filter-label" className="font-body text-xs font-extrabold uppercase tracking-[0.2em] text-paper/70">
            {episodes.filterLabel}
          </p>
          <LayoutGroup>
            <div role="group" aria-labelledby="episode-filter-label" className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-2">
              {chips.map((chip) => {
                const active = filter === chip.value;
                return (
                  <button
                    key={chip.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(chip.value)}
                    className={cn(
                      'relative shrink-0 rounded-full border-2 px-4 py-2 font-body text-sm font-bold transition-colors',
                      active ? 'border-spot text-ink' : 'border-paper/40 text-paper hover:border-paper',
                    )}
                  >
                    {active && (
                      <motion.span layoutId="episode-chip" className="absolute inset-0 rounded-full bg-spot" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />
                    )}
                    <span className="relative">{chip.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length} episodes shown
        </p>
        <motion.ul layout className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((ep) => (
              <motion.li
                key={ep.youtubeId}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              >
                <EpisodeCard ep={ep} tone={posterTones[episodes.items.indexOf(ep) % posterTones.length]} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <div className="mt-12 flex justify-center">
          <Magnetic>
            <a
              href={episodes.moreHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border-2 border-paper px-7 py-4 font-body text-base font-extrabold uppercase tracking-[0.12em] transition-colors hover:bg-paper hover:text-ink"
            >
              {episodes.moreLabel} <span aria-hidden>↗</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
