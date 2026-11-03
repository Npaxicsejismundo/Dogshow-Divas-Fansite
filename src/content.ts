/* ═══════════════════════════════════════════════════════════════
   CONTENT — every word, link and image path on the site lives here.
   Edit this file only; components read from it.

   Facts follow the brief (source of truth). Episode titles, IDs and
   durations come from the official YouTube channel (@DogshowDivas)
   as of Oct 29, 2026.
   ═══════════════════════════════════════════════════════════════ */

/* ── Types ─────────────────────────────────────────────────────── */

export type Tone = 'ink' | 'paper' | 'curtain' | 'diva' | 'spot';

export interface ImageAsset {
  /** Path inside /public. Drop a file with this exact name in public/images. */
  src: string;
  alt: string;
  /** Intrinsic size; keeps the layout from jumping while the photo loads. */
  width: number;
  height: number;
  /** CSS object-position; keeps faces in frame when the slot crops tighter than the photo. */
  position?: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

/* ── Image slots ───────────────────────────────────────────────── */

const img = (file: string, alt: string, width = 1200, height = 1500, position?: string): ImageAsset => ({
  src: `/images/${file}`,
  alt,
  width,
  height,
  position,
});

export const images = {
  /** Official logo. Black-on-white or black-on-transparent PNG works best. */
  logo: img('logo.png', 'Dogshow Divas', 1600, 735),
  hero: img('hero.jpg', 'Macoy Dubs (left) and Baus Rufo (right) posing against pink and yellow backdrops', 1600, 900),
  // Timeline photos are from Metroscene's May 2026 cover shoot, not from the events themselves.
  storyEpisodeZero: img('story-episode-zero.jpg', 'Baus Rufo and Macoy Dubs carrying a clawfoot bathtub across a lawn', 1000, 562, 'center top'),
  storyPilot: img('story-pilot.jpg', 'Baus Rufo and Macoy Dubs grinning inside a giant life-ring frame', 1000, 562, 'center top'),
  storyMarketMarket: img('story-market-market.jpg', 'Market! Market! mall in Bonifacio Global City, Taguig', 1000, 562),
  storyFamas: img('story-famas.jpg', 'Baus Rufo and Macoy Dubs in matching patchwork vests on a pool-party set', 1000, 562),
  bausPortrait: img('baus-portrait.jpg', 'Baus Rufo in a teal suit and glasses, lounging on the floor', 1000, 1250),
  macoyPortrait: img('macoy-portrait.jpg', 'Macoy Dubs in an orange satin blazer, hand on hip', 1000, 1250),
  tuesday: img('friend-tuesday-vargas.jpg', 'Tuesday Vargas on a city street', 725, 725),
  joy: img('guest-joy-barcoma.jpg', 'Joy Barcoma speaking at an event in Bacoor, 2025', 800, 800),
  pitik: img('guest-pitik-queen.jpg', 'Pitik Queen (Ian Mark Kamangkang) outdoors', 563, 563),
  belo: img('guest-vicki-belo.jpg', 'Dr. Vicki Belo in a white blouse, arms crossed', 800, 800),
  nadine: img('guest-nadine-lustre.jpg', 'Nadine Lustre, 2016', 800, 800),
  fonz: img('guest-fonz.jpg', 'Fonz in a brown knit sweater', 800, 800),
  dimples: img('guest-dimples-romana.jpg', 'Dimples Romana talking to reporters', 720, 720),
  valeen: img('guest-valeen-montenegro.jpg', 'Valeen Montenegro in a yellow dress', 720, 720),
  // Live-show posters use venue photos (Creative Commons) until show photos are approved.
  live1: img('live-show-1.jpg', 'Market! Market! mall in BGC, Taguig, where the tree lighting was held', 900, 1201),
  live2: img('live-show-2.jpg', 'Burgos Circle in Bonifacio Global City at night', 810, 1080),
  live3: img('live-show-3.jpg', 'Bonifacio Global City at night', 900, 1200),
  // Ayala Malls Central Bloc's official key art for The Valenshow, uncropped.
  live4: img(
    'live-show-4.jpg',
    'The Valenshow: A Comedy Variety Show by Dogshow Divas, February 14, 1PM, Activity Center — key art with Baus Rufo and Macoy Dubs holding microphones',
    1200,
    600,
  ),
} satisfies Record<string, ImageAsset>;

/* ── Official links ────────────────────────────────────────────── */

export const links = {
  youtube: 'https://www.youtube.com/@DogshowDivas',
  spotify: 'https://open.spotify.com/show/5ptgBIAfyMNkQOYeyhhHDk',
  apple: 'https://podcasts.apple.com/ph/podcast/dogshow-divas/id1840326735',
  instagram: 'https://www.instagram.com/dogshowdivas/',
  tiktok: 'https://www.tiktok.com/@dogshow.divas',
  facebook: 'https://www.facebook.com/p/Dogshow-Divas-61580957747142/',
};

/* ── Site + nav ────────────────────────────────────────────────── */

export const site = {
  name: 'Dogshow Divas',
  tagline: 'A podcast paandar from Baus Rufo & Macoy Dubs',
  fanBadge: 'Fan site',
};

export const nav: LinkItem[] = [
  { label: 'Story', href: '#story' },
  { label: 'The Divas', href: '#hosts' },
  { label: 'Dictionary', href: '#dictionary' },
  { label: 'Episodes', href: '#episodes' },
  { label: 'Live', href: '#live' },
  { label: 'Listen', href: '#listen' },
];

/* ── Loader ────────────────────────────────────────────────────── */

export const loader = {
  line: 'Heto na naman tayo…',
  sub: 'Inaayos pa ang curtains, mars',
  /** How long the counter runs before the curtain lifts, in milliseconds. */
  durationMs: 2800,
  /** Shorter run for repeat visits in the same browser session. */
  repeatDurationMs: 1400,
};

/* ── 1. Hero ───────────────────────────────────────────────────── */

export const hero = {
  eyebrow: ['Fan site', 'Taglish', 'Walang script'],
  /** The tagline is split so the middle word can be huge. */
  taglineLead: 'A podcast',
  taglineWord: 'paandar',
  taglineTail: 'from Baus Rufo & Macoy Dubs',
  intro:
    'Dalawang divas, isang mic each, zero script. Ito ang fan-made shrine para sa podcast na nagdo-dogshow sa lahat ng bagay — with love, never with malice.',
  ctas: {
    watch: { label: 'Watch', href: links.youtube },
    listen: { label: 'Listen', href: links.spotify },
  },
  stickers: ['Certified doglet', 'Heto na naman tayo', 'Unscripted!'],
  /** Names in photo order: Macoy is on the left, Baus on the right. */
  polaroid: 'Macoy & Baus',
  scrollCue: 'Scroll, mars',
};

/* ── Marquee ───────────────────────────────────────────────────── */

export const marquee = {
  primary: ['dogshow', 'paandar', 'yung isa', 'audience dogshowan', 'Market! Market! theory', 'Poppers Pilipinas Partylist'],
  secondary: ['Heto na naman tayo', 'Walang script', 'Taglish', 'Kaya pa ba?', 'No malice, all love'],
};

/* ── 2. The story ──────────────────────────────────────────────── */

export interface Milestone {
  date: string;
  title: string;
  body: string;
  tag: string;
  tone: Tone;
  image?: ImageAsset;
}

export const story = {
  kicker: 'The story (so far)',
  title: 'Paano nangyari ’to?',
  intro: 'From first guest to FAMAS nominee in two years. Scroll lang, kami na bahala sa chika.',
  outro: { title: 'To be continued…', body: 'Kaya pa ba? Kaya pa.' },
  milestones: [
    {
      date: 'Aug 6, 2024',
      title: 'The first-ever guest',
      body: 'Bago ang lahat ng paandar, guest lang muna si Macoy — ang pinaka-first guest ng podcast ni Baus, Kaya Pa Ba?',
      tag: 'Kaya Pa Ba?',
      tone: 'paper',
    },
    {
      date: 'Aug 19, 2025',
      title: 'Episode Zero',
      body: 'Anniversary episode ng Kaya Pa Ba?, bumalik si Macoy, at boom: viral. Ang tawag ng fans dito ngayon? “Episode Zero.” Canon na ’yan.',
      tag: 'Viral',
      tone: 'spot',
      image: images.storyEpisodeZero,
    },
    {
      date: 'Sept 16–17, 2025',
      title: 'Heto Na Naman Tayo',
      body: 'Lumabas ang pilot. Sariling show na, sariling curtains na. Official na ang dogshow.',
      tag: 'The pilot',
      tone: 'curtain',
      image: images.storyPilot,
    },
    {
      date: 'Nov 2025',
      title: 'Top 6 + Market! Market!',
      body: 'Top 6 sa Spotify Philippines, tapos sila pa ang nag-host ng Market! Market! Christmas tree lighting. The theory? Proven. You’ve made it, mars.',
      tag: 'Spotify PH',
      tone: 'diva',
      image: images.storyMarketMarket,
    },
    {
      date: 'Nov 30, 2025',
      title: 'LOREM IPSUM',
      body: 'First live show sa Brick Wall, BGC. Placeholder ang pangalan, pero hindi placeholder ang tawanan.',
      tag: 'First live show',
      tone: 'ink',
    },
    {
      date: 'Jan 11, 2026',
      title: 'Ang Unang Putok',
      body: 'Bagong taon, bagong improv show. Paputok na hindi bawal — tawa lang ang sumabog.',
      tag: 'Improv',
      tone: 'paper',
    },
    {
      date: 'Feb 14, 2026',
      title: 'Sold out sa Cebu',
      body: 'Valentine’s show sa Ayala Central Bloc, Cebu — sold out. Walang jowa? Walang problema. May dogshow.',
      tag: 'Sold out',
      tone: 'spot',
    },
    {
      date: 'July 2026',
      title: 'FAMAS nominee',
      body: 'Nominated for Best Podcast sa 1st FAMAS Broadcast Arts Awards. Award-nominated na ang dogshow. Paki-frame.',
      tag: 'Best Podcast',
      tone: 'curtain',
      image: images.storyFamas,
    },
    {
      date: 'Sept 2026',
      title: '178K+ subscribers',
      body: 'Mahigit 178K na ang YouTube subscribers. ’Yan ang laki ng doglet family — at lumalaki pa.',
      tag: 'YouTube',
      tone: 'diva',
    },
  ] satisfies Milestone[],
};

/* ── 3. Get to know them ───────────────────────────────────────── */

export interface FlipFact {
  front: string;
  back: string;
}

export interface Host {
  id: 'baus' | 'macoy';
  chapter: string;
  firstName: string;
  lastName: string;
  role: string;
  intro: string;
  portrait: ImageAsset;
  tone: Tone;
  sticker: string;
  facts: FlipFact[];
  /** Only handles we could confirm. Add more as { label, href }. */
  socials: LinkItem[];
}

export const hostsSection = {
  kicker: 'Get to know them',
  title: 'Meet the Divas',
  intro: 'Dalawang host, dalawang chapter. Tap the cards para sa chika.',
  flipHint: 'Tap to flip',
};

export const hosts: Host[] = [
  {
    id: 'baus',
    chapter: 'Chapter 01',
    firstName: 'Baus',
    lastName: 'Rufo',
    role: 'Host · ang nag-imbita sa first guest',
    intro:
      'Isang dekada sa advertising at PR bago naging creator. Siya ang nagsimula ng Kaya Pa Ba? — at siya ang nag-imbita kay Macoy bilang first-ever guest. Kaya technically? Kasalanan niya ’to. Thank you, Baus.',
    portrait: images.bausPortrait,
    tone: 'curtain',
    sticker: 'Kapuso era',
    facts: [
      { front: 'Before the mic?', back: 'About 10 years in advertising and PR bago naging creator.' },
      { front: 'Ano ang Bekenemen?', back: 'Co-founded it in 2021 — a queer podcast and Drag Race watch-party brand.' },
      { front: 'Kaya Pa Ba?', back: 'Launched his podcast Kaya Pa Ba? in 2024. First-ever guest: si Macoy.' },
      { front: 'Saan siya ngayon?', back: 'GMA’s Unang Hirit and The People Have Spoken, plus GTV’s Kalurks!' },
    ],
    socials: [{ label: 'TikTok @heyitsbaus', href: 'https://www.tiktok.com/@heyitsbaus' }],
  },
  {
    id: 'macoy',
    chapter: 'Chapter 02',
    firstName: 'Macoy',
    lastName: 'Dubs',
    role: 'Co-host · the first guest who never left',
    intro:
      'Mark Averilla sa totoong buhay, Macoy Dubs sa puso ng internet. Nag-viral noong 2017 sa Tagalog dubs, nagbigay-buhay kay Auntie Julie, at self-proclaimed “frustrated actor.” Frustrated? Sa dami ng credits? Okay, ikaw bahala.',
    portrait: images.macoyPortrait,
    tone: 'diva',
    sticker: 'Frustrated actor',
    facts: [
      { front: '2017 viral moment', back: 'Tagalog dubs of Mean Girls and The Devil Wears Prada.' },
      { front: 'Sino si Auntie Julie?', back: 'His TikTok character. Iconic. Period.' },
      { front: 'TV & film?', back: 'Co-hosted TV5’s Lunch Out Loud. Films include Fruitcake and Drags to Riches.' },
      { front: 'Now showing', back: 'Part of TV5’s The Good Doctor. Kapatid network, kapatid energy.' },
    ],
    socials: [{ label: 'Instagram @macoydubs', href: 'https://www.instagram.com/macoydubs/' }],
  },
];

export const versus = {
  kicker: 'Baus vs. Macoy',
  title: 'Sino ang mas diva?',
  options: { baus: 'Baus', vs: 'VS', macoy: 'Macoy' },
  captions: {
    vs: 'Bakit pa pipili? Dalawa sila for a reason.',
    baus: 'Team Baus? Valid.',
    macoy: 'Team Macoy? Valid din.',
  },
  rows: [
    { label: 'Origin story', baus: '~10 years in advertising & PR', macoy: 'Viral 2017 Tagalog dubs' },
    { label: 'Signature creation', baus: 'Bekenemen (2021)', macoy: 'Auntie Julie on TikTok' },
    { label: 'Podcast lore', baus: 'Launched Kaya Pa Ba? (2024)', macoy: 'Its first-ever guest (Aug 6, 2024)' },
    { label: 'Network', baus: 'Kapuso — GMA & GTV', macoy: 'Kapatid — TV5' },
    { label: 'Currently on', baus: 'Unang Hirit · The People Have Spoken · Kalurks!', macoy: 'The Good Doctor' },
    { label: 'Self-description', baus: 'The one who sent the invite', macoy: '“Frustrated actor”' },
  ],
};

export interface Friend {
  name: string;
  note: string;
  image: ImageAsset;
}

export const friends = {
  kicker: 'Friends of the show',
  title: 'Kapag wala yung isa…',
  people: [
    { name: 'Tuesday Vargas', note: 'Regular stand-in. Siya ang sumasalo kapag wala yung isa.', image: images.tuesday },
    { name: 'Joy Barcoma', note: 'Guest host, 2026. Maraming salamat, Jusa!', image: images.joy },
    { name: 'Pitik Queen', note: 'Guest on “’Yung Isa!”', image: images.pitik },
    { name: 'Dr. Vicki Belo', note: 'Guest on “The Real Doctor Is In”', image: images.belo },
    { name: 'Nadine Lustre', note: 'Guest on “Class President”', image: images.nadine },
    { name: 'Fonz', note: 'Guest on “Nuance, Nuisance & Noisy”', image: images.fonz },
    { name: 'Dimples Romana', note: 'Guest on “Variety Show”', image: images.dimples },
    { name: 'Valeen Montenegro', note: 'Guest on “Ang Tatlong Ina (Di Umano)”', image: images.valeen },
  ] satisfies Friend[],
};

/* ── 4. Dogshow dictionary ─────────────────────────────────────── */

export interface DictionaryEntry {
  term: string;
  pos: string;
  syllables: string;
  meaning: string;
  example: string;
  tone: Tone;
}

export const dictionary = {
  kicker: 'Dogshow dictionary',
  title: 'Para hindi ka ma-lost',
  intro: 'Ang official-unofficial glossary. Tap a card para gamitin sa pangungusap.',
  shuffle: 'Shuffle the deck',
  exampleLabel: 'Gamitin sa pangungusap',
  entries: [
    {
      term: 'dogshow',
      pos: 'n. / v.',
      syllables: 'dog·show',
      meaning: 'Mocking something — without malice.',
      example: 'Dinogshow namin ang office Christmas party playlist. With love, siyempre.',
      tone: 'curtain',
    },
    {
      term: 'paandar',
      pos: 'n.',
      syllables: 'pa·an·dar',
      meaning: 'A gimmick or show-off stunt.',
      example: 'May costume change pa sa podcast? Grabe ang paandar.',
      tone: 'diva',
    },
    {
      term: 'yung isa',
      pos: 'n.',
      syllables: '’yung i·sa',
      meaning: '“The other one” — whichever host is missing today.',
      example: 'Nasaan si yung isa? Ayun, nasa taping.',
      tone: 'paper',
    },
    {
      term: 'audience dogshowan',
      pos: 'n.',
      syllables: 'au·di·ence dog·show·an',
      meaning: 'Roasting the live audience.',
      example: 'Front row ka? Ihanda mo na ang sarili sa audience dogshowan.',
      tone: 'ink',
    },
    {
      term: 'Market! Market! theory',
      pos: 'n.',
      syllables: 'mar·ket mar·ket the·o·ry',
      meaning: 'You haven’t made it until you’ve had a mall show at Market! Market!',
      example: 'Viral ka na? Cute. Pero may Market! Market! show ka na ba?',
      tone: 'spot',
    },
    {
      term: 'Poppers Pilipinas Partylist',
      pos: 'n.',
      syllables: 'pop·pers pi·li·pi·nas par·ty·list',
      meaning: 'The divas’ joke party-list. Main platform: a nationwide free prostate exam.',
      example: 'Sa Poppers Pilipinas Partylist, libre ang prostate exam, nationwide. Charot, wala ’yan sa balota.',
      tone: 'curtain',
    },
  ] satisfies DictionaryEntry[],
};

/* ── 5. Episodes ───────────────────────────────────────────────── */

export interface Episode {
  youtubeId: string;
  title: string;
  /** Hosts in the episode credits. */
  hosts: string[];
  /** Used by the guest filter. Leave empty for a Baus & Macoy-only episode. */
  guests: string[];
  date?: string;
  duration: string;
  /**
   * Override the poster. By default the card uses /images/episodes/<youtubeId>.jpg
   * and falls back to a drawn poster if that file doesn't exist.
   */
  thumb?: string;
  note?: string;
}

export const episodes = {
  kicker: 'Episodes',
  title: 'Pindot, nood, tawa',
  intro: 'The latest from the YouTube channel. Walang auto-load — pindutin mo lang ang gusto mo.',
  filterLabel: 'Filter by guest',
  allLabel: 'All',
  soloLabel: 'Just the Divas',
  /** Guests who get their own filter chip. Everyone else goes under `othersLabel`. */
  filterGuests: ['Tuesday Vargas', 'Joy Barcoma'],
  othersLabel: 'Other guests',
  playLabel: 'Play',
  spotify: {
    showId: '5ptgBIAfyMNkQOYeyhhHDk',
    title: 'Audio lang? Sige.',
    body: 'Load the official Spotify player. Pang-commute, pang-hugas ng pinggan, pang-lahat.',
    button: 'Load Spotify player',
  },
  featured: {
    youtubeId: 'xeppuTZ78K0',
    title: 'Dogshow Divas with Macoy Dubs',
    hosts: ['Baus Rufo', 'Macoy Dubs'],
    guests: [],
    date: 'Aug 19, 2025',
    duration: 'On Kaya Pa Ba?',
    note: 'Episode Zero — where it all started',
  } satisfies Episode,
  items: [
    { youtubeId: 'fS9L-7JlRys', title: 'Undas Entertainment', hosts: ['Baus Rufo'], guests: ['Tuesday Vargas'], date: 'Oct 2026', duration: '51:21' },
    { youtubeId: 'bO9PMrXzQg8', title: 'KATOL', hosts: ['Baus Rufo', 'Macoy Dubs'], guests: [], date: 'Oct 23, 2026', duration: '57:54' },
    { youtubeId: 'MFpRDvlqZMo', title: 'Ang Tatlong Ina (Di Umano)', hosts: ['Macoy Dubs'], guests: ['Tuesday Vargas', 'Valeen Montenegro'], date: 'Oct 15, 2026', duration: '1:00:45' },
    { youtubeId: 'HsE8TlOmoZU', title: 'Lebanese & Cucumbers', hosts: ['Baus Rufo', 'Macoy Dubs'], guests: [], date: 'Oct 7, 2026', duration: '57:24' },
    { youtubeId: '9t_Bcmgp66M', title: 'Ungkatan ng Fast', hosts: ['Macoy Dubs'], guests: ['Tuesday Vargas'], date: 'Sept 24, 2026', duration: '45:55' },
    { youtubeId: 'Jf8xoU3Rc10', title: 'Variety Show', hosts: [], guests: ['Dimples Romana', 'Nica Del Rosario', 'The Cast of Muli'], date: 'Sept 11, 2026', duration: '1:07:15' },
    { youtubeId: 'T_x1OkRdO04', title: 'Dogshowan Kahit Maulan', hosts: ['Baus Rufo', 'Macoy Dubs'], guests: [], date: 'Aug 29, 2026', duration: '58:21' },
    { youtubeId: 'paPhbsaLltM', title: 'Class President', hosts: ['Baus Rufo'], guests: ['Joy Barcoma', 'Nadine Lustre'], date: 'Aug 19, 2026', duration: '43:44' },
    { youtubeId: 'RgSc1PI0kRQ', title: 'Nuance, Nuisance & Noisy', hosts: ['Baus Rufo'], guests: ['Joy Barcoma', 'Fonz'], duration: '56:46' },
    { youtubeId: '-GbzA-zucP8', title: 'Hello Po Mga KAPUSO', hosts: ['Baus Rufo', 'Macoy Dubs'], guests: [], date: 'Jun 18, 2026', duration: '56:52' },
    { youtubeId: 'VyY8kNKtp5I', title: 'The Real Doctor Is In', hosts: ['Baus Rufo', 'Macoy Dubs'], guests: ['Dr. Vicki Belo'], duration: '1:05:17' },
    { youtubeId: 'aFJFUim0eMg', title: '’Yung Isa!', hosts: ['Baus Rufo', 'Macoy Dubs'], guests: ['Joy Barcoma', 'Pitik Queen'], date: 'Mar 30, 2026', duration: '58:04' },
  ] satisfies Episode[],
  moreLabel: 'All episodes on YouTube',
  moreHref: links.youtube,
};

/* ── 6. Live shows ─────────────────────────────────────────────── */

export interface LiveShow {
  title: string;
  date: string;
  venue: string;
  kind: string;
  blurb: string;
  stamp?: string;
  tone: Tone;
  image: ImageAsset;
  /** 'contain' shows the whole image (use for key art with its own title). */
  imageFit?: 'cover' | 'contain';
}

export const liveShows = {
  kicker: 'Live shows',
  title: 'Live, loud, at walang script',
  intro: 'Past shows, now in poster form. Kung nandoon ka — congrats, na-dogshow ka na.',
  items: [
    {
      title: 'Christmas Tree Lighting',
      date: 'Nov 2025',
      venue: 'Market! Market!, BGC',
      kind: 'Hosting gig',
      blurb: 'The Market! Market! theory, live and in person. Nagliwanag ang puno, pati ang career.',
      stamp: 'Theory proven',
      tone: 'spot',
      image: images.live1,
    },
    {
      title: 'LOREM IPSUM',
      date: 'Nov 30, 2025',
      venue: 'Brick Wall, BGC',
      kind: 'First live show',
      blurb: 'Ang unang pagkakataon na na-dogshow ang audience nang harapan.',
      stamp: 'First!',
      tone: 'paper',
      image: images.live2,
    },
    {
      title: 'Ang Unang Putok',
      date: 'Jan 11, 2026',
      venue: 'Brick Wall, BGC',
      kind: 'Improv show',
      blurb: 'Bagong taon, bagong improv. Walang script, as usual.',
      stamp: 'Improv',
      tone: 'diva',
      image: images.live3,
    },
    {
      title: 'Valentine’s Show',
      date: 'Feb 14, 2026',
      venue: 'Ayala Central Bloc, Cebu',
      kind: 'Valentine’s special',
      blurb: 'Lumipad sa Cebu, nag-sold out. Ang pinaka-kilig na dogshow.',
      stamp: 'Sold out',
      tone: 'curtain',
      image: images.live4,
      imageFit: 'contain',
    },
  ] satisfies LiveShow[],
};

/* ── 7. Listen everywhere ──────────────────────────────────────── */

export interface Platform {
  name: string;
  handle: string;
  href: string;
  tone: Tone;
}

export const listen = {
  kicker: 'Listen everywhere',
  title: 'Saan ka man, nandoon ang dogshow',
  platforms: [
    { name: 'YouTube', handle: '@DogshowDivas', href: links.youtube, tone: 'diva' },
    { name: 'Spotify', handle: 'Dogshow Divas', href: links.spotify, tone: 'spot' },
    { name: 'Apple Podcasts', handle: 'Dogshow Divas', href: links.apple, tone: 'curtain' },
    { name: 'Instagram', handle: '@dogshowdivas', href: links.instagram, tone: 'diva' },
    { name: 'TikTok', handle: '@dogshow.divas', href: links.tiktok, tone: 'spot' },
    { name: 'Facebook', handle: 'Dogshow Divas', href: links.facebook, tone: 'curtain' },
  ] satisfies Platform[],
};

/* ── 8. Footer ─────────────────────────────────────────────────── */

export const footer = {
  signoff: 'Heto na naman tayo.',
  disclaimer: 'Fan site. Not affiliated with Dogshow Divas or J+ Productions.',
  madeBy: 'Created by NaviLeiru, a fan, for fans. Facts as of October 2026.',
  creditsTitle: 'Photo credits',
  /**
   * Grouped by section. `subject` is what's pictured, `by` the owner or
   * photographer, `license` only for Creative Commons / public-domain photos
   * (those must keep author, licence and source link). Add a line for any
   * photo you add.
   */
  credits: [
    {
      group: 'Logo & artwork',
      items: [
        { subject: 'Logo', by: 'Dogshow Divas / J+ Productions' },
        { subject: 'Episode thumbnails', by: 'Dogshow Divas & Kaya Pa Ba?', href: 'https://www.youtube.com/@DogshowDivas' },
      ],
    },
    {
      group: 'Baus & Macoy',
      items: [
        {
          subject: 'Hero & portraits',
          by: 'Jharwin Castañeda for Allure Philippines',
          href: 'https://allure.ph/news/homegrown-heroes/macoy-dubs-and-baus-rufo-the-dogshow-divas-are-giving-us-all-permission-to-laugh/',
        },
        {
          subject: 'Timeline photos',
          by: 'Joseph Bermudez for Metroscene Mag',
          href: 'https://www.metroscenemag.com/2026/05/baus-rufo-and-macoy-dubs-are-two-divas.html',
        },
      ],
    },
    {
      group: 'Friends of the show',
      items: [
        { subject: 'Tuesday Vargas', by: 'Daily Tribune', href: 'https://tribune.net.ph/2026/10/25/tuesday-vargas-nag-react-sa-di-akmang-tanong-sa-underage-actor' },
        { subject: 'Joy Barcoma', by: 'City Government of Bacoor', license: 'Public domain', href: 'https://commons.wikimedia.org/wiki/File:Joy_Barcoma_(2025).jpg' },
        { subject: 'Pitik Queen', by: 'GMA Network', href: 'https://www.gmanetwork.com/entertainment/showbiznews/pitik-queen-ian-mark-kamangkang-shares-journey-on-kmjs/131669/' },
        { subject: 'Dr. Vicki Belo', by: 'Rappler BrandRap', href: 'https://www.rappler.com/brandrap/dr-vicki-belo-celebrates-years-beauty-industry-2022/' },
        { subject: 'Nadine Lustre', by: 'Alfred Gaddi', license: 'CC BY-SA 2.0, cropped', href: 'https://commons.wikimedia.org/wiki/File:Nadine_Lustre_-_2016_(cropped).jpg' },
        { subject: 'Fonz', by: 'Lifestyle.INQ', href: 'https://lifestyle.inquirer.net/565516/tiktok-star-fonz-enters-his-teleserye-era/' },
        { subject: 'Dimples Romana', by: 'Jimpy Anarcon', license: 'CC BY-SA 3.0, cropped', href: 'https://commons.wikimedia.org/wiki/File:Actress_Dimples_Romana.jpg' },
        { subject: 'Valeen Montenegro', by: 'Buenas PH, via Random Republika', href: 'https://randomrepublika.com/valeen-montenegro-bringing-laughter-to-buenas-phs-newest-campaign/' },
      ],
    },
    {
      group: 'Live shows',
      items: [
        {
          subject: 'The Valenshow, Cebu',
          by: 'Ayala Malls Central Bloc key art, via Cebu Daily News',
          href: 'https://cebudailynews.inquirer.net/693828/ayala-malls-central-bloc-hosts-the-valenshow-for-its-first-time-out-of-metro-manila',
        },
        { subject: 'Market! Market!', by: 'Ralff Nestor Nacor', license: 'CC BY-SA 4.0, cropped', href: 'https://commons.wikimedia.org/wiki/File:Market_Market_Mall_Exterior,_BGC,_Taguig,_Aug_2026.jpg' },
        { subject: 'Burgos Circle, BGC', by: 'Hans Olav Lien', license: 'CC0', href: 'https://commons.wikimedia.org/wiki/File:Burgos_Circle_in_Bonifacio_Global_City,_Metro_Manila.jpg' },
        { subject: 'BGC at night', by: 'Xenovilius', license: 'CC0', href: 'https://commons.wikimedia.org/wiki/File:Bonifacio_Global_City_(BGC)_in_night_time.jpg' },
      ],
    },
  ] as { group: string; items: { subject: string; by: string; license?: string; href?: string }[] }[],
  backToTop: 'Balik sa taas',
};
