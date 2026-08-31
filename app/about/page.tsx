import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  Leaf,
  Sparkles,
  Users,
  Clock3,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { SmoothVideo } from "@/components/SmoothVideo";
import { ReviewsSection } from "@/components/ReviewsSection";
import { CTASection } from "@/components/CTASection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SPARQ is London's premium on-demand cleaning service — built on trust, craft and care. Meet the people and standards behind every spotless finish.",
};

const values = [
  { icon: Heart, title: "Care in every detail", text: "We treat your home as if it were our own — thoughtfully, respectfully, thoroughly." },
  { icon: ShieldCheck, title: "Trust by default", text: "Every cleaner is vetted, DBS-checked, insured and continuously rated by customers." },
  { icon: Leaf, title: "Kinder to the planet", text: "Non-toxic, eco-friendly products that are safe for your family, pets and the environment." },
  { icon: Sparkles, title: "A finish you can feel", text: "We're not done until it's immaculate — backed by our 100% satisfaction guarantee." },
];

const stats = [
  { icon: Users, value: "500+", label: "Vetted cleaners" },
  { icon: Sparkles, value: "12,000+", label: "Cleans completed" },
  { icon: Clock3, value: "60s", label: "Average booking" },
  { icon: ShieldCheck, value: "£5m", label: "Insurance cover" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Cleaning, reimagined for London"
        subtitle="We started SPARQ with a simple belief: booking a trustworthy cleaner should be effortless, and the result should feel genuinely premium — every single time."
      />

      {/* Story split */}
      <section className="container-x mt-14 grid items-center gap-10 lg:grid-cols-2">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
          <Image
            src="/assets/images/about-story.jpg"
            alt="A calm, beautifully organised London home"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="headline text-3xl sm:text-4xl">Built on trust and craft</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-muted">
            <p>
              London runs fast. Between work, family and everything in between, keeping a
              home spotless shouldn't be another thing to worry about. So we built a
              cleaning service that just works — transparent pricing, seamless booking,
              and professionals who take real pride in their craft.
            </p>
            <p>
              Today, SPARQ serves thousands of homes and offices across the capital. But
              our promise hasn't changed: hand over your keys with total peace of mind,
              and come home to a space that feels brand new.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/booking" className="btn btn-primary">
              Book a clean <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Talk to us
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Stats over linen video */}
      <section className="container-x py-20 md:py-24">
        <Reveal className="relative overflow-hidden rounded-3xl border border-border">
          <div className="absolute inset-0 -z-10">
            <SmoothVideo
              desktopSrc="/assets/videos/linen-loop.mp4"
              poster="/assets/posters/linen-loop.jpg"
              rate={0.85}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
          </div>
          <div className="grid grid-cols-2 gap-6 px-6 py-12 text-white sm:px-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <s.icon className="mx-auto h-6 w-6 text-accent md:mx-0" />
                <div className="mt-3 font-heading text-3xl font-semibold md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-white/75">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">What we stand for</span>
          <h2 className="headline mt-4 text-3xl sm:text-4xl">Our values</h2>
        </Reveal>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="card h-full p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-heading text-base font-semibold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <ReviewsSection heading="Trusted by thousands of Londoners" />

      <CTASection
        title={`Join ${site.reviewCount.toLocaleString("en-GB")}+ happy customers`}
        subtitle="Experience the SPARQ difference on your very first clean."
      />
    </>
  );
}
