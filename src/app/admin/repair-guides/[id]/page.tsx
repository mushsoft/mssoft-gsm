import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import RepairGuideForm from '@/components/admin/RepairGuideForm';
import DeleteRepairGuideButton from '@/components/admin/DeleteRepairGuideButton';

export default async function EditRepairGuidePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();

  const { id } = await params;
  const guide = await prisma.repairGuide.findUnique({ where: { id } });

  if (!guide) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <Link
        href="/admin/repair-guides"
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-emerald-500"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Repair Guides</span>
      </Link>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white line-clamp-1">{guide.title}</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Created {guide.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
        <DeleteRepairGuideButton guideId={guide.id} guideTitle={guide.title} />
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <RepairGuideForm
          mode="edit"
          guideId={guide.id}
          initialValues={{
            title: guide.title,
            brand: guide.brand,
            modelName: guide.modelName,
            videoUrl: guide.videoUrl ?? '',
            thumbnail: guide.thumbnail,
            content: guide.content,
            toolsUsed: guide.toolsUsed,
          }}
        />
      </div>
    </main>
  );
}
