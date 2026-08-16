import Link from 'next/link';
import Image from 'next/image';
import { CircuitBoard, Plus, Pencil } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';
import { TESTPOINT_TYPES } from '@/lib/testPointTypes';

export default async function AdminTestPointsPage() {
  await requireAdminPage();

  const testPoints = await prisma.testPoint.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <CircuitBoard className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Test Points</h1>
            <p className="text-xs text-neutral-500">{testPoints.length} diagrams</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <AdminNav />

      <div className="flex justify-end">
        <Link
          href="/admin/testpoints/new"
          className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-black transition-colors hover:bg-amber-400"
        >
          <Plus className="h-3.5 w-3.5" />
          New Test Point
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-[10px] uppercase tracking-wide text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-3 font-bold">Test Point</th>
              <th className="px-4 py-3 font-bold">Type</th>
              <th className="px-4 py-3 font-bold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {testPoints.map((tp) => (
              <tr key={tp.id} className="bg-neutral-50/40 dark:bg-neutral-950/40">
                <td className="px-4 py-3 align-top">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                      {tp.diagramUrl ? (
                        <Image src={tp.diagramUrl} alt="" fill className="object-contain p-1" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <CircuitBoard className="h-4 w-4 text-neutral-400 dark:text-neutral-700" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{tp.title}</div>
                      <div className="text-[10px] text-neutral-500">
                        {tp.brand} · {tp.modelName} · {tp.chipset}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 align-middle text-[10px] text-neutral-500">
                  {TESTPOINT_TYPES.find((t) => t.value === tp.pointType)?.label ?? tp.pointType}
                </td>
                <td className="px-4 py-3 align-middle">
                  <Link
                    href={`/admin/testpoints/${tp.id}`}
                    className="flex w-fit items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-amber-500/40 hover:text-amber-500"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {testPoints.length === 0 && (
          <div className="p-8 text-center text-xs text-neutral-500">
            No test points yet —{' '}
            <Link href="/admin/testpoints/new" className="font-bold text-amber-500 hover:underline">
              create your first one
            </Link>
            .
          </div>
        )}
      </div>
    </main>
  );
}
