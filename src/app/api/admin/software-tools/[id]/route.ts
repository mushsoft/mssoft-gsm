import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { parseSoftwareToolInput, SoftwareToolValidationError } from '@/lib/validateSoftwareTool';

function isNotFoundError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && (error as { code: string }).code === 'P2025';
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  let input: ReturnType<typeof parseSoftwareToolInput>;
  try {
    input = parseSoftwareToolInput(await req.json());
  } catch (error) {
    const message = error instanceof SoftwareToolValidationError ? error.message : 'Malformed request body';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }

  try {
    const softwareTool = await prisma.softwareTool.update({ where: { id }, data: input });
    return NextResponse.json({ success: true, softwareTool });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ success: false, error: 'Software tool not found' }, { status: 404 });
    }
    console.error('Failed to update software tool', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to update software tool' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.softwareTool.delete({ where: { id } });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ success: false, error: 'Software tool not found' }, { status: 404 });
    }
    console.error('Failed to delete software tool', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to delete software tool' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
