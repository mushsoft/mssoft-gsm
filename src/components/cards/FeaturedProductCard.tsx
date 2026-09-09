import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Flame, type LucideIcon } from 'lucide-react';
import type { CatalogProduct } from './CatalogProductCard';

/**
 * Homepage showcase card — image-led and fully tappable. The whole card is one
 * link to the product page; there are no inline buy / order controls (the
 * customer takes the next step on the product page itself). Used inside the
 * homepage coverflow carousel, not on the shop/listing pages.
 */
export default function FeaturedProductCard({
  product,
  fallbackIcon: FallbackIcon,
}: {
  product: CatalogProduct & { category?: string };
  fallbackIcon: LucideIcon;
}) {
  const imageUrl = product.images[0];
  const inStock = product.stock > 0;
  const hasDiscount = product.originalPrice !== null && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : null;
  const priced = product.price > 0;

  return (
    <Link
      href={`/shop/product/${product.slug}`}
      aria-label={product.title}
      className="group relative block overflow-hidden rounded-[1.25rem] border border-neutral-200 bg-white shadow-sm ring-1 ring-transparent transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/10 hover:ring-amber-500/20 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
        <span className="absolute left-3 top-3 z-20 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-amber-300 backdrop-blur-sm">
          {product.brand}
        </span>

        {!inStock ? (
          <span className="absolute right-3 top-3 z-20 rounded-full bg-neutral-900/85 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-neutral-300 backdrop-blur-sm">
            Sold Out
          </span>
        ) : (
          product.isHotDeal && (
            <span className="absolute right-3 top-3 z-20 flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white shadow-lg">
              <Flame className="h-2.5 w-2.5 fill-current" />
              {discountPercent ? `-${discountPercent}%` : 'Hot'}
            </span>
          )
        )}

        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 60vw, 300px"
            className={`object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.06] ${
              inStock ? '' : 'opacity-60 grayscale'
            }`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FallbackIcon className="h-12 w-12 text-neutral-300 dark:text-neutral-700" />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-4 pt-16">
          <h3 className="line-clamp-1 text-sm font-semibold text-white">{product.title}</h3>
          {product.modelName && (
            <p className="mt-0.5 line-clamp-1 text-[11px] text-white/55">{product.modelName}</p>
          )}
          <div className="mt-2.5 flex items-center justify-between gap-2">
            {priced ? (
              <span className="flex items-baseline gap-1.5">
                <span className="text-[15px] font-black text-amber-400">
                  UGX {product.price.toLocaleString()}
                </span>
                {hasDiscount && (
                  <span className="text-[11px] text-white/40 line-through">
                    UGX {product.originalPrice!.toLocaleString()}
                  </span>
                )}
              </span>
            ) : (
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                View details
              </span>
            )}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur transition-all duration-300 group-hover:bg-amber-500 group-hover:text-black">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
