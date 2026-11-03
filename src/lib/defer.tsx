import { useEffect, useState, type ReactNode } from 'react';
import { useIntro } from './intro';

interface Props {
  children: ReactNode;
  /** Mount order after the intro; lower mounts first. */
  order: number;
  /** Section id, kept on the placeholder so nav links still land. */
  id: string;
  /** Rough height so the scrollbar doesn't jump much when it mounts. */
  minHeight?: string;
}

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

/**
 * Mounts a below-the-fold section in its own idle task once the intro has
 * lifted, so the first render only builds what the visitor can see.
 */
export function Deferred({ children, order, id, minHeight = '100svh' }: Props) {
  const { ready } = useIntro();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!ready || mounted) return;
    const w = window as IdleWindow;
    let idle = 0;
    const timer = window.setTimeout(() => {
      const mount = () => setMounted(true);
      idle = w.requestIdleCallback ? w.requestIdleCallback(mount, { timeout: 1200 }) : window.setTimeout(mount, 1);
    }, order * 90);
    return () => {
      window.clearTimeout(timer);
      if (idle) (w.cancelIdleCallback ?? window.clearTimeout)(idle);
    };
  }, [ready, mounted, order]);

  if (mounted) return <>{children}</>;
  return <div id={id} aria-hidden style={{ minHeight }} />;
}
