import { NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { buildCategoryWhere } from '@/lib/categoryProductFilter';
import { PRODUCT_SEARCH_FIELDS, productRankFields } from '@/lib/productSearch';
import { rankByRelevance, tokenizeQuery, tokenWhereConditions } from '@/lib/searchQuery';
import { TESTPOINT_SEARCH_FIELDS, TESTPOINT_SEARCH_IGNORE, testpointRankFields } from '@/lib/testPointSearch';

// Live typeahead results as a shopper types in the header search bar — a
// short list (not the full results page), scoped to whichever page they're
// currently browsing. Unlock Tools and Testpoints aren't Product rows at
// all (separate models), so they get their own branches rather than going
// through buildCategoryWhere.
const SUGGEST_LIMIT = 6;
// Fetch a wider pool than we show, then rank it, so the best match isn't cut
// off just because a weaker match was created more recently.
const RANK_POOL = 50;

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
    const tokens = tokenizeQuery(q);
    if (tokens.length === 0) return NextResponse.json({ success: true, results: [] satisfies SearchSuggestion[] });
    const pool = await prisma.softwareTool.findMany({
      where: { AND: tokenWhereConditions<Prisma.SoftwareToolWhereInput>(tokens, ['title', 'category']) },
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
      take: RANK_POOL,
    });
    const tools = rankByRelevance(pool, tokens, q, (t) => [
      { value: t.title, weight: 2 },
      { value: t.category, weight: 1 },
    ]).slice(0, SUGGEST_LIMIT);
    const results: SearchSuggestion[] = tools.map((t) => ({
      id: t.id,
      title: t.title,
      subtitle: t.category,
      href: `/shop/unlock-tools?q=${encodeURIComponent(t.title)}`,
    }));
    return NextResponse.json({ success: true, results });
  }

  if (scope === 'testpoints') {
    const tokens = tokenizeQuery(q, { ignore: TESTPOINT_SEARCH_IGNORE });
    if (tokens.length === 0) return NextResponse.json({ success: true, results: [] satisfies SearchSuggestion[] });
    const pool = await prisma.testPoint.findMany({
      where: { AND: tokenWhereConditions<Prisma.TestPointWhereInput>(tokens, TESTPOINT_SEARCH_FIELDS) },
      orderBy: { createdAt: 'desc' },
      take: RANK_POOL,
    });
    const points = rankByRelevance(pool, tokens, q, testpointRankFields).slice(0, SUGGEST_LIMIT);
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
  const tokens = tokenizeQuery(q);
  if (tokens.length === 0) return NextResponse.json({ success: true, results: [] satisfies SearchSuggestion[] });
  const built = scope !== 'global' ? buildCategoryWhere(scope, { q }) : null;
  const where: Prisma.ProductWhereInput =
    built?.where ?? { AND: tokenWhereConditions<Prisma.ProductWhereInput>(tokens, PRODUCT_SEARCH_FIELDS) };

  const pool = await prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: RANK_POOL,
    select: { id: true, slug: true, title: true, brand: true, modelName: true, price: true, images: true },
  });
  const products = rankByRelevance(pool, tokens, q, productRankFields).slice(0, SUGGEST_LIMIT);
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
