'use client';

import React from 'react';
import { ScreenSpare } from '@/types/spares';
import { formatUGX } from '@/lib/formatters';

interface ScreenSpareCardProps {
  spare: ScreenSpare;
  onSelectSpare: (spare: ScreenSpare) => void;
  onOrderWhatsApp: (spare: ScreenSpare) => void;
}

export const ScreenSpareCard: React.FC<ScreenSpareCardProps> = ({
  spare,
  onSelectSpare,
  onOrderWhatsApp,
}) => {
  const getGradeBadgeColor = (grade: string) => {
    switch (grade) {
      case 'Original Service Pack':
        return 'bg-emerald-950/90 text-emerald-300 border-emerald-700/60';
      case 'OEM Pulled':
        return 'bg-blue-950/90 text-blue-300 border-blue-700/60';
      case 'Hard OLED':
        return 'bg-purple-950/90 text-purple-300 border-purple-700/60';
      default:
        return 'bg-amber-950/90 text-amber-300 border-amber-700/60';
    }
  };

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between">

      {/* Visual Header */}
      <div className="relative aspect-video w-full bg-slate-50 dark:bg-slate-950 p-4 flex items-center justify-center overflow-hidden">
        {/* Quality Grade Badge */}
        <span
          className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[11px] font-bold border backdrop-blur-md ${getGradeBadgeColor(
            spare.qualityGrade
          )}`}
        >
          {spare.qualityGrade}
        </span>

        {/* Frame Status Pill */}
        <span className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
          {spare.includesFrame ? 'With Frame' : 'Screen Only'}
        </span>

        <img
          src={spare.image}
          alt={spare.title}
          className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Details Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono mb-1">
            <span>{spare.brand}</span>
            <span className="text-emerald-400">{spare.refreshRate}</span>
          </div>

          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm line-clamp-2">{spare.title}</h3>

          {/* Compatible Model Codes Pill List */}
          <div className="mt-2.5 flex flex-wrap gap-1">
            {spare.compatibleModels.map((model) => (
              <span
                key={model}
                className="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-[10px] font-mono"
              >
                {model}
              </span>
            ))}
          </div>
        </div>

        {/* Spec Meta Summary */}
        <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex justify-between">
            <span>Panel Tech:</span>
            <span className="text-slate-800 dark:text-slate-200 font-medium">{spare.displayTech}</span>
          </div>
          <div className="flex justify-between">
            <span>Warranty:</span>
            <span className="text-emerald-400 font-medium">{spare.warrantyDays} Days Test</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">Price:</span>
            <span className="text-lg font-black text-emerald-400">
              {formatUGX(spare.priceUgx)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectSpare(spare)}
              className="py-2 px-2.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition"
            >
              Check Fit
            </button>
            <button
              onClick={() => onOrderWhatsApp(spare)}
              className="py-2 px-2.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition"
            >
              Order Spare
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};