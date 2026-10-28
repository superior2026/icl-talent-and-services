import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Handshake, HeartHandshake, Quote, ShieldCheck, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import companyImg from "@/assets/company.jpg";
import { LEADERSHIP, MILESTONES, MISSION, STORY, VALUES, VISION } from "@/lib/site-content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Company — Who We Are | ICL Group" },
      {
        name: "description",
        content:
          "ICL Group is a business consulting, recruitment, outsourcing and corporate support firm. Read who we are, what we stand for and how we work.",
      },
      { property: "og:title", content: "Company — Who We Are | ICL Group" },
      { property: "og:description", content: "Our purpose, values, leadership and milestones at ICL Group." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Company,
});

const valueIcons = [ShieldCheck, Target, Handshake, HeartHandshake];

function Company() {
  return (
    <>
      <section className="grid bg-ink-gradient text-ink-foreground lg:grid-cols-[1.05fr_1fr]">
        <div className="mx-auto flex w-full max-w-3xl flex-col justify-center px-6 py-20 lg:px-12 lg:py-28">
          <p className="eyebrow">The company</p>
          <h1 className="mt-5 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            One partner for talent, growth and everyday operations.
          </h1>
          <p className="mt-6 max-w-xl text-lg opacity-85">
            ICL Group brings consulting, recruitment, outsourcing and corporate support into a single firm — so the
            advice, the people and the back-office behind a decision can come from one accountable team.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-brass text-accent-foreground hover:bg-brass/90">
              <Link to="/contact">
                Talk to our team <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-ink-foreground/40 bg-transparent text-ink-foreground hover:bg-ink-foreground/10"
            >
              <Link to="/services">What we do</Link>
            </Button>
          </div>
        </div>
        <div className="relative min-h-[320px] lg:min-h-[560px]">
          <img
            src={companyImg}
            alt="A team of consultants reviewing plans together in a boardroom"
            loading="lazy"
            width={1600}
            height={912}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>

      <Section eyebrow="Why we exist" title="A purpose we can be held to.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-8">
            <p className="eyebrow">Mission</p>
            <p className="mt-4 text-xl leading-relaxed">{MISSION}</p>
          </div>
          <div className="rounded-lg border bg-card p-8">
            <p className="eyebrow">Vision</p>
            <p className="mt-4 text-xl leading-relaxed">{VISION}</p>
          </div>
        </div>
      </Section>

      <section className="border-y bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Built around one practical idea.</h2>
            <div className="mt-8 rounded-lg border-l-4 border-brass bg-card p-6">
              <Quote className="h-6 w-6 text-brass" />
              <p className="mt-3 text-xl italic leading-relaxed">
                “We would rather turn down work we cannot do well than take it and disappoint.”
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                A working principle at ICL Group — not a client testimonial.
              </p>
            </div>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            {STORY.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <Section eyebrow="What we stand for" title="Four values, applied rather than framed.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Icon = valueIcons[i] ?? ShieldCheck;
            return (
              <div key={v.title} className="rounded-lg border bg-card p-6">
                <Icon className="h-7 w-7 text-brass" />
                <h3 className="mt-4 text-xl">{v.title}</h3>
                <p className="mt-2 text-muted-foreground">{v.text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Milestones" title="How we got here." dark className="bg-ink-gradient text-ink-foreground">
        <p className="-mt-8 mb-8 text-sm italic opacity-70">
          Placeholder timeline — replace each entry with your real milestones before launch.
        </p>
        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {MILESTONES.map((m, i) => (
            <li key={m.title + i} className="border-t-2 border-brass pt-5">
              <p className="font-display text-2xl text-brass">{m.year}</p>
              <h3 className="mt-2 text-xl">{m.title}</h3>
              <p className="mt-2 text-sm opacity-75">{m.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Leadership" title="Who you will be working with.">
        <p className="-mt-8 mb-8 text-sm italic text-muted-foreground">
          Placeholder profiles — replace names, roles and photographs before launch.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERSHIP.map((l, i) => (
            <div key={i} className="rounded-lg border bg-card p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl">{l.name}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{l.role}</p>
              <p className="mt-3 text-sm text-muted-foreground">{l.focus}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-ink-gradient text-ink-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl">Tell us what you are trying to solve.</h2>
            <p className="mt-3 max-w-xl opacity-80">
              Send the brief, the role or the problem — we will tell you how we can help and what it would involve.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-brass text-accent-foreground hover:bg-brass/90">
              <Link to="/contact">
                Contact us <ArrowRight />
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
    </>
  );
}
