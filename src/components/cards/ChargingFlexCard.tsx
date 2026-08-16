'use client';

import React from 'react';
import { ChargingFlexSpare } from '@/types/spares';
import { formatUGX } from '@/lib/formatters';

interface ChargingFlexCardProps {
  flex: ChargingFlexSpare;
  onOrderWhatsApp: (flex: ChargingFlexSpare) => void;
}

export const ChargingFlexCard: React.FC<ChargingFlexCardProps> = ({
  flex,
  onOrderWhatsApp,
}) => {
  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between">

      {/* Top Image Visual */}
      <div className="relative aspect-video w-full bg-slate-50 dark:bg-slate-950 p-4 flex items-center justify-center overflow-hidden">
        {/* Quality Grade Badge */}
        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-950/90 text-blue-300 border border-blue-700/60 backdrop-blur-md">
          {flex.grade}
        </span>

        {/* Port Type Badge */}
        <span className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
          {flex.portType}
        </span>

        <img
          src={flex.image}
          alt={flex.title}
          className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono mb-1">
            <span>{flex.brand}</span>
            <span className="text-emerald-400 font-bold">{flex.portType}</span>
          </div>

          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm line-clamp-2">{flex.title}</h3>

          {/* Model Tag Pills */}
          <div className="mt-2.5 flex flex-wrap gap-1">
            {flex.compatibleModels.map((model) => (
              <span
                key={model}
                className="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-[10px] font-mono"
              >
                {model}
              </span>
            ))}
          </div>
        </div>

        {/* Technical Features Checklist */}
        <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex justify-between">
            <span>Fast Charge Support:</span>
            <span className={flex.supportsFastCharging ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
              {flex.supportsFastCharging ? '⚡ Supported' : 'Standard Speed'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Mic & Audio Included:</span>
            <span className="text-slate-800 dark:text-slate-200 font-medium">{flex.includesMic ? 'Yes (Built-in Mic)' : 'Flex Only'}</span>
          </div>
          <div className="flex justify-between">
            <span>Data Sync / OTG:</span>
            <span className="text-slate-800 dark:text-slate-200 font-medium">{flex.supportsOTG ? 'Yes' : 'Charging Only'}</span>
          </div>
        </div>

        {/* Pricing & Order */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">Price:</span>
            <span className="text-lg font-black text-emerald-400">
              {formatUGX(flex.priceUgx)}
            </span>
          </div>

          <button
            onClick={() => onOrderWhatsApp(flex)}
            className="w-full py-2.5 px-3 rounded-lg text-xs font-bold bg-blue-500 hover:bg-blue-400 text-slate-950 transition flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/10"
          >
            Order Charging Flex
          </button>
        </div>

      </div>
    </div>
  );
};