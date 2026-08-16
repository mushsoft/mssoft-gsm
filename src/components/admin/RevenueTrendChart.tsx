// Plain flexbox bars rather than a stretched SVG viewBox — a non-uniform
// viewBox scale would distort a fixed corner radius into an ellipse.
export default function RevenueTrendChart({ data }: { data: { date: string; revenue: number }[] }) {
  const max = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <div className="flex h-32 items-end gap-[2px]" role="img" aria-label="Daily revenue, last 30 days">
      {data.map((d) => {
        const heightPct = d.revenue > 0 ? Math.max((d.revenue / max) * 100, 4) : 0;
        const label = new Date(`${d.date}T00:00:00Z`).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          timeZone: 'UTC',
        });
        return (
          <div key={d.date} className="relative h-full min-w-0 flex-1">
            <div
              title={`${label}: UGX ${d.revenue.toLocaleString()}`}
              className="absolute bottom-0 mx-auto w-full max-w-[24px] rounded-t bg-amber-500 transition-colors hover:bg-amber-400"
              style={{ height: `${heightPct}%`, left: '50%', transform: 'translateX(-50%)' }}
            />
          </div>
        );
      })}
    </div>
  );
}
