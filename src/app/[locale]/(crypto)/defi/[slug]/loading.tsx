import { Skeleton, SkeletonCard, SkeletonChart } from '@/components/crypto/Skeleton';

export default function DefiDetailLoading() {
  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <Skeleton className="h-4 w-48 mb-6" />
      <div className="flex items-center gap-4 mb-8">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
      <SkeletonChart />
    </div>
  );
}
