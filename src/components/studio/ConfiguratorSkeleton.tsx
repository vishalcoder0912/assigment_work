import { Skeleton } from "@/components/ui/skeleton";

export function ConfiguratorSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "hairline-t py-20" : "hairline-t py-28 md:py-36"}>
      <div className="mx-auto max-w-7xl px-6">
        <Skeleton className="h-4 w-1/6 mb-4" />
        <Skeleton className="h-12 w-1/2" />
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative aspect-square w-full lg:aspect-auto lg:min-h-[68svh]">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="space-y-6">
            <div className="border-t border-hairline py-6">
              <Skeleton className="h-4 w-1/5 mb-4" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="border-t border-hairline py-6">
              <Skeleton className="h-4 w-1/5 mb-4" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="border-t border-hairline py-6">
              <Skeleton className="h-4 w-1/5 mb-4" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="border-t border-hairline py-6">
              <Skeleton className="h-4 w-1/5 mb-4" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
