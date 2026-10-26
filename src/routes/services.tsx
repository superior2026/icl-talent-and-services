import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/auth";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — ICL Group" },
      { name: "description", content: "Business consulting, recruitment, staff outsourcing and corporate support services from ICL Group." },
      { property: "og:title", content: "Services — ICL Group" },
      { property: "og:description", content: "Explore ICL Group's consulting, recruitment, outsourcing and corporate support services." },
    ],
  }),
  component: Services,
});

const details: Record<string, string[]> = {
  consulting: ["Business strategy & planning", "Organisational design", "Process improvement", "Market entry advisory"],
  recruitment: ["Executive search", "Mass & graduate recruitment", "Psychometric assessment", "Background checks"],
  outsourcing: ["Managed outsourced staff", "Payroll administration", "HR administration", "Contract staffing"],
  corporate: ["Company secretarial", "Regulatory compliance", "Corporate training", "Back-office support"],
};

function Services() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <p className="eyebrow">Services</p>
      <h1 className="mt-3 max-w-2xl text-5xl">Expertise for every stage of your organisation.</h1>
      <div className="mt-16 divide-y border-y">
        {SERVICES.map((s, i) => (
          <div key={s.slug} className="grid gap-6 py-10 md:grid-cols-[80px_1fr_1fr]">
            <span className="font-display text-3xl text-brass">0{i + 1}</span>
            <div>
              <h2 className="text-3xl">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.text}</p>
            </div>
            <ul className="space-y-2 text-sm">
              {details[s.slug].map((d) => <li key={d} className="border-b pb-2">{d}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <Button asChild size="lg" className="mt-12"><Link to="/contact">Request a service</Link></Button>
    </div>
  );
}
