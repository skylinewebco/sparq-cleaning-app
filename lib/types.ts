export type PropertySize =
  | "studio"
  | "1-bed"
  | "2-bed"
  | "3-bed"
  | "4-plus"
  | "office";

export type Frequency = "one-off" | "weekly" | "fortnightly" | "monthly";

export interface Service {
  slug: string;
  name: string;
  tagline: string;
  short: string;
  description: string;
  includes: string[];
  /** lucide icon key, resolved in components/Icon.tsx */
  icon: string;
  image: string;
  /** price shown as "from £" on cards */
  priceFrom: number;
  durationLabel: string;
  /** multiplier applied to the size price matrix */
  factor: number;
  category: "home" | "specialist" | "commercial";
  popular?: boolean;
}

export interface Extra {
  id: string;
  label: string;
  description: string;
  price: number;
  icon: string;
}

export interface FrequencyOption {
  id: Frequency;
  label: string;
  note: string;
  /** proportion off, e.g. 0.2 = 20% */
  discount: number;
}

export interface TimeSlot {
  id: string;
  label: string;
  period: "Morning" | "Afternoon" | "Evening";
}

export interface Review {
  name: string;
  location: string;
  rating: number;
  service: string;
  quote: string;
  date: string;
}

export interface SavedAddress {
  id: string;
  label: string;
  line1: string;
  city: string;
  postcode: string;
}

export interface Booking {
  id: string;
  reference: string;
  serviceSlug: string;
  serviceName: string;
  propertySize: PropertySize;
  extras: string[];
  frequency: Frequency;
  date: string; // ISO
  slot: string;
  address: {
    line1: string;
    city: string;
    postcode: string;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
    notes?: string;
  };
  payment: string;
  total: number;
  status: "upcoming" | "completed" | "cancelled";
  createdAt: string;
}
