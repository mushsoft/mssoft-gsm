import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

const FULFILLMENT_STATUSES = ['PROCESSING', 'READY', 'COMPLETED', 'CANCELLED'] as const;

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
    const order = await prisma.order.update({ where: { id }, data: { fulfillmentStatus } });
    return NextResponse.json({ success: true, order });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }
    console.error('Failed to update order fulfillment status', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to update order' }, { status: 500 });
  }
}
