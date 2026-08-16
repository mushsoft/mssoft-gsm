import { CATEGORY_SUBCATEGORIES } from './productSpecFields';

const CATEGORIES = ['PHONE', 'ACCESSORY', 'SPARE_PART', 'REPAIR_TOOL', 'KIDS_TAB'] as const;

export class ProductValidationError extends Error {}

export interface ProductInput {
  title: string;
  slug: string;
  description: string;
  brand: string;
  modelName: string | null;
  category: (typeof CATEGORIES)[number];
  subcategory: string | null;
  price: number;
  originalPrice: number | null;
  isHotDeal: boolean;
  stock: number;
  specs?: object;
}

export function parseProductInput(body: unknown): ProductInput {
  if (typeof body !== 'object' || body === null) {
    throw new ProductValidationError('Request body must be a JSON object');
  }
  const b = body as Record<string, unknown>;

  const title = typeof b.title === 'string' ? b.title.trim() : '';
  const slug = typeof b.slug === 'string' ? b.slug.trim() : '';
  const description = typeof b.description === 'string' ? b.description.trim() : '';
  const brand = typeof b.brand === 'string' ? b.brand.trim() : '';
  const modelName = typeof b.modelName === 'string' && b.modelName.trim() ? b.modelName.trim() : null;
  const category = typeof b.category === 'string' ? b.category : '';
  const subcategoryRaw = typeof b.subcategory === 'string' ? b.subcategory.trim() : '';
  const price = typeof b.price === 'number' ? b.price : Number(b.price);
  const stock = typeof b.stock === 'number' ? b.stock : Number(b.stock);
  const isHotDeal = b.isHotDeal === true;
  const originalPriceRaw = b.originalPrice;
  const originalPrice =
    originalPriceRaw === null || originalPriceRaw === undefined || originalPriceRaw === ''
      ? null
      : typeof originalPriceRaw === 'number'
        ? originalPriceRaw
        : Number(originalPriceRaw);
  const specs =
    typeof b.specs === 'object' && b.specs !== null && !Array.isArray(b.specs) ? b.specs : undefined;

  if (!title) throw new ProductValidationError('Title is required');
  if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    throw new ProductValidationError('Slug is required and must be lowercase letters, numbers, and hyphens only');
  }
  if (!description) throw new ProductValidationError('Description is required');
  if (!brand) throw new ProductValidationError('Brand is required');
  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
    throw new ProductValidationError(`Category must be one of: ${CATEGORIES.join(', ')}`);
  }

  const subcategoryOptions = CATEGORY_SUBCATEGORIES[category as (typeof CATEGORIES)[number]];
  let subcategory: string | null = null;
  if (subcategoryOptions) {
    if (!subcategoryRaw || !subcategoryOptions.some((o) => o.value === subcategoryRaw)) {
      throw new ProductValidationError(
        `Subcategory is required for this category and must be one of: ${subcategoryOptions.map((o) => o.value).join(', ')}`
      );
    }
    subcategory = subcategoryRaw;
  }

  if (!Number.isFinite(price) || price < 0) {
    throw new ProductValidationError('Price must be a non-negative number');
  }
  if (!Number.isInteger(stock) || stock < 0) {
    throw new ProductValidationError('Stock must be a non-negative integer');
  }
  if (originalPrice !== null && (!Number.isFinite(originalPrice) || originalPrice < 0)) {
    throw new ProductValidationError('Original price must be a non-negative number');
  }

  return {
    title,
    slug,
    description,
    brand,
    modelName,
    category: category as (typeof CATEGORIES)[number],
    subcategory,
    price,
    originalPrice,
    isHotDeal,
    stock,
    specs,
  };
}
