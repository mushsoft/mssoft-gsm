import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { parseProductInput, ProductValidationError } from '@/lib/validateProduct';
import { PRODUCT_IMAGES_BUCKET, getSupabaseAdmin, isSupabaseConfigured, pathFromPublicUrl } from '@/lib/supabaseAdmin';

function isUniqueConstraintError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && (error as { code: string }).code === 'P2002';
}

function isForeignKeyConstraintError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && (error as { code: string }).code === 'P2003';
}

function isNotFoundError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && (error as { code: string }).code === 'P2025';
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  let input: ReturnType<typeof parseProductInput>;
  try {
    input = parseProductInput(await req.json());
  } catch (error) {
    const message = error instanceof ProductValidationError ? error.message : 'Malformed request body';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }

  try {
    const product = await prisma.product.update({ where: { id }, data: input });
    return NextResponse.json({ success: true, product });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    if (isUniqueConstraintError(error)) {
      return NextResponse.json(
        { success: false, error: 'A product with this slug already exists' },
        { status: 409 }
      );
    }
    console.error('Failed to update product', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to update product' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id }, select: { images: true } });
  if (!product) {
    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
  }

  try {
    await prisma.product.delete({ where: { id } });
  } catch (error) {
    if (isForeignKeyConstraintError(error)) {
      return NextResponse.json(
        { success: false, error: 'This product has existing orders and cannot be deleted.' },
        { status: 409 }
      );
    }
    if (isNotFoundError(error)) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    console.error('Failed to delete product', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to delete product' }, { status: 500 });
  }

  // Best-effort cleanup of the product's uploaded images — the product record
  // is already gone at this point, so a storage failure here shouldn't be
  // reported as the delete having failed.
  if (isSupabaseConfigured() && product.images.length > 0) {
    const paths = product.images.map((url) => pathFromPublicUrl(url)).filter((p): p is string => Boolean(p));
    if (paths.length > 0) {
      const { error: removeError } = await getSupabaseAdmin().storage.from(PRODUCT_IMAGES_BUCKET).remove(paths);
      if (removeError) {
        console.error('Failed to clean up storage images for deleted product', { id, removeError });
      }
    }
  }

  return NextResponse.json({ success: true });
}
