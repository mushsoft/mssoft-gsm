import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Code2, GraduationCap, PlayCircle, Sparkles, Wrench } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import type { GuideCategory } from '@/lib/validateRepairGuide';
import Reveal from '@/components/motion/Reveal';

// Shared by /learn-to-repair (hardware repair guides) and
// /learn-to-repair/software-tips (software tips) — same guides table,
// filtered by category, with tabs to switch between the two.

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
      'Flashing, FRP removal, unlocking and firmware tips for technicians: step by step, with the tools to use. Free to follow, or let us do it for you.',
    search: 'Search tips by model, brand, tool, or topic...',
    emptyTitle: 'No software tips published yet',
    emptyHint: 'We publish new software tips regularly. Check back soon.',
  },
};

const TABS: { category: GuideCategory; label: string; href: string; icon: typeof Wrench }[] = [
  { category: 'REPAIR', label: 'Repair Guides', href: '/learn-to-repair', icon: Wrench },
  { category: 'SOFTWARE', label: 'Software Tips', href: '/learn-to-repair/software-tips', icon: Code2 },
];

export default async function GuideListing({
  category,
  brand,
  q,
}: {
  category: GuideCategory;
  brand?: string;
  q?: string;
}) {
  const copy = COPY[category];
  const guides = await prisma.repairGuide
    .findMany({ where: { category }, orderBy: { createdAt: 'desc' } })
    .catch(() => []);

  // Software tips can be general (no brand), so blanks aren't filter chips.
  const brands = Array.from(new Set(guides.map((g) => g.brand).filter(Boolean))).sort();

  const query = q?.trim().toLowerCase() ?? '';
  const filtered = guides.filter((guide) => {
    const matchesBrand = !brand || brand === 'All' || guide.brand === brand;
    const matchesQuery =
      !query ||
      guide.title.toLowerCase().includes(query) ||
      guide.modelName.toLowerCase().includes(query) ||
      guide.brand.toLowerCase().includes(query) ||
      guide.toolsUsed.some((tool) => tool.toLowerCase().includes(query));
    return matchesBrand && matchesQuery;
  });

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
            {category === 'SOFTWARE' ? (
              <Code2 className="h-7 w-7 text-emerald-400" />
            ) : (
              <GraduationCap className="h-7 w-7 text-emerald-400" />
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

      <nav className="flex gap-2">
        {TABS.map((tab) => {
          const active = tab.category === category;
          const Icon = tab.icon;
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
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {guides.length > 0 && (
        <form className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder={copy.search}
            className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
          />
          {brands.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {['All', ...brands].map((b) => (
                <button
                  key={b}
                  type="submit"
                  name="brand"
                  value={b}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                    (brand ?? 'All') === b
                      ? 'bg-emerald-500 text-black'
                      : 'bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-800 dark:hover:text-neutral-200'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          )}
        </form>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            {category === 'SOFTWARE' ? <Code2 className="h-7 w-7" /> : <Wrench className="h-7 w-7" />}
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
              {guides.length === 0 ? copy.emptyTitle : 'Nothing matches your search'}
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-xs text-neutral-500">
              {guides.length === 0 ? copy.emptyHint : 'Try a different search term or brand.'}
            </p>
          </div>
        </div>
      ) : (
        // Each card fades in on its own as it scrolls into view. A single
        // whole-grid trigger (StaggerGroup) never fired on long lists: it
        // waits for 15% of the grid to be on screen, which a 100-card grid
        // is taller than, so the cards stayed invisible.
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((guide) => (
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
                      {category === 'SOFTWARE' ? (
                        <Code2 className="h-10 w-10 text-neutral-700" />
                      ) : (
                        <Wrench className="h-10 w-10 text-neutral-700" />
                      )}
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
      )}

      <Reveal className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-6 text-center">
        <p className="text-xs text-neutral-500">
          Not confident doing it yourself?{' '}
          <a
            href={`https://wa.me/256773944288?text=${encodeURIComponent(
              category === 'SOFTWARE'
                ? 'Hello MS Soft GSM, I need help with a software job (flashing / FRP / unlocking).'
                : 'Hello MS Soft GSM, I need a technician for a repair.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-emerald-400 hover:underline"
          >
            {category === 'SOFTWARE' ? 'Ask us to do it for you on WhatsApp →' : 'Book a professional repair via WhatsApp →'}
          </a>
        </p>
      </Reveal>
    </main>
  );
}
