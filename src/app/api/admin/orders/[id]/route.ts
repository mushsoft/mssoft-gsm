import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { notifyCustomer } from '@/lib/notifications';
import { orderRef } from '@/lib/orderFulfillment';

const FULFILLMENT_STATUSES = ['PROCESSING', 'READY', 'COMPLETED', 'CANCELLED'] as const;

// What the customer is told when an admin moves their order along.
// PROCESSING is the starting state, so it has no notice.
const FULFILLMENT_NOTICES = {
  READY: { title: 'Your order is ready', body: (ref: string) => `Order ${ref} is ready for pickup or delivery.` },
  COMPLETED: { title: 'Order completed', body: (ref: string) => `Order ${ref} is complete. Thank you for shopping with MS Soft GSM!` },
  CANCELLED: {
    title: 'Order cancelled',
    body: (ref: string) => `Order ${ref} has been cancelled. If you have questions, reply to this email or message us on WhatsApp.`,
  },
} as const;

function isNotFoundError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && (error as { code: string }).code === 'P2025';
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const fulfillmentStatus = body?.fulfillmentStatus;

  if (!FULFILLMENT_STATUSES.includes(fulfillmentStatus)) {
    return NextResponse.json(
      { success: false, error: `fulfillmentStatus must be one of: ${FULFILLMENT_STATUSES.join(', ')}` },
      { status: 400 }
    );
  }

  try {
    // Guarded on the status actually changing, so re-selecting the same
    // value (or a double click) never sends the customer a duplicate notice.
    const changed = await prisma.order.updateMany({
      where: { id, fulfillmentStatus: { not: fulfillmentStatus } },
      data: { fulfillmentStatus },
    });
    const order = await prisma.order.findUniqueOrThrow({ where: { id } });

    const notice = changed.count > 0 ? FULFILLMENT_NOTICES[fulfillmentStatus as keyof typeof FULFILLMENT_NOTICES] : undefined;
    if (notice) {
      await notifyCustomer(
        { customerId: order.customerId, email: order.customerEmail, name: order.customerName },
        { title: notice.title, body: notice.body(orderRef(order.txRef)), link: '/account/orders' }
      );
    }
    return NextResponse.json({ success: true, order });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }
    console.error('Failed to update order fulfillment status', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to update order' }, { status: 500 });
  }
}
