const STATUS_TONES: Record<string, string> = {
  OPEN: 'bg-amber-500/10 text-amber-500',
  ANSWERED: 'bg-emerald-500/10 text-emerald-500',
  CLOSED: 'bg-neutral-500/10 text-neutral-500',
};

export default function RepairRequestStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${STATUS_TONES[status] || 'bg-neutral-500/10 text-neutral-500'}`}
    >
      {status}
    </span>
  );
}
