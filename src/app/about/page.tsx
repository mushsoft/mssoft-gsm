import Link from 'next/link';
import {
  ArrowLeft,
  GraduationCap,
  MessageCircle,
  Package,
  Rocket,
  ShieldCheck,
  Sparkles,
  Store,
  Wrench,
  Zap,
} from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';

export const metadata = {
  title: 'About Us',
  description:
    "The story behind MS Soft GSM (PhoneHub) — from electrician to phone repair specialist to software engineer, now dealing in genuine phones, repairs, and spares in Kampala, Uganda.",
};

const TIMELINE = [
  {
    year: '2016 – 2020',
    icon: Zap,
    title: 'Started as an Electrician',
    description:
      'Four years of hands-on electrical work built the practical, real-world technical foundation everything after this was built on.',
  },
  {
    year: '2020',
    icon: Wrench,
    title: 'Moved Into Phone Repair',
    description:
      'Began repairing and servicing phones in Kampala — both hardware and software — turning that electrical foundation toward mobile devices.',
  },
  {
    year: 'Ongoing',
    icon: GraduationCap,
    title: 'Studying Software Engineering',
    description:
      'Pursuing a Bachelor of Software Engineering at Ndejje University, adding real software depth on top of hands-on repair skill.',
  },
  {
    year: '',
    icon: Rocket,
    title: 'National ICT Innovation Hub',
    description:
      "Developed and worked out of Uganda's National ICT Innovation Hub in Nakawa — building alongside the country's wider tech ecosystem.",
  },
  {
    year: 'Today',
    icon: Store,
    title: 'MS Soft GSM',
    description:
      'Genuine new & used phone sales, phone & computer repairs and updates, and a full range of accessories & spares — all based in Kampala, Uganda.',
  },
];

const WHAT_WE_DO = [
  { icon: Package, title: 'Genuine Phone Sales', blurb: 'Brand new and UK used phones, sold as exactly what they are.' },
  { icon: Wrench, title: 'Phone & Computer Repair', blurb: 'Hardware and software repairs and updates, done by someone who trained as an electrician first.' },
  { icon: ShieldCheck, title: 'Accessories & Spares', blurb: 'Screens, batteries, chargers, and the full range of parts technicians actually need.' },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-10 px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <Reveal className="text-center">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-500">
          <Sparkles className="h-3 w-3" />
          Our Story
        </div>
        <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
          Built by Someone Who Actually Fixes Phones
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          MS Soft GSM didn&apos;t start as a shop — it started as an electrician&apos;s toolkit, grew into a phone
          repair bench in Kampala, and picked up a software engineering education along the way. Every part sold
          here comes from that same hands-on background.
        </p>
      </Reveal>

      <div>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          The Journey
        </h2>
        <StaggerGroup className="space-y-4">
          {TIMELINE.map(({ year, icon: Icon, title, description }) => (
            <StaggerItem key={title}>
              <div className="flex gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  {year && (
                    <div className="text-[10px] font-bold uppercase tracking-widest text-amber-500">{year}</div>
                  )}
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{title}</h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <div>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          What We Do
        </h2>
        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {WHAT_WE_DO.map(({ icon: Icon, title, blurb }) => (
            <StaggerItem key={title}>
              <div className="flex h-full flex-col items-center gap-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{title}</h3>
                <p className="text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">{blurb}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <Reveal className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-center">
        <h2 className="text-base font-black text-neutral-900 dark:text-white">Got a Question, or a Phone That Needs Fixing?</h2>
        <p className="mx-auto mt-1 max-w-md text-xs text-neutral-500 dark:text-neutral-400">
          Ask a technician directly, or browse what&apos;s in stock right now.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/account/repair-requests"
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-amber-400"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Ask a Technician
          </Link>
          <Link
            href="/shop/phones"
            className="flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-amber-500/50 hover:text-amber-500"
          >
            Shop Phones
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
