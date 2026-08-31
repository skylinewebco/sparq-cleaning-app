import type {
  Extra,
  FrequencyOption,
  PropertySize,
  Service,
  TimeSlot,
} from "./types";

/** Base price (£) per property size before the per-service factor. */
export const SIZE_BASE: Record<PropertySize, number> = {
  studio: 49,
  "1-bed": 59,
  "2-bed": 72,
  "3-bed": 89,
  "4-plus": 109,
  office: 115,
};

export const SIZE_LABELS: Record<PropertySize, string> = {
  studio: "Studio",
  "1-bed": "1 Bedroom",
  "2-bed": "2 Bedrooms",
  "3-bed": "3 Bedrooms",
  "4-plus": "4+ Bedrooms",
  office: "Office / Commercial",
};

export const SIZE_ORDER: PropertySize[] = [
  "studio",
  "1-bed",
  "2-bed",
  "3-bed",
  "4-plus",
  "office",
];

export const services: Service[] = [
  {
    slug: "standard-home",
    name: "Standard Home Cleaning",
    tagline: "Your regular sparkle",
    short: "A thorough top-to-bottom clean to keep your home effortlessly fresh.",
    description:
      "Our most popular service. A trained SPARQ professional refreshes every room — dusting, vacuuming, mopping, kitchen and bathroom sanitising — leaving your home calm, clean and beautifully cared for. Ideal weekly or fortnightly.",
    includes: [
      "Dusting all surfaces & fittings",
      "Vacuuming & mopping throughout",
      "Kitchen worktops, sink & exterior appliances",
      "Bathroom cleaning & sanitising",
      "Making beds & tidying",
      "Emptying bins",
    ],
    icon: "Home",
    image: "/assets/images/service-home.jpg",
    priceFrom: 49,
    durationLabel: "2–3 hrs",
    factor: 1.0,
    category: "home",
    popular: true,
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    tagline: "The reset your home deserves",
    short: "An intensive, detailed clean reaching every overlooked corner.",
    description:
      "A meticulous, top-to-bottom deep clean that tackles built-up grime, limescale and the spots a standard clean skips. Perfect for a seasonal refresh or before a special occasion.",
    includes: [
      "Everything in a standard clean",
      "Limescale removal from taps & tiles",
      "Skirting boards, doors & frames",
      "Inside kitchen cupboards (empty)",
      "Detailed bathroom descaling",
      "Behind & under moveable furniture",
    ],
    icon: "Sparkles",
    image: "/assets/images/service-deep.jpg",
    priceFrom: 74,
    durationLabel: "3–5 hrs",
    factor: 1.5,
    category: "home",
    popular: true,
  },
  {
    slug: "end-of-tenancy",
    name: "End of Tenancy Cleaning",
    tagline: "Deposit-back guaranteed",
    short: "A landlord-approved clean designed to secure your full deposit.",
    description:
      "A comprehensive checklist clean to professional inventory standard. Backed by our 72-hour re-clean guarantee, it's built to satisfy letting agents and landlords across London.",
    includes: [
      "Full property deep clean",
      "Inside all cupboards & wardrobes",
      "Oven, hob & extractor degrease",
      "Limescale & mould treatment",
      "Interior windows & sills",
      "72-hour re-clean guarantee",
    ],
    icon: "KeyRound",
    image: "/assets/images/service-tenancy.jpg",
    priceFrom: 83,
    durationLabel: "4–6 hrs",
    factor: 1.7,
    category: "specialist",
    popular: true,
  },
  {
    slug: "office-cleaning",
    name: "Office Cleaning",
    tagline: "Workspaces that impress",
    short: "Reliable commercial cleaning for calm, professional workspaces.",
    description:
      "Flexible daytime or out-of-hours cleaning for offices, studios and commercial spaces. Consistent teams, DBS-checked staff and fully insured — so your workspace always makes the right impression.",
    includes: [
      "Desks, surfaces & communal areas",
      "Kitchen & breakout spaces",
      "Washroom sanitising & restocking",
      "Floors vacuumed & mopped",
      "Waste & recycling removal",
      "Flexible scheduling",
    ],
    icon: "Building2",
    image: "/assets/images/service-office.jpg",
    priceFrom: 115,
    durationLabel: "Flexible",
    factor: 1.0,
    category: "commercial",
  },
  {
    slug: "carpet-upholstery",
    name: "Carpet & Upholstery",
    tagline: "Fibres restored, colour revived",
    short: "Hot-water extraction that lifts stains, dust and dulling grime.",
    description:
      "Professional hot-water extraction cleaning for carpets, rugs, sofas and upholstery. We lift embedded dirt, allergens and stubborn stains, leaving fabrics fresh, soft and revived.",
    includes: [
      "Pre-treatment of stains",
      "Deep hot-water extraction",
      "Sofa & armchair cleaning",
      "Rug & carpet refresh",
      "Fabric-safe, family-friendly products",
      "Fast-dry finishing",
    ],
    icon: "Sofa",
    image: "/assets/images/service-carpet.jpg",
    priceFrom: 61,
    durationLabel: "2–4 hrs",
    factor: 1.25,
    category: "specialist",
  },
  {
    slug: "window-cleaning",
    name: "Window Cleaning",
    tagline: "Streak-free clarity",
    short: "Crystal-clear interior and exterior windows, frames and sills.",
    description:
      "Purified-water and squeegee finishing for spotless, streak-free glass. We clean panes, frames and sills inside and out for brighter rooms and a flawless view.",
    includes: [
      "Interior & exterior glass",
      "Frames, sills & tracks wiped",
      "Streak-free purified-water finish",
      "Glass doors & partitions",
      "Cobweb removal",
      "Spot-free guarantee",
    ],
    icon: "Wind",
    image: "/assets/images/service-window.jpg",
    priceFrom: 37,
    durationLabel: "1–2 hrs",
    factor: 0.75,
    category: "specialist",
  },
  {
    slug: "kitchen-cleaning",
    name: "Kitchen Deep Clean",
    tagline: "Grease, gone",
    short: "A focused degrease of every kitchen surface, inside and out.",
    description:
      "A specialist kitchen detail — worktops, splashbacks, cupboard fronts and appliance exteriors degreased and sanitised until they gleam. Add an interior oven clean for the full reset.",
    includes: [
      "Worktops & splashbacks degreased",
      "Cupboard doors & handles",
      "Sink & taps descaled",
      "Appliance exteriors polished",
      "Floor cleaned & mopped",
      "Bins sanitised",
    ],
    icon: "Utensils",
    image: "/assets/images/service-deep.jpg",
    priceFrom: 54,
    durationLabel: "1.5–3 hrs",
    factor: 1.1,
    category: "home",
  },
  {
    slug: "bathroom-cleaning",
    name: "Bathroom Deep Clean",
    tagline: "Sanitised & shining",
    short: "Descaled, sanitised bathrooms that feel brand new.",
    description:
      "A deep sanitising treatment for bathrooms and en-suites — limescale lifted, grout brightened, glass and chrome polished to a shine. Hygienic, fresh and gleaming.",
    includes: [
      "Descaling of tiles, taps & screens",
      "Grout brightening",
      "Toilet, basin & bath sanitising",
      "Mirror & chrome polishing",
      "Extractor & vent wipe-down",
      "Floor sanitised",
    ],
    icon: "ShowerHead",
    image: "/assets/images/service-window.jpg",
    priceFrom: 44,
    durationLabel: "1–2 hrs",
    factor: 0.9,
    category: "home",
  },
  {
    slug: "move-in",
    name: "Move-In Cleaning",
    tagline: "Start fresh, from day one",
    short: "A spotless welcome before you unpack a single box.",
    description:
      "A complete pre-occupancy clean so your new home is hygienic and move-in ready. Every cupboard, surface and corner cleaned before your furniture arrives.",
    includes: [
      "Full property deep clean",
      "Inside cupboards & storage",
      "Kitchen & appliance interiors",
      "Bathroom descaling & sanitising",
      "Interior windows & sills",
      "Floors throughout",
    ],
    icon: "Truck",
    image: "/assets/images/service-tenancy.jpg",
    priceFrom: 78,
    durationLabel: "4–6 hrs",
    factor: 1.6,
    category: "specialist",
  },
  {
    slug: "move-out",
    name: "Move-Out Cleaning",
    tagline: "Leave it immaculate",
    short: "A thorough end-of-occupancy clean ready for handover.",
    description:
      "Leaving a property? We return it to a pristine, handover-ready condition — ideal for owners and tenants who want a flawless finish and a smooth checkout.",
    includes: [
      "Whole-home deep clean",
      "Oven & appliance degrease",
      "Inside cupboards & wardrobes",
      "Limescale & mould treatment",
      "Interior glass & frames",
      "Handover-ready finish",
    ],
    icon: "Boxes",
    image: "/assets/images/service-tenancy.jpg",
    priceFrom: 78,
    durationLabel: "4–6 hrs",
    factor: 1.6,
    category: "specialist",
  },
  {
    slug: "post-renovation",
    name: "Post-Renovation Cleaning",
    tagline: "From dust to done",
    short: "Fine builder's dust and debris cleared for a flawless reveal.",
    description:
      "Specialist after-builders cleaning that removes fine construction dust, paint specks and residue from every surface — so your finished project looks exactly as it should.",
    includes: [
      "Fine dust removal from all surfaces",
      "Paint & adhesive spot removal",
      "Detailed skirting & frame clean",
      "Window & glass cleaning",
      "Floor washing & polishing",
      "Debris clearance",
    ],
    icon: "PaintRoller",
    image: "/assets/images/service-office.jpg",
    priceFrom: 98,
    durationLabel: "5–7 hrs",
    factor: 2.0,
    category: "specialist",
  },
  {
    slug: "oven-cleaning",
    name: "Oven Cleaning",
    tagline: "A gleaming, grease-free oven",
    short: "A dip-tank-quality interior oven clean with eco products.",
    description:
      "A specialist single-appliance service. We dismantle, degrease and detail your oven inside and out using non-toxic, fume-free products — ready to use the moment we leave.",
    includes: [
      "Full interior degrease",
      "Racks, trays & shelves cleaned",
      "Door glass de-carbonised",
      "Hob & extractor wipe-down",
      "Non-toxic, fume-free products",
      "Ready to use immediately",
    ],
    icon: "Flame",
    image: "/assets/images/service-deep.jpg",
    priceFrom: 45,
    durationLabel: "1–1.5 hrs",
    factor: 0.7,
    category: "specialist",
  },
];

