import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";

export interface HeroVideoBackgroundProps {
  /**
   * Primary video URL. Never hardcoded inside the component — always
   * injected by the caller (static config today, CMS/admin API later).
   */
  videoUrl?: string | null;
  /** Additional fallback sources, tried in order by the browser. */
  extraSources?: { src: string; type: string }[];
  /** Frame shown while the video buffers. */
  poster?: string;
  /** Static image used when playback is disabled or fails. */
  fallbackImage?: string;
  /** 0 – 1 — strength of the flat dark veil over the media. */
  overlayOpacity?: number;
  /** CSS `object-position` for the media layers. */
  videoPosition?: string;
  /** Master switch for playback (admin can disable globally). */
  playbackEnabled?: boolean;
  loop?: boolean;
  muted?: boolean;
  objectFit?: "cover" | "contain" | "fill";
  /**
   * Compositing of the video layer over the static artwork. `screen` keeps
   * only the luminous parts of a mostly-black clip; use `normal` for a
   * full-scene video.
   */
  videoBlendMode?: "normal" | "screen" | "lighten" | "overlay";
  /** Opacity of the video layer (0 – 1). */
  videoOpacity?: number;
  className?: string;
}

type MediaStatus = "pending" | "ready" | "error";

const BASE_COLOR = "#050809";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!media) return;
    setReduced(media.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * HeroVideoBackground
 * ---------------------------------------------------------------------------
 * Theme-isolated (permanently dark) media layer for the Bitlance hero.
 *
 * Architecture notes:
 *  • Every media asset arrives through props — nothing is embedded here, so
 *    a future backend / admin upload → preview → replace → activate flow can
 *    feed new URLs without touching this file.
 *  • Renders three layers: static fallback image (always painted), the
 *    <video> (fades in once playable), and tunable darkening overlays.
 *  • Honours `prefers-reduced-motion` by swapping playback for the poster.
 *  • Pauses off-screen to save battery / bandwidth.
 */
export function HeroVideoBackground({
  videoUrl,
  extraSources,
  poster,
  fallbackImage,
  overlayOpacity = 0.4,
  videoPosition = "center",
  playbackEnabled = true,
  loop = true,
  muted = true,
  objectFit = "cover",
  videoBlendMode = "normal",
  videoOpacity = 1,
  className,
}: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<MediaStatus>("pending");
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const sources: { src: string; type: string }[] = [];
  if (videoUrl) sources.push({ src: videoUrl, type: "video/mp4" });
  if (extraSources?.length) sources.push(...extraSources);

  const videoAllowed = playbackEnabled && !prefersReducedMotion && sources.length > 0;
  const showVideo = videoAllowed && status !== "error";

  /* Attach the muted property imperatively — some browsers evaluate the
     autoplay policy before React commits the `muted` prop. */
  const attachVideo = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      if (node) {
        node.muted = muted;
        node.defaultMuted = muted;
      }
    },
    [muted],
  );

  /* Pause playback while the hero is scrolled out of view. */
  useEffect(() => {
    const node = videoRef.current;
    if (!node || !videoAllowed) return;

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const attempt = node.play();
            if (attempt && typeof attempt.catch === "function") {
              attempt.catch(() => setIsPlaying(false));
            }
          } else {
            node.pause();
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [videoAllowed, status]);

  /* Static media style shared by the fallback image and the video. */
  const mediaStyle = {
    objectFit,
    objectPosition: videoPosition,
  } as const;

  const veil = Math.min(Math.max(overlayOpacity, 0), 1);

  return (
    <div
      data-hero-media="true"
      className={cn("absolute inset-0 overflow-hidden bg-[#050809]", className)}
      style={{ backgroundColor: BASE_COLOR }}
      aria-hidden="true"
    >
      {/* Layer 1 — static fallback, always painted first. */}
      <img
        src={fallbackImage}
        alt=""
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full"
        style={mediaStyle}
      />

      {/* Layer 2 — video, faded in over the fallback once it can play. */}
      {showVideo ? (
        <video
          ref={attachVideo}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-1000 ease-out",
            status === "ready" ? "opacity-100" : "opacity-0",
          )}
          style={{
            ...mediaStyle,
            mixBlendMode: videoBlendMode,
            ...(status === "ready" ? { opacity: videoOpacity } : {}),
          }}
          autoPlay
          muted={muted}
          loop={loop}
          playsInline
          preload="auto"
          poster={poster}
          disablePictureInPicture
          controls={false}
          tabIndex={-1}
          aria-hidden="true"
          onCanPlay={() => setStatus("ready")}
          onPlaying={() => {
            setStatus("ready");
            setIsPlaying(true);
          }}
          onError={() => setStatus("error")}
        >
          {sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      ) : null}

      {/* Layer 3 — cinematic darkening + legibility gradients. */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(5, 8, 9, ${veil})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,8,9,0.82) 0%, rgba(5,8,9,0.24) 34%, rgba(5,8,9,0.06) 58%, rgba(5,8,9,0.62) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 18%, rgba(5,8,9,0.55) 0%, rgba(5,8,9,0) 55%)",
        }}
      />

      {/* Announced for tests / tooling only. */}
      <span className="hidden" data-hero-video-state={isPlaying ? "playing" : "idle"} />
    </div>
  );
}

export default HeroVideoBackground;
