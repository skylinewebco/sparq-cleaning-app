# SPARQ — Premium Cleaning Services Web App

A polished, production-quality booking web application for **SPARQ**, an on-demand home & office
cleaning service in London. Built as a real, app-like experience for both mobile and desktop —
mobile-first, fully responsive, dark-mode ready, and heavily performance-optimised.

> **Note:** This is a front-end demo. There is no backend — all data is mocked and persisted to
> `localStorage`. Payment methods are display-only; **no real payment is processed** and no card
> details are collected.

---

## ✨ Tech stack

| Concern            | Choice |
| ------------------ | ------ |
| Framework          | **Next.js 14** (App Router) + **TypeScript** |
| Styling            | **Tailwind CSS** with a CSS-variable design-token system |
| Animation          | **Framer Motion** (GPU-friendly transforms only) |
| Theming            | **next-themes** (class strategy, fully designed dark theme) |
| Icons              | **lucide-react** (tree-shaken) |
| Fonts              | **Manrope** (headings) + **Inter** (body) via `next/font` |
| State / data       | React Context + `localStorage` (mock) |

### A note on fonts
The brief requested *General Sans / Satoshi* for headings. Those are Fontshare faces (not on Google
Fonts), so to keep the app self-contained and benefit from `next/font` optimisation, headings use
**Manrope** — a modern, characterful, easy-on-the-eyes geometric sans in the same family of taste.
To swap in Satoshi/General Sans, drop the font files into `/app/fonts` and switch the `heading`
loader in `app/layout.tsx` to `next/font/local`. Nothing else changes (the rest of the app reads
`var(--font-heading)`).

---

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build & run in production:

```bash
npm run build
npm start
```

> ⚠️ Don't run `npm run build` while `npm run dev` is running — both write to `.next` and it can
> corrupt the dev server's CSS chunks. Stop dev first (or `rm -rf .next` and restart dev if it
> happens).

---

## 🗂️ Project structure

```
app/
  layout.tsx            Root layout: fonts, providers, navbar, footer, bottom nav, WhatsApp FAB
  template.tsx          Lightweight page-transition wrapper (opacity + small translate)
  page.tsx              Home
  services/             Services listing + [slug] detail (SSG for all services)
  booking/              Multi-step booking wizard (the centrepiece)
  pricing/              Plans + transparent price matrix
  about/                Story, values, trust signals
  account/              Dashboard: bookings, history, addresses, profile
  contact/              Contact channels, form, coverage, FAQ
  sign-in/ sign-up/     Polished auth UI (mock session)
  not-found.tsx         Custom 404
  loading.tsx           Skeleton loading state
  sitemap.ts robots.ts  SEO
components/
  Navbar, BottomNav, Footer, ThemeToggle, WhatsAppButton, Logo, Stars …
  SmoothVideo           Seamless looping bg video (responsive sources + poster + reduced-motion)
  Reveal / Stagger      Scroll-reveal primitives (respect prefers-reduced-motion)
  AnimatedNumber        rAF count-up for the live price total
  ServiceCard, ReviewsSection, FAQ, CTASection, PageHeader
  booking/              BookingWizard, Calendar, PriceSummary
  account/Dashboard
  auth/AuthForm
lib/
  services.ts           Service catalogue + pricing engine
  reviews.ts            UK reviews
  site.ts               Central config (WhatsApp number, contact, coverage) ← edit here
  types.ts utils.ts
  auth-context.tsx      Mock auth (localStorage)
  data-context.tsx      Bookings + saved addresses (localStorage, seeded)
public/assets/
  images/ videos/ posters/   Provided AI assets, mapped to clean filenames
```

---

## 🧭 Pages

1. **Home** — hero background video, stats, how-it-works, featured services, quality band, trust,
   reviews, CTA.
2. **Services** — filterable grid (Home / Specialist / Commercial).
3. **Service details** — image, description, what's included, per-size pricing, add-ons, sticky
   booking card, related services.
