import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Book a Clean",
  description:
    "Book a professional cleaning service in London in minutes. Choose your service, date and extras with live transparent pricing.",
};

export default function BookingPage({
  searchParams,
}: {
  searchParams: { service?: string };
}) {
  return <BookingWizard initialService={searchParams.service} />;
}
