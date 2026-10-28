import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, Quote, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Section } from "@/components/Section";
import hero from "@/assets/hero.jpg";

import { supabase } from "@/integrations/supabase/client";
import { COMPANY, CORE_SERVICES, FAQS, INDUSTRIES, INSIGHTS, PROCESS, STATS, TESTIMONIALS, WHY_US } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ICL Group — Connecting Talent, Empowering Businesses" },
      { name: "description", content: "Find a job, post a vacancy or request consulting, recruitment, outsourcing and corporate support from ICL Group." },
      { property: "og:title", content: "ICL Group — Connecting Talent, Empowering Businesses, Driving Growth" },
      { property: "og:description", content: "Recruitment, consulting, outsourcing and corporate support services from ICL Group." },
    ],
  }),
  component: Index,
});


function FeaturedJobs() {
  const { data } = useQuery({
    queryKey: ["jobs", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase.from("jobs").select("id,title,location,company,job_type,category").eq("is_published", true).order("created_at", { ascending: false }).limit(4);
      if (error) throw error;
      return data;
    },
  });
  if (!data) return <p className="text-muted-foreground">Loading vacancies…</p>;
  if (data.length === 0) return <p className="text-muted-foreground">No open vacancies right now — check back soon.</p>;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.map((j) => (
        <Link key={j.id} to="/jobs/$id" params={{ id: j.id }} className="group rounded-lg border bg-card p-6 transition hover:border-brass">
          <div className="flex gap-2"><Badge variant="secondary">{j.category}</Badge><Badge variant="outline">{j.job_type}</Badge></div>
          <h3 className="mt-4 text-2xl group-hover:text-primary">{j.title}</h3>
          <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{j.location} · {j.company}</p>
        </Link>
      ))}
    </div>
  );
}

