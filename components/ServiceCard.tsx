"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { Icon } from "./Icon";
import { formatGBP } from "@/lib/utils";
import type { Service } from "@/lib/types";

export function ServiceCard({
  service,
  priority = false,
}: {
  service: Service;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group h-full"
    >
      <Link
        href={`/services/${service.slug}`}
        className="card flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lift"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
          {service.popular && (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-ink shadow-soft">
              Popular
            </span>
          )}
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-ink backdrop-blur dark:bg-black/50 dark:text-white">
            <Clock className="h-3.5 w-3.5 text-accent" />
            {service.durationLabel}
          </span>
          <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-xl bg-white/90 text-accent shadow-soft backdrop-blur dark:bg-black/40">
            <Icon name={service.icon} className="h-5 w-5" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-heading text-lg font-semibold text-ink">
            {service.name}
          </h3>
          <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
            {service.short}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <div>
              <span className="text-xs text-muted">from</span>
              <span className="ml-1 font-heading text-xl font-semibold text-ink">
                {formatGBP(service.priceFrom)}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
              View
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
