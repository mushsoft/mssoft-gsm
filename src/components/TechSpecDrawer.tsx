'use client';

import React from 'react';
import { Product } from '../types/product';
import { formatUGX } from '../lib/formatters';

interface TechSpecDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderWhatsApp: (product: Product) => void;
}

export const TechSpecDrawer: React.FC<TechSpecDrawerProps> = ({
  product,
  isOpen,
  onClose,
  onOrderWhatsApp,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-slate-900 text-slate-100 shadow-2xl border-l border-slate-800 flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-1 rounded-full">
                {product.brand}
              </span>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white text-xl font-bold p-1 rounded-md hover:bg-slate-800 transition"
              >
                ✕
              </button>
            </div>

            <h2 className="text-xl font-bold mt-3 text-white">{product.name}</h2>
            <p className="text-sm text-slate-400 font-mono mt-1">
              Model: <span className="text-emerald-400">{product.specs.modelCode}</span>
            </p>

            {product.specs.verifiedByTech && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-950/80 border border-blue-700/50 text-blue-300 text-xs font-medium">
                <svg className="w-3.5 h-3.5 fill-current text-blue-400" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                Tested & Verified by PhoneHub Techs
              </div>
            )}
          </div>

          {/* Drawer Content: Tech Hardware Details */}
          <div className="p-6 space-y-4 overflow-y-auto flex-1 text-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Hardware Breakdown
            </h3>

            <div className="grid grid-cols-1 gap-3">
              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                <p className="text-xs text-slate-400">Processor / SoC</p>
                <p className="font-semibold text-slate-200">{product.specs.chipset}</p>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                <p className="text-xs text-slate-400">RAM & Storage</p>
                <p className="font-semibold text-slate-200">{product.specs.ramStorage}</p>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                <p className="text-xs text-slate-400">Display</p>
                <p className="font-semibold text-slate-200">{product.specs.display}</p>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                <p className="text-xs text-slate-400">Camera Setup</p>
                <p className="font-semibold text-slate-200">{product.specs.cameras}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                  <p className="text-xs text-slate-400">Battery</p>
                  <p className="font-semibold text-slate-200">{product.specs.battery}</p>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                  <p className="text-xs text-slate-400">Connectivity</p>
                  <p className="font-semibold text-slate-200">{product.specs.network}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Footer CTA */}
          <div className="p-6 border-t border-slate-800 bg-slate-900/95 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400 uppercase font-medium">Price</span>
              <span className="text-2xl font-black text-emerald-400">
                {formatUGX(product.priceUgx)}
              </span>
            </div>

            <button
              onClick={() => onOrderWhatsApp(product)}
              className="w-full py-3 px-4 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              Order via WhatsApp
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};