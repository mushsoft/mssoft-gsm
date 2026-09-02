import { cache } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Flame, MessageCircle, Package } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import AutoRefresh from '@/components/AutoRefresh';
import ProductGallery from '@/components/product/ProductGallery';
import RelatedProducts from '@/components/product/RelatedProducts';
import ReviewsSection from '@/components/product/ReviewsSection';
import WishlistButton from '@/components/product/WishlistButton';
import BuyNowButton from '@/components/checkout/BuyNowButton';
import AddToCartButton from '@/components/cart/AddToCartButton';
import { getSpecFields, type ProductCategory } from '@/lib/productSpecFields';
import { getRelatedProducts } from '@/lib/relatedProducts';
import { getOrCreateCustomer } from '@/lib/customerAuth';

const WHATSAPP_PHONE = '256773944288';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Shared with generateMetadata so the DB is only hit once per request
// (React dedupes calls to the same cache()-wrapped function).
const getProduct = cache((slug: string) => prisma.product.findUnique({ where: { slug } }));

const CONDITION_SCHEMA_MAP: Record<string, string> = {
  'Brand New': 'https://schema.org/NewCondition',
  'UK Used': 'https://schema.org/UsedCondition',
  'Open Box': 'https://schema.org/RefurbishedCondition',
};

function truncate(text: string, max = 160): string {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  const description = truncate(product.description);
  const image = product.images[0];
  const url = `${baseUrl}/shop/product/${product.slug}`;

  return {
    title: product.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title: product.title,
      description,
      url,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: product.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const inStock = product.stock > 0;
  const hasDiscount = product.originalPrice !== null && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : null;

  const waMessage = `Hello Phone Hub! I want to ORDER this:\n\n📌 *${product.title}*\n💰 Price: UGX ${product.price.toLocaleString()}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMessage)}`;

  const specFields = getSpecFields(product.category as ProductCategory, product.subcategory);
  const specLabels = new Map(specFields.map((f) => [f.key, f.label]));
  const rawSpecs =
    product.specs && typeof product.specs === 'object' && !Array.isArray(product.specs)
      ? (product.specs as Record<string, unknown>)
      : {};
  const specEntries = Object.entries(rawSpecs).filter(([, v]) => v !== null && v !== undefined && v !== '');
  const relatedProducts = await getRelatedProducts(product);

  const customer = await getOrCreateCustomer();
  const wishlistItem = customer
    ? await prisma.wishlistItem.findUnique({
        where: { customerId_productId: { customerId: customer.id, productId: product.id } },
      })
    : null;

  const reviewStats = await prisma.review.aggregate({ where: { productId: product.id }, _avg: { rating: true }, _count: true });
  const conditionValue = typeof rawSpecs.condition === 'string' ? rawSpecs.condition : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images,
    sku: product.id,
    brand: { '@type': 'Brand', name: product.brand },
    ...(conditionValue && CONDITION_SCHEMA_MAP[conditionValue]
      ? { itemCondition: CONDITION_SCHEMA_MAP[conditionValue] }
      : {}),
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/shop/product/${product.slug}`,
      priceCurrency: 'UGX',
      price: product.price,
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    ...(reviewStats._count > 0 && reviewStats._avg.rating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: reviewStats._avg.rating,
            reviewCount: reviewStats._count,
          },
        }
      : {}),
  };

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <AutoRefresh intervalMs={30000} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <ProductGallery images={product.images} title={product.title} />

        <div className="space-y-5">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-500">
                {product.brand}
              </span>
              {product.isHotDeal && (
                <span className="flex items-center gap-1 rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  <Flame className="h-3 w-3 fill-current" />
                  {discountPercent ? `-${discountPercent}%` : 'Hot Deal'}
                </span>
              )}
              {!inStock && (
                <span className="rounded-md bg-red-950/10 dark:bg-red-950/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-500 dark:text-red-300">
                  Out of Stock
                </span>
              )}
            </div>
            <h1 className="text-xl font-black text-neutral-900 dark:text-white sm:text-2xl">{product.title}</h1>
            {product.modelName && <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{product.modelName}</p>}
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-500 dark:text-amber-400">UGX {product.price.toLocaleString()}</span>
            {hasDiscount && (
              <span className="text-sm text-neutral-400 line-through dark:text-neutral-600">
                UGX {product.originalPrice!.toLocaleString()}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <BuyNowButton productId={product.id} productTitle={product.title} price={product.price} inStock={inStock} />
            <AddToCartButton productId={product.id} inStock={inStock} />
            <WishlistButton productId={product.id} initialWishlisted={!!wishlistItem} isLoggedIn={!!customer} />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Order Now
            </a>
          </div>

          <div>
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-neutral-500">Description</h2>
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{product.description}</p>
          </div>

          {specEntries.length > 0 && (
            <div>
              <h2 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">
                <Package className="h-3.5 w-3.5" />
                Specifications
              </h2>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 sm:grid-cols-2">
                {specEntries.map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-3 text-xs">
                    <dt className="text-neutral-500">{specLabels.get(key) ?? key}</dt>
                    <dd className="font-bold text-neutral-800 dark:text-neutral-200">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      <ReviewsSection productId={product.id} />

      <RelatedProducts products={relatedProducts} />
    </main>
  );
}
