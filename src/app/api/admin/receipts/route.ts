import { NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { parseReceiptInput, ReceiptValidationError } from '@/lib/validateReceipt';

export async function POST(req: Request) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  let input: ReturnType<typeof parseReceiptInput>;
  try {
    input = parseReceiptInput(await req.json());
  } catch (error) {
    const message = error instanceof ReceiptValidationError ? error.message : 'Malformed request body';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }

  try {
    const receipt = await prisma.receipt.create({
      data: { ...input, items: input.items as unknown as Prisma.InputJsonValue, notes: input.notes as Prisma.InputJsonValue },
    });
    return NextResponse.json({ success: true, receipt });
  } catch (error) {
    console.error('Failed to save receipt', error);
    return NextResponse.json({ success: false, error: 'Unable to save receipt' }, { status: 500 });
  }
}
