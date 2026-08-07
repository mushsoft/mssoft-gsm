'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { formatUGX } from '@/lib/formatters';
import { handleOrderClick } from '@/lib/whatsapp';

interface OrderModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [note, setNote] = useState('');

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleOrderClick(product, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl text-slate-100">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📱</span>
            <h3 className="font-bold text-lg text-white">Confirm WhatsApp Order</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="flex gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-contain rounded-lg bg-slate-900 p-1"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-white truncate">{product.name}</h4>
              <p className="text-xs text-emerald-400 font-mono mt-0.5">{product.specs.modelCode}</p>
              <p className="text-base font-black text-emerald-400 mt-1">
                {formatUGX(product.priceUgx)}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Delivery Location / Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Deliver to Ntinda, near Shell station"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div className="bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl text-xs text-emerald-300">
            💬 Tapping below opens WhatsApp with all device specs pre-filled so our team can immediately confirm stock and dispatch.
          </div>

          {/* Action */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 text-sm"
          >
            Continue to WhatsApp Chat
          </button>
        </form>

      </div>
    </div>
  );
};