import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { buildCategoryWhere } from '@/lib/categoryProductFilter';

// Live typeahead results as a shopper types in the header search bar — a
// short list (not the full results page), scoped to whichever page they're
// currently browsing. Unlock Tools and Testpoints aren't Product rows at
// all (separate models), so they get their own branches rather than going
// through buildCategoryWhere.
const SUGGEST_LIMIT = 6;

export interface SearchSuggestion {
  id: string;
  title: string;
  subtitle: string;
  price?: number;
  image?: string;
  href: string;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const scope = url.searchParams.get('scope') ?? 'global';
  const q = (url.searchParams.get('q') ?? '').trim();

  if (q.length < 2) {
    return NextResponse.json({ success: true, results: [] satisfies SearchSuggestion[] });
  }

  if (scope === 'unlock-tools') {
    const tools = await prisma.softwareTool.findMany({
      where: { title: { contains: q, mode: 'insensitive' } },
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
      take: SUGGEST_LIMIT,
    });
    const results: SearchSuggestion[] = tools.map((t) => ({
      id: t.id,
      title: t.title,
      subtitle: t.category,
      href: `/shop/unlock-tools?q=${encodeURIComponent(t.title)}`,
    }));
    return NextResponse.json({ success: true, results });
  }

  if (scope === 'testpoints') {
    const points = await prisma.testPoint.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { brand: { contains: q, mode: 'insensitive' } },
          { modelName: { contains: q, mode: 'insensitive' } },
          { chipset: { contains: q, mode: 'insensitive' } },
        ],
      },
      orderBy: { createdAt: 'desc' },
      take: SUGGEST_LIMIT,
    });
    const results: SearchSuggestion[] = points.map((t) => ({
      id: t.id,
      title: t.title,
      subtitle: `${t.brand} ${t.modelName}`,
      image: t.diagramUrl || undefined,
      href: `/shop/testpoints?q=${encodeURIComponent(t.title)}`,
    }));
    return NextResponse.json({ success: true, results });
  }

  // A real category scope reuses buildCategoryWhere so a suggestion always
  // matches what the full results page for that category would show.
  // "global" (homepage, account pages, etc.) searches the whole catalog,
  // same as the existing /shop search page.
  const built = scope !== 'global' ? buildCategoryWhere(scope, { q }) : null;
  const where =
    built?.where ?? {
      OR: [
        { title: { contains: q, mode: 'insensitive' as const } },
        { brand: { contains: q, mode: 'insensitive' as const } },
        { modelName: { contains: q, mode: 'insensitive' as const } },
      ],
    };

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: SUGGEST_LIMIT,
    select: { id: true, slug: true, title: true, brand: true, price: true, images: true },
  });
  const results: SearchSuggestion[] = products.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.brand,
    price: p.price,
    image: p.images[0],
    href: `/shop/product/${p.slug}`,
  }));
  return NextResponse.json({ success: true, results });
}
