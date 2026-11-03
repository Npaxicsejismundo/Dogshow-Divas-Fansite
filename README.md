# Dogshow Divas — Fan Site

A one-page fan site for **Dogshow Divas**, the unscripted Taglish comedy podcast
from Baus Rufo and Macoy Dubs.

> Fan site created by NaviLeiru. Not affiliated with Dogshow Divas or J+ Productions.

Built with React 18, Vite, TypeScript, Tailwind CSS v4, Framer Motion, GSAP
ScrollTrigger and Lenis.

---

## 1. Setup

You need **Node 20.19+ or 22.12+**.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Type-check, then build to `dist/` |
| `npm run preview` | Serve the production build at http://localhost:4173 |
| `npm run typecheck` | Type-check only |

---

## 2. Editing content (`src/content.ts`)

Every word, link and image path is in **`src/content.ts`**. Components only
read from it, so you never need to open a component to change copy.

The file is split by section, in page order:

| Export | Section |
|---|---|
| `images` | Every image slot (path, alt text, size) |
| `links` | Official YouTube, Spotify, Apple, Instagram, TikTok, Facebook URLs |
| `site`, `nav`, `loader` | Name, tagline, menu labels, loading screen text |
| `hero` | Eyebrow labels, the split tagline, intro, Watch/Listen buttons, stickers |
| `marquee` | The two slang strips |
| `story` | Timeline milestones (`date`, `title`, `body`, `tag`, `tone`, optional `image`) |
| `hostsSection`, `hosts` | The two host chapters: intro, role, flip-card facts, socials |
| `versus` | Baus vs. Macoy rows and the toggle captions |
| `friends` | “Friends of the show” cards |
| `dictionary` | Slang cards (`term`, `pos`, `syllables`, `meaning`, `example`) |
| `episodes` | Featured “Episode Zero”, the episode grid, Spotify show ID |
| `liveShows` | Poster cards |
| `listen` | Platform rows |
| `footer` | Sign-off, disclaimer, photo credits |

Common edits:

- **Add an episode:** copy a line in `episodes.items`. The `youtubeId` is the
  part after `v=` in a YouTube link. Put guest names in `guests`; the guest
  filter builds itself from them. Leave `guests: []` for a Baus-and-Macoy-only
  episode.
- **Add a timeline milestone:** add an object to `story.milestones`. `tone`
  picks the card colour: `'paper' | 'ink' | 'curtain' | 'diva' | 'spot'`.
- **Add a host social link:** add `{ label, href }` to that host's `socials`.
  Only handles we could confirm are filled in (TikTok `@heyitsbaus`, Instagram
  `@macoydubs`); add any others you know are official.
- **Change colours:** edit the six hex values at the top of
  `src/styles/index.css` (`--color-ink`, `--color-paper`, `--color-curtain`,
  `--color-curtain-deep`, `--color-diva`, `--color-spot`). Tailwind classes
  like `bg-curtain` and `text-diva` follow automatically.
- **Loader text:** change `loader` in `content.ts` *and* the one line inside
  `<div id="boot">` in `index.html` (that static copy paints before any
  JavaScript runs).

---

## 3. Image slots

Put files in **`public/images/`** with these exact names. Until a file is
there, each slot shows a styled placeholder with its filename and alt text, at
the final size, so nothing jumps when you add photos. The same list is in
`public/images/SLOTS.md`.

| File | Where it shows | Suggested size |
|---|---|---|
| `logo.png` | Loader, hero, nav, footer | 1600 × 800, black wordmark on transparent or white |
| `hero.jpg` | Hero polaroid | 1200 × 1500 (4:5) |
| `og-image.jpg` | Link previews | 1200 × 630 |
| `story-episode-zero.jpg` | Timeline: Episode Zero | 1600 × 900 |
| `story-pilot.jpg` | Timeline: the pilot | 1600 × 900 |
| `story-market-market.jpg` | Timeline: Market! Market! | 1600 × 900 |
| `story-famas.jpg` | Timeline: FAMAS | 1600 × 900 |
| `baus-portrait.jpg` | Baus chapter | 1200 × 1500 |
| `macoy-portrait.jpg` | Macoy chapter | 1200 × 1500 |
| `friend-tuesday-vargas.jpg` | Friends strip | 800 × 800 |
| `guest-joy-barcoma.jpg` | Friends strip | 800 × 800 |
| `guest-pitik-queen.jpg` | Friends strip | 800 × 800 |
| `guest-vicki-belo.jpg` | Friends strip | 800 × 800 |
| `guest-nadine-lustre.jpg` | Friends strip | 800 × 800 |
| `guest-fonz.jpg` | Friends strip | 800 × 800 |
| `guest-dimples-romana.jpg` | Friends strip | 800 × 800 |
| `guest-valeen-montenegro.jpg` | Friends strip | 800 × 800 |
| `live-show-1.jpg` | Poster: Market! Market! tree lighting | 1200 × 1600 |
| `live-show-2.jpg` | Poster: LOREM IPSUM | 1200 × 1600 |
| `live-show-3.jpg` | Poster: Ang Unang Putok | 1200 × 1600 |
| `live-show-4.jpg` | Poster: The Valenshow, Cebu | 1200 × 1600 |

