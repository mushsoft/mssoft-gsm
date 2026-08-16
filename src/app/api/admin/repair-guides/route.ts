import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { parseRepairGuideInput, RepairGuideValidationError } from '@/lib/validateRepairGuide';

export async function POST(req: Request) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  let input: ReturnType<typeof parseRepairGuideInput>;
  try {
    input = parseRepairGuideInput(await req.json());
  } catch (error) {
    const message = error instanceof RepairGuideValidationError ? error.message : 'Malformed request body';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }

  try {
    const guide = await prisma.repairGuide.create({ data: input });
    return NextResponse.json({ success: true, guide });
  } catch (error) {
    console.error('Failed to create repair guide', error);
    return NextResponse.json({ success: false, error: 'Unable to create repair guide' }, { status: 500 });
  }
}
