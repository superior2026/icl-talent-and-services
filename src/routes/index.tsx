import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Building2, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";
import { SERVICES } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ICL Group — Consulting, Recruitment & Corporate Services" },
      { name: "description", content: "Request business consulting, recruitment and outsourcing services, or browse and apply for vacancies with ICL Group." },
      { property: "og:title", content: "ICL Group — Consulting, Recruitment & Corporate Services" },
      { property: "og:description", content: "Business consulting, recruitment, outsourcing and corporate support from ICL Group." },
    ],
  }),
  component: Index,
});

const icons = [Building2, Users, Briefcase, ShieldCheck];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink-gradient text-ink-foreground">
        <img src={hero} alt="ICL Group consultants in a boardroom" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
          <p className="eyebrow">Consulting · Recruitment · Outsourcing</p>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[1.05] md:text-7xl">The people and structure behind growing businesses.</h1>
          <p className="mt-6 max-w-xl text-lg opacity-80">ICL Group advises leadership teams, finds exceptional talent and runs the corporate functions that keep organisations moving.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-brass text-accent-foreground hover:bg-brass/90"><Link to="/contact">Request a service <ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="outline" className="border-ink-foreground/40 bg-transparent text-ink-foreground hover:bg-ink-foreground/10"><Link to="/jobs">Browse vacancies</Link></Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Four practices, one partner.</h2>
          </div>
          <Link to="/services" className="text-sm font-semibold text-primary">All services →</Link>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = icons[i];
            return (
              <div key={s.slug} className="bg-card p-8">
                <Icon className="h-7 w-7 text-brass" />
                <h3 className="mt-6 text-xl">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <p className="eyebrow">For employers</p>
            <h2 className="mt-3 text-3xl">Tell us what your business needs.</h2>
            <p className="mt-4 text-muted-foreground">Share your challenge and a consultant will come back to you with a tailored proposal.</p>
            <Button asChild className="mt-6"><Link to="/contact">Start a request</Link></Button>
          </div>
          <div>
            <p className="eyebrow">For job seekers</p>
            <h2 className="mt-3 text-3xl">Your next role starts here.</h2>
            <p className="mt-4 text-muted-foreground">Create an account, upload your CV once and apply to vacancies in a few clicks.</p>
            <Button asChild variant="outline" className="mt-6"><Link to="/jobs">See open roles</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
