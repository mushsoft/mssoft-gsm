// Battery data is unavailable in this project, so keep the category optional.
interface SpareProduct {
  id?: string | number;
  _id?: string | number;
  image?: string;
  name?: string;
  title?: string;
  price?: number | string;
}

const BATTERY_SPARES_DATA: readonly SpareProduct[] = [];
// Charging-flex data is unavailable in this project, so keep the category optional.
const CHARGING_FLEX_DATA: readonly SpareProduct[] = [];

function SparesPageContainer({
  screens,
  batteries,
  chargingFlexes,
}: {
  screens: readonly SpareProduct[];
  batteries: readonly SpareProduct[];
  chargingFlexes: readonly SpareProduct[];
}) {
  const spares = [...screens, ...batteries, ...chargingFlexes];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Phone Spares</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spares.map((spare, index) => (
            <div
              key={spare.id ?? spare._id ?? index}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl"
            >
              {spare.image && (
                <img
                  src={spare.image}
                  alt={spare.name ?? spare.title ?? 'Phone spare'}
                  className="w-full h-48 object-contain mb-4"
                />
              )}
              <h2 className="font-bold text-lg">
                {spare.name ?? spare.title ?? 'Phone spare'}
              </h2>
              {spare.price != null && (
                <p className="text-emerald-400 font-bold mt-2">
                  UGX {Number(spare.price).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Await params to comply with Next.js 15+ requirements
  const resolvedParams = await params;
  const category = resolvedParams.category;

  // Render Spares Container when visiting /shop/screens or /shop/spares
  if (category === 'screens' || category === 'spares') {
    return (
      <SparesPageContainer
        screens={[]}
        batteries={BATTERY_SPARES_DATA}
        chargingFlexes={CHARGING_FLEX_DATA}
      />
    );
  }

  // Sanity products are unavailable when no Sanity query module is configured.
  const sanityProducts: SpareProduct[] = [];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold capitalize mb-6">{category} Shop</h1>
        
        {sanityProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sanityProducts.map((prod) => (
              <div key={prod._id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                {prod.image && (
                  <img src={prod.image} alt={prod.name} className="w-full h-48 object-contain mb-4" />
                )}
                <h2 className="font-bold text-lg">{prod.name}</h2>
                <p className="text-emerald-400 font-bold mt-2">UGX {prod.price?.toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-slate-900 rounded-xl border border-slate-800 text-slate-400">
            No items currently listed under this category.
          </div>
        )}
      </div>
    </div>
  );
}