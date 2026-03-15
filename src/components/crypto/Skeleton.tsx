export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-border/40 ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-dark border border-border p-4">
      <Skeleton className="h-3 w-20 mb-2" />
      <Skeleton className="h-6 w-32" />
    </div>
  );
}

export function SkeletonTable({ rows = 10, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-4 border-b border-border pb-3">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-2">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonChart() {
  return <Skeleton className="h-[200px] w-full" />;
}
