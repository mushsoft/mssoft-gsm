import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { getShopProfile } from '@/lib/shopProfile';

const OPTIONAL_TEXT_FIELDS = [
  'phone',
  'whatsapp',
  'email',
  'website',
  'tiktok',
  'instagram',
  'facebook',
  'address',
  'tinNumber',
] as const;

export async function PATCH(req: Request) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ success: false, error: 'Request body must be a JSON object' }, { status: 400 });
  }
  const b = body as Record<string, unknown>;

  const businessName = typeof b.businessName === 'string' ? b.businessName.trim() : '';
  if (!businessName) {
    return NextResponse.json({ success: false, error: 'Business name is required' }, { status: 400 });
  }

  const data: Record<string, string | null> = { businessName };
  for (const field of OPTIONAL_TEXT_FIELDS) {
    const raw = b[field];
    data[field] = typeof raw === 'string' && raw.trim() ? raw.trim() : null;
  }

  // Singleton — get-or-create the one row, then update it by its real id
  // (an update keyed on a fixed/guessed id would fail the first time).
  const existing = await getShopProfile();

  try {
    const profile = await prisma.shopProfile.update({ where: { id: existing.id }, data });
    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error('Failed to update shop profile', error);
    return NextResponse.json({ success: false, error: 'Unable to save settings' }, { status: 500 });
  }
}
