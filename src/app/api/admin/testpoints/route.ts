import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { parseTestPointInput, TestPointValidationError } from '@/lib/validateTestPoint';

export async function POST(req: Request) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  let input: ReturnType<typeof parseTestPointInput>;
  try {
    input = parseTestPointInput(await req.json());
  } catch (error) {
    const message = error instanceof TestPointValidationError ? error.message : 'Malformed request body';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }

  try {
    const testPoint = await prisma.testPoint.create({ data: input });
    return NextResponse.json({ success: true, testPoint });
  } catch (error) {
    console.error('Failed to create test point', error);
    return NextResponse.json({ success: false, error: 'Unable to create test point' }, { status: 500 });
  }
}
