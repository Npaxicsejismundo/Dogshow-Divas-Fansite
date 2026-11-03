import { motion } from 'framer-motion';
import { listen } from '../../content';
import { cn } from '../../lib/hooks';
import { SectionHeading } from '../ui/SectionHeading';

const fill = {
  ink: 'before:bg-ink group-hover:text-paper group-focus-visible:text-paper',
  paper: 'before:bg-paper',
  curtain: 'before:bg-curtain group-hover:text-paper group-focus-visible:text-paper',
  diva: 'before:bg-diva',
  spot: 'before:bg-spot',
};

export function Listen() {
  return (
    <section id="listen" tabIndex={-1} aria-labelledby="listen-title" className="defer-render relative bg-paper py-28 text-ink outline-none">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-8">
        <SectionHeading kicker={listen.kicker} title={listen.title} id="listen-title" labelTone="ink" />
        <ul className="mt-14 border-t-2 border-ink">
          {listen.platforms.map((p, i) => (
            <motion.li
              key={p.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 160, damping: 20 }}
              className="border-b-2 border-ink"
            >
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-label="Go!"
                className="group relative block overflow-hidden outline-none"
              >
                <span
                  className={cn(
                    'relative flex items-center justify-between gap-4 px-2 py-5 transition-colors duration-300 sm:px-4 sm:py-7',
                    'before:absolute before:inset-0 before:origin-left before:scale-x-0 before:transition-transform before:duration-500 before:ease-[var(--ease-diva)] group-hover:before:scale-x-100 group-focus-visible:before:scale-x-100',
                    fill[p.tone],
                  )}
                >
                  <span className="relative flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                    <span className="font-display text-[clamp(2.4rem,7vw,6.5rem)] font-black italic leading-[0.9] tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-4">
                      {p.name}
                    </span>
                    <span className="font-body text-sm font-bold uppercase tracking-[0.16em] opacity-70">{p.handle}</span>
                  </span>
                  <span
                    aria-hidden
                    className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-current text-2xl transition-transform duration-500 group-hover:-rotate-45 sm:h-20 sm:w-20 sm:text-3xl"
                  >
                    →
                  </span>
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
