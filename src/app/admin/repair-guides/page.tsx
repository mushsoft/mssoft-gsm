import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, Plus, Pencil, Wrench } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';

export default async function AdminRepairGuidesPage() {
  await requireAdminPage();

  const guides = await prisma.repairGuide.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Repair Guides</h1>
            <p className="text-xs text-neutral-500">{guides.length} guides</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <AdminNav />

      <div className="flex justify-end">
        <Link
          href="/admin/repair-guides/new"
          className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-500"
        >
          <Plus className="h-3.5 w-3.5" />
          New Guide
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-[10px] uppercase tracking-wide text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-3 font-bold">Guide</th>
              <th className="px-4 py-3 font-bold">Tools</th>
              <th className="px-4 py-3 font-bold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {guides.map((guide) => (
              <tr key={guide.id} className="bg-neutral-50/40 dark:bg-neutral-950/40">
                <td className="px-4 py-3 align-top">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                      {guide.thumbnail ? (
                        <Image src={guide.thumbnail} alt="" fill className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Wrench className="h-4 w-4 text-neutral-400 dark:text-neutral-700" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{guide.title}</div>
                      <div className="text-[10px] text-neutral-500">
                        {guide.brand} · {guide.modelName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 align-middle text-[10px] text-neutral-500">
                  {guide.toolsUsed.length > 0 ? guide.toolsUsed.join(', ') : '—'}
                </td>
                <td className="px-4 py-3 align-middle">
                  <Link
                    href={`/admin/repair-guides/${guide.id}`}
                    className="flex w-fit items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-500"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {guides.length === 0 && (
          <div className="p-8 text-center text-xs text-neutral-500">
            No repair guides yet —{' '}
            <Link href="/admin/repair-guides/new" className="font-bold text-emerald-500 hover:underline">
              create your first one
            </Link>
            .
          </div>
        )}
      </div>
    </main>
  );
}
