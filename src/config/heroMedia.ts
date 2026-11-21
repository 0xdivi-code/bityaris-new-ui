/**
 * HERO MEDIA CONFIGURATION
 * ------------------------------------------------------------------
 * Single source of truth for the hero background media. The values in
 * this file are intentionally *not* hardcoded inside
 * <HeroVideoBackground /> — the component only receives props.
 *
 * Today this is a static config. Tomorrow a CMS / admin panel can
 * serve the same shape from an API endpoint:
 *
 *   GET /api/site-media/hero
 *   -> { videoSources, poster, fallbackImage, overlayOpacity, ... }
 *
 * An administrator would then upload → preview → replace → activate a
 * new render without any frontend change, because <HeroSection /> only
 * consumes this object. A `useHeroMedia()` hook is the natural swap-in
 * point (see the comment at the bottom of this file).
 */

export interface HeroVideoSource {
  src: string;
  type: string;
}

export interface HeroMediaConfig {
  /** Ordered source list — the first playable entry wins. */
  videoSources: HeroVideoSource[];
  /** Shown while the video buffers. */
  poster: string;
  /** Static frame used when video is disabled, unsupported or fails. */
  fallbackImage: string;
  /** 0 – 1 dark veil over the video so the headline stays legible. */
  overlayOpacity: number;
  /** CSS object-position for the media layers. */
  videoPosition: string;
  /** Master switch — lets an admin deactivate playback globally. */
  playbackEnabled: boolean;
  loop: boolean;
  muted: boolean;
  objectFit: "cover" | "contain" | "fill";
  /** Compositing of the video layer over the static artwork. */
  videoBlendMode: "normal" | "screen" | "lighten" | "overlay";
  /** Opacity of the video layer (0 – 1). */
  videoOpacity: number;
}

/**
 * Upload asset supplied with the Bitlance design brief
 * (futuristic illuminated metallic wave). Served locally from
 * /public/videos/hero-wave.mp4; the original upload URL is kept in
 * `UPLOADED_HERO_VIDEO_URL` for reference / CDN failover.
 */
export const UPLOADED_HERO_VIDEO_URL =
  "https://www.designarena.ai/u/e4d4a59e-814e-48f1-8bc3-095532e0ed55";

export const HERO_MEDIA_CONFIG: HeroMediaConfig = {
  videoSources: [{ src: "/videos/hero-wave.mp4", type: "video/mp4" }],
  poster: "/images/hero-fallback.jpg",
  fallbackImage: "/images/hero-fallback.jpg",
  overlayOpacity: 0.34,
  videoPosition: "center 62%",
  playbackEnabled: true,
  loop: true,
  muted: true,
  objectFit: "cover",
  /**
   * The supplied placeholder clip is a near-black light-ray render, so it is
   * composited with `screen` over the static illuminated-wave artwork: the
   * artwork carries the scene, the clip adds motion. An administrator who
   * activates a full-scene video should switch this to `normal` and set
   * `videoOpacity` to 1 — no frontend change required.
   */
  videoBlendMode: "screen",
  videoOpacity: 0.85,
};

/**
 * Future drop-in replacement:
 *
 *   export function useHeroMedia(): HeroMediaConfig {
 *     const { data } = useSWR("/api/site-media/hero", fetcher);
 *     return data ?? HERO_MEDIA_CONFIG;   // graceful static fallback
 *   }
 *
 * <HeroSection /> would then simply do:
 *   const media = useHeroMedia();
 *   <HeroVideoBackground {...media} />
 */
