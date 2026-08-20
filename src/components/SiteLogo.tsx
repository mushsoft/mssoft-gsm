import { Smartphone, Wrench } from 'lucide-react';

const SIZES = {
  sm: { badge: 'h-9 w-9', icon: 'h-5 w-5', accent: 'h-4 w-4 -bottom-1 -right-1', accentIcon: 'h-2.5 w-2.5', word: 'text-xl', tagline: 'text-[9px]' },
  lg: { badge: 'h-11 w-11', icon: 'h-6 w-6', accent: 'h-[18px] w-[18px] -bottom-1 -right-1', accentIcon: 'h-3 w-3', word: 'text-2xl', tagline: 'text-[10px]' },
} as const;

/** Icon mark (phone + wrench, hinting at both product lines) + "PhoneHub" wordmark with the "MS Soft GSM" tagline — used in Header.tsx and Footer.tsx. */
export default function SiteLogo({ size = 'sm' }: { size?: keyof typeof SIZES }) {
  const s = SIZES[size];

  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`relative flex ${s.badge} shrink-0 items-center justify-center rounded-xl bg-amber-500 shadow-lg transition-transform group-hover:scale-105`}
      >
        <Smartphone className={`${s.icon} text-black`} strokeWidth={2.5} />
        <div
          className={`absolute ${s.accent} flex items-center justify-center rounded-full bg-neutral-900 ring-2 ring-white dark:bg-white dark:ring-neutral-950`}
        >
          <Wrench className={`${s.accentIcon} text-amber-500`} strokeWidth={3} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`${s.word} font-black tracking-wider leading-none text-neutral-900 dark:text-white`}>
          Phone<span className="text-amber-500">Hub</span>
        </span>
        <span className={`${s.tagline} mt-0.5 font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400`}>
          MS Soft GSM
        </span>
      </div>
    </div>
  );
}
