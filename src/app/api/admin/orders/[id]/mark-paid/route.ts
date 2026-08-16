import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { markOrderPaid } from '@/lib/orderFulfillment';

// Manual counterpart to the Flutterwave webhook — for cash/in-person or
// other off-platform payments the webhook never sees. Same atomic
// PENDING-guard as the webhook, via the shared helper — safe even if this
// races a webhook delivery for the same order.
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
    const { transitioned } = await markOrderPaid(id);
    if (!transitioned) {
      return NextResponse.json({ success: false, error: 'Order is not pending (already processed)' }, { status: 409 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to mark order as paid', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to mark order as paid' }, { status: 500 });
  }
}
