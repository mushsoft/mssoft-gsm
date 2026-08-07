"use client";

import React, { useState } from "react";
import { Cpu, Eye, X } from "lucide-react";

interface TestPointProps {
  brand: string;
  modelName: string;
  chipset: string;
  title: string;
  diagramUrl: string;
  notes?: string | null;
}

export default function IspCard({
  brand,
  modelName,
  chipset,
  title,
  diagramUrl,
  notes,
}: TestPointProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-amber-500/50">
        <div className="flex items-center justify-between mb-3">
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-amber-400 border border-slate-700">
            {brand}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <Cpu className="h-3.5 w-3.5 text-slate-500" />
            {chipset}
          </span>
        </div>

        <h3 className="text-base font-bold text-white">
          {modelName} - {title}
        </h3>

        {/* Clickable Image Box */}
        <div 
          onClick={() => setIsOpen(true)}
          className="relative mt-3 aspect-video w-full overflow-hidden rounded-xl bg-slate-950 cursor-pointer border border-slate-800 group"
        >
          <img
            src={diagramUrl}
            alt={`${modelName} ${title}`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 text-white font-medium text-sm">
            <Eye className="h-4 w-4" /> Click to Zoom Diagram
          </div>
        </div>

        {notes && (
          <p className="mt-3 text-xs text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-800 font-mono">
            {notes}
          </p>
        )}
      </div>

      {/* Pop-up Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <div className="relative max-w-5xl w-full bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">{modelName} - {title}</h2>
                <p className="text-xs text-amber-400 font-mono mt-0.5">Chipset: {chipset}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="max-h-[75vh] overflow-auto rounded-xl border border-slate-800 bg-black flex justify-center p-2">
              <img src={diagramUrl} alt={title} className="max-w-full h-auto object-contain" />
            </div>

            {notes && (
              <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-sm font-mono text-slate-300">
                <span className="text-amber-400 font-bold">Technician Notes:</span> {notes}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}