// app/devices/page.tsx
import { client } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';

interface Testpoint {
  _id: string;
  title: string;
  brand: string;
  subcategory?: string;
  itemCondition?: string;
  imageUrl?: string;
  price?: number;
}

// Fetch testpoint items from Sanity
async function getTestpoints(): Promise<Testpoint[]> {
  const query = `*[_type == "product" && category == "testpoints"]{
    _id,
    title,
    brand,
    subcategory,
    itemCondition,
    "imageUrl": image.asset->url,
    price
  }`;
  
  try {
    return await client.fetch(query);
  } catch (err) {
    console.error('Error fetching testpoints:', err);
    return [];
  }
}

export default async function DevicesPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; chipset?: string; q?: string }>;
}) {
  const params = await searchParams;
  const selectedBrand = params.brand || 'all';
  const selectedChipset = params.chipset || 'all';
  const searchQuery = params.q?.toLowerCase() || '';

  const allTestpoints = await getTestpoints();

  // Filter items dynamically based on URL search parameters
  const filteredItems = allTestpoints.filter((item) => {
    const matchesBrand =
      selectedBrand === 'all' || item.brand?.toLowerCase() === selectedBrand.toLowerCase();
    const matchesChipset =
      selectedChipset === 'all' || item.subcategory?.toLowerCase() === selectedChipset.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery) ||
      item.brand?.toLowerCase().includes(searchQuery);

    return matchesBrand && matchesChipset && matchesSearch;
  });

  const brands = [
    'Apple', 'Samsung', 'Tecno', 'Infinix', 'itel', 'Vivo', 
    'Xiaomi', 'Oppo', 'Realme', 'Nokia', 'Honor', 'Huawei'
  ];

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-600 mb-1">
            {/* Devices & Hardware Schematics */}
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            Device Database & Testpoints
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Browse pinouts, Qualcomm EDL points, MediaTek BROM diagrams, and full specs across indexed devices.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <form method="GET" className="mb-8 space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                name="q"
                defaultValue={params.q || ''}
                placeholder="Search model number, chipset (e.g. SM-G991B, Snapdragon)..."
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            {/* Chipset Select */}
            <select
              name="chipset"
              defaultValue={selectedChipset}
              className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium"
            >
              <option value="all">All Chipsets / Modes</option>
              <option value="qualcomm">Qualcomm EDL</option>
              <option value="mediatek">MediaTek BROM</option>
              <option value="spd">Spreadtrum / Unisoc</option>
            </select>

            {/* Submit Search Button */}
            <button
              type="submit"
              className="rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-amber-700"
            >
              Search
            </button>
          </div>

          {/* Quick Brand Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              href="/devices"
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                selectedBrand === 'all'
                  ? 'bg-amber-600 text-white'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
              }`}
            >
              All Brands
            </Link>
            {brands.map((brand) => (
              <Link
                key={brand}
                href={`/devices?brand=${brand.toLowerCase()}${params.chipset ? `&chipset=${params.chipset}` : ''}`}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  selectedBrand.toLowerCase() === brand.toLowerCase()
                    ? 'bg-amber-600 text-white'
                    : 'bg-secondary text-secondary-foreground hover:bg-muted'
                }`}
              >
                {brand}
              </Link>
            ))}
          </div>
        </form>

        {/* Results Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-4 transition hover:border-amber-600/50 hover:shadow-lg"
              >
                {/* Image / Diagram Banner */}
                <div className="relative mb-4 aspect-4/3 w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-contain p-2 transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
                      <span className="text-2xl mb-1">🔌</span>
                      <span className="text-xs">Diagram Preview</span>
                    </div>
                  )}
                  {item.subcategory && (
                    <span className="absolute top-2 left-2 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-bold tracking-wider text-amber-400 uppercase backdrop-blur-xs">
                      {item.subcategory}
                    </span>
                  )}
                </div>

                {/* Info Content */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase text-amber-600">
                      {item.brand || 'Universal'}
                    </div>
                    <h3 className="text-sm font-bold text-card-foreground line-clamp-2 mt-0.5">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
                    <span className="text-xs font-medium text-muted-foreground">
                      {item.itemCondition === 'uk_used' ? 'UK Used' : 'Brand New'}
                    </span>
                    <button className="rounded-md bg-secondary px-3 py-1.5 text-xs font-bold text-secondary-foreground hover:bg-amber-600 hover:text-white transition">
                      View Pinout
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
            <div className="mb-3 rounded-full bg-amber-600/10 p-4 text-amber-600">
              ⚡
            </div>
            <h3 className="text-lg font-bold">No testpoint diagrams found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mt-1">
              No indexed items match your current filter. Try selecting a different brand or clearing the search query.
            </p>
            <Link
              href="/devices"
              className="mt-4 rounded-lg bg-secondary px-4 py-2 text-xs font-bold text-secondary-foreground hover:bg-muted"
            >
              Reset Filters
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}