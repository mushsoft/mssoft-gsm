import { CircuitBoard } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import TestPointForm from '@/components/admin/TestPointForm';
import AdminBackLink from '@/components/admin/AdminBackLink';

export default async function NewTestPointPage() {
  await requireAdminPage();

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <AdminBackLink href="/admin/testpoints" label="Back to Test Points" />

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
          <CircuitBoard className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-black text-neutral-900 dark:text-white">New Test Point</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Create the entry, then add its diagram photo on the next screen.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <TestPointForm
          mode="create"
          initialValues={{
            brand: '',
            modelName: '',
            chipset: '',
            pointType: 'EDL',
            title: '',
            notes: '',
          }}
        />
      </div>
    </main>
  );
}
