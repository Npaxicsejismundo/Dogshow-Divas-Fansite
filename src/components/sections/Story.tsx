import { motion } from 'framer-motion';
import { useRef } from 'react';
import { story, type Milestone } from '../../content';
import { cn } from '../../lib/hooks';
import { gsap, useScrollFx } from '../../lib/scroll';
import { toneClass } from '../../lib/tones';
import { ImageSlot } from '../ui/ImageSlot';
import { SectionHeading } from '../ui/SectionHeading';

function MilestoneCard({ m, index }: { m: Milestone; index: number }) {
  const tilt = index % 2 === 0 ? '-rotate-1' : 'rotate-1';
  return (
    <li data-milestone className="relative shrink-0 pl-10 md:w-[min(78vw,440px)] md:pl-0">
      {/* Dot on the vertical (mobile) line */}
      <span aria-hidden className="absolute left-[9px] top-8 h-4 w-4 rounded-full border-2 border-ink bg-diva md:hidden" />
      {/* IntersectionObserver sees the transformed track, so cards pop in sideways on desktop too. */}
      <motion.article
        initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -8 : 8 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
        className={cn(
          'relative flex flex-col overflow-hidden border-2 border-ink shadow-[8px_8px_0_var(--color-ink)] md:h-[min(66vh,560px)]',
          m.tone === 'curtain' ? 'curtain-folds text-paper' : toneClass[m.tone],
          tilt,
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b-2 border-current px-5 py-3">
          <span className="font-body text-xs font-extrabold uppercase tracking-[0.2em]">{String(index + 1).padStart(2, '0')}</span>
          <span className="torn bg-paper px-3 py-1 font-body text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-ink">
            {m.tag}
          </span>
        </div>
        {m.image && (
          <ImageSlot image={m.image} aspect="16 / 9" hover placeholderTone={m.tone === 'curtain' ? 'ink' : 'curtain'} sizes="440px" />
        )}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <time className="font-display text-[clamp(2rem,3.3vw,3rem)] font-black italic leading-[0.95] tracking-[-0.03em]">
            {m.date}
          </time>
          <h3 className="mt-3 font-body text-xl font-extrabold uppercase leading-tight tracking-wide">{m.title}</h3>
          <p className="mt-3 text-[0.98rem] leading-relaxed opacity-90">{m.body}</p>
        </div>
      </motion.article>
    </li>
  );
}

/** Pinned horizontal timeline on desktop, drawn vertical line on mobile. */
export function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useScrollFx(sectionRef, () => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track || !progress) return;
    const mm = gsap.matchMedia();

    // One trigger pins the section, slides the track and fills the bar.
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            progress.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
    });

    mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: track, start: 'top 75%', end: 'bottom 75%', scrub: true } },
      );
    });

    return () => mm.revert();
  });

  return (
    <section
      id="story"
      ref={sectionRef}
      tabIndex={-1}
      aria-labelledby="story-title"
      className="relative overflow-hidden bg-paper pb-20 pt-24 text-ink outline-none md:flex md:h-[100svh] md:flex-col md:justify-center md:py-0 md:motion-reduce:h-auto md:motion-reduce:py-24"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-8 md:hidden">
        <SectionHeading kicker={story.kicker} title={story.title} intro={story.intro} labelTone="ink" />
      </div>

      {/* Without motion the desktop track simply scrolls sideways. */}
      <div className="relative mt-12 md:mt-0 md:motion-reduce:overflow-x-auto md:motion-reduce:py-6">

        <span aria-hidden ref={lineRef} className="absolute bottom-0 left-[calc(1rem+15px)] top-0 w-0.5 origin-top bg-ink md:hidden" />
        <ol
          ref={trackRef}
          className="relative flex flex-col gap-10 px-4 sm:px-8 md:w-max md:flex-row md:items-center md:gap-12 md:pl-[6vw] md:pr-[12vw]"
        >
          <li className="hidden w-[min(42vw,620px)] shrink-0 md:block">
            <SectionHeading kicker={story.kicker} title={story.title} intro={story.intro} id="story-title" labelTone="ink" />
            <p className="mt-10 font-body text-xs font-bold uppercase tracking-[0.3em]">Scroll →</p>
          </li>
          {story.milestones.map((m, i) => (
            <MilestoneCard key={m.date} m={m} index={i} />
          ))}
          <li className="shrink-0 pl-10 md:w-[min(60vw,560px)] md:pl-0">
            <p className="font-display text-[clamp(3rem,7vw,6.5rem)] font-black italic leading-[0.9] tracking-[-0.03em]">
              {story.outro.title}
            </p>
            <p className="mt-4 font-body text-lg font-extrabold uppercase tracking-[0.14em] text-curtain">{story.outro.body}</p>
          </li>
        </ol>
      </div>

      <div aria-hidden className="absolute inset-x-4 bottom-8 hidden h-1.5 bg-ink/10 sm:inset-x-8 md:block motion-reduce:md:hidden">
        <div ref={progressRef} className="h-full origin-left bg-diva" style={{ transform: 'scaleX(0)' }} />
      </div>
    </section>
  );
}
