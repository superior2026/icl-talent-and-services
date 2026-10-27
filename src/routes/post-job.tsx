import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/post-job")({
  head: () => ({
    meta: [
      { title: "Post a Job — ICL Group" },
      { name: "description", content: "Employers: send ICL Group your vacancy details and our recruitment team will advertise and fill the role." },
      { property: "og:title", content: "Post a Job — ICL Group" },
      { property: "og:description", content: "Submit a vacancy to ICL Group's recruitment team." },
    ],
  }),
  component: PostJob,
});

const opt = (n: number) => z.string().trim().max(n).optional().transform((v) => v || null);
const schema = z.object({
  contact_name: z.string().trim().min(1, "Your name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: opt(40),
  company: z.string().trim().min(1, "Company is required").max(160),
  job_title: z.string().trim().min(1, "Job title is required").max(160),
  location: z.string().trim().min(1, "Location is required").max(160),
  job_type: z.string().trim().min(1).max(40),
  openings: z.coerce.number().int().min(1, "At least 1 opening").max(1000),
  salary: opt(120),
  description: z.string().trim().min(1, "Describe the role").max(5000),
  requirements: opt(5000),
});

const TYPES = ["Full-time", "Part-time", "Contract", "Temporary", "Internship", "Remote"];

function PostJob() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) { toast.error(parsed.error.issues[0]?.message ?? "Check the form"); return; }
    setBusy(true);
    const { error } = await supabase.from("job_post_requests").insert(parsed.data);
    setBusy(false);
    if (error) { toast.error("Could not send your vacancy. Please try again."); return; }
    setDone(true);
  }

  const f = (id: string, label: string, props: React.ComponentProps<typeof Input> = {}) => (
    <div className="space-y-2"><Label htmlFor={id}>{label}</Label><Input id={id} name={id} {...props} /></div>
  );

  return (
    <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-[1fr_1.4fr]">
      <div>
        <p className="eyebrow">For employers</p>
        <h1 className="mt-3 text-5xl">Post a job with ICL Group.</h1>
        <p className="mt-6 text-muted-foreground">Tell us about the role. Our recruitment team will review it, confirm the details with you and advertise it to candidates.</p>
      </div>
      {done ? (
        <div className="rounded-lg border bg-card p-10">
          <h2 className="text-3xl">Vacancy received.</h2>
          <p className="mt-3 text-muted-foreground">Thank you. A recruiter will contact you to confirm the details before the role goes live.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="grid gap-5 rounded-lg border bg-card p-8 sm:grid-cols-2">
          <p className="eyebrow sm:col-span-2">Your details</p>
          {f("contact_name", "Contact name *", { required: true, maxLength: 120 })}
          {f("company", "Company *", { required: true, maxLength: 160 })}
          {f("email", "Email *", { type: "email", required: true, maxLength: 255 })}
          {f("phone", "Phone", { maxLength: 40 })}
          <p className="eyebrow mt-4 sm:col-span-2">The role</p>
          {f("job_title", "Job title *", { required: true, maxLength: 160 })}
          {f("location", "Location *", { required: true, maxLength: 160 })}
          <div className="space-y-2">
            <Label htmlFor="job_type">Job type *</Label>
            <select id="job_type" name="job_type" className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          {f("openings", "Number of openings *", { type: "number", min: 1, max: 1000, defaultValue: 1, required: true })}
          <div className="sm:col-span-2">{f("salary", "Salary range", { maxLength: 120 })}</div>
          <div className="space-y-2 sm:col-span-2"><Label htmlFor="description">Job description *</Label><Textarea id="description" name="description" rows={6} required maxLength={5000} /></div>
          <div className="space-y-2 sm:col-span-2"><Label htmlFor="requirements">Requirements</Label><Textarea id="requirements" name="requirements" rows={4} maxLength={5000} /></div>
          <Button type="submit" size="lg" disabled={busy} className="sm:col-span-2">{busy ? "Sending…" : "Submit vacancy"}</Button>
        </form>
      )}
    </div>
  );
}
