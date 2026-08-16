'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const hasImages = images.length > 0;

  return (
    <div className="space-y-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
        {hasImages ? (
          <Image src={images[active]} alt={title} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-contain p-4" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-neutral-400 dark:text-neutral-700">
            <ImageOff className="h-10 w-10" />
            <span className="text-xs">No image available</span>
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border transition-colors ${
                i === active ? 'border-amber-500' : 'border-neutral-200 dark:border-neutral-800 hover:border-amber-500/40'
              }`}
              aria-label={`Show image ${i + 1}`}
            >
              <Image src={url} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
