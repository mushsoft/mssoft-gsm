import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Public, read-only catalog lookup used to hydrate the cart page with live
// price/stock/image data for whatever product ids are currently sitting in
// the client's localStorage cart — the cart itself never stores that data,
// precisely so it can't go stale. Same public-safe field selection as
// CatalogProductCard's CatalogProduct type.
const MAX_IDS = 100;

export async function GET(req: Request) {
  const idsParam = new URL(req.url).searchParams.get('ids');
  if (!idsParam) {
    return NextResponse.json({ success: false, error: 'ids is required' }, { status: 400 });
  }

  const ids = [...new Set(idsParam.split(',').map((id) => id.trim()).filter(Boolean))].slice(0, MAX_IDS);
  if (ids.length === 0) {
    return NextResponse.json({ success: false, error: 'ids is required' }, { status: 400 });
  }

  try {
    const products = await prisma.product.findMany({
      where: { id: { in: ids } },
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
      },
    });

    // Ids no longer in the DB are simply absent here (not an error) — the
    // cart page diffs requested vs. returned ids to notice a removed item.
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Failed to load products by id', { ids, error });
    return NextResponse.json({ success: false, error: 'Unable to load cart items right now' }, { status: 500 });
  }
}
