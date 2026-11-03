import { marquee } from '../../content';
import { Marquee } from '../ui/Marquee';

/** Two crossing tape strips of the show's slang. */
export function SlangMarquee() {
  return (
    <section aria-label="Dogshow slang" className="relative z-10 -my-10 overflow-hidden py-14 sm:-my-14 sm:py-20">
      <div className="-rotate-3 scale-x-110 border-y-4 border-ink bg-diva py-3 text-ink sm:py-4">
        <Marquee
          items={marquee.primary}
          duration={26}
          itemClassName="font-display text-[clamp(2.2rem,6vw,5.5rem)] font-black italic leading-none tracking-[-0.02em]"
        />
      </div>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-2 scale-x-110 border-y-4 border-paper bg-ink py-2 text-paper sm:py-3">
        <Marquee
          items={marquee.secondary}
          duration={30}
          reverse
          itemClassName="font-body text-[clamp(1rem,2.2vw,1.6rem)] font-extrabold uppercase tracking-[0.18em]"
        />
      </div>
    </section>
  );
}
