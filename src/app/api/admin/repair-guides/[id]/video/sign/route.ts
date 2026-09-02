import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { REPAIR_GUIDE_MEDIA_BUCKET, getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabaseAdmin';

// Repair clips are far larger than a photo and can't go through a normal
// Route Handler — Vercel Functions cap request bodies at 4.5MB regardless of
// plan, which a 50MB video would blow through immediately. Instead the
// browser uploads the file straight to Supabase Storage using a short-lived
// signed URL minted here (with the service role key), and only that upload's
// resulting object path — a few bytes of JSON — ever passes through Vercel.
// The bucket's own 50MB limit (set when it was created) is the real backstop
// even if this app-level check is bypassed.
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    console.error('Video upload misconfigured: Supabase env vars missing');
    return NextResponse.json({ success: false, error: 'Video upload is not configured' }, { status: 500 });
  }

  const { id: guideId } = await params;

  const guide = await prisma.repairGuide.findUnique({ where: { id: guideId }, select: { id: true } });
  if (!guide) {
    return NextResponse.json({ success: false, error: 'Repair guide not found' }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  const fileName = typeof body?.fileName === 'string' ? body.fileName : '';
  const fileType = typeof body?.fileType === 'string' ? body.fileType : '';
  const fileSize = typeof body?.fileSize === 'number' ? body.fileSize : NaN;

  if (!fileType.startsWith('video/')) {
    return NextResponse.json({ success: false, error: 'File must be a video' }, { status: 400 });
  }
  if (!Number.isFinite(fileSize) || fileSize <= 0) {
    return NextResponse.json({ success: false, error: 'fileSize is required' }, { status: 400 });
  }
  if (fileSize > MAX_FILE_SIZE) {
    return NextResponse.json(
      { success: false, error: 'Video must be under 50MB — trim the clip or upload it to YouTube and paste the link instead' },
      { status: 400 }
    );
  }

  const extension = fileName.includes('.') ? fileName.split('.').pop() : fileType.split('/')[1];
  const path = `${guideId}/${crypto.randomUUID()}.${extension}`;

  const { data, error } = await getSupabaseAdmin()
    .storage.from(REPAIR_GUIDE_MEDIA_BUCKET)
    .createSignedUploadUrl(path);

  if (error || !data) {
    console.error('Failed to create signed upload URL', error);
    return NextResponse.json({ success: false, error: 'Unable to start upload. Please try again.' }, { status: 502 });
  }

  return NextResponse.json({ success: true, path: data.path, token: data.token });
}
