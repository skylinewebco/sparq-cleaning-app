/**
 * Central site configuration. Update the WhatsApp number / contact details here
 * and it propagates everywhere in the app.
 */
export const site = {
  name: "SPARQ",
  tagline: "Immaculate homes & offices, on demand.",
  description:
    "SPARQ is London's premium on-demand cleaning service — vetted, insured cleaners, transparent pricing and a satisfaction guarantee. Book in 60 seconds.",
  url: "https://sparq.london",
  city: "London, UK",
  email: "hello@sparq.london",
  phone: "+44 20 3900 0000",
  /** Digits only, international format, no "+". Used to build wa.me links. */
  whatsapp: "442039000000",
  whatsappMessage: "Hi SPARQ, I'd like some help with a cleaning booking.",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
  rating: 4.9,
  reviewCount: 2384,
  coverage: [
    "Westminster",
    "Camden",
    "Islington",
    "Hackney",
    "Kensington & Chelsea",
    "Hammersmith & Fulham",
    "Wandsworth",
    "Lambeth",
    "Southwark",
    "Tower Hamlets",
    "Greenwich",
    "Richmond",
  ],
} as const;

export function whatsappLink(message: string = site.whatsappMessage) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
