"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ServiceCard } from "./ServiceCard";
import { services } from "@/lib/services";

const filters = [
  { id: "all", label: "All services" },
  { id: "home", label: "Home" },
  { id: "specialist", label: "Specialist" },
  { id: "commercial", label: "Commercial" },
] as const;

export function ServicesExplorer() {
  const [active, setActive] = useState<string>("all");
  const reduce = useReducedMotion();
  const list =
    active === "all" ? services : services.filter((s) => s.category === active);

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((f) => {
          const on = active === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                on ? "text-accent-ink" : "border border-border bg-surface text-muted hover:text-ink"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {f.label}
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((s, i) => (
            <motion.div
              key={s.slug}
              layout
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.04 }}
            >
              <ServiceCard service={s} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
