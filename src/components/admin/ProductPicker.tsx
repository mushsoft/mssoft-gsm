'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, Search } from 'lucide-react';

type ProductResult = { id: string; title: string; price: number; stock: number; brand: string; category: string };

// Search-as-you-type product lookup for the receipt/invoice item table —
// lets an admin add a real catalog item (with its live price) instead of
// typing a blank row by hand. Debounced so it doesn't fire a request per
// keystroke; results close on selection or outside click.
export default function ProductPicker({ onSelect }: { onSelect: (product: ProductResult) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ProductResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    const timer = setTimeout(() => {
      fetch(`/api/admin/products?q=${encodeURIComponent(trimmed)}`)
        .then((res) => res.json())
        .then((data) => setResults(data.success ? data.products : []))
        .catch(() => setResults([]))
        .finally(() => setIsLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="no-print relative w-full max-w-sm">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products to add..."
          className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 py-1.5 pl-8 pr-3 text-xs text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 outline-none focus:border-amber-500/50"
        />
        {isLoading && <Loader2 className="absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 animate-spin text-neutral-400" />}
      </div>

      {isOpen && query.trim() && (
        <div className="absolute z-10 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg">
          {results.length === 0 && !isLoading && (
            <div className="px-3 py-2 text-xs text-neutral-500">No products found</div>
          )}
          {results.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => {
                onSelect(product);
                setQuery('');
                setResults([]);
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs hover:bg-amber-500/10"
            >
              <span className="truncate text-neutral-800 dark:text-neutral-200">
                {product.title} <span className="text-neutral-400">({product.brand})</span>
              </span>
              <span className="shrink-0 font-bold text-neutral-600 dark:text-neutral-400">
                UGX {product.price.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
