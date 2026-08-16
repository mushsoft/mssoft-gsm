import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { parseTestPointInput, TestPointValidationError } from '@/lib/validateTestPoint';
import { TESTPOINT_DIAGRAMS_BUCKET, getSupabaseAdmin, isSupabaseConfigured, pathFromPublicUrl } from '@/lib/supabaseAdmin';

function isNotFoundError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && (error as { code: string }).code === 'P2025';
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  let input: ReturnType<typeof parseTestPointInput>;
  try {
    input = parseTestPointInput(await req.json());
  } catch (error) {
    const message = error instanceof TestPointValidationError ? error.message : 'Malformed request body';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }

  // diagramUrl is intentionally excluded — it's managed exclusively by the
  // dedicated image upload/delete endpoints. parseTestPointInput defaults it
  // to '' when the body omits it (needed for create, where Prisma requires a
  // value), but this form never sends it, so including it here would wipe
  // out any diagram the admin already uploaded on every text-field save.
  const { brand, modelName, chipset, pointType, title, notes } = input;

  try {
    const testPoint = await prisma.testPoint.update({
      where: { id },
      data: { brand, modelName, chipset, pointType, title, notes },
    });
    return NextResponse.json({ success: true, testPoint });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ success: false, error: 'Test point not found' }, { status: 404 });
    }
    console.error('Failed to update test point', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to update test point' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const testPoint = await prisma.testPoint.findUnique({ where: { id }, select: { diagramUrl: true } });
  if (!testPoint) {
    return NextResponse.json({ success: false, error: 'Test point not found' }, { status: 404 });
  }

  try {
    await prisma.testPoint.delete({ where: { id } });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ success: false, error: 'Test point not found' }, { status: 404 });
    }
    console.error('Failed to delete test point', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to delete test point' }, { status: 500 });
  }

  // Best-effort cleanup of the diagram image — the record is already gone at
  // this point, so a storage failure here shouldn't be reported as a failed delete.
  if (isSupabaseConfigured() && testPoint.diagramUrl) {
    const path = pathFromPublicUrl(testPoint.diagramUrl, TESTPOINT_DIAGRAMS_BUCKET);
    if (path) {
      const { error: removeError } = await getSupabaseAdmin().storage.from(TESTPOINT_DIAGRAMS_BUCKET).remove([path]);
      if (removeError) {
        console.error('Failed to clean up storage diagram for deleted test point', { id, removeError });
      }
    }
  }

  return NextResponse.json({ success: true });
}
