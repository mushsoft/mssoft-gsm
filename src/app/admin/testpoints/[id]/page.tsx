import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CircuitBoard } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import TestPointForm from '@/components/admin/TestPointForm';
import TestPointDiagramUploader from '@/components/admin/TestPointDiagramUploader';
import DeleteTestPointButton from '@/components/admin/DeleteTestPointButton';

export default async function EditTestPointPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();

  const { id } = await params;
  const testPoint = await prisma.testPoint.findUnique({ where: { id } });

  if (!testPoint) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <Link
        href="/admin/testpoints"
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Test Points</span>
      </Link>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <CircuitBoard className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white line-clamp-1">{testPoint.title}</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Created {testPoint.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
        <DeleteTestPointButton testPointId={testPoint.id} testPointTitle={testPoint.title} />
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-neutral-500">Diagram</h2>
        <TestPointDiagramUploader testPointId={testPoint.id} diagramUrl={testPoint.diagramUrl} />
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <TestPointForm
          mode="edit"
          testPointId={testPoint.id}
          initialValues={{
            brand: testPoint.brand,
            modelName: testPoint.modelName,
            chipset: testPoint.chipset,
            pointType: testPoint.pointType,
            title: testPoint.title,
            notes: testPoint.notes ?? '',
          }}
        />
      </div>
    </main>
  );
}
