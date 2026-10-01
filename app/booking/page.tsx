import { Suspense } from "react";
import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { BookingFromQuery } from "@/components/booking/BookingFromQuery";

export const metadata: Metadata = {
  title: "Book a Clean",
  description:
    "Book a professional cleaning service in London in minutes. Choose your service, date and extras with live transparent pricing.",
};

export default function BookingPage() {
  return (
    <Suspense fallback={<BookingWizard />}>
      <BookingFromQuery />
    </Suspense>
  );
}
