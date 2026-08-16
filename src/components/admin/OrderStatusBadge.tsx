const PAYMENT_TONES: Record<string, string> = {
  PENDING: 'bg-amber-500/10 text-amber-500',
  SUCCESSFUL: 'bg-emerald-500/10 text-emerald-500',
  FAILED: 'bg-red-500/10 text-red-500',
  REFUNDED: 'bg-purple-500/10 text-purple-500',
};

const FULFILLMENT_TONES: Record<string, string> = {
  PROCESSING: 'bg-blue-500/10 text-blue-500',
  READY: 'bg-amber-500/10 text-amber-500',
  COMPLETED: 'bg-emerald-500/10 text-emerald-500',
  CANCELLED: 'bg-neutral-500/10 text-neutral-500',
};

const badgeClass = (tone: string) =>
  `inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tone || 'bg-neutral-500/10 text-neutral-500'}`;

export function PaymentStatusBadge({ status }: { status: string }) {
  return <span className={badgeClass(PAYMENT_TONES[status])}>{status}</span>;
}

export function FulfillmentStatusBadge({ status }: { status: string }) {
  return <span className={badgeClass(FULFILLMENT_TONES[status])}>{status}</span>;
}
