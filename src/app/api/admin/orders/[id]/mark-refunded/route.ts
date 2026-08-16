import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { markOrderRefunded } from '@/lib/orderFulfillment';

// For reversing a confirmed payment (customer return, chargeback, goodwill
// refund). Restocks the order's items; does not touch the coupon reservation
// since the discount was genuinely redeemed once.
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const exists = await prisma.order.findUnique({ where: { id }, select: { id: true } });
  if (!exists) {
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
  }

  try {
    const { transitioned } = await markOrderRefunded(id);
    if (!transitioned) {
      return NextResponse.json({ success: false, error: 'Order is not marked successful (cannot refund)' }, { status: 409 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to mark order as refunded', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to update order' }, { status: 500 });
  }
}