function Newsletter() {
  const [busy, setBusy] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = z.string().trim().email().max(255).safeParse(new FormData(form).get("email"));
    if (!parsed.success) { toast.error("Enter a valid email"); return; }
    setBusy(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: parsed.data.toLowerCase() });
    setBusy(false);
    if (error && error.code !== "23505") { toast.error("Could not subscribe. Please try again."); return; }
    toast.success("You're subscribed. Thank you!");
    form.reset();
  }
  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md gap-2">
      <Input name="email" type="email" required maxLength={255} placeholder="Your email address" className="h-11 bg-background text-foreground" />
      <Button type="submit" size="lg" disabled={busy} className="bg-brass text-accent-foreground hover:bg-brass/90">{busy ? "…" : "Subscribe"}</Button>
    </form>
  );
}

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink-gradient text-ink-foreground">
        <img src={hero} alt="Corporate team meeting in a modern boardroom" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-36">
          <p className="eyebrow">Consulting · Recruitment · Outsourcing · Corporate Support</p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[1.05] md:text-7xl">Connecting Talent, Empowering Businesses, Driving Growth.</h1>
          <p className="mt-6 max-w-xl text-lg opacity-80">ICL Group helps job seekers find the right roles and helps organisations hire, advise and run their operations with confidence.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-brass text-accent-foreground hover:bg-brass/90"><Link to="/jobs">Find a Job <ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="outline" className="border-ink-foreground/40 bg-transparent text-ink-foreground hover:bg-ink-foreground/10"><Link to="/post-job">Post a Job</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-ink-foreground/40 bg-transparent text-ink-foreground hover:bg-ink-foreground/10"><Link to="/services">Explore Our Services</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-ink-foreground/40 bg-transparent text-ink-foreground hover:bg-ink-foreground/10"><Link to="/contact">Request a Consultation</Link></Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="eyebrow">Who we are</p>
          <h2 className="mt-3 text-4xl">A partner for people and organisations.</h2>
          <p className="mt-5 text-muted-foreground">ICL Group brings together business consulting, recruitment, staff outsourcing and corporate support. We work alongside leadership teams to solve challenges, find talent and keep essential functions running smoothly.</p>
          <Button asChild variant="link" className="mt-4 px-0"><Link to="/about">More about the company →</Link></Button>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border">
            {STATS.map((s) => (
              <div key={s.label} className="bg-card p-6">
                <p className="font-display text-4xl text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Placeholder figures — to be updated with verified numbers.</p>
        </div>
      </section>

      <Section eyebrow="Our core services" title="Eight services, one trusted partner." className="border-y bg-secondary">
        <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {CORE_SERVICES.map((s, i) => (
            <div key={s.title} className="bg-card p-7">
              <span className="font-display text-2xl text-brass">0{i + 1}</span>
              <h3 className="mt-4 text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Featured vacancies" title="Open roles right now.">
        <FeaturedJobs />
        <Button asChild className="mt-8"><Link to="/jobs">View all vacancies</Link></Button>
      </Section>

      <Section eyebrow="Why choose us" title="What working with ICL feels like." className="bg-ink-gradient text-ink-foreground">
        <div className="grid gap-8 md:grid-cols-4">
          {WHY_US.map((w) => (
            <div key={w.title}>
              <CheckCircle2 className="h-7 w-7 text-brass" />
              <h3 className="mt-4 text-xl">{w.title}</h3>
              <p className="mt-2 text-sm opacity-75">{w.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Our recruitment process" title="From brief to placement in five steps.">
        <ol className="grid gap-6 md:grid-cols-5">
          {PROCESS.map((p, i) => (
            <li key={p.title} className="border-t-2 border-brass pt-5">
              <span className="text-sm font-bold text-muted-foreground">Step {i + 1}</span>
              <h3 className="mt-2 text-xl">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Industries we serve" title="Experience across sectors." className="border-y bg-secondary">
        <div className="flex flex-wrap gap-3">
          {INDUSTRIES.map((n) => <span key={n} className="rounded-full border bg-card px-5 py-2.5 text-sm font-medium">{n}</span>)}
        </div>
      </Section>

      <Section eyebrow="Client testimonials" title="What clients say.">
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="rounded-lg border bg-card p-7">
              <Quote className="h-6 w-6 text-brass" />
              <blockquote className="mt-4 font-display text-lg">{t.quote}</blockquote>
              <figcaption className="mt-5 text-sm"><span className="font-semibold">{t.name}</span><br /><span className="text-muted-foreground">{t.role}</span></figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Sample testimonials — to be replaced with real client feedback.</p>
      </Section>

      <Section eyebrow="Latest business insights" title="Ideas for leaders and job seekers." className="border-t">
        <div className="grid gap-6 md:grid-cols-3">
          {INSIGHTS.map((a) => (
            <article key={a.title} className="rounded-lg border bg-card p-7">
              <Badge variant="secondary">{a.tag}</Badge>
              <h3 className="mt-4 text-xl">{a.title}</h3>
              <p className="mt-4 text-xs text-muted-foreground">{a.date}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Frequently asked questions." className="border-y bg-secondary">
        <Accordion type="single" collapsible className="max-w-3xl">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`}>
              <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <Section eyebrow="Contact us" title="Let's talk about what you need.">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <ul className="grid gap-4 text-sm sm:grid-cols-2">
            <li className="flex gap-3"><Phone className="h-5 w-5 text-brass" />{COMPANY.phone}</li>
            <li className="flex gap-3"><Mail className="h-5 w-5 text-brass" />{COMPANY.email}</li>
            <li className="flex gap-3"><MapPin className="h-5 w-5 text-brass" />{COMPANY.address}</li>
            <li className="flex gap-3"><Clock className="h-5 w-5 text-brass" />{COMPANY.hours}</li>
          </ul>
          <Button asChild size="lg"><Link to="/contact">Request a Consultation <ArrowRight /></Link></Button>
        </div>
      </Section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-14">
          <div>
            <h2 className="text-3xl">Subscribe to our newsletter</h2>
            <p className="mt-2 text-sm opacity-80">Vacancies, hiring tips and business insights in your inbox.</p>
          </div>
          <Newsletter />
        </div>
      </section>
    </>
  );
}
