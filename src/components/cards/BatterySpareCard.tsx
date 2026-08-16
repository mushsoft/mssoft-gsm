'use client';

import React from 'react';
import { BatterySpare } from '@/types/spares';
import { formatUGX } from '@/lib/formatters';

interface BatterySpareCardProps {
  battery: BatterySpare;
  onOrderWhatsApp: (battery: BatterySpare) => void;
}

export const BatterySpareCard: React.FC<BatterySpareCardProps> = ({
  battery,
  onOrderWhatsApp,
}) => {
  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between">

      {/* Top Image & Badges */}
      <div className="relative aspect-video w-full bg-slate-50 dark:bg-slate-950 p-4 flex items-center justify-center overflow-hidden">
        {/* Health Grade Badge */}
        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 backdrop-blur-md">
          {battery.healthPercentage}% Health ({battery.cycleCount} Cycles)
        </span>

        {/* BMS Ribbon Badge */}
        <span className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
          {battery.includesBMS ? 'Flex BMS Built-in' : 'Cell Only (BMS Swap Needed)'}
        </span>

        <img
          src={battery.image}
          alt={battery.title}
          className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono mb-1">
            <span>{battery.brand}</span>
            <span className="text-emerald-400 font-bold">{battery.capacitymAh} mAh</span>
          </div>

          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm line-clamp-2">{battery.title}</h3>

          {/* Model Tag Pills */}
          <div className="mt-2.5 flex flex-wrap gap-1">
            {battery.compatibleModels.map((model) => (
              <span
                key={model}
                className="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-[10px] font-mono"
              >
                {model}
              </span>
            ))}
          </div>
        </div>

        {/* Spec Rows */}
        <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex justify-between">
            <span>Cell Grade:</span>
            <span className="text-slate-800 dark:text-slate-200 font-medium">{battery.grade}</span>
          </div>
          <div className="flex justify-between">
            <span>Operating Voltage:</span>
            <span className="text-slate-600 dark:text-slate-300 font-mono">{battery.voltage}</span>
          </div>
        </div>

        {/* Pricing & Order */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">Price:</span>
            <span className="text-lg font-black text-emerald-400">
              {formatUGX(battery.priceUgx)}
            </span>
          </div>

          <button
            onClick={() => onOrderWhatsApp(battery)}
            className="w-full py-2.5 px-3 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center justify-center gap-1.5"
          >
            Order Battery
          </button>
        </div>

      </div>
    </div>
  );
};