import { notFound } from 'next/navigation';
import { KeyRound } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import SoftwareToolForm from '@/components/admin/SoftwareToolForm';
import DeleteSoftwareToolButton from '@/components/admin/DeleteSoftwareToolButton';
import AdminBackLink from '@/components/admin/AdminBackLink';

export default async function EditSoftwareToolPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();

  const { id } = await params;
  const [softwareTool, existing] = await Promise.all([
    prisma.softwareTool.findUnique({ where: { id } }),
    prisma.softwareTool.findMany({ select: { category: true }, distinct: ['category'], orderBy: { category: 'asc' } }),
  ]);

  if (!softwareTool) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <AdminBackLink href="/admin/software-tools" label="Back to Software Tools" />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white line-clamp-1">{softwareTool.title}</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{softwareTool.category}</p>
          </div>
        </div>
        <DeleteSoftwareToolButton softwareToolId={softwareTool.id} softwareToolTitle={softwareTool.title} />
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <SoftwareToolForm
          mode="edit"
          softwareToolId={softwareTool.id}
          existingCategories={existing.map((e) => e.category)}
          initialValues={{
            category: softwareTool.category,
            title: softwareTool.title,
            creditCost: String(softwareTool.creditCost),
            order: String(softwareTool.order),
          }}
        />
      </div>
    </main>
  );
}
