import { NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { parseReceiptInput, ReceiptValidationError } from '@/lib/validateReceipt';

function isNotFoundError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && (error as { code: string }).code === 'P2025';
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  let input: ReturnType<typeof parseReceiptInput>;
  try {
    input = parseReceiptInput(await req.json());
  } catch (error) {
    const message = error instanceof ReceiptValidationError ? error.message : 'Malformed request body';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }

  try {
    const receipt = await prisma.receipt.update({
      where: { id },
      data: { ...input, items: input.items as unknown as Prisma.InputJsonValue, notes: input.notes as Prisma.InputJsonValue },
    });
    return NextResponse.json({ success: true, receipt });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ success: false, error: 'Receipt not found' }, { status: 404 });
    }
    console.error('Failed to update receipt', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to update receipt' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.receipt.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ success: false, error: 'Receipt not found' }, { status: 404 });
    }
    console.error('Failed to delete receipt', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to delete receipt' }, { status: 500 });
  }
}
