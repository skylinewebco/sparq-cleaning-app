import type { Review } from "./types";

export const reviews: Review[] = [
  {
    name: "Charlotte Hughes",
    location: "Islington",
    rating: 5,
    service: "Standard Home Cleaning",
    quote:
      "Genuinely the best cleaner we've had in ten years in London. The flat feels like a show home every single week. Booking took under a minute.",
    date: "2 weeks ago",
  },
  {
    name: "James Whitfield",
    location: "Clapham",
    rating: 5,
    service: "End of Tenancy Cleaning",
    quote:
      "Got our full deposit back with zero deductions. The letting agent actually commented on how spotless it was. Worth every penny.",
    date: "1 month ago",
  },
  {
    name: "Priya Sharma",
    location: "Canary Wharf",
    rating: 5,
    service: "Deep Cleaning",
    quote:
      "I booked a deep clean before hosting family and it was flawless. Limescale I'd given up on was completely gone. Calm, professional, on time.",
    date: "3 weeks ago",
  },
  {
    name: "Oliver Bennett",
    location: "Shoreditch",
    rating: 5,
    service: "Office Cleaning",
    quote:
      "Our studio has never looked sharper. The team is reliable, discreet and consistent — exactly what you want from a commercial cleaner.",
    date: "5 days ago",
  },
  {
    name: "Sophie Turner",
    location: "Richmond",
    rating: 4,
    service: "Carpet & Upholstery",
    quote:
      "Brought a very tired cream sofa back to life. Honestly didn't think the stains would lift but they did. Dried faster than I expected too.",
    date: "1 week ago",
  },
  {
    name: "Daniel O'Connor",
    location: "Greenwich",
    rating: 5,
    service: "Move-In Cleaning",
    quote:
      "Moved into a new build that was dustier than expected. SPARQ had it immaculate before the movers arrived. Seamless from booking to finish.",
    date: "2 months ago",
  },
  {
    name: "Amelia Clarke",
    location: "Kensington",
    rating: 5,
    service: "Window Cleaning",
    quote:
      "Streak-free, every pane, inside and out. The rooms feel twice as bright. Lovely, careful work and a friendly, vetted cleaner.",
    date: "4 days ago",
  },
  {
    name: "Marcus Bell",
    location: "Hackney",
    rating: 5,
    service: "Deep Cleaning",
    quote:
      "The live price updated as I added extras, so no surprises at checkout. The clean itself was meticulous. This is how it should be done.",
    date: "3 weeks ago",
  },
];

export const averageRating =
  reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
