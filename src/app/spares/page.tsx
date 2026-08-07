'use client';

import React, { useState } from 'react';
import { SCREEN_SPARES_DATA } from '@/data/screenSpares';
import { BATTERY_SPARES_DATA } from '@/data/batterySpares';
import { CHARGING_FLEX_DATA } from '@/data/chargingFlexSpares';
import { BACK_GLASS_SPARES_DATA } from '@/data/backGlassSpares';

export default function SparesPage() {
  const [activeTab, setActiveTab] = useState<'screens' | 'batteries' | 'flex' | 'backGlass'>('screens');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false); // 👈 Toggle State

  // 1. Get raw category data
  const getRawData = () => {
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
  };

  const rawData = getRawData();

  // 2. Filter data by Brand, Search Query, and In-Stock Status
  const filteredData = rawData.filter((item) => {
    const matchesBrand = selectedBrand === 'All' || item.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.code && item.code.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStock = inStockOnly ? item.inStock === true : true; // 👈 Stock filter

    return matchesBrand && matchesSearch && matchesStock;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Verified Parts Inventory</h1>
      <p className="text-slate-500 mb-6">Showing {filteredData.length} available items</p>

      {/* Category Sub-Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab('screens')}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
            activeTab === 'screens' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          Screens ({SCREEN_SPARES_DATA.length})
        </button>

        <button
          onClick={() => setActiveTab('batteries')}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
            activeTab === 'batteries' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          Batteries ({BATTERY_SPARES_DATA.length})
        </button>

        <button
          onClick={() => setActiveTab('flex')}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
            activeTab === 'flex' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          Charging Ports & Flex ({CHARGING_FLEX_DATA.length})
        </button>

        <button
          onClick={() => setActiveTab('backGlass')}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
            activeTab === 'backGlass' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          Back Glass / Covers ({BACK_GLASS_SPARES_DATA.length})
        </button>
      </div>

      {/* Search Bar + In Stock Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Search by part name, model, or code (e.g. A54, CK7n)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          />
        </div>

        {/* In Stock Only Toggle Switch */}
        <label className="flex items-center gap-3 cursor-pointer select-none bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl">
          <span className="text-xs font-bold text-slate-700">In Stock Only</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={() => setInStockOnly(!inStockOnly)}
              className="sr-only"
            />
            <div
              className={`w-11 h-6 rounded-full transition-colors ${
                inStockOnly ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            ></div>
            <div
              className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                inStockOnly ? 'transform translate-x-5' : ''
              }`}
            ></div>
          </div>
        </label>
      </div>

      {/* Brand Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['All', 'Samsung', 'Apple', 'Tecno', 'Infinix', 'Xiaomi'].map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
              selectedBrand === brand ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Parts Grid */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md">
                    {item.brand}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {item.quality}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1">{item.name}</h3>

                <p className="text-xs text-slate-400 mb-2">
                  Model: <span className="font-medium text-slate-600">{item.code || item.model}</span>
                </p>

                {/* Dynamic Spec Badges Section */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {/* Screen Specs */}
                  {'size' in item && item.size && (
                    <span className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded">
                      📐 {item.size}
                    </span>
                  )}
                  {'resolution' in item && item.resolution && (
                    <span className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded">
                      🖥️ {item.resolution}
                    </span>
                  )}

                  {/* Battery Specs */}
                  {'capacity' in item && item.capacity && (
                    <span className="bg-amber-50 text-amber-700 border border-amber-200/60 text-[11px] font-semibold px-2 py-0.5 rounded">
                      ⚡ {item.capacity}
                    </span>
                  )}

                  {/* Charging Flex Specs */}
                  {'features' in item &&
                    Array.isArray(item.features) &&
                    item.features.map((feat: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-purple-50 text-purple-700 border border-purple-200/60 text-[11px] font-semibold px-2 py-0.5 rounded"
                      >
                        🔌 {feat}
                      </span>
                    ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100">
                <div>
                  <span className="text-xs text-slate-400 block">Price</span>
                  <span className="text-lg font-extrabold text-slate-900">
                    UGX {item.priceUGX.toLocaleString()}
                  </span>
                </div>
                <a
                  href={`https://wa.me/256755754880?text=Hi%20MS%20Soft%20GSM,%20I%20am%20interested%20in%20${encodeURIComponent(
                    item.name
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                >
                  Order via WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500 font-medium">No matching parts found</p>
        </div>
      )}
    </div>
  );
}