import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your SPARQ account to manage bookings and addresses.",
};

export default function SignInPage() {
  return <AuthForm mode="signin" />;
}
