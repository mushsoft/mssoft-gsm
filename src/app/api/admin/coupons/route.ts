import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { parseCouponInput, CouponValidationError } from '@/lib/validateCoupon';

function isUniqueConstraintError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && (error as { code: string }).code === 'P2002';
}

export async function POST(req: Request) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  let input: ReturnType<typeof parseCouponInput>;
  try {
    input = parseCouponInput(await req.json());
  } catch (error) {
    const message = error instanceof CouponValidationError ? error.message : 'Malformed request body';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }

  try {
    const coupon = await prisma.coupon.create({ data: input });
    return NextResponse.json({ success: true, coupon });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return NextResponse.json({ success: false, error: 'A coupon with this code already exists' }, { status: 409 });
    }
    console.error('Failed to create coupon', error);
    return NextResponse.json({ success: false, error: 'Unable to create coupon' }, { status: 500 });
  }
}
