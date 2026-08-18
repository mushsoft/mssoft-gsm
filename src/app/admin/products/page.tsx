import Link from 'next/link';
import Image from 'next/image';
import type { Prisma } from '@prisma/client';
import { Package, PackagePlus, Pencil } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import AutoRefresh from '@/components/AutoRefresh';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';

const PRODUCT_TABS: { key: string; label: string; where: Prisma.ProductWhereInput }[] = [
  { key: 'all', label: 'All', where: {} },
  { key: 'phones', label: 'Phones', where: { category: 'PHONE' } },
  { key: 'screens', label: 'Screens', where: { category: 'SPARE_PART', subcategory: 'SCREEN' } },
  { key: 'accessories', label: 'Accessories', where: { category: 'ACCESSORY' } },
  { key: 'kids-tabs', label: 'Kids Tabs', where: { category: 'KIDS_TAB' } },
  {
    key: 'spares-tools',
    label: 'Spares & Tools',
    where: { OR: [{ category: 'REPAIR_TOOL' }, { category: 'SPARE_PART', NOT: { subcategory: 'SCREEN' } }] },
  },
];

export default async function AdminProductsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  await requireAdminPage();

  const { tab } = await searchParams;
  const activeTab = PRODUCT_TABS.find((t) => t.key === tab) ?? PRODUCT_TABS[0];

  // Sequential, not Promise.all — concurrent Prisma queries over the shared
  // pooled connection have triggered a Postgres protocol error ("bind
  // message supplies N parameters, but prepared statement requires 0") in
  // this environment (see ReviewsSection.tsx, adminDashboard.ts).
  const products = await prisma.product.findMany({ where: activeTab.where, orderBy: { createdAt: 'desc' } });
  const counts: number[] = [];
  for (const t of PRODUCT_TABS) {
    counts.push(await prisma.product.count({ where: t.where }));
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <AutoRefresh intervalMs={15000} />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Products</h1>
            <p className="text-xs text-neutral-500">{counts[0]} products</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <AdminNav />

      <div className="flex flex-wrap gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
        {PRODUCT_TABS.map((t, i) => {
          const active = t.key === activeTab.key;
          return (
            <Link
              key={t.key}
              href={t.key === 'all' ? '/admin/products' : `/admin/products?tab=${t.key}`}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                active
                  ? 'bg-amber-500 text-black'
                  : 'border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-amber-500/40 hover:text-amber-500'
              }`}
            >
              {t.label}
              <span className={active ? 'text-black/60' : 'text-neutral-400 dark:text-neutral-600'}>{counts[i]}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Link
          href="/admin/products/new"
          className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-black transition-colors hover:bg-amber-400"
        >
          <PackagePlus className="h-3.5 w-3.5" />
          New Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-[10px] uppercase tracking-wide text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-3 font-bold">Product</th>
              <th className="px-4 py-3 font-bold">Category</th>
              <th className="px-4 py-3 font-bold">Price</th>
              <th className="px-4 py-3 font-bold">Stock</th>
              <th className="px-4 py-3 font-bold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {products.map((product) => (
              <tr key={product.id} className="bg-neutral-50/40 dark:bg-neutral-950/40">
                <td className="px-4 py-3 align-top">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                      {product.images[0] ? (
                        <Image src={product.images[0]} alt="" fill className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Package className="h-4 w-4 text-neutral-400 dark:text-neutral-700" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{product.title}</div>
                      <div className="text-[10px] text-neutral-500">
                        {product.brand} {product.modelName ? `· ${product.modelName}` : ''}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 align-middle text-[10px] font-bold uppercase tracking-wide text-amber-500">
                  {product.category}
                  {product.subcategory ? ` · ${product.subcategory}` : ''}
                </td>
                <td className="px-4 py-3 align-middle text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  UGX {product.price.toLocaleString()}
                </td>
                <td className="px-4 py-3 align-middle text-xs">
                  <span
                    className={
                      product.stock > 0
                        ? 'text-neutral-600 dark:text-neutral-300'
                        : 'font-bold text-red-500 dark:text-red-400'
                    }
                  >
                    {product.stock > 0 ? product.stock : 'Out of stock'}
                  </span>
                </td>
                <td className="px-4 py-3 align-middle">
                  <Link
                    href={`/admin/products/${product.id}`}
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

        {products.length === 0 && (
          <div className="p-8 text-center text-xs text-neutral-500">
            No products in {activeTab.label.toLowerCase()} yet —{' '}
            <Link href="/admin/products/new" className="font-bold text-amber-500 hover:underline">
              create one
            </Link>
            .
          </div>
        )}
      </div>
    </main>
  );
}
