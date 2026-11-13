// Shared free-text search for the storefront. The old search matched the
// whole query as one substring of a single column, so "tecno spark 8" found
// nothing (brand="Tecno", modelName="Spark 8" — no one column holds all of
// it). Here the query is split into words and every word must match *some*
// column, so words can land in different columns and in any order.

export interface SearchToken {
  // The word as typed plus any aliases (e.g. "mtk" → "mediatek") — matching
  // any one of these satisfies the word.
  variants: string[];
}

const STOPWORDS = new Set(['a', 'an', 'and', 'the', 'for', 'of', 'with', 'in', 'on', 'to']);

// Words shoppers commonly type that name a brand/chipset family differently
// from how it's stored. Kept small on purpose — every alias widens results.
const ALIASES: Record<string, string[]> = {
  mtk: ['mediatek'],
  mediatek: ['mtk'],
  qcom: ['qualcomm', 'snapdragon'],
  qualcomm: ['snapdragon', 'qcom'],
  snapdragon: ['qualcomm'],
  redmi: ['xiaomi'],
  poco: ['xiaomi'],
  iphone: ['apple'],
};

// "note9" / "spark8" / "9pro" are usually typed for "Note 9" / "Spark 8" /
// "9 Pro", so split letters from digits — but only when the letter part is
// 3+ characters, so model codes like "a13", "mt6769" or "x6710" stay whole.
function splitLetterDigit(word: string): string[] {
  const letterThenDigit = word.match(/^([a-z]{3,})(\d+)$/);
  if (letterThenDigit) return [letterThenDigit[1], letterThenDigit[2]];
  const digitThenLetter = word.match(/^(\d+)([a-z]{3,})$/);
  if (digitThenLetter) return [digitThenLetter[1], digitThenLetter[2]];
  return [word];
}

export function tokenizeQuery(q: string, opts: { ignore?: readonly string[] } = {}): SearchToken[] {
  const ignore = new Set(opts.ignore ?? []);
  const words = q
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .flatMap(splitLetterDigit)
    .filter((w) => w && !STOPWORDS.has(w) && !ignore.has(w));

  // Dedupe, and cap so a pasted paragraph can't build a huge query.
  return Array.from(new Set(words))
    .slice(0, 8)
    .map((w) => ({ variants: [w, ...(ALIASES[w] ?? [])] }));
}

// One AND-condition per word: { OR: [field contains variant, ...] }. Callers
// pass their model's WhereInput as W — every field must be a string column on
// that model, which TypeScript can't check through the computed keys.
export function tokenWhereConditions<W = { OR: Record<string, unknown>[] }>(
  tokens: SearchToken[],
  fields: readonly string[]
): W[] {
  return tokens.map((token) => ({
    OR: token.variants.flatMap((variant) =>
      fields.map((field) => ({ [field]: { contains: variant, mode: 'insensitive' } }))
    ),
  })) as unknown as W[];
}

// Orders already-matched rows so the best hit comes first: a whole-word match
// beats a substring match, heavier fields (model name, title) beat lighter
// ones, and a row whose brand + model contains the query as typed gets a
// bonus. Stable for ties, so callers' own ordering (e.g. newest first) holds.
export function rankByRelevance<T>(
  items: T[],
  tokens: SearchToken[],
  rawQuery: string,
  fields: (item: T) => { value: string | null | undefined; weight: number }[]
): T[] {
  if (tokens.length === 0) return items;
  const phrase = rawQuery.trim().toLowerCase();

  const scored = items.map((item, index) => {
    const values = fields(item).map((f) => ({ text: (f.value ?? '').toLowerCase(), weight: f.weight }));
    let score = 0;
    for (const token of tokens) {
      let best = 0;
      for (const { text, weight } of values) {
        for (const variant of token.variants) {
          if (!text.includes(variant)) continue;
          const wholeWord = new RegExp(`(^|[^a-z0-9])${variant}($|[^a-z0-9])`).test(text);
          best = Math.max(best, weight * (wholeWord ? 2 : 1));
        }
      }
      score += best;
    }
    if (phrase && values.some((v) => v.text.includes(phrase))) score += 5;
    return { item, index, score };
  });

  scored.sort((a, b) => b.score - a.score || a.index - b.index);
  return scored.map((s) => s.item);
}
