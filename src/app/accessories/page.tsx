"use client";

import React, { useState } from "react";
import { ProductCard } from "@/components/cards/ProductCard";
import type { ProductCondition } from "@/types/product";

type AccessorySpecs = Record<string, string | number | boolean | undefined>;

type AccessoryItem = {
  id: string;
  title: string;
  name: string;
  brand: string;
  price: number;
  priceUgx: number;
  condition: string;
  image: string;
  description: string;
  stock: number;
  inStock: boolean;
  specs: AccessorySpecs;
  category: string;
  subType: string;
};

type AccessoryProductCardProduct = {
  id: string;
  title: string;
  name: string;
  brand: string;
  price: number;
  priceUgx: number;
  condition: ProductCondition;
  image: string;
  description: string;
  stock: number;
  inStock: boolean;
  specs: TechSpecs;
  category: string;
  subType: string;
};

type TechSpecs = {
  modelCode: string;
  chipset: string;
  display: string;
  battery: string;
  ram: string;
  ramStorage: string;
  network: string;
  cameras: string;
  storage: string;
  camera: string;
  os: string;
  color: string;
  warranty: string;
};

// Removed 'as const' to prevent overly strict readonly tuple types
const sampleAccessories: AccessoryItem[] = [
  {
    id: "1",
    title: "20W Fast Charger Adapter + Type-C Cable",
    name: "20W Fast Charger Adapter + Type-C Cable",
    brand: "Samsung",
    price: 45000,
    priceUgx: 45000,
    condition: "New",
    image: "/images/accessories/charger-20w.png",
    description: "Fast charging adapter with Type-C cable for Samsung devices.",
    stock: 24,
    inStock: true,
    specs: {},
    category: "ACCESSORY",
    subType: "CHARGER",
  },
  {
    id: "2",
    title: "Silicon Shockproof Clear Case - iPhone 13 Pro",
    name: "Silicon Shockproof Clear Case - iPhone 13 Pro",
    brand: "Apple",
    price: 25000,
    priceUgx: 25000,
    condition: "New",
    image: "/images/accessories/clear-case-iphone-13-pro.png",
    description: "Shockproof clear case designed to protect the iPhone 13 Pro.",
    stock: 18,
    inStock: true,
    specs: {},
    category: "ACCESSORY",
    subType: "COVER",
  },
  {
    id: "3",
    title: "9D Matte Tempered Glass Screen Guard",
    name: "9D Matte Tempered Glass Screen Guard",
    brand: "Tecno",
    price: 15000,
    priceUgx: 15000,
    condition: "New",
    image: "/images/accessories/matte-tempered-glass.png",
    description: "Durable 9D tempered glass screen guard for superior protection.",
    stock: 30,
    inStock: true,
    specs: {},
    category: "ACCESSORY",
    subType: "SCREEN_GUARD",
  },
  {
    id: "4",
    title: "Wireless Noise Cancelling Earbuds",
    name: "Wireless Noise Cancelling Earbuds",
    brand: "Oraimo",
    price: 95000,
    priceUgx: 95000,
    condition: "New",
    image: "/images/accessories/wireless-earbuds.png",
    description: "Wireless earbuds with noise cancelling for clear audio.",
    stock: 12,
    inStock: true,
    specs: {},
    category: "ACCESSORY",
    subType: "EARBUDS",
  },
  {
    id: "5",
    title: "Heavy Bass Wired Earphones with Mic",
    name: "Heavy Bass Wired Earphones with Mic",
    brand: "JBL",
    price: 30000,
    priceUgx: 30000,
    condition: "New",
    image: "/images/accessories/wired-earphones-mic.png",
    description: "Wired earphones with mic and heavy bass for immersive sound.",
    stock: 20,
    inStock: true,
    specs: {},
    category: "ACCESSORY",
    subType: "EARPHONE_MIC",
  },
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

  const filteredItems =
    activeTab === "ALL"
      ? sampleAccessories
      : sampleAccessories.filter((item) => item.subType === activeTab);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-amber-400">Phone Accessories</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Filter by accessory type to find exactly what you need.</p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          {categories.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === tab.value
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {filteredItems.map((item: AccessoryItem) => (
            <ProductCard
              key={item.id}
              product={
                {
                  ...item,
                  condition: item.condition as ProductCondition,
                  specs: {
                    modelCode: "",
                    chipset: "",
                    display: "",
                    battery: "",
                    ram: "",
                    storage: "",
                    camera: "",
                    os: "",
                    color: "",
                    warranty: "",
                  },
                } as AccessoryProductCardProduct
              }
              onOpenSpecs={() => {}}
              onOrderWhatsApp={() => {}}
            />
          ))}
        </div>
      </div>
    </main>
  );
}