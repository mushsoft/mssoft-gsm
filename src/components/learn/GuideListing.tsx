import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Code2, Cpu, GraduationCap, PlayCircle, Sparkles, Wrench } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import type { GuideCategory } from '@/lib/validateRepairGuide';
import {
  HARDWARE_TOPICS,
  PAGE_SIZE,
  SOFTWARE_TOPICS,
  hardwareTopicFor,
  parseHardwareTopic,
  parseShowCount,
  parseTopic,
  searchGuides,
  topicForBrand,
} from '@/lib/guideTopics';
import LiveSearchBox from '@/components/LiveSearchBox';
import Reveal from '@/components/motion/Reveal';

// Shared by /learn-to-repair (repair guides), /learn-to-repair/software-tips
// and /learn-to-repair/hardware-tips: same guides table, filtered by
// category, with tabs to switch between them.

const COPY: Record<
  GuideCategory,
  { eyebrow: string; title: string; intro: string; search: string; emptyTitle: string; emptyHint: string }
> = {
  REPAIR: {
    eyebrow: 'Free Technician Guides',
    title: 'Learn to Repair',
    intro:
      'Step-by-step video tutorials and written guides for screen swaps, charging ports, batteries, and more. Free to follow, or let us do it for you.',
    search: 'Search guides by model, brand, or topic...',
    emptyTitle: 'No guides published yet',
    emptyHint: 'We publish new repair tutorials regularly. Check back soon.',
  },
  SOFTWARE: {
    eyebrow: 'Free Technician Tips',
    title: 'Software Tips',
    intro:
      'Settings, fixes and how-tos for iPhone, Android, Windows and Linux, plus flashing and unlocking tips for technicians. Step by step and free to follow, or let us do it for you.',
    search: 'Search tips, for example "wifi password" or "iphone battery"',
    emptyTitle: 'No software tips published yet',
    emptyHint: 'We publish new software tips regularly. Check back soon.',
  },
  HARDWARE: {
    eyebrow: 'Free Technician Tips',
    title: 'Hardware Tips',
    intro:
      'Practical tips on screens, batteries, charging, water damage, board repair and tools, plus laptops, tablets and accessories. For technicians and owners. Free to follow, or bring it to us and we fix it.',
    search: 'Search tips, for example "swollen battery" or "charging port"',
    emptyTitle: 'No hardware tips published yet',
    emptyHint: 'We publish new hardware tips regularly. Check back soon.',
  },
};

// What each listing calls one entry, and what the "help" link asks for.
const KIND: Record<GuideCategory, { one: string; many: string; help: string; helpLink: string }> = {
  REPAIR: {
    one: 'guide',
    many: 'guides',
    help: 'Hello MS Soft GSM, I need a technician for a repair.',
    helpLink: 'Book a professional repair via WhatsApp →',
  },
  SOFTWARE: {
    one: 'tip',
    many: 'tips',
    help: 'Hello MS Soft GSM, I need help with a software job (flashing / FRP / unlocking).',
    helpLink: 'Ask us to do it for you on WhatsApp →',
  },
  HARDWARE: {
    one: 'tip',
    many: 'tips',
    help: 'Hello MS Soft GSM, I need a technician for a hardware repair.',
    helpLink: 'Book a professional repair via WhatsApp →',
  },
};

const ICON: Record<GuideCategory, typeof Wrench> = { REPAIR: Wrench, SOFTWARE: Code2, HARDWARE: Cpu };

const TABS: { category: GuideCategory; label: string; href: string; icon: typeof Wrench }[] = [
  { category: 'REPAIR', label: 'Repair Guides', href: '/learn-to-repair', icon: Wrench },
  { category: 'SOFTWARE', label: 'Software Tips', href: '/learn-to-repair/software-tips', icon: Code2 },
  { category: 'HARDWARE', label: 'Hardware Tips', href: '/learn-to-repair/hardware-tips', icon: Cpu },
];

