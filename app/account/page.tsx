import type { Metadata } from "next";
import { Dashboard } from "@/components/account/Dashboard";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your SPARQ bookings, saved addresses and profile.",
};

export default function AccountPage() {
  return <Dashboard />;
}
