"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const isSignup = mode === "signup";

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (isSignup && !form.name.trim()) err.name = "Please enter your name.";
    if (!emailRe.test(form.email)) err.email = "Enter a valid email address.";
    if (form.password.length < 8) err.password = "Password must be at least 8 characters.";
    if (isSignup && form.confirm !== form.password) err.confirm = "Passwords don't match.";
    setErrors(err);
    if (Object.keys(err).length) return;

    setLoading(true);
    // Simulate a brief network round-trip for a polished feel.
    setTimeout(() => {
      if (isSignup) signUp(form.name.trim(), form.email);
      else signIn(form.email);
      router.push("/account");
    }, 650);
  };

  const strength = Math.min(4, Math.floor(form.password.length / 3));

  return (
    <div className="grid min-h-[100svh] lg:grid-cols-2">
      {/* Form side */}
      <div className="flex flex-col justify-center px-5 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Logo />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="headline mt-10 text-3xl sm:text-4xl">
              {isSignup ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-2 text-muted">
              {isSignup
                ? "Join thousands of Londoners enjoying effortless cleaning."
                : "Sign in to manage your bookings and addresses."}
            </p>

            {/* Social (visual only) */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { label: "Google", node: <GoogleIcon /> },
                { label: "Apple", node: <AppleIcon /> },
              ].map((s) => (
                <button
                  key={s.label}
                  type="button"
                  title="Demo only"
                  className="btn btn-secondary h-11"
                  onClick={() => {
                    // visual demo — sign in as a guest to explore
                    signIn(`${s.label.toLowerCase()}.user@example.com`);
                    router.push("/account");
                  }}
                >
                  {s.node}
                  {s.label}
                </button>
              ))}
            </div>

            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs uppercase tracking-wide text-muted">or</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={submit} className="grid gap-4" noValidate>
              {isSignup && (
                <div>
                  <label className="label">Full name</label>
                  <input
                    className={cn("field", errors.name && "field-error")}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Alex Morgan"
                    autoComplete="name"
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                </div>
              )}
              <div>
                <label className="label">Email</label>
                <input
                  className={cn("field", errors.email && "field-error")}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@email.com"
                  autoComplete="email"
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    className={cn("field pr-12", errors.password && "field-error")}
                    type={show ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    autoComplete={isSignup ? "new-password" : "current-password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                  >
                    {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {isSignup && form.password.length > 0 && (
                  <div className="mt-2 flex gap-1.5">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-colors",
                          i < strength ? "bg-accent" : "bg-surface-2",
                        )}
                      />
                    ))}
                  </div>
                )}
                {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
              </div>
              {isSignup && (
                <div>
                  <label className="label">Confirm password</label>
                  <input
                    className={cn("field", errors.confirm && "field-error")}
                    type={show ? "text" : "password"}
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  {errors.confirm && <p className="mt-1.5 text-xs text-red-500">{errors.confirm}</p>}
                </div>
              )}

              {!isSignup && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-muted">
                    <input type="checkbox" className="h-4 w-4 rounded border-border text-accent focus:ring-accent" />
                    Remember me
                  </label>
                  <button type="button" className="font-medium text-accent hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary h-12 text-base"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-ink/40 border-t-accent-ink" />
                    Please wait…
                  </span>
                ) : (
                  <>
                    {isSignup ? "Create account" : "Sign in"}
                    <ArrowRight className="h-4.5 w-4.5" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted">
              {isSignup ? "Already have an account?" : "New to SPARQ?"}{" "}
              <Link
                href={isSignup ? "/sign-in" : "/sign-up"}
                className="font-medium text-accent hover:underline"
              >
                {isSignup ? "Sign in" : "Create an account"}
              </Link>
            </p>
            <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Demo authentication —
              your session is stored locally on this device only.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Visual side */}
      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src="/assets/images/hero-desktop.jpg"
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
        <div className="absolute bottom-0 left-0 p-12 text-white">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Check className="h-4 w-4 text-accent" /> Trusted by 12,000+ homes
          </div>
          <p className="mt-4 max-w-sm font-heading text-3xl font-medium leading-tight">
            “The easiest way I've ever booked a cleaner. Genuinely brilliant.”
          </p>
          <p className="mt-3 text-sm text-white/70">Charlotte H. · Islington</p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.36 12.7c.02 2.53 2.22 3.37 2.25 3.38-.02.06-.35 1.2-1.15 2.37-.7 1.02-1.42 2.04-2.56 2.06-1.12.02-1.48-.66-2.76-.66-1.27 0-1.67.64-2.73.68-1.1.04-1.94-1.1-2.64-2.12-1.44-2.08-2.54-5.88-1.06-8.45.73-1.28 2.05-2.09 3.48-2.11 1.08-.02 2.1.73 2.76.73.66 0 1.9-.9 3.2-.77.55.02 2.09.22 3.08 1.67-.08.05-1.84 1.07-1.82 3.19M14.28 4.6c.58-.7.97-1.68.86-2.66-.84.03-1.85.56-2.45 1.26-.54.62-1.01 1.62-.88 2.58.93.07 1.89-.47 2.47-1.18" />
    </svg>
  );
}
