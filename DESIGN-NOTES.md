# Design notes

## Built from the logo and the set

The logo file wasn't attached to the brief, so I sampled the official artwork
used on the YouTube channel and the podcast feed. The wordmark is **pure black
on pure white** (`#000000` / `#FFFFFF`), a high-contrast, flared serif with
oversized swash capitals.

A black-and-white logo can't carry a loud, colourful site on its own, so the
palette pulls in the other thing every episode shows: the **royal-blue stage
curtains** behind the hosts. I sampled them from nine recent thumbnails.

| Token | Hex | Source | Used for |
|---|---|---|---|
| `ink` | `#000000` | Logo | Text, borders, hard shadows, the Episodes block |
| `paper` | `#FFFFFF` | Logo | Light sections, torn labels |
| `curtain` | `#0C4884` | Set curtains (lit fold) | Hero, Baus chapter, live shows |
| `curtain-deep` | `#003060` | Set curtains (shadow fold) | Curtain texture |
| `diva` | `#FF2E88` | Added accent | Macoy chapter, stamps, cursor on images |
| `spot` | `#FFE14A` | Added accent (stage light) | Dictionary block, play buttons, focus rings |

`diva` and `spot` are the two colours I added: a campy hot pink and a
spotlight yellow, to make the site loud without competing with the black and
white. They are all in one place at the top of `src/styles/index.css`, so if
you have the official brand colours, swap them there.

Each section is one big flat colour block (curtain → white → blue → pink →
white → yellow → black → curtain → white → black), so scrolling feels like a
change of scene.

## Type

- **Display: Bodoni Moda** (Google Fonts). A high-contrast Didone with
  hairline serifs and fat stems, the closest Google match to the logo's
  contrast. Its italics carry the swash energy, so headings italicise their
  first word or letter the way the logo blows up its capitals. It also fits the
  fashion-magazine camp of a show whose co-host went viral dubbing *The Devil
  Wears Prada*.
- **Body: Bricolage Grotesque** (Google Fonts). Readable at small sizes,
  slightly quirky, and its heavy uppercase matches the bold sans the show uses
  on its thumbnail labels.

Both are self-hosted through Fontsource, so there are no third-party font
requests.

## Motifs

All recreated in CSS. None of them redraws the logo.

- **Curtain folds:** a repeating gradient that rebuilds the blue stage
  curtain. It appears behind the hero, the Baus chapter, posters and
  placeholders, and the menu.
- **Torn paper labels:** the white ripped-paper strip the thumbnails use for
  episode titles. Here it marks kickers, tags, stickers and image-slot names.
- **Thick and thin rules:** a heavy line over a hairline, borrowed from the
  wordmark's stroke contrast. Used in the dictionary cards and posters.
- **Wedge-spike bursts:** the sticker badges.
- **Hard offset shadows and 2px black borders:** a cut-out, collage look
  that keeps the bright colours from looking glossy.

The real logo appears in the loader, hero, nav and footer. On dark blocks it is
inverted and blended rather than redrawn.

## Motion

The brief asked for chaos with polish, so the motion is springy and wobbly,
but every effect has a job:

- **Loader:** a counter, then the black screen lifts like a stage curtain
  with a curved hem.
- **Hero:** “paandar” springs up letter by letter with a wobble. On scroll it
  slides sideways while the polaroid floats away.
- **Story:** pins and scrolls sideways on desktop, like walking past
  posters. On mobile it's a vertical line that draws itself as you scroll.
- **Host chapters:** stack on top of each other; the earlier one sinks back as
  the next arrives.
- **Cursor:** a label bubble that says *Click!*, *Tingnan*, *Drag me* or
  *Play*.
- **Magnetic buttons, draggable stickers, flip cards, card tilt:** for the
  “paandar” energy.
- **Film grain and marquees:** they run on the compositor, so they don't slow
  the page.

## Copy

- Facts come only from the brief. Episode titles, IDs and durations come from
  the official YouTube channel. Where something couldn't be confirmed, such as
  most host social handles, it is left out and flagged.
- No invented quotes. The dictionary's example sentences are illustrations,
  not lines from the show, and are written without quote marks so they don't
  read as quotes. The only quoted phrases are Macoy's own “frustrated actor”
  (from the brief) and the show's public send-off to Joy Barcoma.
- The Taglish jokes roast the topic (malls, playlists, the Market! Market!
  theory, being award-nominated), never a person.
- Joy Barcoma appears in the friends strip with the show's own send-off line,
  “Maraming salamat, Jusa!”.

## Before you launch

- Drop in the real `logo.png`. Its proportions set the hero's rhythm.
- If the official palette differs from the sampled one, update the six tokens.
- Check the social links in `content.ts`. The official TikTok is
  `@dogshow.divas`, with a dot.
