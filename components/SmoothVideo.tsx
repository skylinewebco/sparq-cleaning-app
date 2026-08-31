"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SmoothVideoProps {
  desktopSrc: string;
  mobileSrc?: string;
  poster: string;
  posterMobile?: string;
  className?: string;
  /** Full-bleed background style vs. inline contained clip. */
  rounded?: boolean;
  objectPosition?: string;
  /** Slightly slow the clip for a calmer, more premium feel. */
  rate?: number;
}

/**
 * Seamless looping background video.
 *  - autoPlay / loop / muted / playsInline for iOS Safari.
 *  - Responsive <source media> so phones fetch the portrait clip.
 *  - Poster paints instantly (no black flash) and is the reduced-motion fallback.
 *  - A whisper-soft gradient overlay masks any residual loop seam.
 */
export function SmoothVideo({
  desktopSrc,
  mobileSrc,
  poster,
  posterMobile,
  className,
  rounded = false,
  objectPosition = "center",
  rate = 1,
}: SmoothVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mob = window.matchMedia("(max-width: 768px)");
    const sync = () => {
      setReduced(rm.matches);
      setIsMobile(mob.matches);
    };
    sync();
    rm.addEventListener("change", sync);
    mob.addEventListener("change", sync);
    return () => {
      rm.removeEventListener("change", sync);
      mob.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    if (rate !== 1) v.playbackRate = rate;
    const tryPlay = () => {
      v.play().catch(() => {
        /* autoplay may be blocked; poster remains visible */
      });
    };
    tryPlay();
    v.addEventListener("canplay", tryPlay, { once: true });
    return () => v.removeEventListener("canplay", tryPlay);
  }, [reduced, rate]);

  const activePoster = isMobile && posterMobile ? posterMobile : poster;

  if (reduced) {
    // Respect reduced-motion: a still, high-quality image instead of motion.
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={activePoster}
        alt=""
        aria-hidden
        className={cn("h-full w-full object-cover", rounded && "rounded-2xl", className)}
        style={{ objectPosition }}
      />
    );
  }

  return (
    <video
      ref={ref}
      className={cn("h-full w-full object-cover", rounded && "rounded-2xl", className)}
      style={{ objectPosition }}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={activePoster}
      disablePictureInPicture
      disableRemotePlayback
    >
      {mobileSrc && <source src={mobileSrc} media="(max-width: 768px)" type="video/mp4" />}
      <source src={desktopSrc} type="video/mp4" />
    </video>
  );
}
