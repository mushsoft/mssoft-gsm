import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// TypeScript interface matching your Sanity product schema
export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  subCategory?: string;
  brand?: string;
  model?: string;
  itemCondition?: "brand_new" | "uk_used";
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  isSoldOut?: boolean;
}

/**
 * 1. HOMEPAGE QUERY
 * Fetches featured banners, recent products, and hot deals for PhoneHub's home page.
 */
export async function getHomePageData() {
  const query = `{
    "featuredProducts": *[_type == "product" && !isSoldOut] | order(_createdAt desc)[0...8] {
      _id,
      name,
      "slug": slug.current,
      category,
      subCategory,
      brand,
      model,
      itemCondition,
      price,
      originalPrice,
      "imageUrl": mainImage.asset->url,
      isSoldOut
    },
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
 * 2. CATEGORY & SHOP PAGE QUERY
 * Fetches products by primary category and optional dynamic filters (subCategory, itemCondition, brand).
 */
export async function getProductsByCategory(
  category: string,
  subCategory?: string,
  condition?: string,
  brand?: string
): Promise<Product[]> {
  const filterConditions = [
    `_type == "product"`,
    `(category == $category || category->slug.current == $category)`
  ];

  if (subCategory) {
    filterConditions.push(`subCategory == $subCategory`);
  }

  if (condition) {
    filterConditions.push(`itemCondition == $condition`);
  }

  if (brand) {
    filterConditions.push(`brand == $brand`);
  }

  const query = `*[${filterConditions.join(" && ")}] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    category,
    subCategory,
    brand,
    model,
    itemCondition,
    price,
    originalPrice,
    "imageUrl": mainImage.asset->url,
    isSoldOut
  }`;

  return await client.fetch<Product[]>(query, {
    category,
    subCategory: subCategory || null,
    condition: condition || null,
    brand: brand || null,
  });
}