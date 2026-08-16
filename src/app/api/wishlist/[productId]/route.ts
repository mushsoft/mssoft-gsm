import { NextResponse } from 'next/server';
import { requireCustomerApi } from '@/lib/customerAuth';
import { prisma } from '@/lib/prisma';

export async function DELETE(_req: Request, { params }: { params: Promise<{ productId: string }> }) {
  const customer = await requireCustomerApi();
  if (!customer) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { productId } = await params;

  await prisma.wishlistItem.deleteMany({ where: { customerId: customer.id, productId } });
  return NextResponse.json({ success: true });
}
