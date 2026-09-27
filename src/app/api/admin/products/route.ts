import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { parseProductInput, ProductValidationError } from '@/lib/validateProduct';

function isUniqueConstraintError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && (error as { code: string }).code === 'P2002';
}

// Backs the product picker on the standalone receipt page (/admin/receipts)
// — search-as-you-type by title/brand/modelName, capped small since it's
// feeding a dropdown, not a paginated list.
export async function GET(req: Request) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const q = new URL(req.url).searchParams.get('q')?.trim() ?? '';
  if (!q) {
    return NextResponse.json({ success: true, products: [] });
  }

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
