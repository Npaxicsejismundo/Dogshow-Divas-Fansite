# Image slots

Drop files here with these exact names. Until a file exists, the site shows a
styled placeholder with the filename and alt text. Use official or approved photos only.

| File | Where it shows | Suggested size |
|---|---|---|
| `logo.png` | Loader, hero, nav, footer | 1600 × 800, black wordmark on transparent (or white) |
| `hero.jpg` | Hero polaroid | 1200 × 1500 (4:5) |
| `og-image.jpg` | Link previews (Facebook, X, Messenger) | 1200 × 630 |
| `story-episode-zero.jpg` | Timeline: Episode Zero | 1600 × 900 (16:9) |
| `story-pilot.jpg` | Timeline: the pilot | 1600 × 900 |
| `story-market-market.jpg` | Timeline: Market! Market! | 1600 × 900 |
| `story-famas.jpg` | Timeline: FAMAS | 1600 × 900 |
| `baus-portrait.jpg` | Baus chapter | 1200 × 1500 (4:5) |
| `macoy-portrait.jpg` | Macoy chapter | 1200 × 1500 (4:5) |
| `friend-tuesday-vargas.jpg` | Friends strip | 800 × 800 |
| `guest-joy-barcoma.jpg` | Friends strip | 800 × 800 |
| `guest-pitik-queen.jpg` | Friends strip | 800 × 800 |
| `guest-vicki-belo.jpg` | Friends strip | 800 × 800 |
| `guest-nadine-lustre.jpg` | Friends strip | 800 × 800 |
| `guest-fonz.jpg` | Friends strip | 800 × 800 |
| `guest-dimples-romana.jpg` | Friends strip | 800 × 800 |
| `guest-valeen-montenegro.jpg` | Friends strip | 800 × 800 |
| `live-show-1.jpg` | Poster: Market! Market! tree lighting | 1200 × 1600 (3:4) |
| `live-show-2.jpg` | Poster: LOREM IPSUM | 1200 × 1600 |
| `live-show-3.jpg` | Poster: Ang Unang Putok | 1200 × 1600 |
| `live-show-4.jpg` | Poster: The Valenshow, Cebu | 1200 × 1600 |

Episode posters: `episodes/<youtubeId>.jpg` (960 × 540). Cards pick these up
automatically by YouTube ID; if a file is missing, the card shows a drawn poster.
All 13 current episodes have their official YouTube thumbnail saved here. When
you add an episode to `content.ts`, save its thumbnail with the same ID.

## Filled so far (Oct 29, 2026)

Credits for each are in `footer.credits` in `src/content.ts` and show in the footer.

- `logo.png`, `og-image.jpg`: trimmed from the official podcast cover art
  (white made transparent; strokes untouched).
- `guest-joy-barcoma.jpg`, `guest-nadine-lustre.jpg`, `guest-dimples-romana.jpg`:
  Wikimedia Commons (public domain / CC BY-SA).
- `story-market-market.jpg`, `live-show-1.jpg`, `live-show-2.jpg`, `live-show-3.jpg`:
  **venue photos** from Wikimedia Commons (Market! Market! and BGC), not photos of
  the shows. Swap in real show photos when you have approved ones.
- `live-show-4.jpg`: Ayala Malls Central Bloc's official key art for The Valenshow
  (published with Cebu Daily News's press release), 1200 × 600, uncropped. The poster
  shows it whole (`imageFit: 'contain'` in `content.ts`) so its title stays visible.
  The show had a no-phones policy, so no audience photos of it were found online.

- `hero.jpg`, `baus-portrait.jpg`, `macoy-portrait.jpg`: Allure Philippines
  feature (photography by Jharwin Castañeda). Left panel = Macoy, right = Baus.
- `story-episode-zero.jpg`, `story-pilot.jpg`, `story-famas.jpg`: Metroscene Mag
  May 2026 cover shoot (photographed by Joseph Bermudez). These are shoot photos,
  not photos of those events.

- `friend-tuesday-vargas.jpg` (Daily Tribune), `guest-pitik-queen.jpg` (GMA),
  `guest-vicki-belo.jpg` (Rappler BrandRap), `guest-fonz.jpg` (Lifestyle.INQ),
  `guest-valeen-montenegro.jpg` (Buenas PH campaign via Random Republika):
  picked from the site owner's Bing searches, using only solo photos whose source
  article names the person.

The Allure, Metroscene and news-site photos are copyrighted, added at the site
owner's request. Ask each source for permission before publishing the site, and
keep their credits in the footer.

Every slot is filled. To add a live-show poster, add an item to `liveShows.items`
in `src/content.ts` and an image entry for it (e.g. `live-show-5.jpg`).
