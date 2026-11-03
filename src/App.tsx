import { MotionConfig } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { Nav } from './components/Nav';
import { Dictionary } from './components/sections/Dictionary';
import { Episodes } from './components/sections/Episodes';
import { Footer } from './components/sections/Footer';
import { Hero } from './components/sections/Hero';
import { Hosts } from './components/sections/Hosts';
import { Listen } from './components/sections/Listen';
import { LiveShows } from './components/sections/LiveShows';
import { SlangMarquee } from './components/sections/SlangMarquee';
import { Story } from './components/sections/Story';
import { Cursor } from './components/ui/Cursor';
import { Grain } from './components/ui/Grain';
import { Loader } from './components/ui/Loader';
import { Deferred } from './lib/defer';
import { IntroContext } from './lib/intro';
import { SmoothScroll, useLenis } from './lib/scroll';

function Page() {
  const [ready, setReady] = useState(false);
  const lenis = useLenis();

  // Hold the page still until the curtain lifts.
  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', !ready);
    if (ready) lenis?.start();
    else lenis?.stop();
  }, [ready, lenis]);

  const open = useCallback(() => setReady(true), []);

  return (
    <IntroContext.Provider value={{ ready }}>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[110] -translate-y-24 rounded-full bg-spot px-5 py-3 font-body font-extrabold text-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <Loader onOpen={open} />
      <Nav />
      <main id="main">
        <Hero />
        <SlangMarquee />
        <Deferred order={0} id="story">
          <Story />
        </Deferred>
        <Deferred order={1} id="hosts" minHeight="300svh">
          <Hosts />
        </Deferred>
        <Deferred order={2} id="dictionary">
          <Dictionary />
        </Deferred>
        <Deferred order={3} id="episodes" minHeight="200svh">
          <Episodes />
        </Deferred>
        <Deferred order={4} id="live">
          <LiveShows />
        </Deferred>
        <Deferred order={5} id="listen">
          <Listen />
        </Deferred>
      </main>
      <Deferred order={6} id="footer">
        <Footer />
      </Deferred>
      <Cursor />
      <Grain />
    </IntroContext.Provider>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <Page />
      </SmoothScroll>
    </MotionConfig>
  );
}
