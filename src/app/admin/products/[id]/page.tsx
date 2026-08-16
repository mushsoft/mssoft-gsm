import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Package } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import ProductForm from '@/components/admin/ProductForm';
import ProductImageUploader from '@/components/admin/ProductImageUploader';
import DeleteProductButton from '@/components/admin/DeleteProductButton';
import { splitSpecs, type ProductCategory } from '@/lib/productSpecFields';
import { getCategoryRouteByCategory } from '@/lib/productCategoryRoutes';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();

  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    notFound();
  }

  const rawSpecs =
    product.specs && typeof product.specs === 'object' && !Array.isArray(product.specs)
      ? (product.specs as Record<string, unknown>)
      : null;
  const { structured: specs, extras: extraSpecs } = splitSpecs(
    rawSpecs,
    product.category as ProductCategory,
    product.subcategory
  );
  const categoryRoute = getCategoryRouteByCategory(product.category);

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Products</span>
      </Link>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-neutral-900 dark:text-white line-clamp-1">{product.title}</h1>
              {categoryRoute && (
                <span className="shrink-0 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-500">
                  {categoryRoute.label}
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Created {product.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
        <DeleteProductButton productId={product.id} productTitle={product.title} />
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-neutral-500">Images</h2>
        <ProductImageUploader productId={product.id} images={product.images} />
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <ProductForm
          mode="edit"
          productId={product.id}
          initialValues={{
            title: product.title,
            slug: product.slug,
            description: product.description,
            brand: product.brand,
            modelName: product.modelName ?? '',
            category: product.category,
            subcategory: product.subcategory ?? '',
            price: String(product.price),
            originalPrice: product.originalPrice !== null ? String(product.originalPrice) : '',
            isHotDeal: product.isHotDeal,
            stock: String(product.stock),
            specs,
            extraSpecs,
          }}
        />
      </div>
    </main>
  );
}
