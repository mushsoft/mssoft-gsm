import { notFound } from 'next/navigation';
import { requireAdminPage } from '@/lib/adminAuth';
import ProductForm from '@/components/admin/ProductForm';
import { getCategoryRoute } from '@/lib/productCategoryRoutes';
import AdminBackLink from '@/components/admin/AdminBackLink';

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
      <AdminBackLink href="/admin/products/new" label="Back to Categories" />

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
