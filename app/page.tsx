import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  BadgeCheck,
  Clock3,
  Leaf,
  Sparkles,
  CalendarCheck,
  Home as HomeIcon,
  ArrowRight,
  Star,
} from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { ReviewsSection } from "@/components/ReviewsSection";
import { CTASection } from "@/components/CTASection";
import { SmoothVideo } from "@/components/SmoothVideo";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const stats = [
  { value: "12k+", label: "Cleans completed" },
  { value: "4.9★", label: "Average rating" },
  { value: "100%", label: "Satisfaction guarantee" },
  { value: "60s", label: "Average booking time" },
];

const steps = [
  {
    icon: Sparkles,
    title: "Choose your clean",
    text: "Pick a service and tell us about your space. Clear pricing, no hidden fees.",
  },
  {
    icon: CalendarCheck,
    title: "Pick a time",
    text: "Select a date and slot that suits you — same-week availability across London.",
  },
  {
    icon: HomeIcon,
    title: "Relax & enjoy",
    text: "A vetted professional arrives and leaves your space immaculate. That's it.",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Fully insured & vetted",
    text: "Every cleaner is background-checked, DBS-verified and covered by our insurance.",
  },
  {
    icon: BadgeCheck,
    title: "Satisfaction guarantee",
    text: "Not happy? We'll return and re-clean within 72 hours, free of charge.",
  },
  {
    icon: Clock3,
    title: "Flexible scheduling",
    text: "One-off or recurring — reschedule or cancel any time with no penalty.",
  },
  {
    icon: Leaf,
    title: "Eco-friendly products",
    text: "Non-toxic, family- and pet-safe supplies included as standard.",
  },
];

const featured = services.filter((s) => s.popular).concat(
  services.filter((s) => !s.popular),
).slice(0, 6);

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Stats strip */}
      <section className="border-b border-border bg-surface">
        <div className="container-x grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="text-center md:text-left">
              <div className="font-heading text-3xl font-semibold text-ink md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container-x py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="headline mt-4 text-3xl sm:text-4xl">
            Booked in three simple steps
          </h2>
          <p className="mt-4 text-muted text-pretty">
            We've stripped the friction out of hiring a cleaner. From choosing a
            service to a spotless finish — it takes minutes.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="card relative h-full p-7">
                <span className="absolute right-6 top-6 font-heading text-5xl font-semibold text-surface-2">
                  0{i + 1}
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent">
                  <step.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {step.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Featured services */}
      <section className="container-x py-8 md:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <span className="eyebrow">Services</span>
            <h2 className="headline mt-4 text-3xl sm:text-4xl">
              Cleaning for every corner
            </h2>
            <p className="mt-3 max-w-lg text-muted text-pretty">
              From weekly refreshes to specialist deep cleans — professional care
              tailored to your space.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/services" className="btn btn-secondary">
              All services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <StaggerItem key={s.slug}>
              <ServiceCard service={s} priority={i < 3} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Quality band — water video accent */}
      <section className="container-x py-20 md:py-28">
        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <Reveal className="relative min-h-[300px] overflow-hidden rounded-3xl border border-border lg:min-h-[440px]">
            <SmoothVideo
              desktopSrc="/assets/videos/water-loop.mp4"
              poster="/assets/posters/water-loop.jpg"
              rounded
              rate={0.9}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="font-heading text-2xl font-medium">Detail, obsessed over.</p>
              <p className="mt-1 max-w-xs text-sm text-white/80">
                It's the small things — a streak-free finish, a fresh scent, a home
                that simply feels cared for.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col justify-center">
            <Reveal>
              <span className="eyebrow">Why SPARQ</span>
              <h2 className="headline mt-4 text-3xl sm:text-4xl">
                Premium standards, every visit
              </h2>
            </Reveal>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <StaggerItem key={f.title}>
                  <div className="card h-full p-5">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                      <f.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-heading text-base font-semibold text-ink">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {f.text}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Trust / about teaser */}
      <section className="container-x py-8">
        <Reveal className="grid items-center gap-8 overflow-hidden rounded-3xl border border-border bg-surface p-8 md:grid-cols-2 md:p-12">
          <div>
            <span className="eyebrow">Our promise</span>
            <h2 className="headline mt-4 text-3xl sm:text-4xl text-balance">
              Cleaners you can genuinely trust
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              We hand-pick and train every professional on the SPARQ platform. Rigorous
              vetting, full insurance and a satisfaction guarantee mean you can hand over
              your keys with total peace of mind.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "DBS-checked & reference-verified",
                "£5m public liability insurance",
                "Rated & reviewed after every clean",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-ink">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-soft text-accent">
                    <BadgeCheck className="h-4 w-4" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn btn-secondary">
                About us
              </Link>
              <Link href="/booking" className="btn btn-primary">
                Book now
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/assets/images/about-story.jpg"
              alt="A calm, beautifully organised London home"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      <ReviewsSection />

      <CTASection />
    </>
  );
}
