import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

function isNotFoundError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && (error as { code: string }).code === 'P2025';
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const reply = typeof body?.reply === 'string' ? body.reply.trim() : '';
  const closeRequest = body?.status === 'CLOSED';

  if (!reply && !closeRequest) {
    return NextResponse.json({ success: false, error: 'A reply is required' }, { status: 400 });
  }

  try {
    const updated = await prisma.repairRequest.update({
      where: { id },
      data: closeRequest
        ? { status: 'CLOSED' }
        : { reply, status: 'ANSWERED', repliedAt: new Date() },
    });
    return NextResponse.json({ success: true, request: updated });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ success: false, error: 'Request not found' }, { status: 404 });
    }
    console.error('Failed to update repair request', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to update request' }, { status: 500 });
  }
}
