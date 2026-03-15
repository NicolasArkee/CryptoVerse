import { Skeleton } from '@/components/crypto/Skeleton';

export default function NewsLoading() {
  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-4 w-80 mb-10" />
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </div>
  );
}
