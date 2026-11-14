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
  if (!value) return null;
  const wanted = value.trim().toLowerCase();
  return SOFTWARE_TOPICS.find((t) => t.toLowerCase() === wanted) ?? null;
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
