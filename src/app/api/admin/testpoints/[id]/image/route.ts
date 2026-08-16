import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { TESTPOINT_DIAGRAMS_BUCKET, getSupabaseAdmin, isSupabaseConfigured, pathFromPublicUrl } from '@/lib/supabaseAdmin';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    console.error('Image upload misconfigured: Supabase env vars missing');
    return NextResponse.json({ success: false, error: 'Image upload is not configured' }, { status: 500 });
  }

  const { id: testPointId } = await params;

  const testPoint = await prisma.testPoint.findUnique({ where: { id: testPointId }, select: { id: true, diagramUrl: true } });
  if (!testPoint) {
    return NextResponse.json({ success: false, error: 'Test point not found' }, { status: 404 });
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
  const storagePath = `${testPointId}/${crypto.randomUUID()}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const supabaseAdmin = getSupabaseAdmin();
  const { error: uploadError } = await supabaseAdmin.storage
    .from(TESTPOINT_DIAGRAMS_BUCKET)
    .upload(storagePath, buffer, { contentType: file.type });

  if (uploadError) {
    console.error('Supabase Storage upload failed', uploadError);
    return NextResponse.json({ success: false, error: 'Upload failed. Please try again.' }, { status: 502 });
  }

  const { data: publicUrlData } = supabaseAdmin.storage.from(TESTPOINT_DIAGRAMS_BUCKET).getPublicUrl(storagePath);

  const updated = await prisma.testPoint.update({
    where: { id: testPointId },
    data: { diagramUrl: publicUrlData.publicUrl },
    select: { diagramUrl: true },
  });

  // Replacing an existing diagram — clean up the old file now that the new one is live.
  if (testPoint.diagramUrl) {
    const oldPath = pathFromPublicUrl(testPoint.diagramUrl, TESTPOINT_DIAGRAMS_BUCKET);
    if (oldPath) {
      const { error: removeError } = await supabaseAdmin.storage.from(TESTPOINT_DIAGRAMS_BUCKET).remove([oldPath]);
      if (removeError) {
        console.error('Failed to clean up replaced diagram image', removeError);
      }
    }
  }

  return NextResponse.json({ success: true, diagramUrl: updated.diagramUrl });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    console.error('Image delete misconfigured: Supabase env vars missing');
    return NextResponse.json({ success: false, error: 'Image storage is not configured' }, { status: 500 });
  }

  const { id: testPointId } = await params;

  const testPoint = await prisma.testPoint.findUnique({ where: { id: testPointId }, select: { diagramUrl: true } });
  if (!testPoint) {
    return NextResponse.json({ success: false, error: 'Test point not found' }, { status: 404 });
  }

  const storagePath = testPoint.diagramUrl ? pathFromPublicUrl(testPoint.diagramUrl, TESTPOINT_DIAGRAMS_BUCKET) : null;
  if (storagePath) {
    const { error: removeError } = await getSupabaseAdmin().storage.from(TESTPOINT_DIAGRAMS_BUCKET).remove([storagePath]);
    if (removeError) {
      console.error('Supabase Storage removal failed (continuing to detach from test point)', removeError);
    }
  }

  await prisma.testPoint.update({ where: { id: testPointId }, data: { diagramUrl: '' } });

  return NextResponse.json({ success: true });
}
