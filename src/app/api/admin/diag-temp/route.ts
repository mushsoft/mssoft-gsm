import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

// Temporary — pinpointing why every page is slow (reported 2026-10-23).
// Reports the DB host (never credentials) plus a bare round-trip timing so
// we can tell apart "cross-region DB" from "cold start" as the cause.
// Delete this route once that's answered.
export async function GET() {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let dbHost = 'unknown';
  try {
    dbHost = new URL(process.env.DATABASE_URL ?? '').hostname;
  } catch {
    // leave as 'unknown'
  }

  const t0 = Date.now();
  await prisma.$queryRaw`SELECT 1`;
  const firstQueryMs = Date.now() - t0;

  const t1 = Date.now();
  await prisma.$queryRaw`SELECT 1`;
  const secondQueryMs = Date.now() - t1;

  return NextResponse.json({
    dbHost,
    region: process.env.VERCEL_REGION ?? 'unknown',
    firstQueryMs,
    secondQueryMs,
  });
}
