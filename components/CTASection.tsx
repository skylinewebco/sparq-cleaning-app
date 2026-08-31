import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SmoothVideo } from "./SmoothVideo";
import { Reveal } from "./Reveal";

export function CTASection({
  title = "Ready for a spotless space?",
  subtitle = "Book in under a minute. Vetted cleaners, transparent pricing, satisfaction guaranteed.",
  primaryHref = "/booking",
  primaryLabel = "Book a clean",
}: {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="container-x pb-8">
      <Reveal className="relative overflow-hidden rounded-3xl border border-border">
        <div className="absolute inset-0 -z-10">
          <SmoothVideo
            desktopSrc="/assets/videos/linen-loop.mp4"
            poster="/assets/posters/linen-loop.jpg"
            objectPosition="center"
            rate={0.85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35" />
        </div>
        <div className="relative px-6 py-16 text-center text-white sm:px-12 sm:py-24">
          <h2 className="mx-auto max-w-2xl font-heading text-3xl font-medium leading-tight tracking-[-0.02em] text-balance sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/85 sm:text-lg">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={primaryHref} className="btn btn-primary h-12 px-6 text-base shadow-glow">
              {primaryLabel}
              <ArrowRight className="h-4.5 w-4.5" />
            </Link>
            <Link
              href="/pricing"
              className="btn h-12 border border-white/25 bg-white/10 px-6 text-base text-white backdrop-blur-md hover:bg-white/20"
            >
              See pricing
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
