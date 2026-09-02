import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { parseRepairGuideInput, RepairGuideValidationError } from '@/lib/validateRepairGuide';
import { REPAIR_GUIDE_MEDIA_BUCKET, getSupabaseAdmin, isSupabaseConfigured, pathFromPublicUrl } from '@/lib/supabaseAdmin';

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

  // thumbnail/videoUrl are intentionally excluded — they're managed
  // exclusively by the dedicated thumbnail/video upload endpoints.
  // parseRepairGuideInput defaults them ('' / null) when the body omits
  // them (needed for create, where Prisma requires a thumbnail value), but
  // this form never sends them, so including them here would wipe out
  // whatever the admin already uploaded on every text-field save.
  const { title, brand, modelName, content, toolsUsed } = input;

  try {
    const guide = await prisma.repairGuide.update({ where: { id }, data: { title, brand, modelName, content, toolsUsed } });
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

  const guide = await prisma.repairGuide.findUnique({ where: { id }, select: { thumbnail: true, videoUrl: true } });
  if (!guide) {
    return NextResponse.json({ success: false, error: 'Repair guide not found' }, { status: 404 });
  }

  try {
    await prisma.repairGuide.delete({ where: { id } });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ success: false, error: 'Repair guide not found' }, { status: 404 });
    }
    console.error('Failed to delete repair guide', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to delete repair guide' }, { status: 500 });
  }

  // Best-effort cleanup of any uploaded thumbnail/video — the record is
  // already gone at this point, so a storage failure here shouldn't be
  // reported as a failed delete. A pasted external video link has no
  // storage object, so pathFromPublicUrl simply returns null for it.
  if (isSupabaseConfigured()) {
    const paths = [guide.thumbnail, guide.videoUrl]
      .filter((url): url is string => Boolean(url))
      .map((url) => pathFromPublicUrl(url, REPAIR_GUIDE_MEDIA_BUCKET))
      .filter((path): path is string => Boolean(path));

    if (paths.length > 0) {
      const { error: removeError } = await getSupabaseAdmin().storage.from(REPAIR_GUIDE_MEDIA_BUCKET).remove(paths);
      if (removeError) {
        console.error('Failed to clean up storage media for deleted repair guide', { id, removeError });
      }
    }
  }

  return NextResponse.json({ success: true });
}
