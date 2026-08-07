'use client';

import React, { useState } from 'react';
import { ScreenSpare } from '@/types/spares';
import { formatUGX } from '@/lib/formatters';

interface ScreenCompatibilityModalProps {
  spare: ScreenSpare | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderWhatsApp: (spare: ScreenSpare, modelNote?: string) => void;
}

export const ScreenCompatibilityModal: React.FC<ScreenCompatibilityModalProps> = ({
  spare,
  isOpen,
  onClose,
  onOrderWhatsApp,
}) => {
  const [inputModel, setInputModel] = useState('');

  if (!isOpen || !spare) return null;

  const isMatched =
    inputModel.trim() !== '' &&
    spare.compatibleModels.some((m) =>
      m.toLowerCase().includes(inputModel.trim().toLowerCase())
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl text-slate-100">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              Spare Part Verifier
            </span>
            <h3 className="font-bold text-base text-white mt-0.5">Model Compatibility Check</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <h4 className="font-bold text-sm text-white">{spare.title}</h4>
            <p className="text-xs text-slate-400 mt-1">Grade: <span className="text-emerald-400">{spare.qualityGrade}</span></p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Enter your target device model code
            </label>
            <input
              type="text"
              placeholder="e.g. SM-S928B or iPhone 15 Pro"
              value={inputModel}
              onChange={(e) => setInputModel(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition font-mono"
            />
          </div>

          {/* Verification Box */}
          {inputModel.trim() && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                isMatched
                  ? 'bg-emerald-950/60 border-emerald-700/80 text-emerald-300'
                  : 'bg-amber-950/60 border-amber-700/80 text-amber-300'
              }`}
            >
              <span>{isMatched ? '✅' : '⚠️'}</span>
              <span>
                {isMatched
                  ? `Confirmed fit! ${inputModel.toUpperCase()} is compatible with this display.`
                  : `Model code "${inputModel}" not explicitly listed. Contact tech team on WhatsApp to confirm ribbon connector pins.`}
              </span>
            </div>
          )}

          {/* Technical Specs List */}
          <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Installation Mode:</span>
              <span className="text-slate-200 font-semibold">{spare.installationDifficulty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Includes Frame Chassis:</span>
              <span className="text-slate-200 font-semibold">{spare.includesFrame ? 'Yes' : 'No'}</span>
            </div>
          </div>

          {/* Action */}
          <div className="pt-2">
            <button
              onClick={() => {
                onOrderWhatsApp(spare, inputModel);
                onClose();
              }}
              className="w-full py-3.5 px-4 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-500/20"
            >
              Order Screen Assembly — {formatUGX(spare.priceUgx)}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};