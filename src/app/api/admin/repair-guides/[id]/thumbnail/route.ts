import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { REPAIR_GUIDE_MEDIA_BUCKET, getSupabaseAdmin, isSupabaseConfigured, pathFromPublicUrl } from '@/lib/supabaseAdmin';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    console.error('Image upload misconfigured: Supabase env vars missing');
    return NextResponse.json({ success: false, error: 'Image upload is not configured' }, { status: 500 });
  }

  const { id: guideId } = await params;

  const guide = await prisma.repairGuide.findUnique({ where: { id: guideId }, select: { id: true, thumbnail: true } });
  if (!guide) {
    return NextResponse.json({ success: false, error: 'Repair guide not found' }, { status: 404 });
  }

  const formData = await req.formData().catch(() => null);
  const file = formData?.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
  }
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ success: false, error: 'File must be an image' }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ success: false, error: 'Image must be under 5MB' }, { status: 400 });
  }

  const extension = file.name.includes('.') ? file.name.split('.').pop() : file.type.split('/')[1];
  const storagePath = `${guideId}/${crypto.randomUUID()}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const supabaseAdmin = getSupabaseAdmin();
  const { error: uploadError } = await supabaseAdmin.storage
    .from(REPAIR_GUIDE_MEDIA_BUCKET)
    .upload(storagePath, buffer, { contentType: file.type });

  if (uploadError) {
    console.error('Supabase Storage upload failed', uploadError);
    return NextResponse.json({ success: false, error: 'Upload failed. Please try again.' }, { status: 502 });
  }

  const { data: publicUrlData } = supabaseAdmin.storage.from(REPAIR_GUIDE_MEDIA_BUCKET).getPublicUrl(storagePath);

  const updated = await prisma.repairGuide.update({
    where: { id: guideId },
    data: { thumbnail: publicUrlData.publicUrl },
    select: { thumbnail: true },
  });

  // Replacing an existing thumbnail — clean up the old file now that the new one is live.
  if (guide.thumbnail) {
    const oldPath = pathFromPublicUrl(guide.thumbnail, REPAIR_GUIDE_MEDIA_BUCKET);
    if (oldPath) {
      const { error: removeError } = await supabaseAdmin.storage.from(REPAIR_GUIDE_MEDIA_BUCKET).remove([oldPath]);
      if (removeError) {
        console.error('Failed to clean up replaced thumbnail image', removeError);
      }
    }
  }

  return NextResponse.json({ success: true, thumbnail: updated.thumbnail });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    console.error('Image delete misconfigured: Supabase env vars missing');
    return NextResponse.json({ success: false, error: 'Image storage is not configured' }, { status: 500 });
  }

  const { id: guideId } = await params;

  const guide = await prisma.repairGuide.findUnique({ where: { id: guideId }, select: { thumbnail: true } });
  if (!guide) {
    return NextResponse.json({ success: false, error: 'Repair guide not found' }, { status: 404 });
  }

  const storagePath = guide.thumbnail ? pathFromPublicUrl(guide.thumbnail, REPAIR_GUIDE_MEDIA_BUCKET) : null;
  if (storagePath) {
    const { error: removeError } = await getSupabaseAdmin().storage.from(REPAIR_GUIDE_MEDIA_BUCKET).remove([storagePath]);
    if (removeError) {
      console.error('Supabase Storage removal failed (continuing to detach from guide)', removeError);
    }
  }

  await prisma.repairGuide.update({ where: { id: guideId }, data: { thumbnail: '' } });

  return NextResponse.json({ success: true });
}
