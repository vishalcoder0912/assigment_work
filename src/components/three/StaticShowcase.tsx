import { useEffect, useRef, useState } from "react";
import { useReducedMotionPref } from "@/hooks/use-reduced-motion-pref";
import { cn } from "@/lib/utils";

export interface StaticShowcaseProps {
  /** Poster image — always rendered, and the only visual if video is unavailable. */
  image: string;
  alt: string;
  /** Optional looping video used when motion is allowed and data saving is off. */
  video?: string | undefined;
  /** Load the poster eagerly (use for above-the-fold hero art). */
  priority?: boolean | undefined;
  className?: string | undefined;
}

/** True when the connection asks us not to pull heavy media. */
function useSavesData() {
  const [saves, setSaves] = useState(false);
  useEffect(() => {
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    if (!connection) return;
    const slow = connection.effectiveType === "slow-2g" || connection.effectiveType === "2g";
    setSaves(Boolean(connection.saveData) || slow);
  }, []);
  return saves;
}

/**
 * The non-WebGL presentation of a piece: poster image, optionally upgraded to a
 * silent looping video. Used whenever the 3D viewer is unavailable, failing,
 * still loading, or deliberately skipped.
 */
export function StaticShowcase({ image, alt, video, priority, className }: StaticShowcaseProps) {
  const reduced = useReducedMotionPref();
  const savesData = useSavesData();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const useVideo = Boolean(video) && !reduced && !savesData && !videoFailed;

  useEffect(() => {
    if (!useVideo) return;
    const node = videoRef.current;
    if (!node) return;
    const play = node.play();
    if (play && typeof play.catch === "function") {
      play.catch(() => setVideoFailed(true));
    }
  }, [useVideo]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <img
        src={image}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className={cn(
          "h-full w-full object-cover opacity-90 transition-opacity duration-700",
          videoReady && "opacity-0",
        )}
      />

      {useVideo ? (
        <video
          ref={videoRef}
          src={video}
          poster={image}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          tabIndex={-1}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000",
            videoReady && "opacity-90",
          )}
        />
      ) : null}
    </div>
  );
}
