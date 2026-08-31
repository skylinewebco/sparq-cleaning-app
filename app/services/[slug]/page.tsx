import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Check,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { getService, services, extras, SIZE_LABELS, SIZE_ORDER, servicePrice } from "@/lib/services";
import { Icon } from "@/components/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { formatGBP } from "@/lib/utils";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const svc = getService(params.slug);
  if (!svc) return { title: "Service not found" };
  return {
    title: svc.name,
    description: svc.short,
    openGraph: { images: [{ url: svc.image }] },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const svc = getService(params.slug);
  if (!svc) notFound();

  const related = services.filter((s) => s.slug !== svc.slug && s.category === svc.category).slice(0, 3);
  const relatedFinal = related.length >= 3 ? related : services.filter((s) => s.slug !== svc.slug).slice(0, 3);

  const bookHref = `/booking?service=${svc.slug}`;

  return (
    <>
      {/* Breadcrumb */}
      <div className="container-x pt-24 md:pt-28">
        <nav className="flex items-center gap-1.5 text-sm text-muted">
          <Link href="/services" className="hover:text-ink">Services</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ink">{svc.name}</span>
        </nav>
      </div>

      <div className="container-x mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* Left: media + content */}
        <div>
          <Reveal className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border">
            <Image
              src={svc.image}
              alt={svc.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/90 text-accent shadow-soft backdrop-blur dark:bg-black/40">
              <Icon name={svc.icon} className="h-6 w-6" />
            </span>
          </Reveal>

          <Reveal className="mt-8">
            <span className="eyebrow">{svc.tagline}</span>
            <h1 className="headline mt-4 text-4xl sm:text-5xl">{svc.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">
              {svc.description}
            </p>
          </Reveal>

          <div className="mt-8">
            <h2 className="font-heading text-xl font-semibold text-ink">What's included</h2>
            <Stagger className="mt-5 grid gap-3 sm:grid-cols-2">
              {svc.includes.map((item) => (
                <StaggerItem key={item}>
                  <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Optional add-ons */}
          <div className="mt-10">
            <h2 className="font-heading text-xl font-semibold text-ink">Popular add-ons</h2>
            <p className="mt-1 text-sm text-muted">Enhance your clean at checkout.</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {extras.map((e) => (
                <span key={e.id} className="chip">
                  <Icon name={e.icon} className="h-4 w-4 text-accent" />
                  {e.label}
                  <span className="font-medium text-ink">+{formatGBP(e.price)}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: sticky booking card */}
        <div className="lg:relative">
          <div className="lg:sticky lg:top-24">
            <Reveal className="card p-6">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-sm text-muted">from</span>
                  <div className="font-heading text-4xl font-semibold text-ink">
                    {formatGBP(svc.priceFrom)}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent">
                  <Clock className="h-4 w-4" />
                  {svc.durationLabel}
                </span>
              </div>

              <div className="mt-6 space-y-2 border-y border-border py-5">
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  Estimated pricing
                </p>
                {SIZE_ORDER.filter((s) => (svc.category === "commercial" ? s === "office" : s !== "office"))
                  .slice(0, 5)
                  .map((size) => (
                    <div key={size} className="flex items-center justify-between text-sm">
                      <span className="text-muted">{SIZE_LABELS[size]}</span>
                      <span className="font-medium text-ink">
                        {formatGBP(servicePrice(svc.slug, size))}
                      </span>
                    </div>
                  ))}
              </div>

              <Link href={bookHref} className="btn btn-primary mt-6 w-full h-12 text-base">
                Book this service
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>

              <ul className="mt-5 space-y-2.5 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent" /> Insured &amp; vetted cleaners
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" /> 100% satisfaction guarantee
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" /> Free rescheduling
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="container-x py-20 md:py-28">
        <div className="flex items-end justify-between">
          <h2 className="headline text-2xl sm:text-3xl">You might also like</h2>
          <Link href="/services" className="btn btn-ghost hidden sm:inline-flex">
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {relatedFinal.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>
    </>
  );
}
