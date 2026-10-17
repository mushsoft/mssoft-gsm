import { KeyRound } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import SoftwareToolForm from '@/components/admin/SoftwareToolForm';
import AdminBackLink from '@/components/admin/AdminBackLink';

export default async function NewSoftwareToolPage() {
  await requireAdminPage();

  const existing = await prisma.softwareTool.findMany({
    select: { category: true },
    distinct: ['category'],
    orderBy: { category: 'asc' },
  });

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <AdminBackLink href="/admin/software-tools" label="Back to Software Tools" />

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
          <KeyRound className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-black text-neutral-900 dark:text-white">New Software Tool</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Enter the supplier cost in Credit units. The UGX price is computed automatically.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <SoftwareToolForm
          mode="create"
          existingCategories={existing.map((e) => e.category)}
          initialValues={{
            category: '',
            title: '',
            creditCost: '',
            order: '0',
          }}
        />
      </div>
    </main>
  );
}
