import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ServicesExplorer } from "@/components/ServicesExplorer";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Cleaning Services & Pricing",
  description:
    "Explore SPARQ's full range of professional cleaning services in London — home, deep, end of tenancy, office, carpet, window and more. Transparent from-prices.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title="Professional cleaning, for every need"
        subtitle="Vetted, insured cleaners and transparent from-prices. Choose a service to see exactly what's included and book in minutes."
      />
      <section className="container-x mt-12 md:mt-16">
        <ServicesExplorer />
      </section>
      <div className="mt-24">
        <CTASection />
      </div>
    </>
  );
}
