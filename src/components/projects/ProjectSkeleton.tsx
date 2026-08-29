import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProjectSkeletonProps {
  scale?: "sm" | "md" | "lg" | "full";
  className?: string;
}

export function ProjectSkeleton({ scale = "md", className }: ProjectSkeletonProps) {
  const colSpan =
    scale === "sm"
      ? "md:col-span-4"
      : scale === "lg"
        ? "md:col-span-8"
        : scale === "full"
          ? "md:col-span-12"
          : "md:col-span-6";

  return (
    <div className={cn("space-y-4", colSpan, className)}>
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
