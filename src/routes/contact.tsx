import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { SERVICES } from "@/lib/auth";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Request a Service — ICL Group" },
      { name: "description", content: "Request consulting, recruitment, outsourcing or corporate support services from ICL Group." },
      { property: "og:title", content: "Request a Service — ICL Group" },
      { property: "og:description", content: "Tell ICL Group about your business needs and get a tailored proposal." },
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

function Contact() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) { toast.error(parsed.error.issues[0]?.message ?? "Check the form"); return; }
    setBusy(true);
    const { error } = await supabase.from("service_requests").insert({ ...parsed.data, phone: parsed.data.phone || null, company: parsed.data.company || null });
    setBusy(false);
    if (error) { toast.error("Could not send your request. Please try again."); return; }
    setDone(true);
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-[1fr_1.3fr]">
      <div>
        <p className="eyebrow">Request a service</p>
        <h1 className="mt-3 text-5xl">Let's talk about your business.</h1>
        <p className="mt-6 text-muted-foreground">Share a few details and a member of our team will reach out to discuss how we can help.</p>
      </div>
      {done ? (
        <div className="rounded-lg border bg-card p-10">
          <h2 className="text-3xl">Thank you.</h2>
          <p className="mt-3 text-muted-foreground">Your request has been received. Our team will be in touch.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="grid gap-5 rounded-lg border bg-card p-8 sm:grid-cols-2">
          <div className="space-y-2"><Label htmlFor="name">Full name *</Label><Input id="name" name="name" required maxLength={120} /></div>
          <div className="space-y-2"><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" required maxLength={255} /></div>
          <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" maxLength={40} /></div>
          <div className="space-y-2"><Label htmlFor="company">Company</Label><Input id="company" name="company" maxLength={160} /></div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="service">Service *</Label>
            <select id="service" name="service" required className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="">Select a service</option>
              {SERVICES.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
            </select>
          </div>
          <div className="space-y-2 sm:col-span-2"><Label htmlFor="message">How can we help? *</Label><Textarea id="message" name="message" rows={6} required maxLength={3000} /></div>
          <Button type="submit" size="lg" disabled={busy} className="sm:col-span-2">{busy ? "Sending…" : "Submit request"}</Button>
        </form>
      )}
    </div>
  );
}
