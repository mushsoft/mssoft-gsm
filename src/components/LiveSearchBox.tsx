'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Search, X } from 'lucide-react';

// Search box for server-rendered listing pages (software tips, repair guides,
// testpoints). Results update as you type: after a short pause the URL's
// ?q= is replaced with a client-side navigation, so the server re-renders the
// list without a full page reload and the box keeps focus. Without JS it is
// still a plain GET form, so search works everywhere.

const DEBOUNCE_MS = 350;

const TONES = {
  emerald: {
    focus: 'focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20',
    button: 'bg-emerald-500 hover:bg-emerald-400',
  },
  amber: {
    focus: 'focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40',
    button: 'bg-amber-500 hover:bg-amber-400',
  },
} as const;

export function buildSearchHref(basePath: string, query: string, keep: Record<string, string | null | undefined>, paramName = 'q') {
  const params = new URLSearchParams();
  const trimmed = query.trim();
  if (trimmed) params.set(paramName, trimmed);
  for (const [key, value] of Object.entries(keep)) if (value) params.set(key, value);
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export default function LiveSearchBox({
  basePath,
  initialQuery,
  keep = {},
  paramName = 'q',
  placeholder,
  ariaLabel,
  tone = 'emerald',
}: {
  basePath: string;
  initialQuery: string;
  // Other URL params to carry along (e.g. the selected topic or type chip).
  keep?: Record<string, string | null | undefined>;
  paramName?: string;
  placeholder: string;
  ariaLabel: string;
  tone?: keyof typeof TONES;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The last query this box sent to the URL. When the page's query changes
  // to something else (a "Clear" link, the back button), show it; but never
  // overwrite what's being typed when our own earlier search lands.
  // (Adjusting state during render, per the React docs.)
  const [lastSent, setLastSent] = useState(initialQuery);
  const [syncedQuery, setSyncedQuery] = useState(initialQuery);
  if (initialQuery !== syncedQuery) {
    setSyncedQuery(initialQuery);
    if (initialQuery !== lastSent) {
      setLastSent(initialQuery);
      setValue(initialQuery);
    }
  }

  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  function navigate(next: string) {
    const trimmed = next.trim();
    if (trimmed === lastSent) return;
    setLastSent(trimmed);
    startTransition(() => {
      router.replace(buildSearchHref(basePath, trimmed, keep, paramName), { scroll: false });
    });
  }

  function handleChange(next: string) {
    setValue(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => navigate(next), DEBOUNCE_MS);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    navigate(value);
  }

  const styles = TONES[tone];

  return (
    <form action={basePath} method="get" onSubmit={handleSubmit} className="flex gap-2" role="search">
      {Object.entries(keep).map(([key, val]) => (val ? <input key={key} type="hidden" name={key} value={val} /> : null))}
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <input
          type="search"
          name={paramName}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          autoComplete="off"
          enterKeyHint="search"
          className={`w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 py-2.5 pl-9 pr-9 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none [&::-webkit-search-cancel-button]:hidden ${styles.focus}`}
        />
        {isPending ? (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-neutral-400" aria-label="Searching" />
        ) : (
          value && (
            <button
              type="button"
              onClick={() => handleChange('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              <X className="h-4 w-4" />
            </button>
          )
        )}
      </div>
      <button
        type="submit"
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold text-black transition-colors ${styles.button}`}
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
}
