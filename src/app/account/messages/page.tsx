import Link from 'next/link';
import { Bell } from 'lucide-react';
import { requireCustomerPage } from '@/lib/customerAuth';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/formatDate';
import AccountLogoutButton from '@/components/account/AccountLogoutButton';
import AccountNav from '@/components/account/AccountNav';
import MarkMessagesRead from '@/components/account/MarkMessagesRead';
import AutoRefresh from '@/components/AutoRefresh';

export const metadata = { title: 'My Messages' };

export default async function MessagesPage() {
  const customer = await requireCustomerPage();
  const messages = await prisma.notification.findMany({
    where: { customerId: customer.id },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
  const unread = messages.filter((m) => !m.readAt).length;

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <AutoRefresh intervalMs={5000} />
      <MarkMessagesRead unread={unread} />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Messages</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Updates on your orders, wallet and tool orders</p>
          </div>
        </div>
        <AccountLogoutButton />
      </div>

      <AccountNav />

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-8 text-center text-xs text-neutral-500">
          No messages yet. We&apos;ll post updates here whenever something happens with your orders.
        </div>
      ) : (
        <ul className="space-y-3">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`rounded-2xl border p-4 ${
                m.readAt
                  ? 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'
                  : 'border-amber-500/40 bg-amber-500/5'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-sm font-bold text-neutral-900 dark:text-white">
                  {!m.readAt && <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-amber-500 align-middle" />}
                  {m.title}
                </div>
                <span className="shrink-0 text-[10px] text-neutral-500">{formatDate(m.createdAt)}</span>
              </div>
              <p className="mt-1 whitespace-pre-wrap text-xs text-neutral-600 dark:text-neutral-300">{m.body}</p>
              {m.link && (
                <Link href={m.link} className="mt-2 inline-block text-xs font-bold text-amber-500 hover:underline">
                  View →
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
