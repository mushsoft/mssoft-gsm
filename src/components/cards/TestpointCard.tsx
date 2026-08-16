'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, CircuitBoard, Eye, StickyNote, X, ZoomIn } from 'lucide-react';

type TestpointCardProps = {
  title: string;
  imageUrl?: string;
  brand?: string;
  modelName?: string;
  chipset?: string;
  pointTypeLabel?: string;
  notes?: string | null;
  whatsappUrl: string;
};

export default function TestpointCard({
  title,
  imageUrl,
  brand,
  modelName,
  chipset,
  pointTypeLabel,
  notes,
  whatsappUrl,
}: TestpointCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const subtitle = [modelName, chipset].filter(Boolean).join(' · ');

  return (
    <>
      <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5">
        <div
          onClick={() => imageUrl && setIsOpen(true)}
          className={`relative aspect-square w-full overflow-hidden bg-neutral-50 dark:bg-neutral-950 ${
            imageUrl ? 'cursor-zoom-in' : ''
          }`}
        >
          {brand && (
            <span className="absolute left-2 top-2 z-10 rounded-md border border-amber-500/20 bg-black/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-400 backdrop-blur-sm">
              {brand}
            </span>
          )}
          {pointTypeLabel && (
            <span className="absolute right-2 top-2 z-10 rounded-md border border-neutral-500/30 bg-black/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-200 backdrop-blur-sm">
              {pointTypeLabel}
            </span>
          )}

          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/50 group-hover:opacity-100">
                <span className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-[11px] font-bold text-black">
                  <Eye className="h-3.5 w-3.5" />
                  Zoom Diagram
                </span>
              </div>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <CircuitBoard className="h-10 w-10 text-neutral-700" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between gap-2 p-3">
          <div>
            <h3 className="text-xs font-semibold leading-tight text-neutral-800 dark:text-neutral-200 line-clamp-2">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-0.5 text-[10px] text-neutral-500 dark:text-neutral-500 line-clamp-1">{subtitle}</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => imageUrl && setIsOpen(true)}
            disabled={!imageUrl}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 px-2 py-1.5 text-[11px] font-bold text-neutral-700 dark:text-neutral-200 transition-all hover:bg-amber-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>View Diagram</span>
          </button>
        </div>
      </div>

      {isOpen && imageUrl && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {brand && (
                    <span className="text-[10px] font-bold uppercase tracking-wide text-amber-500">{brand}</span>
                  )}
                  {pointTypeLabel && (
                    <span className="rounded-md border border-neutral-700 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-300">
                      {pointTypeLabel}
                    </span>
                  )}
                </div>
                <h2 className="text-base font-bold text-white sm:text-lg">{title}</h2>
                {subtitle && <p className="text-xs text-neutral-400">{subtitle}</p>}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="shrink-0 rounded-lg bg-neutral-800 p-2 text-neutral-300 transition-colors hover:bg-neutral-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex max-h-[65vh] items-center justify-center overflow-auto rounded-xl border border-neutral-800 bg-black p-2">
              <img src={imageUrl} alt={title} className="h-auto max-w-full object-contain" />
            </div>

            {notes && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
                <StickyNote className="h-4 w-4 shrink-0 text-amber-500" />
                <p className="text-xs leading-relaxed text-neutral-200 whitespace-pre-wrap">{notes}</p>
              </div>
            )}

            <div className="mt-4 flex flex-col items-stretch justify-between gap-3 border-t border-neutral-800 pt-4 sm:flex-row sm:items-center">
              <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                <ZoomIn className="h-3.5 w-3.5" />
                Pinch or scroll to inspect the diagram closely
              </span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-emerald-500"
              >
                <MessageCircle className="h-3.5 w-3.5 fill-current" />
                <span>Ask About This Diagram</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
