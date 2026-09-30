import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { parseProductInput, ProductValidationError } from '@/lib/validateProduct';

function isUniqueConstraintError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && (error as { code: string }).code === 'P2002';
}

// Two modes:
// - ?q=... — search-as-you-type by title/brand/modelName for the product
//   picker on /admin/receipts, capped small since it's feeding a dropdown.
// - ?page=N (no q) — full paginated catalog listing for admin auditing/
//   export use cases, ordered by creation date so a batch uploaded together
//   stays contiguous across pages.
export async function GET(req: Request) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const q = url.searchParams.get('q')?.trim() ?? '';

  if (q) {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { brand: { contains: q, mode: 'insensitive' } },
          { modelName: { contains: q, mode: 'insensitive' } },
        ],
      },
      select: { id: true, title: true, price: true, stock: true, brand: true },
      orderBy: { title: 'asc' },
      take: 15,
    });
    return NextResponse.json({ success: true, products });
  }

  const pageParam = url.searchParams.get('page');
  if (!pageParam) {
    return NextResponse.json({ success: true, products: [] });
  }
  const page = Math.max(1, Number(pageParam) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(url.searchParams.get('pageSize')) || 50));

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      select: { id: true, title: true, brand: true, category: true, subcategory: true, price: true, stock: true, images: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.product.count(),
  ]);

  return NextResponse.json({ success: true, products, total, page, pageSize });
}

export async function POST(req: Request) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  let input: ReturnType<typeof parseProductInput>;
  try {
    input = parseProductInput(await req.json());
  } catch (error) {
    const message = error instanceof ProductValidationError ? error.message : 'Malformed request body';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }

  try {
    const product = await prisma.product.create({ data: { ...input, images: [] } });
    return NextResponse.json({ success: true, product });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return NextResponse.json(
        { success: false, error: 'A product with this slug already exists' },
        { status: 409 }
      );
    }
    console.error('Failed to create product', error);
    return NextResponse.json({ success: false, error: 'Unable to create product' }, { status: 500 });
  }
}
