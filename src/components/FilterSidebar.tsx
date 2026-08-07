"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Check, Filter, RotateCcw } from "lucide-react";

// Full phone brand catalog from your database setup
const BRANDS = [
  "Apple",
  "Samsung",
  "Tecno",
  "Infinix",
  "itel",
  "Vivo",
  "Pixel",
  "Oppo",
  "Lenovo",
  "Xiaomi",
  "Nokia",
  "ZTE",
  "TCL",
  "Sharp",
  "OnePlus",
  "Motorola",
  "Kyocera",
  "Huawei",
  "Honor",
  "Alcatel",
  "HMD",
  "LG",
  "Sony",
  "Wiko",
  "Realme",
  "Nothing",
];

const CONDITIONS = [
  { label: "Brand New", value: "brand_new" },
  { label: "UK Used", value: "uk_used" },
];

export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Active query parameters
  const currentBrand = searchParams.get("brand");
  const currentCondition = searchParams.get("condition");

  // Helper function to create/update URL query strings
  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null) {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  // Toggle filter logic
  const handleFilterChange = (key: "brand" | "condition", value: string) => {
    const currentValue = key === "brand" ? currentBrand : currentCondition;
    
    // If clicking the active filter, clear it. Otherwise, set the new filter value.
    const newValue = currentValue === value ? null : value;
    const queryString = createQueryString(key, newValue);

    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  // Reset all filters
  const handleReset = () => {
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = currentBrand || currentCondition;

  return (
    <aside className="w-full lg:w-64 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm space-y-6">
      {/* HEADER & RESET BUTTON */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wide">
          <Filter className="w-4 h-4 text-amber-400" />
          <span>Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-amber-400 transition-colors font-mono"
          >
            <RotateCcw className="w-3 h-3" />
            Clear All
          </button>
        )}
      </div>

      {/* CONDITION FILTER SECTION */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
          Condition
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {CONDITIONS.map((cond) => {
            const isActive = currentCondition === cond.value;
            return (
              <button
                key={cond.value}
                onClick={() => handleFilterChange("condition", cond.value)}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                  isActive
                    ? "bg-amber-400/10 border-amber-400/50 text-amber-400 shadow-sm"
                    : "bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50"
                }`}
              >
                {isActive && <Check className="w-3 h-3 text-amber-400" />}
                {cond.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* BRAND FILTER SECTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Brand
          </h3>
          {currentBrand && (
            <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              {currentBrand}
            </span>
          )}
        </div>

        <div className="max-h-72 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
          {BRANDS.map((brand) => {
            const isActive = currentBrand === brand;
            return (
              <button
                key={brand}
                onClick={() => handleFilterChange("brand", brand)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                  isActive
                    ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/10"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                }`}
              >
                <span>{brand}</span>
                {isActive && <Check className="w-3.5 h-3.5 text-slate-950" />}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}