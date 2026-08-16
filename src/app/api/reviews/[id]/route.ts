import { NextResponse } from 'next/server';
import { requireCustomerApi } from '@/lib/customerAuth';
import { prisma } from '@/lib/prisma';

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const customer = await requireCustomerApi();
  if (!customer) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const review = await prisma.review.findUnique({ where: { id }, select: { customerId: true } });
  if (!review) {
    return NextResponse.json({ success: false, error: 'Review not found' }, { status: 404 });
  }
  if (review.customerId !== customer.id) {
    return NextResponse.json({ success: false, error: 'You can only delete your own review' }, { status: 403 });
  }

  await prisma.review.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
