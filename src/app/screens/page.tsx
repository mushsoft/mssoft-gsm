import type { Product } from "@/types/product";
import { ProductCard } from "@/components/cards/ProductCard";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";

// Ensure Next.js always fetches fresh screens from Sanity
export const revalidate = 0;

interface ScreenProduct {
  _id: string;
  title: string;
  brand?: string;
  modelName?: string;
  price?: number | string;
  category?: string;
  image?: Record<string, unknown>;
}

// Fetch screens from Sanity CMS
async function getScreens(): Promise<ScreenProduct[]> {
  try {
    const query = `*[_type == "product" && category == "SCREEN"] | order(_createdAt desc) {
      _id,
      title,
      brand,
      modelName,
      price,
      category,
      image
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch screens from Sanity:", error);
    return [];
  }
}

export default async function ScreensPage() {
  const screens = await getScreens();

  // Group screens by brand
  const brands = Array.from(
    new Set(screens.map((item: ScreenProduct) => item.brand || "Other"))
  );

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-amber-400">Phone Replacement Screens</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 mb-8">
          Browse replacement displays organized by brand and model.
        </p>

        {screens.length === 0 ? (
          <div className="p-8 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            No screens added yet. Add your first screen from the{" "}
            <Link href="/studio" className="text-amber-400 underline">
              Sanity Studio
            </Link>
            !
          </div>
        ) : (
          <div className="space-y-12">
            {brands.map((brandName) => {
              const brandItems = screens.filter(
                (s: ScreenProduct) => (s.brand || "Other") === brandName
              );

              return (
                <section key={brandName} className="space-y-4">
                  <div className="flex items-center gap-3 border-l-4 border-amber-500 pl-3">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">
                      {brandName === "Apple" ? "iPhone (Apple) Screens" : `${brandName} Screens`}
                    </h2>
                    <span className="text-xs bg-white dark:bg-slate-900 text-amber-400 font-mono px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-800">
                      {brandItems.length} {brandItems.length === 1 ? "Model" : "Models"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {brandItems.map((screen: ScreenProduct) => (
                      <ProductCard
                        key={screen._id}
                        product={
                          {
                            id: screen._id,
                            name: screen.title,
                            brand: screen.brand,
                            modelName: screen.modelName,
                            price: screen.price,
                            priceUgx: typeof screen.price === "number" ? screen.price : Number(screen.price) || 0,
                            condition: "New",
                            category: screen.category,
                            image: screen.image ? urlFor(screen.image).url() : undefined,
                          } as unknown as Product
                        }
                        onOpenSpecs={() => undefined}
                        onOrderWhatsApp={() => undefined}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}