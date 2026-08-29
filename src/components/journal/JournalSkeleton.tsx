import { Skeleton } from "@/components/ui/skeleton";

interface JournalSkeletonProps {
  count?: number;
}

export function JournalSkeleton({ count = 6 }: JournalSkeletonProps) {
  return (
    <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="group flex h-full flex-col border-t border-hairline pt-6">
          <Skeleton className="h-4 w-1/5 mb-2" />
          <Skeleton className="h-4 w-1/4 mb-2" />
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-2/3 mb-2" />
          <Skeleton className="h-4 w-1/2 mt-auto" />
        </div>
      ))}
    </div>
  );
}
