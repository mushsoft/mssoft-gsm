import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { parseSoftwareToolInput, SoftwareToolValidationError } from '@/lib/validateSoftwareTool';

export async function GET() {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const softwareTools = await prisma.softwareTool.findMany({
    orderBy: [{ category: 'asc' }, { order: 'asc' }, { title: 'asc' }],
  });
  return NextResponse.json({ success: true, softwareTools });
}

export async function POST(req: Request) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  let input: ReturnType<typeof parseSoftwareToolInput>;
  try {
    input = parseSoftwareToolInput(await req.json());
  } catch (error) {
    const message = error instanceof SoftwareToolValidationError ? error.message : 'Malformed request body';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }

  try {
    const softwareTool = await prisma.softwareTool.create({ data: input });
    return NextResponse.json({ success: true, softwareTool });
  } catch (error) {
    console.error('Failed to create software tool', error);
    return NextResponse.json({ success: false, error: 'Unable to create software tool' }, { status: 500 });
  }
}
