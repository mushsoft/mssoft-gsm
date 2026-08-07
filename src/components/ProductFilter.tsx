'use client';

import React from 'react';
import { ProductCondition } from '@/types/product';
import { FilterState } from '@/types/filter';
import { formatUGX } from '@/lib/formatters';

interface ProductFilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableBrands: string[];
  maxAvailablePriceUgx: number;
  totalResults: number;
  onReset: () => void;
}

const CONDITIONS: ProductCondition[] = ['New', 'Like New', 'Refurbished', 'Used'];

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  setFilters,
  availableBrands,
  maxAvailablePriceUgx,
  totalResults,
  onReset,
}) => {
  // Toggle brand selection
  const handleBrandToggle = (brand: string) => {
    setFilters((prev) => {
      const exists = prev.selectedBrands.includes(brand);
      return {
        ...prev,
        selectedBrands: exists
          ? prev.selectedBrands.filter((b) => b !== brand)
          : [...prev.selectedBrands, brand],
      };
    });
  };

  // Toggle condition selection
  const handleConditionToggle = (condition: ProductCondition) => {
    setFilters((prev) => {
      const exists = prev.selectedConditions.includes(condition);
      return {
        ...prev,
        selectedConditions: exists
          ? prev.selectedConditions.filter((c) => c !== condition)
          : [...prev.selectedConditions, condition],
      };
    });
  };

  return (
    <aside className="w-full lg:w-72 space-y-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 h-fit">
      
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="font-bold text-base text-white">Filter Devices</h3>
          <p className="text-xs text-slate-400 mt-0.5">{totalResults} items found</p>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4"
        >
          Reset All
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search model, chipset..."
            value={filters.searchQuery}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
            }
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Tech Verified Toggle */}
      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 text-sm">🛡️</span>
          <div>
            <p className="text-xs font-bold text-slate-200">Tech Verified Only</p>
            <p className="text-[10px] text-slate-400">Tested hardware specs</p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={filters.verifiedOnly}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, verifiedOnly: e.target.checked }))
          }
          className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
        />
      </div>

      {/* Price Range (UGX Slider) */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Max Budget
          </label>
          <span className="text-xs font-bold text-emerald-400 font-mono">
            {formatUGX(filters.maxPriceUgx)}
          </span>
        </div>
        <input
          type="range"
          min={500000}
          max={maxAvailablePriceUgx}
          step={100000}
          value={filters.maxPriceUgx}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              maxPriceUgx: Number(e.target.value),
            }))
          }
          className="w-full accent-emerald-500 cursor-pointer bg-slate-800"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
          <span>UGX 500K</span>
          <span>{formatUGX(maxAvailablePriceUgx)}</span>
        </div>
      </div>

      {/* Brand Selection */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          Brand
        </label>
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {availableBrands.map((brand) => {
            const isChecked = filters.selectedBrands.includes(brand);
            return (
              <label
                key={brand}
                onClick={() => handleBrandToggle(brand)}
                className={`flex items-center justify-between p-2 rounded-lg text-xs font-medium cursor-pointer transition ${
                  isChecked
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:bg-slate-950 hover:text-slate-200'
                }`}
              >
                <span>{brand}</span>
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                    isChecked
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'border border-slate-700'
                  }`}
                >
                  {isChecked && '✓'}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Condition Selection */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          Condition
        </label>
        <div className="grid grid-cols-2 gap-2">
          {CONDITIONS.map((condition) => {
            const isChecked = filters.selectedConditions.includes(condition);
            return (
              <button
                key={condition}
                onClick={() => handleConditionToggle(condition)}
                className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition text-center ${
                  isChecked
                    ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {condition}
              </button>
            );
          })}
        </div>
      </div>

    </aside>
  );
};