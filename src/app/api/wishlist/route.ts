import { NextResponse } from 'next/server';
import { requireCustomerApi } from '@/lib/customerAuth';
import { prisma } from '@/lib/prisma';

function isUniqueConstraintError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && (error as { code: string }).code === 'P2002';
}

export async function POST(req: Request) {
  const customer = await requireCustomerApi();
  if (!customer) {
    return NextResponse.json({ success: false, error: 'Sign in to save items' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const productId = typeof body?.productId === 'string' ? body.productId : '';
  if (!productId) {
    return NextResponse.json({ success: false, error: 'productId is required' }, { status: 400 });
  }

  try {
    await prisma.wishlistItem.create({ data: { customerId: customer.id, productId } });
  } catch (error) {
    if (!isUniqueConstraintError(error)) {
      console.error('Failed to add wishlist item', error);
      return NextResponse.json({ success: false, error: 'Unable to save item' }, { status: 500 });
    }
    // Already wishlisted — treat as success, idempotent.
  }

  return NextResponse.json({ success: true });
}
