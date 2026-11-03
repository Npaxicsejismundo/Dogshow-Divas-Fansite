import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/** Fonts the first screen needs; preloading them avoids a second full layout when they swap in. */
const CRITICAL_FONTS = [
  'bodoni-moda-latin-wght-normal',
  'bodoni-moda-latin-wght-italic',
  'bricolage-grotesque-latin-wght-normal',
];

function preloadFonts(): Plugin {
  return {
    name: 'preload-critical-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        if (!ctx.bundle) return;
        return Object.keys(ctx.bundle)
          .filter((file) => file.endsWith('.woff2') && CRITICAL_FONTS.some((name) => file.includes(`${name}-`)))
          .map((file) => ({
            tag: 'link',
            attrs: { rel: 'preload', href: `/${file}`, as: 'font', type: 'font/woff2', crossorigin: '' },
            injectTo: 'head' as const,
          }));
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadFonts()],
  build: {
    target: 'es2020',
  },
});
