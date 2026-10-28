import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY, CONTACT_FAQ, CONTACT_PATHS, CORE_SERVICES } from "@/lib/site-content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Request a Consultation | ICL Group" },
      {
        name: "description",
        content:
          "Contact ICL Group to request consulting, recruitment, outsourcing or corporate support. Send an enquiry, post a job or ask about any of our eight services.",
      },
      { property: "og:title", content: "Contact Us | ICL Group" },
      {
        property: "og:description",
        content: "Tell us the problem you are trying to solve and we will tell you how we can help.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(160).optional(),
  service: z.string().min(1, "Choose a service"),
  message: z.string().trim().min(1, "Tell us a little about your needs").max(3000),
});

const channels = [
  { icon: Phone, label: "Phone", value: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\s/g, "")}` },
  { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: MapPin, label: "Office", value: COMPANY.address },
  { icon: Clock, label: "Office hours", value: COMPANY.hours },
];

function Contact() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check the form");
      return;
    }
    setBusy(true);
    const { error } = await supabase
      .from("service_requests")
      .insert({ ...parsed.data, phone: parsed.data.phone || null, company: parsed.data.company || null });
    setBusy(false);
    if (error) {
      toast.error("Could not send your request. Please try again.");
      return;
    }
    setDone(true);
  }

  return (
    <>
      <section className="bg-ink-gradient text-ink-foreground">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <p className="eyebrow">Contact us</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            Tell us what you need. We will tell you how we can help.
          </h1>
          <p className="mt-6 max-w-2xl text-lg opacity-85">
            Use the form for anything — a role to fill, a function to hand over, a decision to pressure-test. If we
            are not the right fit, we will say so.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {CONTACT_PATHS.map((p) => (
              <div key={p.title} className="rounded-lg border border-ink-foreground/25 p-6">
                <h2 className="text-xl">{p.title}</h2>
                <p className="mt-2 text-sm opacity-80">{p.text}</p>
                <Link
                  to={p.to}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brass hover:underline"
                >
                  {p.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Direct channels</p>
          <h2 className="mt-3 text-3xl md:text-4xl">Prefer to reach a person?</h2>
          <p className="mt-4 text-muted-foreground">
            Every enquiry lands with the same team, whichever route you use.
          </p>

          <ul className="mt-8 space-y-5">
            {channels.map((c) => (
              <li key={c.label} className="flex gap-4">
                <div className="h-fit rounded-md bg-primary/10 p-2.5">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="mt-0.5 block font-medium hover:text-primary">
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-0.5 font-medium">{c.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-lg border border-dashed p-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-brass" />
              <p className="font-medium">Office location</p>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Placeholder — once the real office address is confirmed, a map of that location will appear here.
            </p>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">These details are placeholders.</span> Send your real phone
            number, email, office address, opening hours and response promise and they will replace these everywhere
            on the site.
          </p>

        </div>

        <div>
          {done ? (
            <div className="rounded-lg border bg-card p-10">
              <h2 className="text-3xl">Thank you.</h2>
              <p className="mt-3 text-muted-foreground">
                Your request has been received and is now in our team's queue. We will be in touch.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <Link to="/jobs">Browse vacancies</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/services">See what we do</Link>
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="grid gap-5 rounded-lg border bg-card p-8 sm:grid-cols-2"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Full name *</Label>
                <Input id="name" name="name" required maxLength={120} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required maxLength={255} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" maxLength={40} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" maxLength={160} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="service">What do you need? *</Label>
                <select
                  id="service"
                  name="service"
                  required
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="">Select a service</option>
                  {CORE_SERVICES.map((s) => (
                    <option key={s.title} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Something else">Something else</option>
                </select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="message">How can we help? *</Label>
                <Textarea id="message" name="message" rows={6} required maxLength={3000} />
              </div>
              <Button type="submit" size="lg" disabled={busy} className="sm:col-span-2">
                {busy ? "Sending…" : "Submit request"}
              </Button>
              <p className="text-xs text-muted-foreground sm:col-span-2">
                Submitting does not create an account. To apply for jobs you will need a free candidate account.
              </p>
            </form>
          )}
        </div>
      </div>

      <section className="border-t bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Before you ask</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Questions we answer most often.</h2>
            <p className="mt-4 text-muted-foreground">
              If yours is not here, send it with your enquiry and we will add the answer to this page.
            </p>
          </div>
          <Accordion type="single" collapsible className="rounded-lg border bg-card px-6">
            {CONTACT_FAQ.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
