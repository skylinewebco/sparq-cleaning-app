"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildCalendar, isPast, isSameDay } from "@/lib/utils";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function Calendar({
  value,
  onChange,
}: {
  value: Date | null;
  onChange: (d: Date) => void;
}) {
  const today = new Date();
  const [view, setView] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [dir, setDir] = useState(0);

  const days = buildCalendar(view.year, view.month);
  const canGoBack =
    view.year > today.getFullYear() ||
    (view.year === today.getFullYear() && view.month > today.getMonth());

  const shift = (delta: number) => {
    setDir(delta);
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex items-center justify-between px-1">
        <div className="font-heading text-base font-semibold text-ink">
          {MONTHS[view.month]} {view.year}
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            aria-label="Previous month"
            disabled={!canGoBack}
            onClick={() => shift(-1)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink transition-colors hover:bg-surface-2 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => shift(1)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink transition-colors hover:bg-surface-2"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={`${view.year}-${view.month}`}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-7 gap-1"
          >
            {days.map(({ date, inMonth }, i) => {
              const past = isPast(date);
              const disabled = past || !inMonth;
              const selected = value && isSameDay(date, value);
              const isToday = isSameDay(date, today);
              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled}
                  onClick={() => onChange(date)}
                  className={cn(
                    "relative flex aspect-square items-center justify-center rounded-xl text-sm transition-all",
                    disabled && "cursor-not-allowed text-muted/35",
                    !disabled && !selected && "text-ink hover:bg-surface-2",
                    selected && "bg-accent font-semibold text-accent-ink shadow-glow",
                    !inMonth && "opacity-40",
                  )}
                >
                  {date.getDate()}
                  {isToday && !selected && (
                    <span className="absolute bottom-1 h-1 w-1 rounded-full bg-accent" />
                  )}
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
