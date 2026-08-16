import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import ProductForm from '@/components/admin/ProductForm';
import { getCategoryRoute } from '@/lib/productCategoryRoutes';

export default async function NewCategoryProductPage({ params }: { params: Promise<{ category: string }> }) {
  await requireAdminPage();

  const { category: slug } = await params;
  const route = getCategoryRoute(slug);

  if (!route) {
    notFound();
  }

  const Icon = route.icon;

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <Link
        href="/admin/products/new"
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Categories</span>
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-black text-neutral-900 dark:text-white">New {route.label}</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Create the product, then add photos on the next screen.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <ProductForm
          mode="create"
          initialValues={{
            title: '',
            slug: '',
            description: '',
            brand: '',
            modelName: '',
            category: route.category,
            subcategory: '',
            price: '',
            originalPrice: '',
            isHotDeal: false,
            stock: '0',
            specs: {},
            extraSpecs: [],
          }}
        />
      </div>
    </main>
  );
}
