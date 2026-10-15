import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import {
  PRODUCT_IMAGES_BUCKET,
  TESTPOINT_DIAGRAMS_BUCKET,
  REPAIR_GUIDE_MEDIA_BUCKET,
  getSupabaseAdmin,
  isSupabaseConfigured,
  pathFromPublicUrl,
} from '@/lib/supabaseAdmin';
import { applyWatermark } from '@/lib/imageWatermark';

const KNOWN_BUCKETS = [PRODUCT_IMAGES_BUCKET, TESTPOINT_DIAGRAMS_BUCKET, REPAIR_GUIDE_MEDIA_BUCKET];

// One-time retroactive pass: re-fetches an already-live image, stamps the
// watermark onto it, and overwrites it in place at its existing storage path
// (same public URL) so no Product/TestPoint/RepairGuide row needs updating.
// Only meant to be run once per image — running it twice stacks a second
// watermark layer on top of the first.
export async function POST(req: Request) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: 'Image storage is not configured' }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  const imageUrl = typeof body?.imageUrl === 'string' ? body.imageUrl : null;
  if (!imageUrl) {
    return NextResponse.json({ success: false, error: 'imageUrl is required' }, { status: 400 });
  }

  const bucket = KNOWN_BUCKETS.find((b) => imageUrl.includes(`/public/${b}/`));
  if (!bucket) {
    return NextResponse.json({ success: false, error: 'imageUrl does not match a known storage bucket' }, { status: 400 });
  }

  const storagePath = pathFromPublicUrl(imageUrl, bucket);
  if (!storagePath) {
    return NextResponse.json({ success: false, error: 'Could not derive storage path from imageUrl' }, { status: 400 });
  }

  const fetchRes = await fetch(imageUrl);
  if (!fetchRes.ok) {
    return NextResponse.json({ success: false, error: `Could not fetch current image (${fetchRes.status})` }, { status: 502 });
  }
  const rawBuffer = Buffer.from(await fetchRes.arrayBuffer());

  let watermarked: Awaited<ReturnType<typeof applyWatermark>>;
  try {
    watermarked = await applyWatermark(rawBuffer);
  } catch (error) {
    console.error('Watermarking failed', { imageUrl, error });
    return NextResponse.json({ success: false, error: 'Watermarking failed' }, { status: 500 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { error: uploadError } = await supabaseAdmin.storage
    .from(bucket)
    .upload(storagePath, watermarked.buffer, { contentType: watermarked.contentType, upsert: true });

  if (uploadError) {
    console.error('Supabase Storage overwrite failed', { imageUrl, uploadError });
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 502 });
  }

  return NextResponse.json({ success: true, bucket, storagePath });
}
