'use client';

import React from 'react';
import { SubTabType } from '@/types/spares';

interface SparesSubTabNavProps {
  activeTab: SubTabType;
  onChangeTab: (tab: SubTabType) => void;
  counts: {
    screens: number;
    batteries: number;
    chargingFlex: number;
  };
}

export const SparesSubTabNav: React.FC<SparesSubTabNavProps> = ({
  activeTab,
  onChangeTab,
  counts,
}) => {
  return (
    <div className="flex items-center gap-2 p-1.5 bg-slate-950 border border-slate-800 rounded-xl w-fit">
      
      {/* Display Panels */}
      <button
        onClick={() => onChangeTab('screens')}
        className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
          activeTab === 'screens'
            ? 'bg-emerald-500 text-slate-950 shadow-md'
            : 'text-slate-400 hover:text-white hover:bg-slate-900'
        }`}
      >
        <span>🖥️ Display Panels</span>
        <span className={`px-1.5 py-0.5 rounded text-[10px] ${activeTab === 'screens' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
          {counts.screens}
        </span>
      </button>

      {/* Batteries */}
      <button
        onClick={() => onChangeTab('batteries')}
        className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
          activeTab === 'batteries'
            ? 'bg-emerald-500 text-slate-950 shadow-md'
            : 'text-slate-400 hover:text-white hover:bg-slate-900'
        }`}
      >
        <span>🔋 Batteries & Cells</span>
        <span className={`px-1.5 py-0.5 rounded text-[10px] ${activeTab === 'batteries' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
          {counts.batteries}
        </span>
      </button>

      {/* Charging Flex */}
      <button
        onClick={() => onChangeTab('charging-flex')}
        className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
          activeTab === 'charging-flex'
            ? 'bg-blue-500 text-slate-950 shadow-md'
            : 'text-slate-400 hover:text-white hover:bg-slate-900'
        }`}
      >
        <span>🔌 Charging Ports & Flex</span>
        <span className={`px-1.5 py-0.5 rounded text-[10px] ${activeTab === 'charging-flex' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
          {counts.chargingFlex}
        </span>
      </button>

    </div>
  );
};