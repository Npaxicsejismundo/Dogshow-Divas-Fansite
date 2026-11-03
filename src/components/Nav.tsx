import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, type MouseEvent } from 'react';
import { nav, site } from '../content';
import { scrollToHash, useLenis } from '../lib/scroll';
import { Logo } from './ui/Logo';

export function Nav() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.classList.toggle('overflow-hidden', open);
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    // Wait a frame so Lenis is running again before it scrolls.
    requestAnimationFrame(() => scrollToHash(href, lenis));
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80] mix-blend-difference">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-4 px-4 py-4 text-paper sm:px-8">
          <a href="#top" onClick={(e) => go(e, '#top')} className="flex items-center gap-3">
            <span className="block w-24 sm:w-28">
              <Logo tone="light" compact />
            </span>
            <span className="hidden font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] sm:inline">
              {site.fanBadge}
            </span>
          </a>

          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => go(e, item.href)}
                    className="group relative font-body text-sm font-bold uppercase tracking-[0.12em]"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-right scale-x-0 bg-paper transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="rounded-full border-2 border-paper px-4 py-1.5 font-body text-xs font-extrabold uppercase tracking-[0.16em] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="curtain-folds fixed inset-0 z-[79] flex flex-col justify-center px-6 text-paper lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Sections (mobile)">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.a
                      href={item.href}
                      onClick={(e) => go(e, item.href)}
                      className="block font-display text-[clamp(2.8rem,13vw,5rem)] font-black italic leading-[1.05]"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.15 + i * 0.05, type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
