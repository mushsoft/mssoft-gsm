'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  MonitorSmartphone,
  BatteryFull,
  Plug,
  Layers,
  Sparkles,
  XCircle,
  RotateCcw,
  ArrowUpDown,
} from 'lucide-react';
import { SCREEN_SPARES_DATA } from '@/data/screenSpares';
import { BATTERY_SPARES_DATA } from '@/data/batterySpares';
import { CHARGING_FLEX_DATA } from '@/data/chargingFlexSpares';
import { BACK_GLASS_SPARES_DATA } from '@/data/backGlassSpares';
import SparePartCard, { SpareCategory } from '@/components/cards/SparePartCard';

const TABS: { key: SpareCategory; label: string; icon: typeof MonitorSmartphone; data: { length: number } }[] = [
  { key: 'screens', label: 'Screens', icon: MonitorSmartphone, data: SCREEN_SPARES_DATA },
  { key: 'batteries', label: 'Batteries', icon: BatteryFull, data: BATTERY_SPARES_DATA },
  { key: 'flex', label: 'Charging Ports & Flex', icon: Plug, data: CHARGING_FLEX_DATA },
  { key: 'backGlass', label: 'Back Glass / Covers', icon: Layers, data: BACK_GLASS_SPARES_DATA },
];

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

export default function SparesPage() {
  const [activeTab, setActiveTab] = useState<SpareCategory>('screens');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const rawData = useMemo(() => {
    switch (activeTab) {
      case 'batteries':
        return BATTERY_SPARES_DATA;
      case 'flex':
        return CHARGING_FLEX_DATA;
      case 'backGlass':
        return BACK_GLASS_SPARES_DATA;
      default:
        return SCREEN_SPARES_DATA;
    }
  }, [activeTab]);

  const brands = useMemo(() => {
    const unique = Array.from(new Set(rawData.map((item) => item.brand))).sort();
    return ['All', ...unique];
  }, [rawData]);

  const filteredData = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const result = rawData.filter((item) => {
      const matchesBrand = selectedBrand === 'All' || item.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.model.toLowerCase().includes(q) ||
        (item.code && item.code.toLowerCase().includes(q)) ||
        (item.compatibility ?? []).some((c) => c.toLowerCase().includes(q));
      const matchesStock = inStockOnly ? item.inStock === true : true;

      return matchesBrand && matchesSearch && matchesStock;
    });

    const sorted = [...result];
    if (sortBy === 'price-asc') sorted.sort((a, b) => a.priceUGX - b.priceUGX);
    if (sortBy === 'price-desc') sorted.sort((a, b) => b.priceUGX - a.priceUGX);
    if (sortBy === 'name-asc') sorted.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  }, [rawData, selectedBrand, searchQuery, inStockOnly, sortBy]);

  const inStockCount = useMemo(() => rawData.filter((i) => i.inStock).length, [rawData]);

  const hasActiveFilters = selectedBrand !== 'All' || searchQuery.trim() !== '' || inStockOnly || sortBy !== 'default';

  const clearFilters = () => {
    setSelectedBrand('All');
    setSearchQuery('');
    setInStockOnly(false);
    setSortBy('default');
  };

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-linear-to-br from-white via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950 p-6 sm:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 shadow-lg shadow-amber-500/10">
              <MonitorSmartphone className="h-7 w-7 text-amber-500" />
            </div>
            <div>
              <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-500">
                <Sparkles className="h-3 w-3" />
                Genuine &amp; OEM Parts
              </div>
              <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
                Verified Parts Inventory
              </h1>
              <p className="mt-1 max-w-xl text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
                Screens, batteries, charging flex boards, and back covers &mdash; sourced and stock
                checked for you.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-3 sm:flex-col sm:items-end">
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/60 px-4 py-2 text-center">
              <div className="text-lg font-black text-amber-400">{filteredData.length}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                Showing
              </div>
            </div>
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/60 px-4 py-2 text-center">
              <div className="text-lg font-black text-emerald-400">{inStockCount}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                In Stock
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(({ key, label, icon: Icon, data }) => (
          <button
            key={key}
            onClick={() => {
              setActiveTab(key);
              setSelectedBrand('All');
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === key
                ? 'bg-amber-500 text-black'
                : 'border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:border-amber-500/40 hover:text-amber-400'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label} ({data.length})
          </button>
        ))}
      </div>

      {/* Search + Sort + In Stock Toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute inset-y-0 left-3 my-auto h-4 w-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search by part name, model, or code (e.g. A54, CK7n)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 py-2.5 pl-10 pr-4 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        <div className="relative">
          <ArrowUpDown className="pointer-events-none absolute inset-y-0 left-3 my-auto h-3.5 w-3.5 text-neutral-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="appearance-none rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 py-2.5 pl-9 pr-8 text-xs font-semibold text-neutral-600 dark:text-neutral-300 outline-none focus:border-amber-500/50"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>

        <label className="flex shrink-0 cursor-pointer select-none items-center gap-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2.5">
          <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300">In Stock Only</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={() => setInStockOnly(!inStockOnly)}
              className="sr-only"
            />
            <div
              className={`h-6 w-11 rounded-full transition-colors ${
                inStockOnly ? 'bg-emerald-600' : 'bg-neutral-700'
              }`}
            />
            <div
              className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                inStockOnly ? 'translate-x-5' : ''
              }`}
            />
          </div>
        </label>
      </div>

      {/* Brand Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold transition-colors ${
              selectedBrand === brand
                ? 'bg-amber-500 text-black'
                : 'bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            {brand}
          </button>
        ))}

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:border-red-500/40 hover:text-red-400"
          >
            <RotateCcw className="h-3 w-3" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Parts Grid */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredData.map((item) => (
            <SparePartCard key={item.id} item={item} category={activeTab} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
            <XCircle className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">No matching parts found</h3>
            <p className="mx-auto mt-1 max-w-sm text-xs text-neutral-500">
              Try a different search term, switch brands, or clear your filters.
            </p>
          </div>
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 px-4 py-2 text-xs font-bold text-neutral-800 dark:text-neutral-200 transition-colors hover:bg-neutral-700"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Filters
          </button>
        </div>
      )}
    </main>
  );
}
