import { Suspense, lazy, useEffect, useRef, useState, type ComponentProps } from "react";
import { useHydrated, useWebGLSupported } from "@/hooks/use-reduced-motion-pref";
import { StaticShowcase } from "./StaticShowcase";
import { ViewerBoundary } from "./ViewerBoundary";
import { cn } from "@/lib/utils";

const JewelryViewer = lazy(() => import("./JewelryViewer"));
const AtelierScene = lazy(() => import("./AtelierScene"));

function StudioSkeleton({ label = "Preparing studio" }: { label?: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span aria-hidden className="h-px w-24 origin-left animate-pulse bg-gold/70" />
        <span className="label-tech">{label}</span>
      </div>
    </div>
  );
}

/** Renders children only once the element has been near the viewport. */
function InView({
  children,
  fallback,
  className,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
  className?: string | undefined;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={ref} className={cn("h-full w-full", className)}>
      {visible ? children : fallback}
    </div>
  );
}

interface FallbackProps {
  /** Poster image shown before/instead of WebGL. */
  fallbackImage: string;
  fallbackAlt: string;
  /** Optional looping video used in place of the 3D scene. */
  fallbackVideo?: string | undefined;
  /** Above-the-fold art: load the poster eagerly. */
  priority?: boolean | undefined;
  /** Skip WebGL entirely and present the static showcase (3D stays optional). */
  disable3D?: boolean | undefined;
}

export function LazyJewelryViewer({
  fallbackImage,
  fallbackAlt,
  fallbackVideo,
  priority,
  disable3D,
  className,
  ...viewerProps
}: ComponentProps<typeof JewelryViewer> & FallbackProps) {
  const hydrated = useHydrated();
  const webgl = useWebGLSupported();

  const showcase = (
    <StaticShowcase
      image={fallbackImage}
      alt={fallbackAlt}
      video={fallbackVideo}
      priority={priority}
    />
  );

  // Server render, WebGL probe pending, opted out, or WebGL unsupported/blocked.
  if (disable3D || !hydrated || webgl === null || !webgl) {
    return <div className={cn("relative h-full w-full", className)}>{showcase}</div>;
  }

  return (
    <ViewerBoundary
      fallback={<div className={cn("relative h-full w-full", className)}>{showcase}</div>}
    >
      <InView className={className} fallback={showcase}>
        <Suspense fallback={priority ? showcase : <StudioSkeleton />}>
          <JewelryViewer {...viewerProps} />
        </Suspense>
      </InView>
    </ViewerBoundary>
  );
}

export function LazyAtelierScene({
  fallbackImage,
  fallbackAlt,
  fallbackVideo,
  disable3D,
}: FallbackProps) {
  const hydrated = useHydrated();
  const webgl = useWebGLSupported();

  const showcase = <StaticShowcase image={fallbackImage} alt={fallbackAlt} video={fallbackVideo} />;

  if (disable3D || !hydrated || !webgl) {
    return showcase;
  }

  return (
    <ViewerBoundary fallback={showcase}>
      <InView fallback={<StudioSkeleton label="Entering the atelier" />}>
        <Suspense fallback={<StudioSkeleton label="Entering the atelier" />}>
          <AtelierScene />
        </Suspense>
      </InView>
    </ViewerBoundary>
  );
}
