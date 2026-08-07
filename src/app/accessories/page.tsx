"use client";

import React, { useState } from "react";
import ProductCard from "@/src/components/product-card";

const sampleAccessories = [
  { id: "1", title: "20W Fast Charger Adapter + Type-C Cable", brand: "Samsung", price: 45000, category: "ACCESSORY", subType: "CHARGER" },
  { id: "2", title: "Silicon Shockproof Clear Case - iPhone 13 Pro", brand: "Apple", price: 25000, category: "ACCESSORY", subType: "COVER" },
  { id: "3", title: "9D Matte Tempered Glass Screen Guard", brand: "Tecno", price: 15000, category: "ACCESSORY", subType: "SCREEN_GUARD" },
  { id: "4", title: "Wireless Noise Cancelling Earbuds", brand: "Oraimo", price: 95000, category: "ACCESSORY", subType: "EARBUDS" },
  { id: "5", title: "Heavy Bass Wired Earphones with Mic", brand: "JBL", price: 30000, category: "ACCESSORY", subType: "EARPHONE_MIC" },
];

const categories = [
  { label: "All Accessories", value: "ALL" },
  { label: "Chargers", value: "CHARGER" },
  { label: "Covers & Cases", value: "COVER" },
  { label: "Screen Guards", value: "SCREEN_GUARD" },
  { label: "Earbuds / Earpods", value: "EARBUDS" },
  { label: "Earphones & Mics", value: "EARPHONE_MIC" },
];

export default function AccessoriesPage() {
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredItems = activeTab === "ALL" 
    ? sampleAccessories 
    : sampleAccessories.filter(item => item.subType === activeTab);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-amber-400">Phone Accessories</h1>
        <p className="text-slate-400 mt-2">Filter by accessory type to find exactly what you need.</p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pb-4 border-b border-slate-800">
          {categories.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === tab.value
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {filteredItems.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </main>
  );
}