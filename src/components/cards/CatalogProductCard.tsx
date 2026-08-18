import Image from 'next/image';
import Link from 'next/link';
import { Flame, MessageCircle, type LucideIcon } from 'lucide-react';
import BuyNowButton from '@/components/checkout/BuyNowButton';

const WHATSAPP_PHONE = '256773944288';

export type CatalogProduct = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  modelName: string | null;
  price: number;
  originalPrice: number | null;
  isHotDeal: boolean;
  stock: number;
  images: string[];
};

export default function CatalogProductCard({
  product,
  fallbackIcon: FallbackIcon,
}: {
  product: CatalogProduct;
  fallbackIcon: LucideIcon;
}) {
  const imageUrl = product.images[0];
  const inStock = product.stock > 0;
  const hasDiscount = product.originalPrice !== null && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : null;
  const waMessage = `Hello Phone Hub! I want to inquire/order:\n\n📌 *${product.title}*\n💰 Price: UGX ${product.price.toLocaleString()}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div
      className={`flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 ${
        !inStock ? 'opacity-80' : ''
      }`}
    >
      <Link href={`/shop/product/${product.slug}`} className="relative block aspect-square w-full overflow-hidden bg-neutral-50 dark:bg-neutral-950">
        <span className="absolute left-2 top-2 z-10 rounded-md border border-amber-500/20 bg-black/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-400 backdrop-blur-sm">
          {product.brand}
        </span>
        {product.isHotDeal && (
          <span className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-md bg-red-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow">
            <Flame className="h-2.5 w-2.5 fill-current" />
            {discountPercent ? `-${discountPercent}%` : 'Hot'}
          </span>
        )}
        {!inStock && (
          <span className="absolute inset-x-0 bottom-0 z-10 bg-red-950/90 py-1.5 text-center text-[10px] font-bold uppercase tracking-wide text-red-300">
            Out of Stock
          </span>
        )}
        {imageUrl ? (
          <Image src={imageUrl} alt={product.title} fill className="object-contain p-3" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FallbackIcon className="h-10 w-10 text-neutral-700" />
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-2.5 p-3">
        <div>
          <Link href={`/shop/product/${product.slug}`}>
            <h3 className="text-xs font-semibold leading-tight text-neutral-800 dark:text-neutral-200 line-clamp-2 hover:text-amber-500">
              {product.title}
            </h3>
          </Link>
          {product.modelName && <p className="mt-1 text-[10px] text-neutral-500">{product.modelName}</p>}
        </div>

        <div>
          <div className="mb-2 flex items-center gap-1.5">
            <span className="text-xs font-black text-amber-500 dark:text-amber-400">UGX {product.price.toLocaleString()}</span>
            {hasDiscount && (
              <span className="text-[10px] text-neutral-400 line-through dark:text-neutral-600">
                UGX {product.originalPrice!.toLocaleString()}
              </span>
            )}
          </div>
          <div className="space-y-1.5">
            <BuyNowButton
              productId={product.id}
              productTitle={product.title}
              price={product.price}
              inStock={inStock}
            />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-1.5 text-[11px] font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
