'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  MessageCircle,
  Eye,
  X,
  Ruler,
  MonitorSmartphone,
  Zap,
  Plug,
  BatteryFull,
  Layers,
  PackageX,
  CheckCircle2,
} from 'lucide-react';
import type { ScreenSpare } from '@/data/screenSpares';
import type { BatterySpare } from '@/data/batterySpares';
import type { ChargingFlexSpare } from '@/data/chargingFlexSpares';
import type { BackGlassSpare } from '@/data/backGlassSpares';

export type SpareCategory = 'screens' | 'batteries' | 'flex' | 'backGlass';
export type SpareItem = ScreenSpare | BatterySpare | ChargingFlexSpare | BackGlassSpare;

const CATEGORY_ICON: Record<SpareCategory, typeof MonitorSmartphone> = {
  screens: MonitorSmartphone,
  batteries: BatteryFull,
  flex: Plug,
  backGlass: Layers,
};

const WHATSAPP_PHONE = '256755754880';

export default function SparePartCard({
  item,
  category,
}: {
  item: SpareItem;
  category: SpareCategory;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const FallbackIcon = CATEGORY_ICON[category];
  const imageUrl = item.imageUrl;

  const compatibility = 'compatibility' in item ? item.compatibility ?? [] : [];
  const visibleCompat = compatibility.slice(0, 3);
  const extraCompatCount = compatibility.length - visibleCompat.length;

  const waMessage = item.inStock
    ? `Hi MS Soft GSM! I want to order this part:\n\n📦 *${item.name}*\n💰 Price: UGX ${item.priceUGX.toLocaleString()}\nCode: ${item.code || item.model}`
    : `Hi MS Soft GSM! Is this part back in stock?\n\n📦 *${item.name}*\nCode: ${item.code || item.model}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMessage)}`;

  return (
    <>
      <div
        className={`group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 ${
          !item.inStock ? 'opacity-80' : ''
        }`}
      >
        <div
          onClick={() => imageUrl && setIsOpen(true)}
          className={`relative aspect-square w-full overflow-hidden bg-neutral-50 dark:bg-neutral-950 ${
            imageUrl ? 'cursor-zoom-in' : ''
          }`}
        >
          <span className="absolute left-2 top-2 z-10 rounded-md border border-amber-500/20 bg-black/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-400 backdrop-blur-sm">
            {item.brand}
          </span>
          <span className="absolute right-2 top-2 z-10 rounded-md border border-emerald-500/20 bg-black/70 px-2 py-0.5 text-[9px] font-semibold text-emerald-400 backdrop-blur-sm">
            {item.quality}
          </span>

          {!item.inStock && (
            <span className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-1.5 bg-red-950/90 py-1.5 text-[10px] font-bold uppercase tracking-wide text-red-300">
              <PackageX className="h-3 w-3" />
              Out of Stock
            </span>
          )}

          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={item.name}
                fill
                className={`object-contain p-3 transition-transform duration-300 ${
                  item.inStock ? 'group-hover:scale-105' : 'grayscale'
                }`}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/50 group-hover:opacity-100">
                <span className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-[11px] font-bold text-black">
                  <Eye className="h-3.5 w-3.5" />
                  Zoom Photo
                </span>
              </div>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <FallbackIcon className="h-10 w-10 text-neutral-700" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between gap-2.5 p-3">
          <div>
            <h3 className="text-xs font-semibold leading-tight text-neutral-800 dark:text-neutral-200 line-clamp-2">
              {item.name}
            </h3>
            <p className="mt-1 text-[10px] text-neutral-500">
              Model: <span className="font-medium text-neutral-500 dark:text-neutral-400">{item.code || item.model}</span>
            </p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {'size' in item && item.size && (
                <span className="flex items-center gap-1 rounded bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600 dark:text-neutral-300">
                  <Ruler className="h-2.5 w-2.5" />
                  {item.size}
                </span>
              )}
              {'resolution' in item && item.resolution && (
                <span className="flex items-center gap-1 rounded bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600 dark:text-neutral-300">
                  <MonitorSmartphone className="h-2.5 w-2.5" />
                  {item.resolution}
                </span>
              )}
              {'capacity' in item && item.capacity && (
                <span className="flex items-center gap-1 rounded border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-400">
                  <Zap className="h-2.5 w-2.5" />
                  {item.capacity}
                </span>
              )}
              {'features' in item &&
                Array.isArray(item.features) &&
                item.features.map((feat: string, idx: number) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1 rounded border border-purple-500/20 bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-purple-300"
                  >
                    <Plug className="h-2.5 w-2.5" />
                    {feat}
                  </span>
                ))}
            </div>

            {visibleCompat.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-1 text-[9px] text-neutral-500">
                <CheckCircle2 className="h-2.5 w-2.5 text-neutral-600" />
                <span>Fits:</span>
                {visibleCompat.map((code) => (
                  <span key={code} className="rounded bg-neutral-50 dark:bg-neutral-950 px-1 py-0.5 font-mono text-neutral-500 dark:text-neutral-400">
                    {code}
                  </span>
                ))}
                {extraCompatCount > 0 && <span>+{extraCompatCount} more</span>}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-neutral-200 dark:border-neutral-800 pt-2.5">
            <div>
              <div className="text-[9px] text-neutral-500">Price</div>
              <div className="text-xs font-black text-amber-400">
                UGX {item.priceUGX.toLocaleString()}
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all hover:scale-[1.02] active:scale-95 ${
                item.inStock
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                  : 'border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              <MessageCircle className="h-3.5 w-3.5 fill-current" />
              <span>{item.inStock ? 'Order' : 'Ask Stock'}</span>
            </a>
          </div>
        </div>
      </div>

      {isOpen && imageUrl && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wide text-amber-500">
                  {item.brand}
                </span>
                <h2 className="text-base font-bold text-white sm:text-lg">{item.name}</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="shrink-0 rounded-lg bg-neutral-800 p-2 text-neutral-300 transition-colors hover:bg-neutral-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex max-h-[60vh] items-center justify-center overflow-auto rounded-xl border border-neutral-800 bg-black p-2">
              <img src={imageUrl} alt={item.name} className="h-auto max-w-full object-contain" />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-neutral-800 pt-4">
              <span className="text-xs font-black text-amber-400">
                UGX {item.priceUGX.toLocaleString()}
              </span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-emerald-500"
              >
                <MessageCircle className="h-3.5 w-3.5 fill-current" />
                <span>Order via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
