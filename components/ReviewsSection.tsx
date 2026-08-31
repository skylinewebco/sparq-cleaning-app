import { reviews } from "@/lib/reviews";
import { site } from "@/lib/site";
import { Stars } from "./Stars";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

export function ReviewsSection({
  count = 6,
  heading = "Loved across London",
}: {
  count?: number;
  heading?: string;
}) {
  return (
    <section className="container-x py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Reviews</span>
        <h2 className="headline mt-4 text-3xl sm:text-4xl">{heading}</h2>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Stars rating={site.rating} size={18} />
          <span className="text-sm text-muted">
            <span className="font-semibold text-ink">{site.rating}</span> from{" "}
            {site.reviewCount.toLocaleString("en-GB")} verified reviews
          </span>
        </div>
      </Reveal>

      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.slice(0, count).map((r) => (
          <StaggerItem key={r.name}>
            <figure className="card flex h-full flex-col p-6">
              <Stars rating={r.rating} />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/90">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                  {r.name.charAt(0)}
                </span>
                <span className="text-sm">
                  <span className="block font-medium text-ink">{r.name}</span>
                  <span className="block text-muted">
                    {r.location} · {r.service}
                  </span>
                </span>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
