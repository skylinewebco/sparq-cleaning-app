"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, Sparkles } from "lucide-react";
import { SmoothVideo } from "@/components/SmoothVideo";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const item = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay },
  });

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 -z-10">
        <SmoothVideo
          desktopSrc="/assets/videos/hero-desktop.mp4"
          mobileSrc="/assets/videos/hero-mobile.mp4"
          poster="/assets/posters/hero-desktop.jpg"
          posterMobile="/assets/posters/hero-mobile.jpg"
          objectPosition="center"
          rate={0.9}
        />
        {/* Legibility scrim — stronger at the bottom-left where the copy sits */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      <div className="container-x w-full pt-24 pb-20">
        <div className="max-w-2xl text-white">
          <motion.span
            {...item(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-md"
          >
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {site.rating} · {site.reviewCount.toLocaleString("en-GB")} reviews · London
          </motion.span>

          <motion.h1
            {...item(0.15)}
            className="mt-5 font-heading text-[2.6rem] font-medium leading-[1.03] tracking-[-0.03em] text-balance sm:text-6xl lg:text-7xl"
          >
            A spotless home,
            <br />
            <span className="text-white/95">without the effort.</span>
          </motion.h1>

          <motion.p
            {...item(0.28)}
            className="mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg"
          >
            SPARQ brings vetted, insured cleaning professionals to your door across
            London. Transparent pricing, seamless booking, and a finish you can feel.
          </motion.p>

          <motion.div {...item(0.4)} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/booking"
              className="btn btn-primary h-12 px-6 text-base shadow-glow"
            >
              Book a clean
              <ArrowRight className="h-4.5 w-4.5" />
            </Link>
            <Link
              href="/services"
              className="btn h-12 border border-white/25 bg-white/10 px-6 text-base text-white backdrop-blur-md hover:bg-white/20"
            >
              Browse services
            </Link>
          </motion.div>

          <motion.ul
            {...item(0.52)}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80"
          >
            <li className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" /> Insured &amp; vetted
            </li>
            <li className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" /> Satisfaction guarantee
            </li>
            <li className="inline-flex items-center gap-2">
              <Star className="h-4 w-4 text-accent" /> Same-week availability
            </li>
          </motion.ul>
        </div>
      </div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/40 p-1.5">
            <motion.span
              className="h-2 w-1 rounded-full bg-white/80"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
