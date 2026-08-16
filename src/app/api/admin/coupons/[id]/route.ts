import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { parseCouponInput, CouponValidationError } from '@/lib/validateCoupon';

function isUniqueConstraintError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && (error as { code: string }).code === 'P2002';
}

function isNotFoundError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && (error as { code: string }).code === 'P2025';
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  let input: ReturnType<typeof parseCouponInput>;
  try {
    input = parseCouponInput(await req.json());
  } catch (error) {
    const message = error instanceof CouponValidationError ? error.message : 'Malformed request body';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }

  try {
    const coupon = await prisma.coupon.update({ where: { id }, data: input });
    return NextResponse.json({ success: true, coupon });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ success: false, error: 'Coupon not found' }, { status: 404 });
    }
    if (isUniqueConstraintError(error)) {
      return NextResponse.json({ success: false, error: 'A coupon with this code already exists' }, { status: 409 });
    }
    console.error('Failed to update coupon', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to update coupon' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.coupon.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ success: false, error: 'Coupon not found' }, { status: 404 });
    }
    console.error('Failed to delete coupon', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to delete coupon' }, { status: 500 });
  }
}
