import { Skeleton, SkeletonCard, SkeletonChart } from '@/components/crypto/Skeleton';

export default function BlockchainDetailLoading() {
  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <Skeleton className="h-4 w-48 mb-6" />
      <Skeleton className="h-8 w-64 mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
      <SkeletonChart />
    </div>
  );
}
