import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { buildCategoryWhere } from '@/lib/categoryProductFilter';

const PAGE_SIZE = 24;

// Public (no auth — this is the same data the category page already renders
// server-side). Backs the "Load More" button on /shop/[category]: the page
// itself server-renders page 1 for a fast first paint and SEO, then this
// route serves pages 2+ without a full page reload.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get('category') ?? '';
  const sub = url.searchParams.get('sub') ?? undefined;
  const brand = url.searchParams.get('brand') ?? undefined;
  const condition = url.searchParams.get('condition') ?? undefined;
  const page = Math.max(1, Number(url.searchParams.get('page')) || 1);

  const built = buildCategoryWhere(category, { sub, brand, condition });
  if (!built) {
    return NextResponse.json({ success: false, error: 'Unknown category' }, { status: 404 });
  }

  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where: built.where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        slug: true,
        title: true,
        brand: true,
        modelName: true,
        price: true,
        originalPrice: true,
        isHotDeal: true,
        stock: true,
        images: true,
        category: true,
      },
    }),
    prisma.product.count({ where: built.where }),
  ]);

  const hasMore = page * PAGE_SIZE < totalCount;
  return NextResponse.json({ success: true, products, hasMore });
}
