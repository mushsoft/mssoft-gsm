import Link from 'next/link';
import { KeyRound, Plus, Pencil } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { getShopProfile } from '@/lib/shopProfile';
import { computeSoftwareToolPrice } from '@/lib/softwareToolPricing';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';
import DeleteSoftwareToolButton from '@/components/admin/DeleteSoftwareToolButton';

export default async function AdminSoftwareToolsPage() {
  await requireAdminPage();

  const [tools, profile] = await Promise.all([
    prisma.softwareTool.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }, { title: 'asc' }] }),
    getShopProfile(),
  ]);

  const grouped = new Map<string, typeof tools>();
  for (const tool of tools) {
    if (!grouped.has(tool.category)) grouped.set(tool.category, []);
    grouped.get(tool.category)!.push(tool);
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Unlock &amp; Flash Tools</h1>
            <p className="text-xs text-neutral-500">
              {tools.length} items &middot; rate {profile.creditRateUgx.toLocaleString()} UGX/Credit &middot;{' '}
              <Link href="/admin/settings" className="font-bold text-amber-500 hover:underline">
                change rate
              </Link>
            </p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <AdminNav />

      <div className="flex justify-end">
        <Link
          href="/admin/software-tools/new"
          className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-black transition-colors hover:bg-amber-400"
        >
          <Plus className="h-3.5 w-3.5" />
          New Software Tool
        </Link>
      </div>

      {tools.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-8 text-center text-xs text-neutral-500">
          No software tools yet,{' '}
          <Link href="/admin/software-tools/new" className="font-bold text-amber-500 hover:underline">
            create your first one
          </Link>
          .
        </div>
      ) : (
        Array.from(grouped.entries()).map(([category, items]) => (
          <div key={category} className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <div className="bg-neutral-50 dark:bg-neutral-900 px-4 py-2.5 text-xs font-black uppercase tracking-wide text-neutral-600 dark:text-neutral-300">
              {category} <span className="font-normal text-neutral-400">({items.length})</span>
            </div>
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {items.map((tool) => (
                  <tr key={tool.id} className="bg-white dark:bg-neutral-950/40">
                    <td className="px-4 py-2.5 align-middle">
                      <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{tool.title}</div>
                      <div className="text-[10px] text-neutral-500">{tool.creditCost} Credit</div>
                    </td>
                    <td className="px-4 py-2.5 align-middle text-xs font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">
                      UGX {computeSoftwareToolPrice(tool.creditCost, profile.creditRateUgx).toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5 align-middle">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/software-tools/${tool.id}`}
                          className="flex w-fit items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-amber-500/40 hover:text-amber-500"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Link>
                        <DeleteSoftwareToolButton softwareToolId={tool.id} softwareToolTitle={tool.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </main>
  );
}
