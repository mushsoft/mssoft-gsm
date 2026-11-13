import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { failTopUp } from '@/lib/wallet';

// Marks a pending top-up FAILED (e.g. an Airtel Money transaction ID that
// doesn't match any payment received). Never touches the balance.
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const topUp = await prisma.walletTransaction.findUnique({ where: { id }, select: { type: true } });
  if (!topUp || topUp.type !== 'TOPUP') {
    return NextResponse.json({ success: false, error: 'Top-up not found' }, { status: 404 });
  }

  try {
    const { transitioned } = await failTopUp(id, 'Rejected by admin');
    if (!transitioned) {
      return NextResponse.json({ success: false, error: 'Top-up is not pending (already processed)' }, { status: 409 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to reject wallet top-up', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to reject top-up' }, { status: 500 });
  }
}
