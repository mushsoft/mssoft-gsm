import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { REPAIR_GUIDE_MEDIA_BUCKET, getSupabaseAdmin, isSupabaseConfigured, pathFromPublicUrl } from '@/lib/supabaseAdmin';

// Sets the guide's videoUrl one of two ways: `{ path }` after the browser
// has already uploaded a file directly to Supabase Storage via the signed
// URL from ./sign (see that file for why the bytes never pass through this
// Vercel Function), or `{ url }` for someone pasting an existing YouTube/
// Vimeo link instead — both land on the same field, so the detail page's
// "is this our own upload or an external embed" check is all that needs to
// know the difference.
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id: guideId } = await params;

  const guide = await prisma.repairGuide.findUnique({ where: { id: guideId }, select: { id: true, videoUrl: true } });
  if (!guide) {
    return NextResponse.json({ success: false, error: 'Repair guide not found' }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  const path = typeof body?.path === 'string' ? body.path : '';
  const url = typeof body?.url === 'string' ? body.url.trim() : '';

  let nextVideoUrl: string;
  if (path) {
    if (!isSupabaseConfigured()) {
      console.error('Video confirm misconfigured: Supabase env vars missing');
      return NextResponse.json({ success: false, error: 'Video upload is not configured' }, { status: 500 });
    }
    // The path was minted by /sign for this exact guide — reject anything
    // else rather than trusting an arbitrary storage path from the client.
    if (!path.startsWith(`${guideId}/`)) {
      return NextResponse.json({ success: false, error: 'Invalid upload path' }, { status: 400 });
    }
    const { data: publicUrlData } = getSupabaseAdmin().storage.from(REPAIR_GUIDE_MEDIA_BUCKET).getPublicUrl(path);
    nextVideoUrl = publicUrlData.publicUrl;
  } else if (url) {
    if (!/^https?:\/\//.test(url)) {
      return NextResponse.json({ success: false, error: 'Video URL must be a valid http(s) URL' }, { status: 400 });
    }
    nextVideoUrl = url;
  } else {
    return NextResponse.json({ success: false, error: 'Provide either path or url' }, { status: 400 });
  }

  const previousVideoUrl = guide.videoUrl;
  const previousUploadPath = previousVideoUrl ? pathFromPublicUrl(previousVideoUrl, REPAIR_GUIDE_MEDIA_BUCKET) : null;

  const updated = await prisma.repairGuide.update({
    where: { id: guideId },
    data: { videoUrl: nextVideoUrl },
    select: { videoUrl: true },
  });

  // Only clean up if the previous videoUrl was itself an uploaded file in our
  // bucket — a pasted YouTube/Vimeo link has no storage object to remove.
  if (previousUploadPath) {
    const { error: removeError } = await getSupabaseAdmin().storage.from(REPAIR_GUIDE_MEDIA_BUCKET).remove([previousUploadPath]);
    if (removeError) {
      console.error('Failed to clean up replaced video file', removeError);
    }
  }

  return NextResponse.json({ success: true, videoUrl: updated.videoUrl });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    console.error('Video delete misconfigured: Supabase env vars missing');
    return NextResponse.json({ success: false, error: 'Video storage is not configured' }, { status: 500 });
  }

  const { id: guideId } = await params;

  const guide = await prisma.repairGuide.findUnique({ where: { id: guideId }, select: { videoUrl: true } });
  if (!guide) {
    return NextResponse.json({ success: false, error: 'Repair guide not found' }, { status: 404 });
  }

  // Only remove a storage object if the current videoUrl is actually an
  // uploaded file in our bucket, never for a pasted external link.
  const storagePath = guide.videoUrl ? pathFromPublicUrl(guide.videoUrl, REPAIR_GUIDE_MEDIA_BUCKET) : null;
  if (storagePath) {
    const { error: removeError } = await getSupabaseAdmin().storage.from(REPAIR_GUIDE_MEDIA_BUCKET).remove([storagePath]);
    if (removeError) {
      console.error('Supabase Storage removal failed (continuing to detach from guide)', removeError);
    }
  }

  await prisma.repairGuide.update({ where: { id: guideId }, data: { videoUrl: null } });

  return NextResponse.json({ success: true });
}
