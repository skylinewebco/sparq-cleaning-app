import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="SPARQ home"
      className={cn("group inline-flex items-center gap-2", className)}
    >
      <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-accent text-accent-ink shadow-glow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 2c.4 3.7 2.3 5.6 6 6-3.7.4-5.6 2.3-6 6-.4-3.7-2.3-5.6-6-6 3.7-.4 5.6-2.3 6-6Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="font-heading text-lg font-semibold tracking-[-0.03em] text-ink">
        SPAR<span className="text-accent">Q</span>
      </span>
    </Link>
  );
}
