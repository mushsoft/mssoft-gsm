'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Loader2, Package } from 'lucide-react';
import type { SearchScope } from '@/lib/searchScope';
import type { SearchSuggestion } from '@/app/api/shop/search-suggest/route';

const DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 2;

const VARIANT_STYLES = {
  desktop: {
    input:
      'w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 rounded-xl py-2.5 pl-10 pr-20 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all',
    icon: 'w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-3.5 pointer-events-none',
    button: 'absolute right-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-lg transition-colors',
  },
  mobile: {
    input:
      'w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 rounded-lg py-2 pl-9 pr-16 focus:outline-none focus:border-amber-500',
    icon: 'w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 absolute left-3 pointer-events-none',
    button: 'absolute right-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-black font-bold text-[10px] rounded',
  },
  // The big search in the home page hero.
  hero: {
    input:
      'w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 py-3.5 pl-10 pr-28 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none transition-shadow focus:border-amber-500/50 focus:shadow-[0_0_0_4px_rgba(245,158,11,0.15)]',
    icon: 'pointer-events-none absolute left-3 h-4 w-4 text-neutral-500',
    button: 'absolute right-1.5 rounded-lg bg-amber-500 px-5 py-2 text-sm font-bold text-black transition-colors hover:bg-amber-400',
  },
} as const;

// Callers must render this with `key={scope.key}` — remounting on scope
// change is how query/results/open state resets when the shopper moves to a
// different category, rather than resetting state inside an effect.
export default function SearchBar({
  scope,
  variant = 'desktop',
}: {
  scope: SearchScope;
  variant?: keyof typeof VARIANT_STYLES;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function handleChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = value.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) {
      setResults([]);
      setIsLoading(false);
      setIsOpen(trimmed.length > 0);
      return;
    }

    setIsOpen(true);
    setIsLoading(true);
    const thisRequestId = ++requestIdRef.current;
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/shop/search-suggest?scope=${scope.key}&q=${encodeURIComponent(trimmed)}`);
        const data = await res.json();
        // Ignore stale responses — a slower earlier request landing after a
        // faster later one would otherwise flash outdated results.
        if (thisRequestId !== requestIdRef.current) return;
        setResults(data.success ? data.results : []);
      } catch {
        if (thisRequestId === requestIdRef.current) setResults([]);
      } finally {
        if (thisRequestId === requestIdRef.current) setIsLoading(false);
      }
    }, DEBOUNCE_MS);
  }

  function goToFullResults() {
    const trimmed = query.trim();
    if (!trimmed) return;
    setIsOpen(false);
    router.push(scope.resultsHref(trimmed));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    goToFullResults();
  }

  function handleSuggestionClick() {
    setIsOpen(false);
  }

  const isDesktop = variant === 'desktop';
  const styles = VARIANT_STYLES[variant];

  return (
    <div ref={containerRef} className={`relative ${isDesktop ? 'flex-1 max-w-lg' : 'w-full'}`}>
      <form onSubmit={handleSubmit} action={scope.key === 'global' ? '/shop' : undefined} className="relative flex items-center" role="search">
        <input
          type="search"
          name="search"
          aria-label={`Search ${scope.label}`}
          placeholder={variant === 'hero' ? 'Search model, brand, or part...' : scope.key === 'global' ? 'Search phones, screens, tools...' : `Search ${scope.label}...`}
          value={query}
          autoComplete="off"
          enterKeyHint="search"
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => query.trim().length > 0 && setIsOpen(true)}
          onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
          className={`${styles.input} [&::-webkit-search-cancel-button]:hidden`}
        />
        <Search className={styles.icon} />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-96 overflow-y-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 p-4 text-xs text-neutral-500 dark:text-neutral-400">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Searching {scope.label}...
            </div>
          ) : results.length > 0 ? (
            <>
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.href}
                  onClick={handleSuggestionClick}
                  className="flex items-center gap-3 border-b border-neutral-100 dark:border-neutral-800 px-3 py-2.5 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                    {result.image ? (
                      <Image src={result.image} alt="" fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Package className="h-4 w-4 text-neutral-400 dark:text-neutral-700" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-bold text-neutral-800 dark:text-neutral-200">{result.title}</div>
                    <div className="truncate text-[10px] text-neutral-500 dark:text-neutral-400">{result.subtitle}</div>
                  </div>
                  {result.price != null && (
                    <div className="shrink-0 text-xs font-bold text-amber-500">UGX {result.price.toLocaleString('en-US')}</div>
                  )}
                </Link>
              ))}
              <button
                type="button"
                onClick={goToFullResults}
                className="block w-full px-3 py-2.5 text-center text-xs font-bold text-amber-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                See all results for &quot;{query.trim()}&quot;
              </button>
            </>
          ) : query.trim().length >= MIN_QUERY_LENGTH ? (
            <div className="p-4 text-center text-xs text-neutral-500 dark:text-neutral-400">
              No matches in {scope.label} for &quot;{query.trim()}&quot;.
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
