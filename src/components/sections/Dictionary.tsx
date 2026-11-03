import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, type PointerEvent } from 'react';
import { dictionary, type DictionaryEntry } from '../../content';
import { cn, useFinePointer, usePrefersReducedMotion } from '../../lib/hooks';
import { toneClass } from '../../lib/tones';
import { Magnetic } from '../ui/Magnetic';
import { SectionHeading } from '../ui/SectionHeading';
import { Sticker } from '../ui/Sticker';

function EntryCard({ entry, index }: { entry: DictionaryEntry; index: number }) {
  const [open, setOpen] = useState(false);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const panelId = `dict-${index}`;

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!fine || reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.li layout transition={{ type: 'spring', stiffness: 260, damping: 26 }} className="[perspective:1000px]">
      <motion.article
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry }}
        className={cn(
          'relative flex h-full flex-col border-2 border-ink shadow-[8px_8px_0_var(--color-ink)]',
          entry.tone === 'curtain' ? 'curtain-folds text-paper' : toneClass[entry.tone],
        )}
      >
        <div className="flex items-center justify-between border-b-2 border-current px-5 py-2.5 font-body text-[0.7rem] font-extrabold uppercase tracking-[0.2em]">
          <span>No. {String(index + 1).padStart(2, '0')}</span>
          <span className="font-display text-sm normal-case italic tracking-normal">{entry.pos}</span>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-black italic leading-[0.9] tracking-[-0.03em]">
            {entry.term}
          </h3>
          <p className="mt-1 font-body text-sm font-semibold opacity-85">/{entry.syllables}/</p>
          <p className="mt-4 text-lg font-semibold leading-snug">{entry.meaning}</p>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                key="example"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.2, 0.9, 0.1, 1] }}
                className="overflow-hidden"
              >
                <div className="rule-didone mt-5 pt-4">
                  <p className="font-body text-[0.65rem] font-extrabold uppercase tracking-[0.2em] opacity-70">{dictionary.exampleLabel}</p>
                  <p className="mt-2 font-display text-xl italic leading-snug">{entry.example}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="mt-auto self-start pt-5"
            data-cursor-label={open ? 'Close' : 'Use it'}
          >
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-4 py-2 font-body text-xs font-extrabold uppercase tracking-[0.14em] text-ink">
              {open ? 'Got it' : 'Use it in a sentence'}
              <motion.span aria-hidden animate={{ rotate: open ? 45 : 0 }} className="text-base leading-none">
                +
              </motion.span>
            </span>
          </button>
        </div>
      </motion.article>
    </motion.li>
  );
}

export function Dictionary() {
  const ref = useRef<HTMLElement>(null);
  const [order, setOrder] = useState(() => dictionary.entries.map((_, i) => i));

  const shuffle = () =>
    setOrder((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    });

  return (
    <section
      id="dictionary"
      ref={ref}
      tabIndex={-1}
      aria-labelledby="dictionary-title"
      className="defer-render relative overflow-hidden bg-spot py-28 text-ink outline-none"
    >
      <div className="mx-auto max-w-[1800px] px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading kicker={dictionary.kicker} title={dictionary.title} intro={dictionary.intro} id="dictionary-title" />
          <Magnetic className="self-start lg:self-end">
            <button
              type="button"
              onClick={shuffle}
              className="inline-flex items-center gap-3 rounded-full border-2 border-ink bg-ink px-6 py-3.5 font-body text-sm font-extrabold uppercase tracking-[0.14em] text-paper shadow-[5px_5px_0_var(--color-diva)]"
            >
              <span aria-hidden>⤨</span> {dictionary.shuffle}
            </button>
          </Magnetic>
        </div>

        <ul className="mt-14 grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
          {order.map((i) => (
            <EntryCard key={dictionary.entries[i].term} entry={dictionary.entries[i]} index={i} />
          ))}
        </ul>
      </div>

      <Sticker bounds={ref} variant="pill" rotate={8} className="right-[6vw] top-16 hidden md:block">
        Certified doglet ✦
      </Sticker>
    </section>
  );
}
