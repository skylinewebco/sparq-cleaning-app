"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, User as UserIcon, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 8));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Close the mobile menu on route change + lock body scroll while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto flex max-w-content items-center justify-between gap-4 px-5 transition-all duration-300 ease-smooth sm:px-6 lg:px-8",
          scrolled
            ? "h-14 border-b border-border/70 bg-bg/80 backdrop-blur-xl"
            : "h-[72px] bg-transparent",
        )}
      >
        <Logo />

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                isActive(l.href) ? "text-ink" : "text-muted hover:text-ink",
              )}
            >
              {isActive(l.href) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:grid" />
          {user ? (
            <Link
              href="/account"
              className="hidden items-center gap-2 rounded-full border border-border bg-surface px-2.5 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-surface-2 sm:flex"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-[11px] font-semibold text-accent-ink">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <span className="max-w-[8rem] truncate">{user.name.split(" ")[0]}</span>
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="hidden items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-2 sm:flex"
            >
              <UserIcon className="h-4 w-4" />
              Sign in
            </Link>
          )}
          <Link href="/booking" className="btn btn-primary hidden sm:inline-flex">
            Book now
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-ink md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="panel"
              initial={reduce ? { opacity: 0 } : { x: "100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              className="fixed right-0 top-0 z-50 flex h-full w-[82%] max-w-sm flex-col border-l border-border bg-bg p-6 shadow-lift md:hidden"
            >
              <div className="flex items-center justify-between">
                <Logo onClick={() => setOpen(false)} />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1">
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.05 }}
                  >
                    <Link
                      href={l.href}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors",
                        isActive(l.href)
                          ? "bg-surface-2 text-ink"
                          : "text-muted hover:bg-surface-2 hover:text-ink",
                      )}
                    >
                      {l.label}
                      <ArrowRight className="h-4 w-4 opacity-50" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-3 pt-6">
                <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
                  <span className="text-sm text-muted">Appearance</span>
                  <ThemeToggle />
                </div>
                <Link
                  href="/booking"
                  className="btn btn-primary w-full"
                  onClick={() => setOpen(false)}
                >
                  Book a clean
                </Link>
                <Link
                  href={user ? "/account" : "/sign-in"}
                  className="btn btn-secondary w-full"
                  onClick={() => setOpen(false)}
                >
                  {user ? "My account" : "Sign in"}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
