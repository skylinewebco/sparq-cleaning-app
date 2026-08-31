import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a SPARQ account and book premium cleaning in minutes.",
};

export default function SignUpPage() {
  return <AuthForm mode="signup" />;
}
