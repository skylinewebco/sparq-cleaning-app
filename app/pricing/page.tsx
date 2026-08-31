import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Star } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { Icon } from "@/components/Icon";
import {
  services,
  extras,
  SIZE_ORDER,
  SIZE_LABELS,
  servicePrice,
} from "@/lib/services";
import { formatGBP } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing & Plans",
  description:
    "Simple, transparent cleaning prices in London. One-off cleans or save up to 20% with recurring weekly and fortnightly plans. No hidden fees.",
};

const plans = [
  {
    name: "One-off",
    price: "£49",
    unit: "from, per clean",
    tagline: "Perfect for a single refresh or a specialist deep clean.",
    features: ["Any service, any time", "All add-ons available", "Fully insured cleaners", "100% satisfaction guarantee"],
    cta: "Book a one-off",
    highlight: false,
  },
  {
    name: "Fortnightly",
    price: "Save 15%",
    unit: "on every visit",
    tagline: "Stay effortlessly tidy with a clean every two weeks.",
    features: ["Same cleaner where possible", "Priority time slots", "Free rescheduling", "Pause or cancel anytime"],
    cta: "Start fortnightly",
    highlight: false,
  },
  {
    name: "Weekly",
    price: "Save 20%",
    unit: "our best value",
    tagline: "A consistently pristine home, week in, week out.",
    features: ["Dedicated regular cleaner", "Best price per visit", "Priority support", "Pause or cancel anytime"],
    cta: "Start weekly",
    highlight: true,
  },
];

const matrixServices = services.filter((s) =>
  ["standard-home", "deep-cleaning", "end-of-tenancy", "kitchen-cleaning", "bathroom-cleaning"].includes(s.slug),
);
const matrixSizes = SIZE_ORDER.filter((s) => s !== "office");

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        subtitle="No hidden fees, no surprises. Pay as you go, or save up to 20% with a recurring plan you can pause anytime."
      />

      {/* Plans */}
      <section className="container-x mt-14">
        <Stagger className="grid gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <StaggerItem key={p.name}>
              <div
                className={
                  "relative flex h-full flex-col rounded-3xl border p-7 transition-shadow " +
                  (p.highlight
                    ? "border-accent bg-surface shadow-lift ring-1 ring-accent/40"
                    : "border-border bg-surface shadow-soft")
                }
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-ink shadow-glow">
                    <Star className="h-3.5 w-3.5 fill-current" /> Most popular
                  </span>
                )}
                <h3 className="font-heading text-lg font-semibold text-ink">{p.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-heading text-4xl font-semibold text-ink">{p.price}</span>
                  <span className="text-sm text-muted">{p.unit}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.tagline}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-ink">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/booking"
                  className={"btn mt-7 w-full " + (p.highlight ? "btn-primary" : "btn-secondary")}
                >
                  {p.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Matrix */}
      <section className="container-x py-20 md:py-24">
        <Reveal>
          <h2 className="headline text-2xl sm:text-3xl">One-off price guide</h2>
          <p className="mt-2 max-w-xl text-muted">
            Estimated prices by property size. Add-ons and recurring discounts are
            applied at checkout.
          </p>
        </Reveal>

        <Reveal className="mt-8 overflow-hidden rounded-2xl border border-border">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-surface-2/60">
                  <th className="px-5 py-4 text-left font-medium text-muted">Service</th>
                  {matrixSizes.map((sz) => (
                    <th key={sz} className="px-4 py-4 text-right font-medium text-muted">
                      {SIZE_LABELS[sz].replace(" Bedrooms", " bed").replace(" Bedroom", " bed")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixServices.map((s) => (
                  <tr key={s.slug} className="border-t border-border">
                    <td className="px-5 py-4">
                      <Link href={`/services/${s.slug}`} className="flex items-center gap-2.5 font-medium text-ink hover:text-accent">
                        <Icon name={s.icon} className="h-4 w-4 text-accent" />
                        {s.name}
                      </Link>
                    </td>
                    {matrixSizes.map((sz) => (
                      <td key={sz} className="px-4 py-4 text-right text-ink">
                        {formatGBP(servicePrice(s.slug, sz))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Add-ons */}
        <Reveal className="mt-10">
          <h3 className="font-heading text-lg font-semibold text-ink">Optional add-ons</h3>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {extras.map((e) => (
              <span key={e.id} className="chip">
                <Icon name={e.icon} className="h-4 w-4 text-accent" />
                {e.label}
                <span className="font-medium text-ink">+{formatGBP(e.price)}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <CTASection
        title="Find your plan in 60 seconds"
        subtitle="Build a booking and watch the price update live as you choose."
      />
    </>
  );
}
