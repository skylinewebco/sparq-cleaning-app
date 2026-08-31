import Link from "next/link";
import { Home, Sparkles, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70svh] flex-col items-center justify-center pt-28 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-accent-soft text-accent">
        <Sparkles className="h-8 w-8" />
      </span>
      <p className="mt-8 font-heading text-7xl font-semibold text-ink sm:text-8xl">404</p>
      <h1 className="mt-4 font-heading text-2xl font-semibold text-ink">
        This page took the day off
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The page you're looking for doesn't exist or has moved. Let's get you back to a
        spotless start.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          <Home className="h-4 w-4" /> Back home
        </Link>
        <Link href="/services" className="btn btn-secondary">
          Browse services <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
