// Topic chips and search for the Learn to Repair listings.
//
// Software tips use a handful of fixed topics (iPhone, Android, Windows,
// Linux, General) instead of one chip per brand: tips are tagged with brands
// like "Apple", "Samsung", "Microsoft" or "All brands", and a chip for each
// would be a long, confusing row. Repair guides keep their brand chips.

import { rankByRelevance, tokenizeQuery } from './searchQuery';

export const SOFTWARE_TOPICS = ['iPhone', 'Android', 'Windows', 'Linux', 'General'] as const;
export type SoftwareTopic = (typeof SOFTWARE_TOPICS)[number];

const BRAND_TOPIC: Record<string, SoftwareTopic> = {
  apple: 'iPhone',
  iphone: 'iPhone',
  ios: 'iPhone',
  android: 'Android',
  samsung: 'Android',
  huawei: 'Android',
  honor: 'Android',
  tecno: 'Android',
  infinix: 'Android',
  itel: 'Android',
  xiaomi: 'Android',
  redmi: 'Android',
  oppo: 'Android',
  vivo: 'Android',
  realme: 'Android',
  google: 'Android',
  nokia: 'Android',
  motorola: 'Android',
  windows: 'Windows',
  microsoft: 'Windows',
  linux: 'Linux',
  ubuntu: 'Linux',
};

// Unknown, blank or "All brands" tips land in General, so every tip shows up
// under exactly one topic.
export function topicForBrand(brand: string): SoftwareTopic {
  return BRAND_TOPIC[brand.trim().toLowerCase()] ?? 'General';
}

// Matches the chip value from the URL case-insensitively; anything else
// (missing, "All", junk) means no topic filter.
export function parseTopic(value: string | undefined): SoftwareTopic | null {
  return matchTopic(SOFTWARE_TOPICS, value);
}

// Hardware tips are grouped by the part they're about, worked out from the
// title, so a tip added in the admin lands under the right chip with no extra
// field to fill in. Rules run in order: "Charging port after water damage"
// is a water damage tip, "Battery not charging" a battery tip. Laptop,
// tablet and accessory tips come first, so "Laptop battery swelling" stays
// with the laptop tips instead of mixing into phone batteries.
export const HARDWARE_TOPICS = [
  'Screens',
  'Batteries',
  'Charging',
  'Water Damage',
  'Parts',
  'Board Repair',
  'Tools',
  'Laptops and Tablets',
  'Accessories',
  'General',
] as const;
export type HardwareTopic = (typeof HARDWARE_TOPICS)[number];

const HARDWARE_RULES: [HardwareTopic, RegExp][] = [
  ['Laptops and Tablets', /\b(laptops?|tablets?|ipads?|macbooks?|keyboards?|trackpad|touchpad|hinges?|ssd|hard drives?|hdd|ram)\b/],
  // "Headphone jack" is a phone part, so it is left to the Parts rule.
  ['Accessories', /\b(earbuds?|earphones?|airpods|headsets?|headphones?(?! jack)|smartwatch(es)?|watch(es)?|bluetooth speakers?|memory cards?|sd cards?|flash drives?|controllers?|gamepads?|mouse|mice|phone cases?|accessories)\b/],
  ['Water Damage', /\b(water|liquid|wet|rain|moisture|corrosion|corroded|rust)\b/],
  ['Batteries', /\b(battery|batteries|swollen|power banks?|18650)\b/],
  // No bare "cable": a screen or button flex cable isn't a charging topic.
  ['Charging', /\b(charg\w*|usb|ports?|adapters?|plugs?|wireless|sockets?|extension (leads?|cords?)|power strips?)\b/],
  ['Screens', /\b(screens?|displays?|lcd|oled|touch|digitizer|screen protectors?)\b/],
  ['Parts', /\b(speakers?|earpiece|mic|microphones?|cameras?|lens|buttons?|vibrat\w*|sim|fingerprint|face id|back glass|back covers?|housing|flex|antennas?|signal|jack|headphones?|sensors?)\b/],
  ['Board Repair', /\b(boards?|motherboards?|solder\w*|desolder\w*|short(ed)?|short circuit|ics?|chips?|reball\w*|jumpers?|bga|emmc|ufs|cpu|no power|dead|boot ?loop|capacitors?|resistors?|traces?)\b/],
  ['Tools', /\b(tools?|screws?|screwdrivers?|multimeter|heat gun|hot air|flux|tweezers?|workbench|workshop|esd|static|power supply|microscope|glue|separator|uv|alcohol|magnif\w*|clean\w*)\b/],
];

export function hardwareTopicFor(title: string): HardwareTopic {
  const text = title.toLowerCase();
  return HARDWARE_RULES.find(([, rule]) => rule.test(text))?.[0] ?? 'General';
}

export function parseHardwareTopic(value: string | undefined): HardwareTopic | null {
  return matchTopic(HARDWARE_TOPICS, value);
}

function matchTopic<T extends string>(topics: readonly T[], value: string | undefined): T | null {
  if (!value) return null;
  const wanted = value.trim().toLowerCase();
  return topics.find((t) => t.toLowerCase() === wanted) ?? null;
}

// Cards per "page" on the listing, and the ?show= value for "Show more".
// Anything missing or invalid shows the first page; huge values are capped.
export const PAGE_SIZE = 24;
const MAX_SHOW = 2000;

export function parseShowCount(value: string | undefined): number {
  const n = Number.parseInt(value ?? '', 10);
  if (!Number.isFinite(n) || n < PAGE_SIZE) return PAGE_SIZE;
  return Math.min(n, MAX_SHOW);
}

export interface SearchableGuide {
  title: string;
  brand: string;
  modelName: string;
  toolsUsed: string[];
  content: string;
}

// Every word of the query must appear somewhere in the guide (title, brand,
// model, tools or the guide text), in any order. Best matches come first:
// title hits beat hits buried in the text.
export function searchGuides<T extends SearchableGuide>(guides: T[], q: string): T[] {
  const tokens = tokenizeQuery(q);
  if (tokens.length === 0) return guides;

  const fields = (g: T) => [
    { value: g.title, weight: 4 },
    { value: g.modelName, weight: 3 },
    { value: g.brand, weight: 2 },
    { value: g.toolsUsed.join(' '), weight: 2 },
    { value: g.content, weight: 1 },
  ];

  const matches = guides.filter((g) => {
    const texts = fields(g).map((f) => f.value.toLowerCase());
    return tokens.every((token) => token.variants.some((v) => texts.some((text) => text.includes(v))));
  });

  return rankByRelevance(matches, tokens, q, fields);
}
