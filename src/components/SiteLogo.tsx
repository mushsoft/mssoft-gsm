import Image from 'next/image';

// The source mark has fine gradient linework that turns to mush much below
// ~40px (it was cropped from a flattened business-card photo, not a vector),
// so these badges run a bit larger than the old icon-based ones did.
const SIZES = {
  sm: { badge: 'h-12 w-12', img: 40, word: 'text-xl', tagline: 'text-[9px]' },
  lg: { badge: 'h-16 w-16', img: 56, word: 'text-2xl', tagline: 'text-[10px]' },
} as const;

/** Logo mark (public/logo-mark.png, cropped from the official business card) + "MS Soft GSM" wordmark — used in Header.tsx and Footer.tsx. */
export default function SiteLogo({ size = 'sm' }: { size?: keyof typeof SIZES }) {
  const s = SIZES[size];

  return (
    <div className="flex items-center gap-2.5">
      <div
        // Always a light backdrop (not dark-mode-swapped) — the mark's navy
        // tones need a light surface to read, regardless of site theme.
        className={`flex ${s.badge} shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-lg transition-transform group-hover:scale-105`}
      >
        <Image src="/logo-mark.png" alt="MS Soft GSM" width={s.img} height={s.img} className="object-contain" priority />
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
