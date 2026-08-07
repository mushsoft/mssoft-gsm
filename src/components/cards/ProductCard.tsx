'use client';

import React from 'react';
import { Product } from '@/types/product';
import { formatUGX } from '@/lib/formatters';

interface ProductCardProps {
  product: Product;
  onOpenSpecs: (product: Product) => void;
  onOrderWhatsApp: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenSpecs,
  onOrderWhatsApp,
}) => {
  return (
    <div className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image Container & Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-950 p-4">
        {/* Condition Tag */}
        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800/90 text-slate-200 border border-slate-700 backdrop-blur-md">
          {product.condition}
        </span>

        {/* Tech Verified Icon Badge */}
        {product.specs.verifiedByTech && (
          <span className="absolute top-3 right-3 z-10 p-1.5 rounded-md bg-emerald-950/80 border border-emerald-700/60 text-emerald-400" title="Technician Verified">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
            </svg>
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1 font-mono">
            <span>{product.brand}</span>
            <span className="text-emerald-400">{product.specs.modelCode}</span>
          </div>

          <h3 className="font-bold text-slate-100 text-base line-clamp-1">{product.name}</h3>

          {/* Quick Hardware Pill */}
          <div className="mt-2 inline-block px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-medium">
            ⚡ {product.specs.chipset}
          </div>
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="mb-3">
            <span className="text-lg font-black text-emerald-400">
              {formatUGX(product.priceUgx)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenSpecs(product)}
              className="py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Tech Specs
            </button>
            <button
              onClick={() => onOrderWhatsApp(product)}
              className="py-2 px-3 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};