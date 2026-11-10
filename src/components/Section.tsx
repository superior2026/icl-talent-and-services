import type { ReactNode } from "react";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion";
import { fadeUp } from "@/lib/motion";

export function Section({
  eyebrow,
  title,
  intro,
  dark = false,
  children,
  className = "",
  id,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={className}>
      <div className="mx-auto max-w-7xl px-6 py-20">
        <Stagger>
          <StaggerItem variants={fadeUp}>
            <p className="eyebrow">{eyebrow}</p>
          </StaggerItem>
          <StaggerItem variants={fadeUp}>
            <h2 className="mt-3 max-w-2xl text-4xl md:text-5xl">{title}</h2>
          </StaggerItem>
          {intro && (
            <StaggerItem variants={fadeUp}>
              <p className={"mt-4 max-w-2xl text-lg " + (dark ? "opacity-80" : "text-muted-foreground")}>{intro}</p>
            </StaggerItem>
          )}
        </Stagger>
        <FadeUp className="mt-12">{children}</FadeUp>
      </div>
    </section>
  );
}
