import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { searchDevicesByName, MobileApiError } from '@/lib/mobileApi';

export async function GET(req: Request) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const params = new URL(req.url).searchParams;
  const brand = params.get('brand')?.trim();
  const q = params.get('q')?.trim();
  if (!brand) {
    return NextResponse.json({ success: false, error: 'brand query param is required' }, { status: 400 });
  }
  if (!q || q.length < 2) {
    return NextResponse.json({ success: false, error: 'Type at least 2 characters of the model name' }, { status: 400 });
  }

  try {
    const devices = await searchDevicesByName(q, brand, 10);
    return NextResponse.json({
      success: true,
      models: devices.map((d) => ({ id: d.id, name: d.name })),
    });
  } catch (error) {
    if (error instanceof MobileApiError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status === 429 ? 429 : 502 });
    }
    console.error('Phone model lookup failed', { brand, q, error });
    return NextResponse.json({ success: false, error: 'Unable to fetch models right now' }, { status: 500 });
  }
}
