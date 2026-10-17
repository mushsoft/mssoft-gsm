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

// Callers must render this with `key={scope.key}` — remounting on scope
// change is how query/results/open state resets when the shopper moves to a
// different category, rather than resetting state inside an effect.
export default function SearchBar({
  scope,
  variant = 'desktop',
}: {
  scope: SearchScope;
  variant?: 'desktop' | 'mobile';
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

  return (
    <div ref={containerRef} className={`relative ${isDesktop ? 'flex-1 max-w-lg' : 'w-full'}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          aria-label={`Search ${scope.label}`}
          placeholder={scope.key === 'global' ? 'Search phones, screens, tools...' : `Search ${scope.label}...`}
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => query.trim().length > 0 && setIsOpen(true)}
          onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
          className={
            isDesktop
              ? 'w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 rounded-xl py-2.5 pl-10 pr-20 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all'
              : 'w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 rounded-lg py-2 pl-9 pr-16 focus:outline-none focus:border-amber-500'
          }
        />
        <Search
          className={
            isDesktop
              ? 'w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-3.5 pointer-events-none'
              : 'w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 absolute left-3 pointer-events-none'
          }
        />
        <button
          type="submit"
          className={
            isDesktop
              ? 'absolute right-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-lg transition-colors'
              : 'absolute right-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-black font-bold text-[10px] rounded'
          }
        >
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
                    <div className="shrink-0 text-xs font-bold text-amber-500">UGX {result.price.toLocaleString()}</div>
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
