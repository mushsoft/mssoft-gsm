import Link from 'next/link';
import { ArrowLeft, PackagePlus } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { PRODUCT_CATEGORY_ROUTES } from '@/lib/productCategoryRoutes';

export default async function NewProductPickerPage() {
  await requireAdminPage();

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Products</span>
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
          <PackagePlus className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-black text-neutral-900 dark:text-white">New Product</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Pick a category — each one has its own form with only the fields it needs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PRODUCT_CATEGORY_ROUTES.map(({ slug, label, description, icon: Icon }) => (
          <Link
            key={slug}
            href={`/admin/products/new/${slug}`}
            className="flex items-start gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 transition-colors hover:border-amber-500/50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white">{label}</div>
              <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
