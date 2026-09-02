import Link from 'next/link';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import RepairGuideForm from '@/components/admin/RepairGuideForm';

export default async function NewRepairGuidePage() {
  await requireAdminPage();

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <Link
        href="/admin/repair-guides"
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-emerald-500"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Repair Guides</span>
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-black text-neutral-900 dark:text-white">New Repair Guide</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Create the entry, then add its photo and video on the next screen.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <RepairGuideForm
          mode="create"
          initialValues={{
            title: '',
            brand: '',
            modelName: '',
            content: '',
            toolsUsed: [],
          }}
        />
      </div>
    </main>
  );
}