Episode posters live in `public/images/episodes/<youtubeId>.jpg` (960 × 540).
Cards find them by YouTube ID, so when you add an episode, save its thumbnail
with the same ID. If the file is missing, the card shows a drawn poster instead.

About the logo: the site uses your file as-is. On dark sections it is inverted
and blended with `mix-blend-mode: screen`, so a black-on-white or
black-on-transparent PNG both come out white. If your file's proportions are
not 2:1, update `width`/`height` for `logo` in `content.ts`.

Tips: export JPGs at ~80% quality (or WebP and change the extension in
`content.ts`), and fill in `footer.credits` for every photo you add.

---

## 4. Deploying

The build is a static site in `dist/`.

### Vercel

1. Push the project to a GitHub, GitLab or Bitbucket repo.
2. In Vercel, choose **Add New → Project** and import the repo.
3. Vercel detects Vite. `vercel.json` already sets the build command
   (`npm run build`) and output folder (`dist`). Click **Deploy**.

Or from the terminal:

```bash
npx vercel
```

### Netlify

1. Push the project to a Git repo.
2. In Netlify, choose **Add new site → Import an existing project**.
3. `netlify.toml` already sets the build command, the `dist` folder and Node 22.
   Click **Deploy**.

Or drag the `dist/` folder onto https://app.netlify.com/drop after running
`npm run build`.

Both configs add long-lived cache headers for the hashed files in `/assets`.

---

## 5. Performance and accessibility

Measured with Lighthouse 12 against `npm run preview` on Oct 29, 2026:

| Preset | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Desktop | 93–97 | 100 | 100 | 100 |
| Mobile (simulated mid-range phone, 4× CPU slowdown) | 63–70 | 100 | 100 | 100 |

Desktop clears 90. **Mobile does not yet.** On mobile the cost is the
JavaScript itself (≈163 KB gzipped of React, Framer Motion, GSAP and Lenis)
plus the first layout with three variable web fonts. CLS is ~0.01 on both.

What is already done to keep it fast:

- The loading screen is plain HTML/CSS in `index.html`, so something paints
  before any JavaScript loads.
- The hero copy is painted under the loader; it only *moves* into place, so
  it counts for LCP straight away.
- Sections below the hero mount one by one in idle time after the intro, and
  use `content-visibility: auto` so the browser skips their layout until
  they're near the screen.
- GSAP scroll effects are set up after the intro and the webfonts, with only
  three ScrollTriggers on the whole page.
- Text reveals, the marquees, the grain and the stickers' pop-in run as CSS
  or Web Animations on the compositor, not per-frame JavaScript.
- The three fonts the first screen needs are preloaded.
- YouTube and Spotify load nothing until you press play.
- Every image slot has a fixed aspect ratio and loads lazily.

To push mobile to 90+, the next steps would be pre-rendering the page to
static HTML at build time, and/or replacing Framer Motion with smaller
hand-written interactions.

Reduced motion: with `prefers-reduced-motion: reduce`, there is no smooth
scrolling, pinning, parallax, custom cursor, marquee movement or animated
grain; the loader is a short fade; and the timeline becomes a normal
side-scrolling list. All content stays visible and usable.

---

## 6. Project structure

```
src/
  content.ts            ← all copy, links and image paths
  styles/index.css      ← design tokens, textures, reveal animations
  App.tsx               ← section order
  lib/                  ← smooth scroll + GSAP helpers, deferred mounting, hooks
  components/
    Nav.tsx
    sections/           ← one file per section
    ui/                 ← Cursor, Magnetic, Sticker, Marquee, Loader, ImageSlot, …
public/images/          ← image slots (see SLOTS.md)
```

See `DESIGN-NOTES.md` for the reasoning behind the look.
