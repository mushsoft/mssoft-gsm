import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { parseRepairGuideInput, RepairGuideValidationError } from '@/lib/validateRepairGuide';

function isNotFoundError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && (error as { code: string }).code === 'P2025';
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  let input: ReturnType<typeof parseRepairGuideInput>;
  try {
    input = parseRepairGuideInput(await req.json());
  } catch (error) {
    const message = error instanceof RepairGuideValidationError ? error.message : 'Malformed request body';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }

  try {
    const guide = await prisma.repairGuide.update({ where: { id }, data: input });
    return NextResponse.json({ success: true, guide });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ success: false, error: 'Repair guide not found' }, { status: 404 });
    }
    console.error('Failed to update repair guide', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to update repair guide' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.repairGuide.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ success: false, error: 'Repair guide not found' }, { status: 404 });
    }
    console.error('Failed to delete repair guide', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to delete repair guide' }, { status: 500 });
  }
}
