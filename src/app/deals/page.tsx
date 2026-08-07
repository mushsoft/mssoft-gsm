import { client } from '@/lib/sanityQueries';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, ArrowLeft, Flame } from 'lucide-react';

interface Product {
  _id: string;
  title: string;
  brand?: string;
  itemCondition?: string;
  price?: number;
  originalPrice?: number;
  imageUrl?: string;
}

export default async function DealsPage() {
  const hotDeals: Product[] = await client.fetch(
    `*[_type == "product" && isHotDeal == true] | order(_createdAt desc){
      _id,
      title,
      brand,
      itemCondition,
      price,
      originalPrice,
      "imageUrl": image.asset->url
    }`
  ).catch(() => []);

  const whatsappPhone = '256755754880';

  const getWhatsAppLink = (product: Product) => {
    const text = `Hello Phone Hub! I want to order this Hot Deal:\n\n📌 *${product.title}*\n💰 Price: UGX ${product.price?.toLocaleString()}\n🏷️ Condition: ${product.itemCondition === 'uk_used' ? 'UK Used' : 'Brand New'}\n\nPlease confirm availability and delivery.`;
    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-6 min-h-[70vh]">
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-amber-500 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="border-b border-neutral-800 pb-4 flex items-center gap-3">
        <Flame className="w-7 h-7 text-red-500 fill-current" />
        <div>
          <h1 className="text-2xl font-black text-white">Hot Deals & Flash Sales</h1>
          <p className="text-xs text-neutral-400 mt-1">Discounted phones, spares, and accessories</p>
        </div>
      </div>

      {hotDeals.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-neutral-800 rounded-xl text-neutral-400">
          No hot deals currently active. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {hotDeals.map((product) => (
            <div
              key={product._id}
              className="border border-neutral-800 rounded-xl p-3 shadow-sm bg-neutral-900/60 hover:border-amber-500/50 transition-all relative flex flex-col justify-between group"
            >
              {product.itemCondition && (
                <span className="absolute top-2 left-2 z-10 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  {product.itemCondition === 'uk_used' ? 'UK Used' : 'Brand New'}
                </span>
              )}

              <div className="relative h-40 w-full mb-3 bg-neutral-950 rounded-lg p-2">
                {product.imageUrl ? (
                  <Image src={product.imageUrl} alt={product.title} fill className="object-contain group-hover:scale-105 transition-transform" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-neutral-600">
                    No Image
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white line-clamp-1">{product.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-amber-400">
                    UGX {product.price?.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[10px] text-neutral-500 line-through">
                      UGX {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <a
                  href={getWhatsAppLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Order Deal</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}