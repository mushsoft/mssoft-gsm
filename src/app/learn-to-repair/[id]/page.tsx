import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MessageCircle, Wrench } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import Reveal from '@/components/motion/Reveal';

interface GuidePageProps {
  params: Promise<{ id: string }>;
}

export default async function RepairGuideDetailPage({ params }: GuidePageProps) {
  const { id } = await params;

  const guide = await prisma.repairGuide.findUnique({ where: { id } }).catch(() => null);

  if (!guide) {
    notFound();
  }

  const waMessage = `Hello Phone Hub! I followed your "${guide.title}" guide but would like professional help.`;
  const whatsappUrl = `https://wa.me/256755754880?text=${encodeURIComponent(waMessage)}`;

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div>
        <Link
          href="/learn-to-repair"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-emerald-400"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Guides</span>
        </Link>
      </div>

      <Reveal>
        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1">
            {guide.brand}
          </span>
          <span className="text-neutral-500">{guide.modelName}</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl">{guide.title}</h1>
      </Reveal>

      {guide.videoUrl && (
        <Reveal delay={0.05}>
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-black">
            <iframe
              src={guide.videoUrl}
              title={guide.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Reveal>
      )}

      {guide.toolsUsed.length > 0 && (
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              <Wrench className="h-3.5 w-3.5 text-emerald-400" />
              Tools You&apos;ll Need
            </div>
            <div className="flex flex-wrap gap-2">
              {guide.toolsUsed.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      <Reveal delay={0.15}>
        <div className="prose dark:prose-invert max-w-none whitespace-pre-line rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {guide.content}
        </div>
      </Reveal>

      <Reveal delay={0.2} className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-6 text-center">
        <p className="mb-3 text-sm text-neutral-500 dark:text-neutral-400">Prefer to leave it to a professional?</p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-emerald-500"
        >
          <MessageCircle className="h-3.5 w-3.5 fill-current" />
          Book a Repair via WhatsApp
        </a>
      </Reveal>
    </main>
  );
}
