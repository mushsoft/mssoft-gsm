import { NextResponse } from 'next/server';
import { requireCustomerApi } from '@/lib/customerAuth';
import { prisma } from '@/lib/prisma';
import { parseReviewInput, ReviewValidationError } from '@/lib/validateReview';
import { rateLimit } from '@/lib/rateLimit';

function isUniqueConstraintError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && (error as { code: string }).code === 'P2002';
}

export async function POST(req: Request) {
  const customer = await requireCustomerApi();
  if (!customer) {
    return NextResponse.json({ success: false, error: 'Sign in to leave a review' }, { status: 401 });
  }

  const { allowed, retryAfterSeconds } = rateLimit(`review-create:${customer.id}`, 10, 10 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: `Too many reviews submitted. Try again in ${retryAfterSeconds}s.` },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
    );
  }

  let input: ReturnType<typeof parseReviewInput>;
  try {
    input = parseReviewInput(await req.json());
  } catch (error) {
    const message = error instanceof ReviewValidationError ? error.message : 'Malformed request body';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }

  try {
    const review = await prisma.review.create({
      data: { ...input, customerId: customer.id },
    });
    return NextResponse.json({ success: true, review });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return NextResponse.json({ success: false, error: 'You already reviewed this product' }, { status: 409 });
    }
    console.error('Failed to create review', error);
    return NextResponse.json({ success: false, error: 'Unable to submit review' }, { status: 500 });
  }
}
