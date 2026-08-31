"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarClock,
  History,
  MapPin,
  UserCog,
  LogOut,
  RotateCcw,
  X,
  Plus,
  Trash2,
  Clock,
  ShieldCheck,
  Sparkles,
  Check,
} from "lucide-react";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/lib/auth-context";
import { useData } from "@/lib/data-context";
import { getService } from "@/lib/services";
import { cn, formatDate, formatGBP } from "@/lib/utils";
import type { Booking } from "@/lib/types";

const tabs = [
  { id: "upcoming", label: "Upcoming", icon: CalendarClock },
  { id: "history", label: "History", icon: History },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "profile", label: "Profile", icon: UserCog },
] as const;

const statusStyle: Record<Booking["status"], string> = {
  upcoming: "bg-accent-soft text-accent",
  completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  cancelled: "bg-red-500/10 text-red-500",
};

export function Dashboard() {
  const { user, ready, signOut, updateUser } = useAuth();
  const { bookings, addresses, cancelBooking, addAddress, removeAddress } = useData();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("upcoming");

  const upcoming = useMemo(
    () =>
      bookings
        .filter((b) => b.status === "upcoming")
        .sort((a, b) => +new Date(a.date) - +new Date(b.date)),
    [bookings],
  );
  const past = useMemo(
    () =>
      bookings
        .filter((b) => b.status !== "upcoming")
        .sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [bookings],
  );

  return (
    <div className="container-x pt-24 pb-24 md:pt-32">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-xl font-semibold text-accent-ink shadow-glow">
            {(user?.name ?? "G").charAt(0).toUpperCase()}
          </span>
          <div>
            <h1 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
              {user ? `Hello, ${user.name.split(" ")[0]}` : "Your dashboard"}
            </h1>
            <p className="text-sm text-muted">
              {user
                ? `Member since ${formatDate(user.joined)}`
                : "Browsing as guest"}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/booking" className="btn btn-primary">
            <Plus className="h-4 w-4" /> New booking
          </Link>
          {user ? (
            <button onClick={signOut} className="btn btn-secondary">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          ) : (
            <Link href="/sign-in" className="btn btn-secondary">
              Sign in
            </Link>
          )}
        </div>
      </div>

      {!user && ready && (
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-accent/30 bg-accent-soft/40 px-5 py-4 text-sm">
          <ShieldCheck className="h-5 w-5 text-accent" />
          <span className="text-ink">
            You're viewing sample data. Sign in to save your bookings and addresses.
          </span>
          <Link href="/sign-in" className="ml-auto font-medium text-accent hover:underline">
            Sign in →
          </Link>
        </div>
      )}

      {/* Quick stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Upcoming", value: upcoming.length, icon: CalendarClock },
          { label: "Completed", value: past.filter((b) => b.status === "completed").length, icon: Check },
          { label: "Addresses", value: addresses.length, icon: MapPin },
          { label: "Saved £", value: formatGBP(past.reduce((s, b) => s + Math.round(b.total * 0.1), 0)), icon: Sparkles },
        ].map((s) => (
          <div key={s.label} className="card p-4">
            <s.icon className="h-5 w-5 text-accent" />
            <div className="mt-3 font-heading text-2xl font-semibold text-ink">{s.value}</div>
            <div className="text-xs text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="no-scrollbar mt-10 flex gap-1 overflow-x-auto rounded-full border border-border bg-surface p-1">
        {tabs.map((t) => {
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                on ? "text-accent-ink" : "text-muted hover:text-ink",
              )}
            >
              {on && (
                <motion.span
                  layoutId="account-tab"
                  className="absolute inset-0 -z-10 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <t.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {tab === "upcoming" && (
              <BookingList
                bookings={upcoming}
                empty="No upcoming cleans yet. Ready to book one?"
                onCancel={cancelBooking}
              />
            )}
            {tab === "history" && (
              <BookingList bookings={past} empty="Your past cleans will appear here." />
            )}
            {tab === "addresses" && (
              <Addresses
                addresses={addresses}
                onAdd={addAddress}
                onRemove={removeAddress}
              />
            )}
            {tab === "profile" && (
              <Profile
                user={user}
                onSave={updateUser}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function BookingList({
  bookings,
  empty,
  onCancel,
}: {
  bookings: Booking[];
  empty: string;
  onCancel?: (id: string) => void;
}) {
  if (bookings.length === 0) {
    return (
      <div className="card flex flex-col items-center justify-center gap-4 p-12 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent">
          <Sparkles className="h-6 w-6" />
        </span>
        <p className="text-muted">{empty}</p>
        <Link href="/booking" className="btn btn-primary">
          Book a clean
        </Link>
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {bookings.map((b) => {
        const svc = getService(b.serviceSlug);
        return (
          <div key={b.id} className="card overflow-hidden">
            <div className="flex items-start gap-4 p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon name={svc?.icon ?? "Sparkles"} className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="truncate font-heading font-semibold text-ink">
                    {b.serviceName}
                  </h3>
                  <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize", statusStyle[b.status])}>
                    {b.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">Ref {b.reference}</p>
                <div className="mt-3 space-y-1.5 text-sm text-muted">
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent" />
                    {formatDate(b.date)} · {b.slot}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    {b.address.line1}, {b.address.postcode}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border bg-surface-2/40 px-5 py-3">
              <span className="font-heading text-lg font-semibold text-ink">
                {formatGBP(b.total)}
              </span>
              <div className="flex gap-2">
                <Link
                  href={`/booking?service=${b.serviceSlug}`}
                  className="btn btn-secondary h-9 px-3 text-xs"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Rebook
                </Link>
                {onCancel && b.status === "upcoming" && (
                  <button
                    onClick={() => onCancel(b.id)}
                    className="btn h-9 border border-border px-3 text-xs text-red-500 hover:bg-red-500/10"
                  >
                    <X className="h-3.5 w-3.5" /> Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Addresses({
  addresses,
  onAdd,
  onRemove,
}: {
  addresses: ReturnType<typeof useData>["addresses"];
  onAdd: (a: { label: string; line1: string; city: string; postcode: string }) => void;
  onRemove: (id: string) => void;
}) {
  const [form, setForm] = useState({ label: "", line1: "", city: "London", postcode: "" });
  const [showForm, setShowForm] = useState(false);
  const canAdd = form.label && form.line1 && form.city && form.postcode;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((a) => (
          <div key={a.id} className="card flex items-start justify-between p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium text-ink">{a.label}</p>
                <p className="mt-0.5 text-sm text-muted">{a.line1}</p>
                <p className="text-sm text-muted">
                  {a.city} · {a.postcode}
                </p>
              </div>
            </div>
            <button
              onClick={() => onRemove(a.id)}
              aria-label="Remove address"
              className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-red-500/10 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}

        {showForm ? (
          <div className="card p-5">
            <div className="grid gap-3">
              <input className="field" placeholder="Label (e.g. Home)" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
              <input className="field" placeholder="Address line" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <input className="field" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                <input className="field" placeholder="Postcode" value={form.postcode} onChange={(e) => setForm({ ...form, postcode: e.target.value.toUpperCase() })} />
              </div>
              <div className="flex gap-2">
                <button
                  disabled={!canAdd}
                  onClick={() => {
                    onAdd(form);
                    setForm({ label: "", line1: "", city: "London", postcode: "" });
                    setShowForm(false);
                  }}
                  className="btn btn-primary flex-1 disabled:opacity-50"
                >
                  Save address
                </button>
                <button onClick={() => setShowForm(false)} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Plus className="h-6 w-6" />
            <span className="text-sm font-medium">Add address</span>
          </button>
        )}
      </div>
    </div>
  );
}

function Profile({
  user,
  onSave,
}: {
  user: ReturnType<typeof useAuth>["user"];
  onSave: (p: { name?: string; email?: string; phone?: string }) => void;
}) {
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  });
  const [saved, setSaved] = useState(false);

  if (!user) {
    return (
      <div className="card flex flex-col items-center gap-4 p-12 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent">
          <UserCog className="h-6 w-6" />
        </span>
        <p className="text-muted">Sign in to manage your profile.</p>
        <Link href="/sign-in" className="btn btn-primary">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="card max-w-xl p-6">
      <div className="grid gap-4">
        <div>
          <label className="label">Full name</label>
          <input className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="field" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label className="label">Phone</label>
          <input className="field" type="tel" value={form.phone} placeholder="+44 7700 900000" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <button
          onClick={() => {
            onSave(form);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}
          className="btn btn-primary mt-2 w-full sm:w-auto sm:self-start sm:px-8"
        >
          {saved ? (
            <>
              <Check className="h-4 w-4" /> Saved
            </>
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </div>
  );
}
