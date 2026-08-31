"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ArrowRight,
  Clock,
  Sun,
  Sunset,
  Moon,
  CreditCard,
  Wallet,
  Banknote,
  MapPin,
  Calendar as CalIcon,
  Sparkles,
  PartyPopper,
} from "lucide-react";
import { Icon } from "@/components/Icon";
import { Calendar } from "./Calendar";
import { PriceSummary } from "./PriceSummary";
import {
  services,
  extras as allExtras,
  frequencies,
  timeSlots,
  SIZE_ORDER,
  SIZE_LABELS,
  computePrice,
  getService,
} from "@/lib/services";
import type { Frequency, PropertySize } from "@/lib/types";
import { useAuth } from "@/lib/auth-context";
import { useData } from "@/lib/data-context";
import { cn, formatDate, formatGBP, reference } from "@/lib/utils";

const STEPS = [
  "Service",
  "Property",
  "Extras",
  "Frequency",
  "Schedule",
  "Details",
  "Payment",
];

const periodIcon = { Morning: Sun, Afternoon: Sunset, Evening: Moon } as const;

const paymentMethods = [
  { id: "Card", label: "Card", note: "Visa, Mastercard, Amex", icon: CreditCard },
  { id: "Apple Pay", label: "Apple Pay", note: "One-tap checkout", icon: Wallet },
  { id: "Google Pay", label: "Google Pay", note: "One-tap checkout", icon: Wallet },
  { id: "PayPal", label: "PayPal", note: "Pay with your balance", icon: Wallet },
  { id: "Cash on Completion", label: "Cash on Completion", note: "Pay the cleaner directly", icon: Banknote },
];

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const postcodeRe = /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/;

