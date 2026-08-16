import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { PRODUCT_IMAGES_BUCKET, getSupabaseAdmin, isSupabaseConfigured, pathFromPublicUrl } from '@/lib/supabaseAdmin';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    console.error('Image upload misconfigured: Supabase env vars missing');
    return NextResponse.json({ success: false, error: 'Image upload is not configured' }, { status: 500 });
  }

  const { id: productId } = await params;

  const product = await prisma.product.findUnique({ where: { id: productId }, select: { id: true } });
  if (!product) {
    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
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
  const storagePath = `${productId}/${crypto.randomUUID()}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const supabaseAdmin = getSupabaseAdmin();
  const { error: uploadError } = await supabaseAdmin.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(storagePath, buffer, { contentType: file.type });

  if (uploadError) {
    console.error('Supabase Storage upload failed', uploadError);
    return NextResponse.json({ success: false, error: 'Upload failed. Please try again.' }, { status: 502 });
  }

  const { data: publicUrlData } = supabaseAdmin.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(storagePath);

  const updated = await prisma.product.update({
    where: { id: productId },
    data: { images: { push: publicUrlData.publicUrl } },
    select: { images: true },
  });

  return NextResponse.json({ success: true, url: publicUrlData.publicUrl, images: updated.images });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    console.error('Image delete misconfigured: Supabase env vars missing');
    return NextResponse.json({ success: false, error: 'Image storage is not configured' }, { status: 500 });
  }

  const { id: productId } = await params;
  const body = await req.json().catch(() => null);
  const imageUrl = typeof body?.imageUrl === 'string' ? body.imageUrl : null;

  if (!imageUrl) {
    return NextResponse.json({ success: false, error: 'imageUrl is required' }, { status: 400 });
  }

  const product = await prisma.product.findUnique({ where: { id: productId }, select: { images: true } });
  if (!product) {
    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
  }

  const storagePath = pathFromPublicUrl(imageUrl);
  if (storagePath) {
    const { error: removeError } = await getSupabaseAdmin().storage.from(PRODUCT_IMAGES_BUCKET).remove([storagePath]);
    if (removeError) {
      console.error('Supabase Storage removal failed (continuing to detach from product)', removeError);
    }
  }

  const updated = await prisma.product.update({
    where: { id: productId },
    data: { images: { set: product.images.filter((url) => url !== imageUrl) } },
    select: { images: true },
  });

  return NextResponse.json({ success: true, images: updated.images });
}
