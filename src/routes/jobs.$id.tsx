import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/lib/auth";

const jobQuery = (id: string) =>
  queryOptions({
    queryKey: ["job", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("jobs").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const Route = createFileRoute("/jobs/$id")({
  loader: async ({ context, params }) => {
    const job = await context.queryClient.ensureQueryData(jobQuery(params.id));
    if (!job) throw notFound();
    return job;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — ICL Group Careers` },
          { name: "description", content: loaderData.description.slice(0, 155) },
          { property: "og:title", content: `${loaderData.title} — ICL Group` },
          { property: "og:description", content: loaderData.description.slice(0, 155) },
        ]
      : [{ title: "Vacancy unavailable — ICL Group" }, { name: "robots", content: "noindex" }],
  }),
  component: JobDetail,
});

function JobDetail() {
  const { id } = Route.useParams();
  const { data: job } = useSuspenseQuery(jobQuery(id));
  const { user } = useUser();
  const [cvPath, setCvPath] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);
  const [cover, setCover] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("cv_path").eq("id", user.id).maybeSingle().then(({ data }) => setCvPath(data?.cv_path ?? null));
    supabase.from("applications").select("id").eq("job_id", id).eq("user_id", user.id).maybeSingle().then(({ data }) => setApplied(!!data));
  }, [user, id]);

  if (!job) return null;

  async function apply() {
    if (!user) return;
    setBusy(true);
    const { error } = await supabase.from("applications").insert({ job_id: id, user_id: user.id, cover_letter: cover.slice(0, 4000), cv_path: cvPath });
    setBusy(false);
    if (error) return toast.error("Could not submit application.");
    setApplied(true);
    toast.success("Application submitted");
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.5fr_1fr]">
      <article>
        <Link to="/jobs" className="text-sm text-muted-foreground">← All vacancies</Link>
        <h1 className="mt-4 text-5xl">{job.title}</h1>
        <p className="mt-3 text-muted-foreground">{job.company} · {job.location}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">{job.category}</Badge><Badge variant="outline">{job.job_type}</Badge>
          {job.salary && <Badge variant="outline">{job.salary}</Badge>}
        </div>
        <h2 className="mt-10 text-2xl">The role</h2>
        <p className="mt-3 whitespace-pre-line text-muted-foreground">{job.description}</p>
        {job.requirements && (<><h2 className="mt-8 text-2xl">Requirements</h2><p className="mt-3 whitespace-pre-line text-muted-foreground">{job.requirements}</p></>)}
      </article>
      <aside className="h-fit rounded-lg border bg-card p-6">
        <h2 className="text-2xl">Apply</h2>
        {!user ? (
          <>
            <p className="mt-2 text-sm text-muted-foreground">Sign in or create an account to apply with your CV.</p>
            <Button asChild className="mt-4 w-full"><Link to="/auth">Sign in to apply</Link></Button>
          </>
        ) : applied ? (
          <p className="mt-3 text-sm">You've applied for this role. Track it in <Link to="/account" className="font-semibold text-primary">My account</Link>.</p>
        ) : (
          <>
            {!cvPath && <p className="mt-2 rounded bg-secondary p-3 text-sm">No CV on file. <Link to="/account" className="font-semibold text-primary">Upload your CV</Link> before applying.</p>}
            <Textarea className="mt-4" rows={6} placeholder="Cover letter (optional)" value={cover} onChange={(e) => setCover(e.target.value)} maxLength={4000} />
            <Button className="mt-4 w-full" disabled={busy || !cvPath} onClick={apply}>{busy ? "Submitting…" : "Submit application"}</Button>
          </>
        )}
      </aside>
    </div>
  );
}
