"use client";

import React from "react";
import { ProductCard } from "@/components/cards/ProductCard";

const sampleTools = [
  {
    id: "1",
    name: "858D Hot Air Rework Soldering Station",
    brand: "KADA",
    price: 220000,
    priceUgx: 220000,
    category: "REPAIR_TOOL",
    subType: "STATION",
    condition: "New" as const,
    description: "Digital ESD hot air station for smd component micro-soldering.",
    image: "/images/tools/kada-858d.png",
    inStock: true,
    stock: 10,
    specs: {
      modelCode: "858D",
      chipset: "Digital Hot Air",
      display: "LED Display",
      battery: "110V-220V Power",
      voltage: "110V-220V",
      temperature: "100°C-500°C",
      airflow: "Adjustable",
      ramStorage: "N/A",
      network: "N/A",
      cameras: "N/A",
    },
  },
  {
    id: "2",
    name: "Precision Screwdriver Kit (24-in-1)",
    brand: "JIAFA",
    price: 35000,
    priceUgx: 35000,
    category: "REPAIR_TOOL",
    subType: "SCREWDRIVER",
    condition: "New" as const,
    description: "Magnetic S2 steel bits for iPhone, Samsung, and Huawei disassembly.",
    image: "/images/tools/screwdriver-kit.png",
    inStock: true,
    stock: 25,
    specs: {
      modelCode: "JIAFA-24",
      chipset: "Precision Toolkit",
      display: "N/A",
      battery: "N/A",
      material: "S2 Steel",
      bits: "24",
      ramStorage: "N/A",
      network: "N/A",
      cameras: "N/A",
    },
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-amber-400">Technician Repair Tools</h1>
        <p className="text-slate-400 mt-2">
          Professional heat guns, soldering irons, microscopes, and opening toolkits.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {sampleTools.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onOpenSpecs={() => undefined}
              onOrderWhatsApp={() => undefined}
            />
          ))}
        </div>
      </div>
    </main>
  );
}