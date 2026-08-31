"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Booking, SavedAddress } from "./types";
import { uid } from "./utils";

interface DataContextValue {
  bookings: Booking[];
  addresses: SavedAddress[];
  ready: boolean;
  addBooking: (b: Omit<Booking, "id" | "createdAt">) => Booking;
  cancelBooking: (id: string) => void;
  addAddress: (a: Omit<SavedAddress, "id">) => void;
  removeAddress: (id: string) => void;
}

const BOOKINGS_KEY = "sparq.bookings";
const ADDR_KEY = "sparq.addresses";

const DataContext = createContext<DataContextValue | null>(null);

function daysFromNow(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function seedBookings(): Booking[] {
  return [
    {
      id: uid(),
      reference: "SPQ-4821",
      serviceSlug: "standard-home",
      serviceName: "Standard Home Cleaning",
      propertySize: "2-bed",
      extras: ["ironing"],
      frequency: "weekly",
      date: daysFromNow(3),
      slot: "10:00 – 12:00",
      address: { line1: "42 Barnsbury Street", city: "London", postcode: "N1 1PN" },
      contact: {
        name: "You",
        email: "you@example.com",
        phone: "+44 7700 900123",
      },
      payment: "Card",
      total: 76,
      status: "upcoming",
      createdAt: daysFromNow(-4),
    },
    {
      id: uid(),
      reference: "SPQ-4655",
      serviceSlug: "deep-cleaning",
      serviceName: "Deep Cleaning",
      propertySize: "2-bed",
      extras: ["inside-oven", "inside-fridge"],
      frequency: "one-off",
      date: daysFromNow(11),
      slot: "12:00 – 14:00",
      address: { line1: "42 Barnsbury Street", city: "London", postcode: "N1 1PN" },
      contact: {
        name: "You",
        email: "you@example.com",
        phone: "+44 7700 900123",
      },
      payment: "Apple Pay",
      total: 148,
      status: "upcoming",
      createdAt: daysFromNow(-2),
    },
    {
      id: uid(),
      reference: "SPQ-3910",
      serviceSlug: "window-cleaning",
      serviceName: "Window Cleaning",
      propertySize: "2-bed",
      extras: [],
      frequency: "one-off",
      date: daysFromNow(-14),
      slot: "08:00 – 10:00",
      address: { line1: "42 Barnsbury Street", city: "London", postcode: "N1 1PN" },
      contact: {
        name: "You",
        email: "you@example.com",
        phone: "+44 7700 900123",
      },
      payment: "Cash on Completion",
      total: 54,
      status: "completed",
      createdAt: daysFromNow(-20),
    },
    {
      id: uid(),
      reference: "SPQ-3542",
      serviceSlug: "carpet-upholstery",
      serviceName: "Carpet & Upholstery",
      propertySize: "2-bed",
      extras: [],
      frequency: "one-off",
      date: daysFromNow(-38),
      slot: "14:00 – 16:00",
      address: { line1: "42 Barnsbury Street", city: "London", postcode: "N1 1PN" },
      contact: {
        name: "You",
        email: "you@example.com",
        phone: "+44 7700 900123",
      },
      payment: "PayPal",
      total: 90,
      status: "completed",
      createdAt: daysFromNow(-44),
    },
  ];
}

function seedAddresses(): SavedAddress[] {
  return [
    {
      id: uid(),
      label: "Home",
      line1: "42 Barnsbury Street",
      city: "London",
      postcode: "N1 1PN",
    },
    {
      id: uid(),
      label: "Office",
      line1: "18 Rivington Street",
      city: "London",
      postcode: "EC2A 3DY",
    },
  ];
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const rawB = localStorage.getItem(BOOKINGS_KEY);
      setBookings(rawB ? JSON.parse(rawB) : seedBookings());
      const rawA = localStorage.getItem(ADDR_KEY);
      setAddresses(rawA ? JSON.parse(rawA) : seedAddresses());
    } catch {
      setBookings(seedBookings());
      setAddresses(seedAddresses());
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    } catch {
      /* ignore */
    }
  }, [bookings, ready]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(ADDR_KEY, JSON.stringify(addresses));
    } catch {
      /* ignore */
    }
  }, [addresses, ready]);

  const addBooking = useCallback((b: Omit<Booking, "id" | "createdAt">) => {
    const full: Booking = { ...b, id: uid(), createdAt: new Date().toISOString() };
    setBookings((prev) => [full, ...prev]);
    return full;
  }, []);

  const cancelBooking = useCallback((id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)),
    );
  }, []);

  const addAddress = useCallback((a: Omit<SavedAddress, "id">) => {
    setAddresses((prev) => [...prev, { ...a, id: uid() }]);
  }, []);

  const removeAddress = useCallback((id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      bookings,
      addresses,
      ready,
      addBooking,
      cancelBooking,
      addAddress,
      removeAddress,
    }),
    [bookings, addresses, ready, addBooking, cancelBooking, addAddress, removeAddress],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
