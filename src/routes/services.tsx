import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  FileSearch,
  GraduationCap,
  Search,
  Shield,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { FadeUp, HeroItem, HeroReveal, ImageReveal, ServiceCard, Stagger, StaggerItem } from "@/components/motion";
import { fadeUp, serviceCard } from "@/lib/motion";
import whatWeDoImg from "@/assets/what-we-do.jpg";
import { CORE_SERVICES, ENGAGEMENT_MODELS, INDUSTRIES, SERVICE_OFFERINGS } from "@/lib/site-content";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Recruitment, Advisory & Corporate Support | ICL Group" },
      {
        name: "description",
        content:
          "ICL Group services: recruitment & outsourcing, business advisory, background checks, proof of funds, candidate assessment, training, payroll & accounting, and security services.",
      },
      { property: "og:title", content: "Services | ICL Group" },
      {
        property: "og:description",
        content: "Eight practical services — what each one covers and how we deliver it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhatWeDo,
});

const serviceIcons = [Search, Compass, FileSearch, BadgeCheck, ClipboardCheck, GraduationCap, Wallet, Shield];

function WhatWeDo() {
  return (
    <>
      <section className="grid bg-ink-gradient text-ink-foreground lg:grid-cols-[1fr_1.05fr]">
        <div className="relative order-2 min-h-[320px] overflow-hidden lg:order-1 lg:min-h-[560px]">
          <ImageReveal className="absolute inset-0 h-full w-full">
            <img
              src={whatWeDoImg}
              alt="Two colleagues reviewing a report and a laptop together"
              loading="lazy"
              width={1600}
              height={912}
              className="h-full w-full object-cover"
            />
          </ImageReveal>
        </div>
        <HeroReveal className="order-1 mx-auto flex w-full max-w-3xl flex-col justify-center px-6 py-20 lg:order-2 lg:px-12 lg:py-28">
          <HeroItem>
            <p className="eyebrow">What we do</p>
          </HeroItem>
          <HeroItem>
            <h1 className="mt-5 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              Eight services. One accountable team.
            </h1>
          </HeroItem>
          <HeroItem>
            <p className="mt-6 max-w-xl text-lg opacity-85">
              From recruitment and assessment to advisory, payroll and security — we cover the practical services
              organisations need to hire well and operate with confidence.
            </p>
          </HeroItem>
          <HeroItem>
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
          </HeroItem>
        </HeroReveal>
      </section>

      <Section
        eyebrow="Our services"
        title="What each service actually covers."
        intro="Pick the closest match to your situation. If your need spans more than one, say so — we will map it in one plan."
      >
        <Stagger className="grid gap-6 lg:grid-cols-2">
          {CORE_SERVICES.map((s, i) => {
            const Icon = serviceIcons[i] ?? Compass;
            const offer = SERVICE_OFFERINGS[s.title];
            return (
              <StaggerItem key={s.slug} variants={serviceCard}>
                <ServiceCard>
                  <div
                    id={s.slug}
                    className="flex h-full scroll-mt-28 flex-col rounded-lg border bg-card p-7"
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-primary/10 p-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">0{i + 1}</p>
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
                </ServiceCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <Section
        eyebrow="How we engage"
        title="Choose the shape that suits the work."
        dark
        className="bg-ink-gradient text-ink-foreground"
      >
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ENGAGEMENT_MODELS.map((m, i) => (
            <StaggerItem key={m.title} variants={fadeUp}>
              <div className="border-t-2 border-brass pt-5">
                <p className="font-display text-2xl text-brass">0{i + 1}</p>
                <h3 className="mt-2 text-xl">{m.title}</h3>
                <p className="mt-2 text-sm opacity-80">{m.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section
        eyebrow="Industries we serve"
        title="Experience across the sectors that keep an economy running."
        intro="Every sector has its own hiring norms, pay benchmarks and regulatory load. We adjust the process to match."
      >
        <Stagger className="flex flex-wrap gap-3" fast>
          {INDUSTRIES.map((ind) => (
            <StaggerItem key={ind} variants={fadeUp}>
              <span className="rounded-full border bg-card px-5 py-2.5 text-sm font-medium">{ind}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <section className="border-t bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <FadeUp>
            <p className="eyebrow">Where to start</p>
            <h2 className="mt-3 max-w-2xl text-4xl md:text-5xl">Three ways in, depending on what you need today.</h2>
          </FadeUp>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Talk it through",
                text: "Describe the problem in your own words and we will tell you which service fits — or if none does.",
                to: "/contact" as const,
                cta: "Contact us",
              },
              {
                title: "Send a vacancy",
                text: "Share the role and we will come back with a sourcing plan, a timeline and a fee.",
                to: "/post-job" as const,
                cta: "Post a job",
              },
              {
                title: "Find your next role",
                text: "Browse open vacancies, create a free account and apply with your CV in a couple of minutes.",
                to: "/jobs" as const,
                cta: "Browse vacancies",
              },
            ].map((card) => (
              <StaggerItem key={card.title} variants={fadeUp}>
                <HoverLift className="h-full">
                  <div className="flex h-full flex-col rounded-lg border bg-card p-7">
                    <h3 className="text-2xl">{card.title}</h3>
                    <p className="mt-3 flex-1 text-muted-foreground">{card.text}</p>
                    <Button asChild className="mt-6 w-fit">
                      <Link to={card.to}>
                        {card.cta} <ArrowRight />
                      </Link>
                    </Button>
                  </div>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
