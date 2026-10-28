import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  intro,
  dark = false,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 max-w-2xl text-4xl md:text-5xl">{title}</h2>
        {intro && (
          <p className={"mt-4 max-w-2xl text-lg " + (dark ? "opacity-80" : "text-muted-foreground")}>{intro}</p>
        )}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
