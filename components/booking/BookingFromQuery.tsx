"use client";

import { useSearchParams } from "next/navigation";
import { BookingWizard } from "./BookingWizard";

/**
 * Reads ?service= in the browser so the booking page can be exported as
 * static HTML (GitHub Pages has no server to read query params).
 */
export function BookingFromQuery() {
  const service = useSearchParams().get("service") ?? undefined;
  return <BookingWizard key={service ?? "none"} initialService={service} />;
}
