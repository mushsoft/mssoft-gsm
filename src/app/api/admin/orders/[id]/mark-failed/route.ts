import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { markOrderFailed } from '@/lib/orderFulfillment';

// For cancelling a stuck PENDING order (customer abandoned checkout, paid
// via a different order, etc.) — no stock change, since PENDING orders
// never decrement stock in the first place. Atomically releases a coupon
// reservation made at checkout time, if any, so an abandoned order doesn't
// permanently burn a limited-use code.
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
    const { transitioned } = await markOrderFailed(id);
    if (!transitioned) {
      return NextResponse.json({ success: false, error: 'Order is not pending (already processed)' }, { status: 409 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to mark order as failed', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to update order' }, { status: 500 });
  }
}
