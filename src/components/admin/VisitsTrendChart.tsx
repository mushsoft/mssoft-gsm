// Mirrors RevenueTrendChart.tsx's plain-flexbox-bars approach for the same
// non-distortion reason — kept as a separate component since the two chart
// shapes ({ revenue } vs { count }) aren't worth a shared generic here.
export default function VisitsTrendChart({ data }: { data: { date: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="flex h-32 items-end gap-[2px]" role="img" aria-label="Daily site visits">
      {data.map((d) => {
        const heightPct = d.count > 0 ? Math.max((d.count / max) * 100, 4) : 0;
        const label = new Date(`${d.date}T00:00:00Z`).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          timeZone: 'UTC',
        });
        return (
          <div key={d.date} className="relative h-full min-w-0 flex-1">
            <div
              title={`${label}: ${d.count.toLocaleString()} visits`}
              className="absolute bottom-0 mx-auto w-full max-w-[24px] rounded-t bg-emerald-500 transition-colors hover:bg-emerald-400"
              style={{ height: `${heightPct}%`, left: '50%', transform: 'translateX(-50%)' }}
            />
          </div>
        );
      })}
    </div>
  );
}
