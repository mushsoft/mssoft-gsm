import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { isProofMethod } from '@/lib/paymentProof';
import { completeTopUp } from '@/lib/wallet';

// Manual approval for top-ups paid straight to us: Airtel Money with a typed
// transaction ID, or a Mobile Money merchant / Binance payment with a
// screenshot. The admin checks the money really arrived before approving.
// Gateway top-ups (pawaPay/Flutterwave) are deliberately not approvable
// here: they're credited only after the gateway's own API confirms payment.
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const topUp = await prisma.walletTransaction.findUnique({ where: { id } });
  if (!topUp || topUp.type !== 'TOPUP') {
    return NextResponse.json({ success: false, error: 'Top-up not found' }, { status: 404 });
  }
  if (topUp.paymentMethod !== 'AIRTEL_MONEY' && !isProofMethod(topUp.paymentMethod)) {
    return NextResponse.json(
      { success: false, error: 'Only top-ups paid straight to us are approved by hand; others confirm automatically.' },
      { status: 400 }
    );
  }

  try {
    const { transitioned } = await completeTopUp(id);
    if (!transitioned) {
      return NextResponse.json({ success: false, error: 'Top-up is not pending (already processed)' }, { status: 409 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to approve wallet top-up', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to approve top-up' }, { status: 500 });
  }
}
