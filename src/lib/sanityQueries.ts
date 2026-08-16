import { client } from "./sanity";

export { client };

// TypeScript interface matching the active Sanity `product` schema
// (see sanity.config.ts) — field names must stay in sync with it.
export interface Product {
  _id: string;
  title: string;
  slug: string;
  category: string;
  accessoryType?: string;
  brand?: string;
  modelName?: string;
  itemCondition?: "brand_new" | "uk_used" | "open_box";
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  isSoldOut?: boolean;
}

export type ShopItem = Pick<Product, "_id" | "title" | "price" | "imageUrl" | "brand">;

// URL category slugs (used throughout the app's routes) mapped to the
// uppercase `category` enum values actually defined in sanity.config.ts.
const CATEGORY_SLUG_TO_ENUM: Record<string, string> = {
  phones: "PHONE",
  screens: "SCREEN",
  spares: "SCREEN",
  accessories: "ACCESSORY",
  tools: "REPAIR_TOOL",
  testpoints: "TESTPOINT",
};

const PRODUCT_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  category,
  accessoryType,
  brand,
  modelName,
  itemCondition,
  price,
  originalPrice,
  "imageUrl": image.asset->url,
  isSoldOut
}`;

/**
 * HOMEPAGE QUERY
 * Fetches recent products and any banners for the home page.
 */
export async function getHomePageData() {
  const query = `{
    "featuredProducts": *[_type == "product" && !isSoldOut] | order(_createdAt desc)[0...8] ${PRODUCT_PROJECTION},
    "banners": *[_type == "banner"] {
      _id,
      title,
      subtitle,
      "imageUrl": image.asset->url,
      link
    }
  }`;

  return await client.fetch(query);
}

/**
 * CATEGORY & SHOP PAGE QUERY
 * Fetches products by primary category (accepts either a URL slug like
 * "screens" or the raw Sanity enum value like "SCREEN") and optional filters.
 */
export async function getProductsByCategory(
  category: string,
  condition?: string,
  brand?: string
): Promise<Product[]> {
  const categoryValue = CATEGORY_SLUG_TO_ENUM[category.toLowerCase()] ?? category;

  const filterConditions = [`_type == "product"`, `category == $category`];

  if (condition) {
    filterConditions.push(`itemCondition == $condition`);
  }

  if (brand) {
    filterConditions.push(`brand == $brand`);
  }

  const query = `*[${filterConditions.join(" && ")}] | order(_createdAt desc) ${PRODUCT_PROJECTION}`;

  return await client.fetch<Product[]>(query, {
    category: categoryValue,
    condition: condition || null,
    brand: brand || null,
  });
}

/**
 * Lightweight variant of getProductsByCategory used by shop category pages
 * that only need id/title/price/image/brand (e.g. the testpoints diagram shop).
 */
export async function getShopItemsByCategory(category: string): Promise<ShopItem[]> {
  const products = await getProductsByCategory(category);
  return products.map(({ _id, title, price, imageUrl, brand }) => ({
    _id,
    title,
    price,
    imageUrl,
    brand,
  }));
}
