import { Skeleton, SkeletonCard, SkeletonChart } from '@/components/crypto/Skeleton';

export default function TokenDetailLoading() {
  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <div className="flex items-center gap-4 mb-10">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
      <SkeletonChart />
    </div>
  );
}
