import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Compass,
  GraduationCap,
  HeartHandshake,
  Layers,
  Scale,
  Search,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import whatWeDoImg from "@/assets/what-we-do.jpg";
import { CORE_SERVICES, ENGAGEMENT_MODELS, INDUSTRIES, SERVICE_OFFERINGS } from "@/lib/site-content";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "What We Do — Consulting, Recruitment & Outsourcing | ICL Group" },
      {
        name: "description",
        content:
          "Eight services under one roof: business consulting, recruitment and executive search, staff outsourcing, payroll, HR advisory, training, compliance and back-office support.",
      },
      { property: "og:title", content: "What We Do | ICL Group" },
      {
        property: "og:description",
        content:
          "Consulting, recruitment, outsourcing and corporate support services — what each one covers and how we deliver it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhatWeDo,
});

const serviceIcons = [Compass, Search, Layers, Wallet, HeartHandshake, GraduationCap, Scale, ClipboardList];

function WhatWeDo() {
  return (
    <>
      <section className="grid bg-ink-gradient text-ink-foreground lg:grid-cols-[1fr_1.05fr]">
        <div className="relative order-2 min-h-[320px] lg:order-1 lg:min-h-[560px]">
          <img
            src={whatWeDoImg}
            alt="Two colleagues reviewing a report and a laptop together"
            loading="lazy"
            width={1600}
            height={912}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="order-1 mx-auto flex w-full max-w-3xl flex-col justify-center px-6 py-20 lg:order-2 lg:px-12 lg:py-28">
          <p className="eyebrow">What we do</p>
          <h1 className="mt-5 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            Eight services. One accountable team.
          </h1>
          <p className="mt-6 max-w-xl text-lg opacity-85">
            Most firms do one thing well. We cover the whole span — from the strategy decision, to the people who
            deliver it, to the payroll, filings and admin that keep it running afterwards.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-brass text-accent-foreground hover:bg-brass/90">
              <Link to="/contact">
                Request a consultation <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-ink-foreground/40 bg-transparent text-ink-foreground hover:bg-ink-foreground/10"
            >
              <Link to="/post-job">Post a job</Link>
            </Button>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Our services"
        title="What each service actually covers."
        intro="Pick the closest match to your situation. If your need spans more than one, say so — we will map it in one plan."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {CORE_SERVICES.map((s, i) => {
            const Icon = serviceIcons[i] ?? Compass;
            const offer = SERVICE_OFFERINGS[s.title];
            return (
              <div key={s.title} className="flex flex-col rounded-lg border bg-card p-7 transition hover:border-brass">
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">
                      0{i + 1}
                    </p>
                    <h3 className="mt-1 text-2xl">{s.title}</h3>
                    <p className="mt-1 text-muted-foreground">{s.text}</p>
                  </div>
                </div>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {(offer?.includes ?? []).map((inc) => (
                    <li key={inc} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {inc}
                    </li>
                  ))}
                </ul>
                {offer && (
                  <p className="mt-6 border-t pt-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Best for: </span>
                    {offer.bestFor}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        eyebrow="How we engage"
        title="Choose the shape that suits the work."
        dark
        className="bg-ink-gradient text-ink-foreground"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ENGAGEMENT_MODELS.map((m, i) => (
            <div key={m.title} className="border-t-2 border-brass pt-5">
              <p className="font-display text-2xl text-brass">0{i + 1}</p>
              <h3 className="mt-2 text-xl">{m.title}</h3>
              <p className="mt-2 text-sm opacity-80">{m.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Industries we serve"
        title="Experience across the sectors that keep an economy running."
        intro="Every sector has its own hiring norms, pay benchmarks and regulatory load. We adjust the process to match."
      >
        <ul className="flex flex-wrap gap-3">
          {INDUSTRIES.map((ind) => (
            <li key={ind} className="rounded-full border bg-card px-5 py-2.5 text-sm font-medium">
              {ind}
            </li>
          ))}
        </ul>
      </Section>

      <section className="border-t bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="eyebrow">Where to start</p>
          <h2 className="mt-3 max-w-2xl text-4xl md:text-5xl">Three ways in, depending on what you need today.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="flex flex-col rounded-lg border bg-card p-7">
              <h3 className="text-2xl">Talk it through</h3>
              <p className="mt-3 flex-1 text-muted-foreground">
                Describe the problem in your own words and we will tell you which service fits — or if none does.
              </p>
              <Button asChild className="mt-6 w-fit">
                <Link to="/contact">
                  Contact us <ArrowRight />
                </Link>
              </Button>
            </div>
            <div className="flex flex-col rounded-lg border bg-card p-7">
              <h3 className="text-2xl">Send a vacancy</h3>
              <p className="mt-3 flex-1 text-muted-foreground">
                Share the role and we will come back with a sourcing plan, a timeline and a fee.
              </p>
              <Button asChild className="mt-6 w-fit">
                <Link to="/post-job">
                  Post a job <ArrowRight />
                </Link>
              </Button>
            </div>
            <div className="flex flex-col rounded-lg border bg-card p-7">
              <h3 className="text-2xl">Find your next role</h3>
              <p className="mt-3 flex-1 text-muted-foreground">
                Browse open vacancies, create a free account and apply with your CV in a couple of minutes.
              </p>
              <Button asChild className="mt-6 w-fit">
                <Link to="/jobs">
                  Browse vacancies <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
