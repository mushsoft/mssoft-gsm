import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

const MAX_FIELD_LENGTH = 500;
const PRODUCT_PATH_PATTERN = /^\/shop\/product\/([^/?#]+)/;

export async function POST(req: Request) {
  // Generous cap — this fires on every page navigation, not a user action.
  const { allowed } = rateLimit(`track-visit:${getClientIp(req)}`, 120, 60 * 1000);
  if (!allowed) return NextResponse.json({ success: false }, { status: 429 });

  const body = await req.json().catch(() => null);
  const path = typeof body?.path === 'string' ? body.path.slice(0, MAX_FIELD_LENGTH) : '';
  if (!path) return NextResponse.json({ success: false, error: 'path is required' }, { status: 400 });

  const referrer = typeof body?.referrer === 'string' ? body.referrer.slice(0, MAX_FIELD_LENGTH) : null;
  const userAgent = req.headers.get('user-agent')?.slice(0, MAX_FIELD_LENGTH) ?? null;

  const productSlug = path.match(PRODUCT_PATH_PATTERN)?.[1];
  const product = productSlug
    ? await prisma.product.findUnique({ where: { slug: productSlug }, select: { id: true } })
    : null;

  await prisma.pageView.create({
    data: { path, referrer, userAgent, productId: product?.id ?? null },
  });

  return NextResponse.json({ success: true });
}
