import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MessageCircle, Wrench } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import AutoRefresh from '@/components/AutoRefresh';
import RepairRequestReplyForm from '@/components/admin/RepairRequestReplyForm';
import RepairRequestStatusBadge from '@/components/account/RepairRequestStatusBadge';

export default async function AdminRepairRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();

  const { id } = await params;
  const request = await prisma.repairRequest.findUnique({
    where: { id },
    include: { customer: { select: { name: true, email: true, phone: true } } },
  });

  if (!request) {
    notFound();
  }

  const device = [request.brand, request.modelName].filter(Boolean).join(' ');
  const whatsappDigits = request.customer.phone?.replace(/\D/g, '');
  const whatsappUrl = whatsappDigits ? `https://wa.me/${whatsappDigits}` : null;

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <AutoRefresh intervalMs={15000} />
      <Link
        href="/admin/repair-requests"
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Requests</span>
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
          <Wrench className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">{request.customer.name || request.customer.email}</h1>
            <RepairRequestStatusBadge status={request.status} />
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Asked {request.createdAt.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-neutral-500">Customer</h2>
          <dl className="space-y-2 text-xs">
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500">Name</dt>
              <dd className="font-bold text-neutral-800 dark:text-neutral-200">{request.customer.name || '—'}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500">Phone</dt>
              <dd className="font-bold text-neutral-800 dark:text-neutral-200">{request.customer.phone || '—'}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500">Email</dt>
              <dd className="font-bold text-neutral-800 dark:text-neutral-200">{request.customer.email}</dd>
            </div>
            {device && (
              <div className="flex justify-between gap-3">
                <dt className="text-neutral-500">Device</dt>
                <dd className="font-bold text-neutral-800 dark:text-neutral-200">{device}</dd>
              </div>
            )}
          </dl>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-fit items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-500"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-current" />
              Message on WhatsApp
            </a>
          )}
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-neutral-500">Problem</h2>
          <p className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">{request.problem}</p>
          {request.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element -- user-uploaded photo, no fixed dimensions to optimize against
            <img
              src={request.imageUrl}
              alt="Attached photo"
              className="mt-3 max-h-48 w-full rounded-lg object-contain"
            />
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-neutral-500">Reply</h2>
        <RepairRequestReplyForm requestId={request.id} existingReply={request.reply} status={request.status} />
      </div>
    </main>
  );
}
