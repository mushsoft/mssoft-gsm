import { NextResponse } from 'next/server';
import { requireCustomerApi } from '@/lib/customerAuth';
import { prisma } from '@/lib/prisma';

// GET  — unread message count, polled by the account menu badge.
// POST — marks every message as read (called when the Messages page is open).
export async function GET() {
  const customer = await requireCustomerApi();
  if (!customer) return NextResponse.json({ success: false, unread: 0 }, { status: 401 });

  const unread = await prisma.notification.count({ where: { customerId: customer.id, readAt: null } });
  return NextResponse.json({ success: true, unread }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST() {
  const customer = await requireCustomerApi();
  if (!customer) return NextResponse.json({ success: false }, { status: 401 });

  await prisma.notification.updateMany({
    where: { customerId: customer.id, readAt: null },
    data: { readAt: new Date() },
  });
  return NextResponse.json({ success: true });
}
