import { footer, marquee, site } from '../../content';
import { cn } from '../../lib/hooks';
import { scrollToHash, useLenis } from '../../lib/scroll';
import { Logo } from '../ui/Logo';
import { Magnetic } from '../ui/Magnetic';
import { Marquee } from '../ui/Marquee';

export function Footer() {
  const lenis = useLenis();
  return (
    <footer className="defer-render relative overflow-hidden bg-ink text-paper">
      <div className="border-y-4 border-paper bg-spot py-3 text-ink">
        <Marquee
          items={marquee.primary}
          duration={32}
          itemClassName="font-body text-[clamp(1rem,2.4vw,1.8rem)] font-extrabold uppercase tracking-[0.16em]"
        />
      </div>

      <div className="mx-auto max-w-[1800px] px-4 pb-10 pt-20 sm:px-8">
        <p className="font-display text-[clamp(3.4rem,12vw,12rem)] font-black italic leading-[0.85] tracking-[-0.04em]">
          {footer.signoff}
        </p>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="w-48">
              <Logo tone="light" />
            </div>
            <p className="mt-6 max-w-[46ch] text-base font-semibold leading-relaxed">{footer.disclaimer}</p>
            <p className="mt-2 text-sm text-paper/60">{footer.madeBy}</p>
          </div>

          <Magnetic strength={0.5}>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash('#top', lenis);
              }}
              className="grid h-28 w-28 place-items-center rounded-full border-2 border-paper bg-diva p-3 text-center font-body text-xs font-extrabold uppercase leading-tight tracking-[0.14em] text-ink shadow-[5px_5px_0_var(--color-paper)]"
            >
              ↑<br />
              {footer.backToTop}
            </a>
          </Magnetic>
        </div>

        <section aria-labelledby="credits-title" className="mt-16 border-t border-paper/20 pt-10">
          <h2 id="credits-title" className="font-body text-xs font-extrabold uppercase tracking-[0.2em] text-paper/60">
            {footer.creditsTitle}
          </h2>
          {/* Long groups take two columns and split their list, so the columns stay even. */}
          <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            {footer.credits.map((group) => {
              const wide = group.items.length > 4;
              return (
                <div key={group.group} className={cn(wide && 'sm:col-span-2')}>
                  <h3 className="font-display text-xl font-black italic text-spot">{group.group}</h3>
                  <ul className={cn('mt-3 space-y-3 text-sm leading-snug', wide && 'sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-3 sm:space-y-0')}>
                    {group.items.map((item) => (
                      <li key={item.subject}>
                        <p className="font-semibold text-paper">{item.subject}</p>
                        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-paper/60">
                          {item.href ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline-offset-2 transition-colors hover:text-spot hover:underline"
                            >
                              {item.by} <span aria-hidden>↗</span>
                              <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                          ) : (
                            <span>{item.by}</span>
                          )}
                          {item.license && (
                            <span className="rounded-full border border-paper/25 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-paper/70">
                              {item.license}
                            </span>
                          )}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <p className="mt-16 border-t border-paper/20 pt-6 font-body text-xs uppercase tracking-[0.2em] text-paper/50">
          {site.fanBadge} · {site.tagline}
        </p>
      </div>
    </footer>
  );
}
