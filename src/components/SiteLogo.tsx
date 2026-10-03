import Image from 'next/image';

// public/logo-mark.png is a ~1.79:1 rectangle (639x357) — sizing by a fixed
// square badge (the old approach) left huge empty top/bottom margin and
// made the visible mark tiny. Size by height instead and let width follow
// the real aspect ratio, so the chip hugs the mark closely.
const LOGO_RATIO = 639 / 357;

// The source mark has fine gradient linework that turns to mush much below
// ~40px (it was cropped from a flattened business-card photo, not a vector).
const SIZES = {
  sm: { height: 44, word: 'text-xl', tagline: 'text-[9px]' },
  lg: { height: 60, word: 'text-2xl', tagline: 'text-[10px]' },
} as const;

/** Logo mark (public/logo-mark.png, cropped from the official business card) + "MS Soft GSM" wordmark — used in Header.tsx and Footer.tsx. */
export default function SiteLogo({ size = 'sm' }: { size?: keyof typeof SIZES }) {
  const s = SIZES[size];
  const imgHeight = s.height - 12; // leaves room for the chip's padding
  const imgWidth = Math.round(imgHeight * LOGO_RATIO);

  return (
    <div className="flex items-center gap-2.5">
      <div
        // Always a light backdrop (not dark-mode-swapped) — the mark's navy
        // tones need a light surface to read, regardless of site theme.
        className="flex shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white px-2.5 py-1.5 shadow-lg transition-transform group-hover:scale-105"
        style={{ height: s.height }}
      >
        <Image src="/logo-mark.png" alt="MS Soft GSM" width={imgWidth} height={imgHeight} className="object-contain" priority />
      </div>
      <div className="flex flex-col">
        <span className={`${s.word} font-black tracking-wider leading-none text-neutral-900 dark:text-white`}>
          MS Soft <span className="text-amber-500">GSM</span>
        </span>
        <span className={`${s.tagline} mt-0.5 font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400`}>
          Phones, Spares &amp; Repairs
        </span>
      </div>
    </div>
  );
}
