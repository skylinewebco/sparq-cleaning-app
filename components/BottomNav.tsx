"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Sparkles, CalendarPlus, CalendarCheck, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Sparkles },
  { href: "/booking", label: "Book", icon: CalendarPlus, center: true },
  { href: "/account", label: "Bookings", icon: CalendarCheck },
  { href: "/contact", label: "Support", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      aria-label="Primary"
      className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/85 backdrop-blur-xl md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 items-end px-2">
        {items.map((it) => {
          const active = isActive(it.href);
          const Icon = it.icon;
          if (it.center) {
            return (
              <li key={it.href} className="flex justify-center">
                <Link
                  href={it.href}
                  aria-label={it.label}
                  className="mb-2 grid h-14 w-14 -translate-y-3 place-items-center rounded-2xl bg-accent text-accent-ink shadow-glow transition-transform active:scale-95"
                >
                  <Icon className="h-6 w-6" />
                </Link>
              </li>
            );
          }
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex min-h-[56px] flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium transition-colors",
                  active ? "text-accent" : "text-muted",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="bottom-dot"
                    className="absolute top-1 h-1 w-1 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon className="h-[22px] w-[22px]" strokeWidth={active ? 2.4 : 1.8} />
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
