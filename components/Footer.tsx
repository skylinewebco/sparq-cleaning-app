import Link from "next/link";
import { Instagram, Facebook, Twitter, Linkedin, ShieldCheck, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { site, whatsappLink } from "@/lib/site";
import { services } from "@/lib/services";

const columns = [
  {
    title: "Services",
    links: services.slice(0, 6).map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
    })),
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
      { label: "My account", href: "/account" },
      { label: "Book a clean", href: "/booking" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help & FAQ", href: "/contact#faq" },
      { label: "Coverage areas", href: "/contact#coverage" },
      { label: "WhatsApp us", href: whatsappLink() },
      { label: "Sign in", href: "/sign-in" },
      { label: "Create account", href: "/sign-up" },
    ],
  },
];

const socials = [
  { icon: Instagram, href: site.social.instagram, label: "Instagram" },
  { icon: Facebook, href: site.social.facebook, label: "Facebook" },
  { icon: Twitter, href: site.social.twitter, label: "Twitter" },
  { icon: Linkedin, href: site.social.linkedin, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.tagline} Vetted, insured cleaners across London — booked in under a
              minute, backed by our 100% satisfaction guarantee.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-accent" />
              {site.city}
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Fully insured &amp; DBS-checked
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-ink">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved. Prices in GBP,
            inclusive of VAT.
          </p>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-bg text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
