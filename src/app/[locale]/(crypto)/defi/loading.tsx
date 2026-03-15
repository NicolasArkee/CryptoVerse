import { Skeleton, SkeletonCard, SkeletonTable } from '@/components/crypto/Skeleton';

export default function DefiLoading() {
  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <Skeleton className="h-8 w-64 mb-2" />
      <Skeleton className="h-4 w-80 mb-10" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
      <SkeletonTable rows={15} cols={6} />
    </div>
  );
}