4. **Booking** — 7-step wizard + confirmation (see below).
5. **Pricing** — one-off vs recurring plans, price matrix, add-ons.
6. **About** — story, stats over video, values, reviews.
7. **Account** — upcoming/past bookings, rebook, cancel, saved addresses, editable profile.
8. **Contact** — WhatsApp/phone/email channels, validated form, coverage areas, FAQ accordion.
9. **Sign in / Sign up** — validation, show/hide password, strength meter, social buttons (visual).

---

## 🧾 Booking flow (centrepiece)

`Service → Property size → Extras → Frequency → Date & time → Details → Review & payment → Confirmation`

- **Live price summary** — sticky sidebar on desktop, sticky bottom bar (expandable) on mobile.
  The total **animates** on every change via `AnimatedNumber`.
- **Pricing engine** (`lib/services.ts`): `base(size) × service factor + extras − frequency discount`.
  Recurring discounts: weekly 20 %, fortnightly 15 %, monthly 10 %.
- **Calendar** with past dates disabled and time slots as tappable pills.
- **Inline validation** on the details step (email, UK phone, UK postcode).
- **Confirmation** with an animated success check; the booking is saved and appears in **Account**.

---

## 🎬 Media handling

- Videos use `‹video autoPlay loop muted playsInline preload="auto" poster›` — iOS-Safari safe,
  never pause on scroll, and pick a **portrait clip on mobile / landscape on desktop** via
  `‹source media›`.
- A poster paints instantly (no black flash) and doubles as the **reduced-motion fallback** (a
  still image is shown when the user prefers reduced motion).
- A whisper-soft gradient overlay masks any residual loop seam. If a clip ever shows a hard cut,
  the drop-in fallback is ping-pong playback (reverse on `ended`) — swap the `loop` attribute in
  `SmoothVideo.tsx` for an `onEnded` reverse handler.
- Images use `next/image` (AVIF/WebP, responsive `sizes`, no layout shift).

### Asset mapping
Provided assets were inspected for aspect ratio and mapped to clean filenames in
`public/assets/`. The original files are left untouched in the project root.

| Provided file | Used as |
| --- | --- |
| Modern_living_room_interior_view (2752×1536) | `videos`/`images` hero — desktop |
| Modern_living_room_interior_2K (1536×2752) | hero — mobile (portrait) |
| Dolly_push_through_modern_living (1280×720) | `hero-desktop.mp4` |
| Camera_moving_through_modern_liv (720×1280) | `hero-mobile.mp4` |
| Water_droplets_flowing_down_glass | `water-loop.mp4` (quality band) |
| White_linen_sheet_billowing | `linen-loop.mp4` (CTA / about) |
| Wiping_clean_kitchen_worktop | Deep / Kitchen / Oven |
| Empty_minimalist_office_space | Office / Post-renovation |
| Clean_modern_flat_ready_handover | Tenancy / Move-in / Move-out |
| Squeegee_cleaning_window_skyline | Window / Bathroom |
| Vacuum_lines_on_carpet | Carpet & Upholstery |
| Organized_home_interior_with_items | Standard Home / About |

---

## 📱 Mobile & performance

- Mobile-first; verified at **375 / 768 / 1440** with **zero horizontal scroll** on every route.
- Native app feel: bottom navigation bar, slide-in menu, ≥44px touch targets.
- Sticky navbar that shrinks on scroll; smooth route transitions.
- Animations use only `opacity`/`transform`, respect `prefers-reduced-motion`, and stay off the
  main thread where possible.
- `optimizePackageImports` for `lucide-react` and `framer-motion`; SSG for content routes.

---

## 💬 WhatsApp

The floating WhatsApp button and contact links are generated from `lib/site.ts`:

```ts
whatsapp: "442039000000", // digits only, international, no "+"
```

Update that single value to point at the real business number everywhere.

---

## ♿ Accessibility

- Skip-to-content link, semantic landmarks, `aria-*` on interactive controls.
- Visible focus rings, colour-contrast-aware palette in both themes.
- Full `prefers-reduced-motion` support (videos become stills, reveals become fades).

---

## 🔧 Customising

- **Services / pricing** → `lib/services.ts`
- **Reviews** → `lib/reviews.ts`
- **Business details / WhatsApp / coverage** → `lib/site.ts`
- **Theme colours** → CSS variables in `app/globals.css` (+ `tailwind.config.ts`)

---

Built with care. 🧼
