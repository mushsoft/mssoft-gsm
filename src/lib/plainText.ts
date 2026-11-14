// Site rule: no long dashes (— or –) in anything customers see. Text saved
// through the admin is cleaned here, so a pasted dash never reaches a page:
//   "Universal — phones"  -> "Universal, phones"
//   "2.4\"–2.8\""         -> "2.4\" to 2.8\""
// Short hyphens (-) are fine and left alone. The one-time database fix in
// prisma/migrations/20261114180000_replace_long_dashes uses the same rules.

export function replaceLongDashes(text: string): string {
  return text.replace(/\s*—\s*/g, ', ').replace(/\s*–\s*/g, ' to ');
}

// Same, for every string inside a JSON value (e.g. a product's specs).
export function replaceLongDashesDeep<T>(value: T): T {
  if (typeof value === 'string') return replaceLongDashes(value) as T;
  if (Array.isArray(value)) return value.map((v) => replaceLongDashesDeep(v)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, replaceLongDashesDeep(v)])) as T;
  }
  return value;
}
