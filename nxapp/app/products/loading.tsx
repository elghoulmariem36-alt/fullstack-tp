export default function Loading() {
  return (
    <div className="space-y-6" aria-busy="true">
      <div className="h-9 w-48 animate-pulse rounded bg-slate-200" />
      <div className="h-14 animate-pulse rounded-2xl bg-slate-200" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-80 animate-pulse rounded-2xl bg-slate-200" />
        ))}
      </div>
    </div>
  );
}
