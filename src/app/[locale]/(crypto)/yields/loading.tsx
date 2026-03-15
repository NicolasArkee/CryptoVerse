import { Skeleton, SkeletonTable } from '@/components/crypto/Skeleton';

export default function YieldsLoading() {
  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-4 w-80 mb-10" />
      <SkeletonTable rows={15} cols={6} />
    </div>
  );
}
