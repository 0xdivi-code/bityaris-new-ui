import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HeroVideoBackground } from "./HeroVideoBackground";
import { HeroSignupForm } from "./HeroSignupForm";
import { HERO_MEDIA_CONFIG } from "../config/heroMedia";

/**
 * HeroSection
 * ---------------------------------------------------------------------------
 * Permanently dark (theme-independent) opening section. Every colour below
 * is a literal value on purpose — global theme tokens must never bleed in.
 */
export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen w-full flex-col overflow-hidden bg-[#050809] text-white"
    >
      {/* Media layer — receives its configuration, never hardcodes it. */}
      <HeroVideoBackground
        videoUrl={HERO_MEDIA_CONFIG.videoSources[0]?.src ?? null}
        extraSources={HERO_MEDIA_CONFIG.videoSources.slice(1)}
        poster={HERO_MEDIA_CONFIG.poster}
        fallbackImage={HERO_MEDIA_CONFIG.fallbackImage}
        overlayOpacity={HERO_MEDIA_CONFIG.overlayOpacity}
        videoPosition={HERO_MEDIA_CONFIG.videoPosition}
        playbackEnabled={HERO_MEDIA_CONFIG.playbackEnabled}
        loop={HERO_MEDIA_CONFIG.loop}
        muted={HERO_MEDIA_CONFIG.muted}
        objectFit={HERO_MEDIA_CONFIG.objectFit}
        videoBlendMode={HERO_MEDIA_CONFIG.videoBlendMode}
        videoOpacity={HERO_MEDIA_CONFIG.videoOpacity}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center justify-center px-5 pb-[250px] pt-[196px] text-center sm:px-6 sm:pb-[280px] sm:pt-[216px] lg:pb-[330px] lg:pt-[240px]">
        <motion.h1
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 22 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[19ch] text-balance text-[38px] font-extrabold leading-[1.06] tracking-[-0.03em] text-white sm:max-w-[24ch] sm:text-[52px] lg:text-[62px]"
        >
          Trade Crypto Smarter,
          <br className="hidden sm:block" /> Faster, Better
        </motion.h1>

        <motion.p
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-[36rem] text-pretty text-[14px] leading-relaxed text-white/65 sm:text-[16px]"
        >
          Buy, sell, and manage 1000+ cryptocurrencies with speed, security, and
          confidence all in one platform.
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 flex w-full flex-col items-center"
        >
          <p className="mb-4 text-[12px] font-medium tracking-wide text-white/55 sm:text-[13px]">
            Sign Up and&nbsp;
            <span className="font-semibold text-white/90">
              get up to 14,000 USDT in rewards
            </span>
          </p>
          <HeroSignupForm className="max-w-[440px]" />
        </motion.div>
      </div>

      {/* Bottom blend so the always-black hero meets the themed page cleanly. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-[#050809]" />

      {/* Scroll cue — invites visitors to continue below the fold. */}
      <a
        href="#markets"
        aria-label="Scroll down to explore Bitlance"
        className="group absolute bottom-6 left-1/2 z-20 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-brand/60 hover:text-brand sm:bottom-8"
      >
        <ChevronDown
          className="h-5 w-5 animate-bounce motion-reduce:animate-none"
          strokeWidth={2.2}
          aria-hidden="true"
        />
      </a>
    </section>
  );
}

export default HeroSection;
