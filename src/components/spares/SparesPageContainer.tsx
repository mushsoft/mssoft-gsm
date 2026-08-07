'use client';

import React, { useState } from 'react';
import { ScreenSpareCard } from '@/components/cards/ScreenSpareCard';
import { BatterySpareCard } from '@/components/cards/BatterySpareCard';
import { ChargingFlexCard } from '@/components/cards/ChargingFlexCard';
import { SparesSubTabNav } from '@/components/spares/SparesSubTabNav';

type SparesTab = 'screens' | 'batteries' | 'charging';
type SparesSubTab = React.ComponentProps<typeof SparesSubTabNav>['activeTab'];

interface SpareItem {
  id?: string | number;
  brand?: string;
  name?: string;
  model?: string;
  code?: string;
  [key: string]: unknown;
}

interface SparesPageContainerProps {
  screens: SpareItem[];
  batteries: SpareItem[];
  chargingFlexes: SpareItem[];
}

export function SparesPageContainer({
  screens = [],
  batteries = [],
  chargingFlexes = [],
}: SparesPageContainerProps) {
  const [activeTab, setActiveTab] = useState<SparesTab>('screens');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');

  // Filter logic based on tab, brand, and search input
  const getFilteredData = () => {
    let currentData: SpareItem[] = [];
    if (activeTab === 'screens') currentData = screens;
    if (activeTab === 'batteries') currentData = batteries;
    if (activeTab === 'charging') currentData = chargingFlexes;

    return currentData.filter((item) => {
      const matchesBrand =
        selectedBrand === 'All' ||
        (item.brand && item.brand.toLowerCase() === selectedBrand.toLowerCase());

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        item.name?.toLowerCase().includes(query) ||
        item.model?.toLowerCase().includes(query) ||
        item.code?.toLowerCase().includes(query);

      return matchesBrand && matchesSearch;
    });
  };

  const filteredItems = getFilteredData();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* 1. Header & Sub-Tab Navigation Bar */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Verified Parts Inventory</h3>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Showing {filteredItems.length} available items
          </p>
        </div>

        {/* Sub-Tab Nav */}
        <SparesSubTabNav
          activeTab={
            activeTab as SparesSubTab
          }
          onChangeTab={(tab: SparesSubTab) => {
            setActiveTab(tab as SparesTab);
            setSearchQuery(''); // Reset search when changing tabs
            setSelectedBrand('All'); // Reset brand filter when changing tabs
          }}
          counts={{
            screens: screens.length,
            batteries: batteries.length,
            chargingFlex: chargingFlexes.length,
          }}
        />
      </div>

      {/* 2. Quick Search & Filter Toolbar */}
      <div className="p-4 md:p-6 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[240px] relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Filter ${activeTab}...`}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm transition-all"
          />
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Brand Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {['All', 'Samsung', 'Apple', 'Tecno', 'Infinix', 'Xiaomi'].map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedBrand === brand
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Items Grid Display */}
      <div className="p-6 bg-slate-50/30">
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="text-base font-bold text-slate-800">No matching parts found</h4>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Try adjusting your filter parameters or search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeTab === 'screens' &&
              filteredItems.map((item, idx) => (
                <ScreenSpareCard
                  key={item.id || idx}
                  {...(item as unknown as React.ComponentProps<typeof ScreenSpareCard>)}
                />
              ))}
            {activeTab === 'batteries' &&
              filteredItems.map((item, idx) => (
                <BatterySpareCard
                  key={item.id || idx}
                  {...(item as unknown as React.ComponentProps<typeof BatterySpareCard>)}
                />
              ))}
            {activeTab === 'charging' &&
              filteredItems.map((item, idx) => (
                <ChargingFlexCard
                  key={item.id || idx}
                  {...(item as unknown as React.ComponentProps<typeof ChargingFlexCard>)}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}