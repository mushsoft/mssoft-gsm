import * as sanityQueries from '@/lib/sanityQueries';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, ArrowLeft, CircuitBoard } from 'lucide-react';

type ShopItem = {
  _id: string;
  title: string;
  price?: number;
  imageUrl?: string;
  brand?: string;
};

async function getShopItemsForCategory(category: string): Promise<ShopItem[]> {
  const queryHelper = (sanityQueries as Record<string, unknown>)
    .getShopItemsByCategory;

  if (typeof queryHelper === 'function') {
    return await (queryHelper as (category: string) => Promise<ShopItem[]>)(category);
  }

  return [];
}

export default async function TestpointsPage() {
  const testpoints = await getShopItemsForCategory('testpoints').catch(() => []);

  const whatsappPhone = '256755754880';

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-6 min-h-[75vh]">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
          <CircuitBoard className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">TESTPOINTS & HARDWARE SCHEMATICS</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Qualcomm EDL testpoints, MTK BROM pinouts, Samsung ISP hardware diagrams, and board pinouts.
          </p>
        </div>
      </div>

      {testpoints.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-neutral-800 rounded-xl text-neutral-400">
          No testpoint diagrams or tools listed yet. Upload items in Sanity Studio under Category: &quot;Testpoints&quot;.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {testpoints.map((item) => {
            const waMessage = `Hello Phone Hub! I want to inquire/order this Testpoint Diagram:\n\n📌 *${item.title}*\n💰 Price: ${item.price ? `UGX ${item.price.toLocaleString()}` : 'Free/Inquire'}`;
            const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(waMessage)}`;

            return (
              <div
                key={item._id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex flex-col justify-between hover:border-amber-500/50 transition-all group"
              >
                <div className="relative h-36 w-full mb-3 bg-neutral-950 rounded-lg p-2 flex items-center justify-center">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <CircuitBoard className="w-10 h-10 text-neutral-700" />
                  )}
                </div>

                <div className="space-y-2">
                  {item.brand && (
                    <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wide">
                      {item.brand}
                    </span>
                  )}
                  <h3 className="text-xs font-semibold text-neutral-200 line-clamp-2 h-8">
                    {item.title}
                  </h3>

                  <div className="text-xs font-black text-amber-400">
                    {item.price ? `USh ${item.price.toLocaleString()} UGX` : 'Contact for Price'}
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] rounded-lg transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Get Diagram</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}