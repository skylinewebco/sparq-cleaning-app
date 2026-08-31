"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, Tag, ShieldCheck } from "lucide-react";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { formatGBP } from "@/lib/utils";
import type { PriceBreakdown } from "@/lib/services";
import { cn } from "@/lib/utils";

interface Props {
  serviceName?: string;
  sizeLabel?: string;
  freqLabel?: string;
  extras: { label: string; price: number }[];
  breakdown: PriceBreakdown;
  variant: "sidebar" | "bar";
  footer?: React.ReactNode;
}

function Lines({ serviceName, sizeLabel, freqLabel, extras, breakdown }: Props) {
  return (
    <div className="space-y-2.5 text-sm">
      {serviceName ? (
        <div className="flex justify-between">
          <span className="text-muted">
            {serviceName}
            {sizeLabel ? ` · ${sizeLabel}` : ""}
          </span>
          <span className="font-medium text-ink">{formatGBP(breakdown.base)}</span>
        </div>
      ) : (
        <div className="flex justify-between text-muted">
          <span>Select a service to see pricing</span>
        </div>
      )}

      {extras.map((e) => (
        <div key={e.label} className="flex justify-between text-muted">
          <span>+ {e.label}</span>
          <span>{formatGBP(e.price)}</span>
        </div>
      ))}

      {breakdown.discount > 0 && (
        <div className="flex justify-between text-accent">
          <span className="inline-flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5" />
            {freqLabel} discount ({Math.round(breakdown.discountPct * 100)}%)
          </span>
          <span>−{formatGBP(breakdown.discount)}</span>
        </div>
      )}
    </div>
  );
}

export function PriceSummary(props: Props) {
  const { breakdown, variant, footer } = props;
  const [open, setOpen] = useState(false);

  if (variant === "sidebar") {
    return (
      <div className="card overflow-hidden">
        <div className="border-b border-border bg-surface-2/50 px-6 py-4">
          <h3 className="font-heading text-base font-semibold text-ink">
            Your booking
          </h3>
        </div>
        <div className="p-6">
          <Lines {...props} />
          <div className="mt-5 flex items-end justify-between border-t border-border pt-5">
            <span className="text-sm text-muted">Total</span>
            <AnimatedNumber
              value={breakdown.total}
              className="font-heading text-3xl font-semibold text-ink"
            />
          </div>
          {breakdown.discountPct > 0 && (
            <p className="mt-1 text-right text-xs text-accent">
              per visit · billed after each clean
            </p>
          )}
          {footer && <div className="mt-6">{footer}</div>}
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" /> No payment taken until
            your clean is confirmed
          </p>
        </div>
      </div>
    );
  }

  // Mobile sticky bottom bar with expandable detail
  return (
    <div className="pb-safe fixed inset-x-0 bottom-[68px] z-30 border-t border-border bg-bg/95 backdrop-blur-xl lg:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-b border-border px-5 py-4">
              <Lines {...props} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center gap-3 px-5 py-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col items-start"
          aria-expanded={open}
        >
          <span className="inline-flex items-center gap-1 text-[11px] text-muted">
            Total <ChevronUp className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
          </span>
          <AnimatedNumber
            value={breakdown.total}
            className="font-heading text-2xl font-semibold text-ink"
          />
        </button>
        <div className="ml-auto min-w-0 flex-1">{footer}</div>
      </div>
    </div>
  );
}
