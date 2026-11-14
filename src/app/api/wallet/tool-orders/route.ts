import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { requireCustomerApi } from '@/lib/customerAuth';
import { sendNewToolOrderNotification } from '@/lib/email/toolOrderEmails';
import { rateLimit } from '@/lib/rateLimit';
import { describeToolOrder, purchaseTool, ToolOrderError, type ToolOrderDetail } from '@/lib/toolOrders';
import { formatUsdCents } from '@/lib/walletAmounts';

// Buys an unlock/flash tool with wallet balance. Price, validation and the
// guarded debit all happen in purchaseTool (src/lib/toolOrders.ts).
export async function POST(req: Request) {
  const customer = await requireCustomerApi();
  if (!customer) {
    return NextResponse.json({ success: false, error: 'Please log in to pay from your wallet.' }, { status: 401 });
  }

  const { allowed, retryAfterSeconds } = rateLimit(`tool-order:${customer.id}`, 20, 10 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: `Too many orders. Try again in ${retryAfterSeconds}s.` },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
    );
  }

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body.toolId !== 'string') {
    return NextResponse.json({ success: false, error: 'Malformed request body' }, { status: 400 });
  }

  try {
    const order = await purchaseTool(customer.id, body.toolId, body);

    await sendNewToolOrderNotification({
      orderId: order.id,
      description: describeToolOrder(order),
      total: formatUsdCents(order.totalCents),
      customerName: customer.name || customer.email,
      customerEmail: customer.email,
      details: order.details as unknown as ToolOrderDetail[],
      notes: order.notes,
    });

    return NextResponse.json({ success: true, orderId: order.id, totalCents: order.totalCents });
  } catch (error) {
    if (error instanceof ToolOrderError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error('Tool order purchase failed', { customerId: customer.id, toolId: body.toolId, error });
    Sentry.captureException(error, { extra: { customerId: customer.id, toolId: body.toolId } });
    return NextResponse.json({ success: false, error: 'Unable to place your order. Your wallet was not charged.' }, { status: 500 });
  }
}