export const extras: Extra[] = [
  {
    id: "inside-fridge",
    label: "Inside Fridge",
    description: "Shelves & drawers wiped and sanitised",
    price: 15,
    icon: "Refrigerator",
  },
  {
    id: "inside-oven",
    label: "Inside Oven",
    description: "Full interior degrease",
    price: 25,
    icon: "Flame",
  },
  {
    id: "inside-windows",
    label: "Inside Windows",
    description: "Interior glass & sills",
    price: 20,
    icon: "Wind",
  },
  {
    id: "ironing",
    label: "Ironing",
    description: "Up to one hour of ironing",
    price: 18,
    icon: "Shirt",
  },
  {
    id: "balcony",
    label: "Balcony / Patio",
    description: "Sweep & tidy outdoor space",
    price: 15,
    icon: "Fence",
  },
  {
    id: "laundry",
    label: "Laundry",
    description: "Wash & tumble one load",
    price: 12,
    icon: "WashingMachine",
  },
];

export const frequencies: FrequencyOption[] = [
  { id: "one-off", label: "One-off", note: "A single clean", discount: 0 },
  { id: "weekly", label: "Weekly", note: "Save 20%", discount: 0.2 },
  { id: "fortnightly", label: "Fortnightly", note: "Save 15%", discount: 0.15 },
  { id: "monthly", label: "Monthly", note: "Save 10%", discount: 0.1 },
];

