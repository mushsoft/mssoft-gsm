import { Heart, Package } from 'lucide-react';
import { requireCustomerPage } from '@/lib/customerAuth';
import { prisma } from '@/lib/prisma';
import AccountNav from '@/components/account/AccountNav';
import CatalogProductCard from '@/components/cards/CatalogProductCard';
import { CATEGORY_ICON } from '@/lib/categoryIcons';

export default async function AccountWishlistPage() {
  const customer = await requireCustomerPage();

  const items = await prisma.wishlistItem.findMany({
    where: { customerId: customer.id },
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
          <Heart className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-black text-neutral-900 dark:text-white">My Wishlist</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{items.length} saved items</p>
        </div>
      </div>

      <AccountNav />

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-8 text-center text-xs text-neutral-500">
          Nothing saved yet — tap the heart icon on any product to add it here.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <CatalogProductCard
              key={item.id}
              product={item.product}
              fallbackIcon={CATEGORY_ICON[item.product.category] ?? Package}
            />
          ))}
        </div>
      )}
    </main>
  );
}
