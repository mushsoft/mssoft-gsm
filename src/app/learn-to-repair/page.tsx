import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, GraduationCap, PlayCircle, Sparkles, Wrench } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';

interface LearnToRepairPageProps {
  searchParams: Promise<{ brand?: string; q?: string }>;
}

export const metadata = {
  title: 'Learn to Repair',
  description:
    'Free step-by-step phone repair guides and video tutorials — screen replacement, charging port fixes, battery swaps, and more.',
};

export default async function LearnToRepairPage({ searchParams }: LearnToRepairPageProps) {
  const { brand, q } = await searchParams;

  const guides = await prisma.repairGuide
    .findMany({ orderBy: { createdAt: 'desc' } })
    .catch(() => []);

  const brands = Array.from(new Set(guides.map((g) => g.brand))).sort();

  const query = q?.trim().toLowerCase() ?? '';
  const filtered = guides.filter((guide) => {
    const matchesBrand = !brand || brand === 'All' || guide.brand === brand;
    const matchesQuery =
      !query ||
      guide.title.toLowerCase().includes(query) ||
      guide.modelName.toLowerCase().includes(query) ||
      guide.brand.toLowerCase().includes(query);
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
            <GraduationCap className="h-7 w-7 text-emerald-400" />
          </div>
          <div>
            <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              <Sparkles className="h-3 w-3" />
              Free Technician Guides
            </div>
            <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl">Learn to Repair</h1>
            <p className="mt-1 max-w-xl text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
              Step-by-step video tutorials and written guides &mdash; screen swaps, charging ports,
              batteries, and more. Free to follow, or let us do it for you.
            </p>
          </div>
        </div>
      </div>

      {guides.length > 0 && (
        <form className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search guides by model, brand, or topic..."
            className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
          />
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
        </form>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <Wrench className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
              {guides.length === 0 ? 'No guides published yet' : 'No guides match your search'}
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-xs text-neutral-500">
              {guides.length === 0
                ? 'Add guides in Sanity Studio or check back soon — we publish new repair tutorials regularly.'
                : 'Try a different search term or brand.'}
            </p>
          </div>
        </div>
      ) : (
        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((guide) => (
            <StaggerItem key={guide.id}>
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
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Wrench className="h-10 w-10 text-neutral-700" />
                    </div>
                  )}
                  {guide.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <PlayCircle className="h-10 w-10 text-white drop-shadow-lg" />
                    </div>
                  )}
                  <span className="absolute left-2 top-2 rounded-md border border-emerald-500/20 bg-black/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-400 backdrop-blur-sm">
                    {guide.brand}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-200 line-clamp-2">{guide.title}</h3>
                  <p className="text-xs text-neutral-500">{guide.modelName}</p>

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
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}

      <Reveal className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-6 text-center">
        <p className="text-xs text-neutral-500">
          Not confident doing it yourself?{' '}
          <a
            href="https://wa.me/256755754880?text=Hello%20Phone%20Hub%2C%20I%20need%20a%20technician%20for%20a%20repair."
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-emerald-400 hover:underline"
          >
            Book a professional repair via WhatsApp →
          </a>
        </p>
      </Reveal>
    </main>
  );
}