export const timeSlots: TimeSlot[] = [
  { id: "08-10", label: "8:00 – 10:00", period: "Morning" },
  { id: "10-12", label: "10:00 – 12:00", period: "Morning" },
  { id: "12-14", label: "12:00 – 14:00", period: "Afternoon" },
  { id: "14-16", label: "14:00 – 16:00", period: "Afternoon" },
  { id: "16-18", label: "16:00 – 18:00", period: "Afternoon" },
  { id: "18-20", label: "18:00 – 20:00", period: "Evening" },
];

/* -------------------------- helpers -------------------------- */

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function servicePrice(slug: string, size: PropertySize) {
  const svc = getService(slug);
  if (!svc) return 0;
  return Math.round(SIZE_BASE[size] * svc.factor);
}

export function extrasTotal(ids: string[]) {
  return ids.reduce((sum, id) => {
    const e = extras.find((x) => x.id === id);
    return sum + (e ? e.price : 0);
  }, 0);
}

export function frequencyDiscount(freq: string) {
  return frequencies.find((f) => f.id === freq)?.discount ?? 0;
}

export interface PriceBreakdown {
  base: number;
  extras: number;
  subtotal: number;
  discount: number;
  discountPct: number;
  total: number;
}

export function computePrice(
  slug: string | null,
  size: PropertySize | null,
  extraIds: string[],
  freq: string,
): PriceBreakdown {
  const base = slug && size ? servicePrice(slug, size) : 0;
  const ex = extrasTotal(extraIds);
  const subtotal = base + ex;
  const pct = frequencyDiscount(freq);
  const discount = Math.round(subtotal * pct);
  return {
    base,
    extras: ex,
    subtotal,
    discount,
    discountPct: pct,
    total: subtotal - discount,
  };
}
