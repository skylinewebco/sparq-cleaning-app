import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="container-x pt-28 md:pt-36">
      <div className="max-w-2xl">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="headline mt-4 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