export function BookingWizard({ initialService }: { initialService?: string }) {
  const reduce = useReducedMotion();
  const { user } = useAuth();
  const { addBooking, addresses } = useData();

  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [serviceSlug, setServiceSlug] = useState<string | null>(
    initialService && getService(initialService) ? initialService : null,
  );
  const [size, setSize] = useState<PropertySize | null>(null);
  const [extraIds, setExtraIds] = useState<string[]>([]);
  const [freq, setFreq] = useState<Frequency>("one-off");
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [address, setAddress] = useState({ line1: "", city: "London", postcode: "" });
  const [contact, setContact] = useState({ name: "", email: "", phone: "", notes: "" });
  const [payment, setPayment] = useState<string | null>("Card");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  const topRef = useRef<HTMLDivElement>(null);

  // Prefill from session + saved address.
  useEffect(() => {
    if (user) {
      setContact((c) => ({
        ...c,
        name: c.name || user.name,
        email: c.email || user.email,
        phone: c.phone || user.phone || "",
      }));
    }
    if (addresses[0]) {
      setAddress((a) =>
        a.line1
          ? a
          : { line1: addresses[0].line1, city: addresses[0].city, postcode: addresses[0].postcode },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, addresses.length]);

  // If a commercial service is chosen, default size to office.
  useEffect(() => {
    const svc = serviceSlug ? getService(serviceSlug) : null;
    if (svc?.category === "commercial") setSize("office");
  }, [serviceSlug]);

  const breakdown = useMemo(
    () => computePrice(serviceSlug, size, extraIds, freq),
    [serviceSlug, size, extraIds, freq],
  );

  const service = serviceSlug ? getService(serviceSlug) : null;
  const selectedExtras = allExtras
    .filter((e) => extraIds.includes(e.id))
    .map((e) => ({ label: e.label, price: e.price }));
  const freqLabel = frequencies.find((f) => f.id === freq)?.label ?? "";

  const scrollTop = () =>
    topRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  const validate = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 1 && !serviceSlug) e.service = "Please choose a service.";
    if (s === 2 && !size) e.size = "Please select your property size.";
    if (s === 5) {
      if (!date) e.date = "Please pick a date.";
      if (!slot) e.slot = "Please choose a time slot.";
    }
    if (s === 6) {
      if (!contact.name.trim()) e.name = "Please enter your name.";
      if (!emailRe.test(contact.email)) e.email = "Enter a valid email address.";
      if (contact.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a valid phone number.";
      if (!address.line1.trim()) e.line1 = "Please enter your address.";
      if (!address.city.trim()) e.city = "Please enter your city.";
      if (!postcodeRe.test(address.postcode.trim())) e.postcode = "Enter a valid UK postcode.";
    }
    if (s === 7 && !payment) e.payment = "Please select a payment method.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    if (step === 7) {
      submit();
      return;
    }
    setDir(1);
    setStep((s) => Math.min(7, s + 1));
    setErrors({});
    setTimeout(scrollTop, 10);
  };

  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(1, s - 1));
    setErrors({});
    setTimeout(scrollTop, 10);
  };

  const goto = (s: number) => {
    if (s < step) {
      setDir(-1);
      setStep(s);
      setErrors({});
      setTimeout(scrollTop, 10);
    }
  };

  const submit = () => {
    if (!service || !size || !date || !slot || !payment) return;
    const ref = reference();
    addBooking({
      reference: ref,
      serviceSlug: service.slug,
      serviceName: service.name,
      propertySize: size,
      extras: extraIds,
      frequency: freq,
      date: date.toISOString(),
      slot: timeSlots.find((t) => t.id === slot)?.label ?? slot,
      address: { ...address },
      contact: { ...contact },
      payment,
      total: breakdown.total,
      status: "upcoming",
    });
    setConfirmedRef(ref);
    setDir(1);
    setStep(8);
    setTimeout(scrollTop, 10);
  };

  const continueBtn = (
    <button type="button" onClick={next} className="btn btn-primary w-full h-12 text-base">
      {step === 7 ? "Confirm booking" : "Continue"}
      <ArrowRight className="h-4.5 w-4.5" />
    </button>
  );

  const showSummary = step >= 1 && step <= 7 && serviceSlug;

  const stepVariants = {
    enter: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * -40 }),
  };

  /* ----------------------------- Confirmation ----------------------------- */
  if (step === 8) {
    return (
      <div ref={topRef} className="container-x pt-28 pb-24 md:pt-36">
        <div className="mx-auto max-w-lg text-center">
          <motion.div
            initial={reduce ? { opacity: 0 } : { scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-accent text-accent-ink shadow-glow"
          >
            <motion.svg width="46" height="46" viewBox="0 0 24 24" fill="none">
              <motion.path
                d="M4 12.5l5 5L20 6.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
              />
            </motion.svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <h1 className="headline mt-8 text-3xl sm:text-4xl">Booking confirmed!</h1>
            <p className="mt-3 text-muted">
              Thank you{contact.name ? `, ${contact.name.split(" ")[0]}` : ""}. Your clean
              is scheduled and a confirmation has been sent to{" "}
              <span className="text-ink">{contact.email}</span>.
            </p>

            <div className="card mt-8 p-6 text-left">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="inline-flex items-center gap-2 text-sm text-muted">
                  <PartyPopper className="h-4 w-4 text-accent" /> Reference
                </span>
                <span className="font-heading font-semibold text-ink">{confirmedRef}</span>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                <Row label="Service" value={service?.name ?? ""} />
                <Row label="When" value={`${date ? formatDate(date.toISOString()) : ""} · ${timeSlots.find((t) => t.id === slot)?.label ?? ""}`} />
                <Row label="Address" value={`${address.line1}, ${address.postcode}`} />
                <Row label="Payment" value={payment ?? ""} />
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <dt className="font-medium text-ink">Total</dt>
                  <dd className="font-heading text-xl font-semibold text-ink">
                    {formatGBP(breakdown.total)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/account" className="btn btn-primary h-12 px-6">
                View my bookings
              </Link>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn btn-secondary h-12 px-6"
              >
                Book another clean
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ------------------------------- Wizard -------------------------------- */
  return (
    <div ref={topRef} className="container-x pt-24 pb-40 md:pt-32 lg:pb-24">
      <div className="mx-auto max-w-6xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
              Book your clean
            </h1>
            <span className="text-sm text-muted">
              Step {step} of {STEPS.length}
            </span>
          </div>
          <div className="mt-5 flex gap-1.5">
            {STEPS.map((label, i) => {
              const idx = i + 1;
              const done = idx < step;
              const current = idx === step;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => goto(idx)}
                  className="group flex-1 text-left"
                  aria-label={`Go to step ${idx}: ${label}`}
                >
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={false}
                      animate={{ width: done ? "100%" : current ? "50%" : "0%" }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <span
                    className={cn(
                      "mt-2 hidden text-xs font-medium sm:block",
                      current ? "text-ink" : done ? "text-accent" : "text-muted",
                    )}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={cn("grid gap-8", showSummary && "lg:grid-cols-[1fr_360px]")}>
          {/* Step content */}
          <div className="min-w-0">
            {step > 1 && (
              <button
                type="button"
                onClick={back}
                className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
            )}

            {/* Clip the horizontal slide so step transitions never create page scroll.
                A keyed motion.div (no AnimatePresence exit) guarantees the correct step
                always mounts immediately — the incoming step animates in, and we never
                block on an exit animation that a throttled frame might not finish. */}
            <div className="overflow-x-hidden px-0.5 -mx-0.5">
              <motion.div
                key={step}
                custom={dir}
                variants={stepVariants}
                initial="enter"
                animate="center"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* STEP 1 — Service */}
                {step === 1 && (
                  <StepShell title="Which service do you need?" subtitle="Choose the clean that fits your space today.">
                    {errors.service && <ErrorNote>{errors.service}</ErrorNote>}
                    <div className="grid gap-3 sm:grid-cols-2">
                      {services.map((s) => {
                        const on = serviceSlug === s.slug;
                        return (
                          <button
                            key={s.slug}
                            type="button"
                            onClick={() => setServiceSlug(s.slug)}
                            className={cn(
                              "flex min-w-0 items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                              on
                                ? "border-accent bg-accent-soft/50 shadow-soft"
                                : "border-border bg-surface hover:border-accent/40 hover:bg-surface-2",
                            )}
                          >
                            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                              <Image src={s.image} alt="" fill sizes="64px" className="object-cover" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex min-w-0 items-center gap-2">
                                <Icon name={s.icon} className="h-4 w-4 shrink-0 text-accent" />
                                <span className="font-medium leading-tight text-ink">{s.name}</span>
                              </span>
                              <span className="mt-0.5 block text-xs text-muted">
                                from {formatGBP(s.priceFrom)} · {s.durationLabel}
                              </span>
                            </span>
                            <span
                              className={cn(
                                "grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors",
                                on ? "border-accent bg-accent text-accent-ink" : "border-border",
                              )}
                            >
                              {on && <Check className="h-4 w-4" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </StepShell>
                )}

                {/* STEP 2 — Property size */}
                {step === 2 && (
                  <StepShell title="How big is your space?" subtitle="This helps us allocate the right time and team.">
                    {errors.size && <ErrorNote>{errors.size}</ErrorNote>}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {SIZE_ORDER.map((sz) => {
                        const on = size === sz;
                        return (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setSize(sz)}
                            className={cn(
                              "flex flex-col items-start gap-1 rounded-2xl border p-4 text-left transition-all",
                              on
                                ? "border-accent bg-accent-soft/50 shadow-soft"
                                : "border-border bg-surface hover:border-accent/40 hover:bg-surface-2",
                            )}
                          >
                            <span className="font-medium text-ink">{SIZE_LABELS[sz]}</span>
                            {service && (
                              <span className="text-xs text-muted">
                                {formatGBP(computePrice(service.slug, sz, [], "one-off").base)}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </StepShell>
                )}

                {/* STEP 3 — Extras */}
                {step === 3 && (
                  <StepShell title="Add a few extras?" subtitle="Optional touches to tailor your clean. Tap to add.">
                    <div className="flex flex-wrap gap-3">
                      {allExtras.map((e) => {
                        const on = extraIds.includes(e.id);
                        return (
                          <button
                            key={e.id}
                            type="button"
                            onClick={() =>
                              setExtraIds((prev) =>
                                prev.includes(e.id) ? prev.filter((x) => x !== e.id) : [...prev, e.id],
                              )
                            }
                            className={cn(
                              "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all",
                              on
                                ? "border-accent bg-accent-soft/50 shadow-soft"
                                : "border-border bg-surface hover:border-accent/40 hover:bg-surface-2",
                            )}
                          >
                            <span
                              className={cn(
                                "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                                on ? "bg-accent text-accent-ink" : "bg-surface-2 text-accent",
                              )}
                            >
                              <Icon name={e.icon} className="h-5 w-5" />
                            </span>
                            <span>
                              <span className="block text-sm font-medium text-ink">{e.label}</span>
                              <span className="block text-xs text-muted">{e.description}</span>
                            </span>
                            <span className="ml-2 font-medium text-ink">+{formatGBP(e.price)}</span>
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-5 text-sm text-muted">
                      No extras needed? No problem — just continue.
                    </p>
                  </StepShell>
                )}

                {/* STEP 4 — Frequency */}
                {step === 4 && (
                  <StepShell title="How often?" subtitle="Save more with a recurring clean — pause or cancel anytime.">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {frequencies.map((f) => {
                        const on = freq === f.id;
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setFreq(f.id)}
                            className={cn(
                              "flex items-center justify-between rounded-2xl border p-5 text-left transition-all",
                              on
                                ? "border-accent bg-accent-soft/50 shadow-soft"
                                : "border-border bg-surface hover:border-accent/40 hover:bg-surface-2",
                            )}
                          >
                            <span>
                              <span className="block font-medium text-ink">{f.label}</span>
                              <span className="mt-0.5 block text-xs text-muted">
                                {f.id === "one-off" ? "A single clean" : "Recurring visit"}
                              </span>
                            </span>
                            {f.discount > 0 ? (
                              <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-ink">
                                Save {Math.round(f.discount * 100)}%
                              </span>
                            ) : (
                              <span
                                className={cn(
                                  "grid h-6 w-6 place-items-center rounded-full border",
                                  on ? "border-accent bg-accent text-accent-ink" : "border-border",
                                )}
                              >
                                {on && <Check className="h-4 w-4" />}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </StepShell>
                )}

                {/* STEP 5 — Schedule */}
                {step === 5 && (
                  <StepShell title="Pick a date & time" subtitle="Choose when you'd like your cleaner to arrive.">
                    {(errors.date || errors.slot) && (
                      <ErrorNote>{errors.date || errors.slot}</ErrorNote>
                    )}
                    <div className="grid gap-6 lg:grid-cols-2">
                      <Calendar value={date} onChange={(d) => setDate(d)} />
                      <div>
                        <p className="mb-3 flex items-center gap-2 text-sm font-medium text-ink">
                          <Clock className="h-4 w-4 text-accent" />
                          {date ? formatDate(date.toISOString()) : "Select a date first"}
                        </p>
                        {(["Morning", "Afternoon", "Evening"] as const).map((period) => {
                          const PIcon = periodIcon[period];
                          const slots = timeSlots.filter((t) => t.period === period);
                          return (
                            <div key={period} className="mb-4">
                              <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
                                <PIcon className="h-3.5 w-3.5" /> {period}
                              </p>
                              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                {slots.map((t) => {
                                  const on = slot === t.id;
                                  return (
                                    <button
                                      key={t.id}
                                      type="button"
                                      disabled={!date}
                                      onClick={() => setSlot(t.id)}
                                      className={cn(
                                        "rounded-xl border px-2 py-2.5 text-sm font-medium transition-all disabled:opacity-40",
                                        on
                                          ? "border-accent bg-accent text-accent-ink shadow-glow"
                                          : "border-border bg-surface text-ink hover:border-accent/40 hover:bg-surface-2",
                                      )}
                                    >
                                      {t.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </StepShell>
                )}

                {/* STEP 6 — Details */}
                {step === 6 && (
                  <StepShell title="Your details" subtitle="Where should we send your cleaner? We'll keep this safe.">
                    <div className="space-y-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                          label="Full name"
                          value={contact.name}
                          onChange={(v) => setContact({ ...contact, name: v })}
                          error={errors.name}
                          placeholder="Alex Morgan"
                          autoComplete="name"
                        />
                        <Field
                          label="Email"
                          type="email"
                          value={contact.email}
                          onChange={(v) => setContact({ ...contact, email: v })}
                          error={errors.email}
                          placeholder="you@email.com"
                          autoComplete="email"
                        />
                      </div>
                      <Field
                        label="Phone"
                        type="tel"
                        value={contact.phone}
                        onChange={(v) => setContact({ ...contact, phone: v })}
                        error={errors.phone}
                        placeholder="+44 7700 900000"
                        autoComplete="tel"
                      />
                      <Field
                        label="Address line"
                        value={address.line1}
                        onChange={(v) => setAddress({ ...address, line1: v })}
                        error={errors.line1}
                        placeholder="42 Barnsbury Street"
                        autoComplete="address-line1"
                      />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                          label="City"
                          value={address.city}
                          onChange={(v) => setAddress({ ...address, city: v })}
                          error={errors.city}
                          placeholder="London"
                          autoComplete="address-level2"
                        />
                        <Field
                          label="Postcode"
                          value={address.postcode}
                          onChange={(v) => setAddress({ ...address, postcode: v.toUpperCase() })}
                          error={errors.postcode}
                          placeholder="N1 1PN"
                          autoComplete="postal-code"
                        />
                      </div>
                      <div>
                        <label className="label">Special instructions (optional)</label>
                        <textarea
                          value={contact.notes}
                          onChange={(e) => setContact({ ...contact, notes: e.target.value })}
                          rows={3}
                          placeholder="Access notes, pets, parking, priorities…"
                          className="field resize-none"
                        />
                      </div>
                    </div>
                  </StepShell>
                )}

                {/* STEP 7 — Payment / review */}
                {step === 7 && (
                  <StepShell title="Review & payment" subtitle="Check the details and choose how you'd like to pay.">
                    <div className="card mb-6 divide-y divide-border">
                      <ReviewRow icon={Sparkles} label="Service" value={`${service?.name} · ${size ? SIZE_LABELS[size] : ""}`} onEdit={() => goto(1)} />
                      <ReviewRow icon={CalIcon} label="When" value={`${date ? formatDate(date.toISOString()) : ""} · ${timeSlots.find((t) => t.id === slot)?.label ?? ""}`} onEdit={() => goto(5)} />
                      <ReviewRow icon={MapPin} label="Address" value={`${address.line1}, ${address.city} ${address.postcode}`} onEdit={() => goto(6)} />
                      {selectedExtras.length > 0 && (
                        <ReviewRow icon={Check} label="Extras" value={selectedExtras.map((e) => e.label).join(", ")} onEdit={() => goto(3)} />
                      )}
                    </div>

                    {errors.payment && <ErrorNote>{errors.payment}</ErrorNote>}
                    <p className="mb-3 text-sm font-medium text-ink">Payment method</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {paymentMethods.map((m) => {
                        const on = payment === m.id;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setPayment(m.id)}
                            className={cn(
                              "flex min-w-0 items-center gap-3 rounded-2xl border p-4 text-left transition-all",
                              on
                                ? "border-accent bg-accent-soft/50 shadow-soft"
                                : "border-border bg-surface hover:border-accent/40 hover:bg-surface-2",
                            )}
                          >
                            <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", on ? "bg-accent text-accent-ink" : "bg-surface-2 text-ink")}>
                              <m.icon className="h-5 w-5" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-medium text-ink">{m.label}</span>
                              <span className="block truncate text-xs text-muted">{m.note}</span>
                            </span>
                            <span className={cn("grid h-5 w-5 place-items-center rounded-full border", on ? "border-accent bg-accent text-accent-ink" : "border-border")}>
                              {on && <Check className="h-3.5 w-3.5" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-4 rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-xs text-muted">
                      This is a demo checkout — no real payment is processed and no card
                      details are collected. Your booking is saved locally on this device.
                    </p>
                  </StepShell>
                )}
              </motion.div>
            </div>

            {/* Desktop inline continue (also present in summary) hidden on lg where summary shows it */}
            <div className="mt-8 lg:hidden">
              {/* mobile continue handled by sticky bar */}
            </div>
            {showSummary && (
              <div className="mt-8 hidden lg:block">{/* summary carries CTA */}</div>
            )}
          </div>

          {/* Desktop sticky summary */}
          {showSummary && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <PriceSummary
                  variant="sidebar"
                  serviceName={service?.name}
                  sizeLabel={size ? SIZE_LABELS[size] : undefined}
                  freqLabel={freqLabel}
                  extras={selectedExtras}
                  breakdown={breakdown}
                  footer={continueBtn}
                />
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Mobile sticky price bar */}
      {showSummary && (
        <PriceSummary
          variant="bar"
          serviceName={service?.name}
          sizeLabel={size ? SIZE_LABELS[size] : undefined}
          freqLabel={freqLabel}
          extras={selectedExtras}
          breakdown={breakdown}
          footer={continueBtn}
        />
      )}

      {/* When no service selected yet on step 1, provide a plain continue for mobile */}
      {!showSummary && (
        <div className="pb-safe fixed inset-x-0 bottom-[68px] z-30 border-t border-border bg-bg/95 px-5 py-3 backdrop-blur-xl lg:hidden">
          {continueBtn}
        </div>
      )}
      {!showSummary && (
        <div className="mt-8 hidden lg:block">
          <div className="max-w-xs">{continueBtn}</div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ sub-parts ------------------------------ */

function StepShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-heading text-xl font-semibold text-ink sm:text-2xl">{title}</h2>
      {subtitle && <p className="mt-1.5 text-sm text-muted">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cn("field", error && "field-error")}
        aria-invalid={!!error}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function ErrorNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 rounded-xl border border-red-400/50 bg-red-500/5 px-4 py-3 text-sm text-red-500">
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}

function ReviewRow({
  icon: I,
  label,
  value,
  onEdit,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center gap-3 p-4">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
        <I className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-muted">{label}</span>
        <span className="block truncate text-sm font-medium text-ink">{value}</span>
      </span>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 text-sm font-medium text-accent hover:underline"
      >
        Edit
      </button>
    </div>
  );
}