export default async function GuideListing({
  category,
  brand,
  topic,
  q,
  show,
}: {
  category: GuideCategory;
  brand?: string;
  topic?: string;
  q?: string;
  show?: string;
}) {
  const copy = COPY[category];
  const basePath = TABS.find((t) => t.category === category)!.href;
  const guides = await prisma.repairGuide
    .findMany({ where: { category }, orderBy: { createdAt: 'desc' } })
    .catch(() => []);

  const query = q?.trim() ?? '';
  const searched = searchGuides(guides, query);

  // Chips: software tips filter by topic (iPhone, Android, ...), hardware
  // tips by part (Screens, Batteries, ...), repair guides by brand. Each chip
  // shows how many of the search results it holds. Tips can be general (no
  // brand), so blanks aren't brand chips.
  const kind = KIND[category];
  const Icon = ICON[category];
  const isTopical = category !== 'REPAIR';
  const selectedChip: string | null =
    category === 'SOFTWARE'
      ? parseTopic(topic)
      : category === 'HARDWARE'
        ? parseHardwareTopic(topic)
        : brand && brand !== 'All'
          ? brand
          : null;
  const chipParam = isTopical ? 'topic' : 'brand';
  const chipValues: string[] =
    category === 'SOFTWARE'
      ? [...SOFTWARE_TOPICS]
      : category === 'HARDWARE'
        ? [...HARDWARE_TOPICS]
        : Array.from(new Set(guides.map((g) => g.brand).filter(Boolean))).sort();
  const chipOf = (g: (typeof guides)[number]) =>
    category === 'SOFTWARE' ? topicForBrand(g.brand) : category === 'HARDWARE' ? hardwareTopicFor(g.title) : g.brand;

  const filtered = selectedChip ? searched.filter((g) => chipOf(g) === selectedChip) : searched;
  const chips = [
    { label: 'All', value: null as string | null, count: searched.length },
    ...chipValues.map((value) => ({ label: value, value, count: searched.filter((g) => chipOf(g) === value).length })),
  ].filter((chip) => chip.value === null || chip.count > 0 || chip.value === selectedChip);

  const hrefFor = (value: string | null, showCount?: number) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (value) params.set(chipParam, value);
    if (showCount) params.set('show', String(showCount));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  // Render one page of cards at a time. All 500 tips at once made the page
  // about 2 MB of HTML before any photos, slow on mobile data.
  const visibleCount = Math.min(filtered.length, parseShowCount(show));
  const visible = filtered.slice(0, visibleCount);

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-linear-to-br from-white via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950 p-6 sm:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 shadow-lg shadow-emerald-500/10">
            {category === 'REPAIR' ? (
              <GraduationCap className="h-7 w-7 text-emerald-400" />
            ) : (
              <Icon className="h-7 w-7 text-emerald-400" />
            )}
          </div>
          <div>
            <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              <Sparkles className="h-3 w-3" />
              {copy.eyebrow}
            </div>
            <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl">{copy.title}</h1>
            <p className="mt-1 max-w-xl text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">{copy.intro}</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const active = tab.category === category;
          const TabIcon = tab.icon;
          return (
            <Link
              key={tab.category}
              href={tab.href}
              aria-current={active ? 'page' : undefined}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                active
                  ? 'bg-emerald-500 text-black'
                  : 'border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <TabIcon className="h-3.5 w-3.5" />
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {guides.length > 0 && (
        <div className="space-y-3">
          {/* Results update as you type (no page reload) and keep the chosen
              chip. Chips are links, so Enter in the box can't trigger one. */}
          <LiveSearchBox
            basePath={basePath}
            initialQuery={query}
            keep={{ [chipParam]: selectedChip }}
            placeholder={copy.search}
            ariaLabel={`Search ${copy.title.toLowerCase()}`}
          />

          {chipValues.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {chips.map((chip) => {
                const active = chip.value === selectedChip;
                return (
                  <Link
                    key={chip.label}
                    href={hrefFor(chip.value)}
                    scroll={false}
                    aria-current={active ? 'true' : undefined}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                      active
                        ? 'bg-emerald-500 text-black'
                        : 'border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-800 dark:hover:text-neutral-200'
                    }`}
                  >
                    {chip.label}
                    <span className={`text-[10px] font-semibold ${active ? 'text-black/60' : 'text-neutral-400'}`}>
                      {chip.count}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}

          {(query || selectedChip) && (
            <p className="text-xs text-neutral-500">
              {filtered.length} {filtered.length === 1 ? kind.one : kind.many}
              {query && <> for &ldquo;{query}&rdquo;</>}
              {selectedChip && <> in {selectedChip}</>}
              {' · '}
              <Link href={basePath} scroll={false} className="font-semibold text-emerald-500 hover:underline">
                Clear
              </Link>
            </p>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <Icon className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
              {guides.length === 0 ? copy.emptyTitle : 'Nothing matches your search'}
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-xs text-neutral-500">
              {guides.length === 0
                ? copy.emptyHint
                : `Try different words, or another ${isTopical ? 'topic' : 'brand'}.`}
            </p>
          </div>
        </div>
      ) : (
        // Each card fades in on its own as it scrolls into view. A single
        // whole-grid trigger (StaggerGroup) never fired on long lists: it
        // waits for 15% of the grid to be on screen, which a 100-card grid
        // is taller than, so the cards stayed invisible.
        <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((guide) => (
            <Reveal key={guide.id} className="h-full">
              <Link
                href={`/learn-to-repair/${guide.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-50 dark:bg-neutral-950">
                  {guide.thumbnail ? (
                    <Image
                      src={guide.thumbnail}
                      alt={guide.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Icon className="h-10 w-10 text-neutral-700" />
                    </div>
                  )}
                  {guide.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <PlayCircle className="h-10 w-10 text-white drop-shadow-lg" />
                    </div>
                  )}
                  {guide.brand && (
                    <span className="absolute left-2 top-2 rounded-md border border-emerald-500/20 bg-black/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-400 backdrop-blur-sm">
                      {guide.brand}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-200 line-clamp-2">{guide.title}</h3>
                  {guide.modelName && <p className="text-xs text-neutral-500">{guide.modelName}</p>}

                  {guide.toolsUsed.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                      {guide.toolsUsed.slice(0, 3).map((tool) => (
                        <span
                          key={tool}
                          className="rounded bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500 dark:text-neutral-400"
                        >
                          {tool}
                        </span>
                      ))}
                      {guide.toolsUsed.length > 3 && (
                        <span className="rounded bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500">
                          +{guide.toolsUsed.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {visibleCount < filtered.length && (
          <div className="flex flex-col items-center gap-2">
            <Link
              href={hrefFor(selectedChip, visibleCount + PAGE_SIZE)}
              scroll={false}
              className="rounded-full border border-emerald-500/40 px-6 py-2.5 text-sm font-bold text-emerald-500 transition-colors hover:bg-emerald-500 hover:text-black"
            >
              Show more
            </Link>
            <p className="text-xs text-neutral-500">
              Showing {visibleCount} of {filtered.length}
            </p>
          </div>
        )}
        </div>
      )}

      <Reveal className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-6 text-center">
        <p className="text-xs text-neutral-500">
          Not confident doing it yourself?{' '}
          <a
            href={`https://wa.me/256773944288?text=${encodeURIComponent(kind.help)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-emerald-400 hover:underline"
          >
            {kind.helpLink}
          </a>
        </p>
      </Reveal>
    </main>
  );
}
