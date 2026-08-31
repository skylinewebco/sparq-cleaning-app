import type { Metadata } from "next";
import { MessageCircle, Phone, Mail, MapPin, Clock, Check } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Support",
  description:
    "Get in touch with the SPARQ team. WhatsApp support, contact form, London coverage areas and answers to common questions.",
};

const faqs: FAQItem[] = [
  {
    q: "Do I need to provide cleaning equipment or products?",
    a: "No — our cleaners arrive fully equipped with professional-grade, eco-friendly products and equipment as standard. If you'd prefer we use your own supplies, just let us know in the booking notes.",
  },
  {
    q: "Are your cleaners vetted and insured?",
    a: "Absolutely. Every SPARQ professional is background- and reference-checked, DBS-verified and covered by our £5m public liability insurance. Your peace of mind comes first.",
  },
  {
    q: "What is your satisfaction guarantee?",
    a: "If you're not completely happy with your clean, let us know within 72 hours and we'll return to re-clean the areas concerned, free of charge.",
  },
  {
    q: "Can I reschedule or cancel a booking?",
    a: "Yes. You can reschedule or cancel any time from your account with no penalty when done at least 24 hours before your appointment.",
  },
  {
    q: "How does pricing work?",
    a: "Prices are based on your service and property size, with any add-ons shown live as you build your booking. Recurring plans save you up to 20% per visit. No hidden fees, ever.",
  },
  {
    q: "Which areas of London do you cover?",
    a: "We cover most of Greater London, including all central boroughs. Enter your postcode during booking to confirm availability in your area.",
  },
];

const channels = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: "Fastest response — usually under 5 minutes",
    action: "Chat now",
    href: whatsappLink(),
    accent: true,
  },
  {
    icon: Phone,
    title: "Call us",
    detail: site.phone,
    action: "Call",
    href: `tel:${site.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    title: "Email",
    detail: site.email,
    action: "Email",
    href: `mailto:${site.email}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact & support"
        title="We're here to help"
        subtitle="Questions about a booking, a bespoke quote, or commercial cleaning? Reach out — our London team responds fast."
      />

      {/* Channels */}
      <section className="container-x mt-12 grid gap-4 sm:grid-cols-3">
        {channels.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={
                "card group flex h-full flex-col p-6 transition-shadow hover:shadow-lift " +
                (c.accent ? "ring-1 ring-accent/30" : "")
              }
            >
              <span
                className={
                  "grid h-12 w-12 place-items-center rounded-2xl " +
                  (c.accent ? "bg-[#25D366] text-white" : "bg-accent-soft text-accent")
                }
              >
                <c.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold text-ink">{c.title}</h3>
              <p className="mt-1 flex-1 text-sm text-muted">{c.detail}</p>
              <span className="mt-4 text-sm font-medium text-accent group-hover:underline">
                {c.action} →
              </span>
            </a>
          </Reveal>
        ))}
      </section>

      {/* Form + info */}
      <section className="container-x mt-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <h2 className="headline text-2xl sm:text-3xl">Send us a message</h2>
          <p className="mt-2 text-muted">We reply within one business hour, Mon–Sat.</p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card p-6">
            <h3 className="font-heading text-lg font-semibold text-ink">Head office</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-muted">
                  18 Rivington Street
                  <br />
                  Shoreditch, {site.city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-muted">Mon–Sat, 7:00 – 20:00</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-muted">{site.phone}</span>
              </li>
            </ul>
          </div>

          <div id="coverage" className="card mt-4 scroll-mt-28 p-6">
            <h3 className="font-heading text-lg font-semibold text-ink">Coverage areas</h3>
            <p className="mt-1 text-sm text-muted">Serving these boroughs and more.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {site.coverage.map((area) => (
                <span key={area} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-3 py-1.5 text-xs text-ink">
                  <Check className="h-3.5 w-3.5 text-accent" />
                  {area}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-x mt-20 scroll-mt-28 pb-8 md:mt-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">FAQ</span>
          <h2 className="headline mt-4 text-3xl sm:text-4xl">Common questions</h2>
        </Reveal>
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <FAQ items={faqs} />
        </Reveal>
      </section>
    </>
  );
}
