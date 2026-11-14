import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { sendToolOrderUpdateEmail } from '@/lib/email/toolOrderEmails';
import { completeToolOrder, describeToolOrder, refundToolOrder } from '@/lib/toolOrders';
import { formatUsdCents } from '@/lib/walletAmounts';

// POST /api/admin/tool-orders/:id/complete  — loaded on the supplier panel
// POST /api/admin/tool-orders/:id/refund    — couldn't fulfil; money back to wallet
// Both only act on a PAID order (atomic guard in src/lib/toolOrders.ts), so a
// double click or two admins at once can't complete twice or refund twice.
export async function POST(req: Request, { params }: { params: Promise<{ id: string; action: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id, action } = await params;
  if (action !== 'complete' && action !== 'refund') {
    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 404 });
  }

  const body = (await req.json().catch(() => ({}))) as { adminNote?: unknown };
  const adminNote = typeof body.adminNote === 'string' && body.adminNote.trim() ? body.adminNote.trim().slice(0, 1000) : null;

  const order = await prisma.toolOrder.findUnique({ where: { id }, include: { customer: true } });
  if (!order) {
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
  }

  try {
    const { transitioned } = action === 'complete' ? await completeToolOrder(id, adminNote) : await refundToolOrder(id, adminNote);
    if (!transitioned) {
      return NextResponse.json({ success: false, error: 'Order is no longer waiting (already done or refunded)' }, { status: 409 });
    }
  } catch (error) {
    console.error('Failed to update tool order', { id, action, error });
    return NextResponse.json({ success: false, error: 'Unable to update the order' }, { status: 500 });
  }

  await sendToolOrderUpdateEmail({
    orderId: order.id,
    description: describeToolOrder(order),
    total: formatUsdCents(order.totalCents),
    customerName: order.customer.name || order.customer.email,
    customerEmail: order.customer.email,
    outcome: action === 'complete' ? 'COMPLETED' : 'REFUNDED',
    adminNote,
  });

  return NextResponse.json({ success: true });
}
