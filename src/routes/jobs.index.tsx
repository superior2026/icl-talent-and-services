import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

export const jobsQuery = queryOptions({
  queryKey: ["jobs"],
  queryFn: async () => {
    const { data, error } = await supabase.from("jobs").select("*").eq("is_published", true).order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
});

export const Route = createFileRoute("/jobs/")({
  head: () => ({
    meta: [
      { title: "Vacancies — ICL Group" },
      { name: "description", content: "Browse current job vacancies and apply online with ICL Group." },
      { property: "og:title", content: "Vacancies — ICL Group" },
      { property: "og:description", content: "Open roles across finance, HR, sales and outsourcing. Apply online." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(jobsQuery),
  component: Jobs,
});

function Jobs() {
  const { data: jobs } = useSuspenseQuery(jobsQuery);
  const [q, setQ] = useState("");
  const filtered = jobs.filter((j) => `${j.title} ${j.location} ${j.category}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="eyebrow">Careers</p>
      <h1 className="mt-3 text-5xl">Current vacancies</h1>
      <Input placeholder="Search by title, location or category" value={q} onChange={(e) => setQ(e.target.value)} className="mt-8 h-12" />
      <div className="mt-8 divide-y border-y">
        {filtered.map((j) => (
          <Link key={j.id} to="/jobs/$id" params={{ id: j.id }} className="group flex flex-wrap items-center justify-between gap-4 py-6">
            <div>
              <h2 className="text-2xl group-hover:text-primary">{j.title}</h2>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{j.location} · {j.company}</p>
            </div>
            <div className="flex gap-2"><Badge variant="secondary">{j.category}</Badge><Badge variant="outline">{j.job_type}</Badge></div>
          </Link>
        ))}
        {filtered.length === 0 && <p className="py-10 text-muted-foreground">No vacancies match your search.</p>}
      </div>
    </div>
  );
}
