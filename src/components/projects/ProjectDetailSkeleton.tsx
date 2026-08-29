import { Skeleton } from "@/components/ui/skeleton";

export function ProjectDetailSkeleton() {
  return (
    <article>
      <section className="pt-40 md:pt-52">
        <div className="mx-auto max-w-7xl px-6">
          <Skeleton className="h-4 w-1/6 mb-4" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="mt-16 h-[52svh] w-full md:h-[78svh]" />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
            <Skeleton className="h-20 w-full" />
            <div className="grid grid-cols-2 gap-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="hairline-t hairline-b py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Skeleton className="h-4 w-1/5 mb-4" />
          <Skeleton className="mt-10 aspect-16/10 w-full" />
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Skeleton className="h-4 w-1/5 mb-4" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Skeleton className="aspect-4/3 w-full" />
            <Skeleton className="aspect-4/3 w-full" />
          </div>
        </div>
      </section>

      <section className="hairline-t py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-8 mb-8">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Skeleton className="aspect-4/3 w-full" />
            <Skeleton className="aspect-4/3 w-full" />
          </div>
        </div>
      </section>
    </article>
  );
}
