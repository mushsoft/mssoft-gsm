import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { parseReceiptPdf } from '@/lib/parseReceiptPdf';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: Request) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData().catch(() => null);
  const file = formData?.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
  }
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    return NextResponse.json({ success: false, error: 'File must be a PDF' }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ success: false, error: 'PDF must be under 10MB' }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const debug = new URL(req.url).searchParams.get('debug') === '1';
    const parsed = await parseReceiptPdf(buffer, { debug });
    return NextResponse.json({ success: true, parsed });
  } catch (error) {
    console.error('Failed to parse imported receipt PDF', error);
    return NextResponse.json(
      { success: false, error: 'Could not read that PDF. It may not be one this system generated.' },
      { status: 422 }
    );
  }
}
