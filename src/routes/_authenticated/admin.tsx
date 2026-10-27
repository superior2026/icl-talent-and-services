import { createFileRoute, redirect } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Job = Database["public"]["Tables"]["jobs"]["Row"];
type Req = Database["public"]["Tables"]["service_requests"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type App = Database["public"]["Tables"]["applications"]["Row"] & { jobs: { title: string } | null };

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async ({ context }) => {
    const { data } = await supabase.rpc("has_role", { _user_id: context.user.id, _role: "admin" });
    if (!data) throw redirect({ to: "/account" });
  },
  head: () => ({ meta: [{ title: "Admin dashboard — ICL Group" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

const APP_STATUSES = ["submitted", "reviewing", "shortlisted", "interview", "offered", "rejected"];
const REQ_STATUSES = ["new", "contacted", "in progress", "closed"];
const POST_STATUSES = ["new", "contacted", "approved", "published", "declined"];
type Post = Database["public"]["Tables"]["job_post_requests"]["Row"];

function Admin() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [reqs, setReqs] = useState<Req[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [editing, setEditing] = useState<Partial<Job> | null>(null);
  const [tab, setTab] = useState("requests");

  const load = useCallback(async () => {
    const [j, r, a, p, jp] = await Promise.all([
      supabase.from("jobs").select("*").order("created_at", { ascending: false }),
      supabase.from("service_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("applications").select("*, jobs(title)").order("created_at", { ascending: false }),
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("job_post_requests").select("*").order("created_at", { ascending: false }),
    ]);
    setJobs(j.data ?? []); setReqs(r.data ?? []); setApps((a.data as App[]) ?? []); setProfiles(p.data ?? []); setPosts(jp.data ?? []);
  }, []);
  useEffect(() => { load(); }, [load]);

  const profileOf = (id: string) => profiles.find((p) => p.id === id);

  async function openCv(path: string | null) {
    if (!path) { toast.error("No CV attached"); return; }
    const { data, error } = await supabase.storage.from("cvs").createSignedUrl(path, 300);
    if (error || !data) { toast.error("Could not open CV"); return; }
    window.open(data.signedUrl, "_blank");
  }

  async function saveJob(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const g = (k: string) => String(fd.get(k) ?? "").trim();
    const row = {
      title: g("title"), company: g("company") || "ICL Group Client", location: g("location"), job_type: g("job_type") || "Full-time",
      category: g("category") || "General", salary: g("salary") || null, description: g("description"), requirements: g("requirements") || null,
      deadline: g("deadline") || null, is_published: editing?.is_published ?? true,
    };
    const { error } = editing?.id ? await supabase.from("jobs").update(row).eq("id", editing.id) : await supabase.from("jobs").insert(row);
    if (error) { toast.error(error.message); return; }
    toast.success("Vacancy saved"); setEditing(null); load();
  }

  async function del(table: "jobs" | "service_requests" | "applications" | "job_post_requests", id: string) {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    load();
  }

  const stats = [
    ["Open vacancies", jobs.filter((j) => j.is_published).length],
    ["Applications", apps.length],
    ["New requests", reqs.filter((r) => r.status === "new").length],
    ["New job posts", posts.filter((r) => r.status === "new").length],
    ["Registered users", profiles.length],
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <p className="eyebrow">Admin</p>
      <h1 className="mt-2 text-4xl">Dashboard</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map(([l, v]) => (
          <div key={l} className="rounded-lg border bg-card p-5"><p className="text-sm text-muted-foreground">{l}</p><p className="mt-2 font-display text-4xl">{v}</p></div>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab} className="mt-10">
        <TabsList>
          <TabsTrigger value="requests">Service requests</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="jobposts">Job post requests</TabsTrigger>
          <TabsTrigger value="jobs">Vacancies</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="jobposts" className="mt-6 space-y-3">
          {posts.map((r) => (
            <div key={r.id} className="rounded-lg border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{r.job_title} <span className="text-muted-foreground">· {r.company}</span></p>
                  <p className="text-sm text-muted-foreground">{r.contact_name} · {r.email}{r.phone && ` · ${r.phone}`} · {new Date(r.created_at).toLocaleString()}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="secondary">{r.location}</Badge><Badge variant="outline">{r.job_type}</Badge>
                    <Badge variant="outline">{r.openings} opening{r.openings > 1 ? "s" : ""}</Badge>
                    {r.salary && <Badge variant="outline">{r.salary}</Badge>}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <select value={r.status} onChange={async (e) => { await supabase.from("job_post_requests").update({ status: e.target.value }).eq("id", r.id); load(); }} className="h-8 rounded-md border bg-background px-2 text-sm capitalize">
                    {POST_STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <Button size="sm" variant="outline" onClick={() => {
                    setEditing({ title: r.job_title, company: r.company, location: r.location, job_type: r.job_type, salary: r.salary, description: r.description, requirements: r.requirements, is_published: false });
                    setTab("jobs");
                  }}>Create vacancy</Button>
                  <Button size="sm" variant="ghost" onClick={() => del("job_post_requests", r.id)}>Delete</Button>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-line text-sm">{r.description}</p>
              {r.requirements && <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{r.requirements}</p>}
            </div>
          ))}
          {posts.length === 0 && <p className="text-muted-foreground">No job post requests yet.</p>}
        </TabsContent>

        <TabsContent value="requests" className="mt-6 space-y-3">
          {reqs.map((r) => (
            <div key={r.id} className="rounded-lg border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{r.name} {r.company && <span className="text-muted-foreground">· {r.company}</span>}</p>
                  <p className="text-sm text-muted-foreground">{r.email}{r.phone && ` · ${r.phone}`} · {new Date(r.created_at).toLocaleString()}</p>
                  <Badge variant="secondary" className="mt-2">{r.service}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <select value={r.status} onChange={async (e) => { await supabase.from("service_requests").update({ status: e.target.value }).eq("id", r.id); load(); }} className="h-8 rounded-md border bg-background px-2 text-sm capitalize">
                    {REQ_STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <Button size="sm" variant="ghost" onClick={() => del("service_requests", r.id)}>Delete</Button>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-line text-sm">{r.message}</p>
            </div>
          ))}
          {reqs.length === 0 && <p className="text-muted-foreground">No service requests yet.</p>}
        </TabsContent>

        <TabsContent value="applications" className="mt-6 space-y-3">
          {apps.map((a) => {
            const p = profileOf(a.user_id);
            return (
              <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-5">
                <div>
                  <p className="font-semibold">{p?.full_name || p?.email || "Candidate"} <span className="text-muted-foreground">→ {a.jobs?.title}</span></p>
                  <p className="text-sm text-muted-foreground">{p?.email}{p?.phone && ` · ${p.phone}`} · {new Date(a.created_at).toLocaleDateString()}</p>
                  {a.cover_letter && <p className="mt-2 max-w-2xl text-sm">{a.cover_letter}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => openCv(a.cv_path)}>View CV</Button>
                  <select value={a.status} onChange={async (e) => { await supabase.from("applications").update({ status: e.target.value }).eq("id", a.id); load(); }} className="h-8 rounded-md border bg-background px-2 text-sm capitalize">
                    {APP_STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <Button size="sm" variant="ghost" onClick={() => del("applications", a.id)}>Delete</Button>
                </div>
              </div>
            );
          })}
          {apps.length === 0 && <p className="text-muted-foreground">No applications yet.</p>}
        </TabsContent>

        <TabsContent value="jobs" className="mt-6">
          <Button onClick={() => setEditing({ is_published: true })}>Post new vacancy</Button>
          {editing && (
            <form key={editing.id ?? "new"} onSubmit={saveJob} className="mt-6 grid gap-4 rounded-lg border bg-card p-6 md:grid-cols-2">
              {([["title", "Title *"], ["company", "Company"], ["location", "Location *"], ["job_type", "Job type"], ["category", "Category"], ["salary", "Salary"]] as const).map(([k, l]) => (
                <div key={k} className="space-y-2"><Label>{l}</Label><Input name={k} defaultValue={(editing[k] as string) ?? ""} required={l.endsWith("*")} /></div>
              ))}
              <div className="space-y-2"><Label>Deadline</Label><Input type="date" name="deadline" defaultValue={editing.deadline ?? ""} /></div>
              <div className="flex items-center gap-3 pt-6"><Switch checked={editing.is_published ?? true} onCheckedChange={(v) => setEditing({ ...editing, is_published: v })} /><Label>Published</Label></div>
              <div className="space-y-2 md:col-span-2"><Label>Description *</Label><Textarea name="description" rows={5} required defaultValue={editing.description ?? ""} /></div>
              <div className="space-y-2 md:col-span-2"><Label>Requirements</Label><Textarea name="requirements" rows={4} defaultValue={editing.requirements ?? ""} /></div>
              <div className="flex gap-2 md:col-span-2"><Button type="submit">Save vacancy</Button><Button type="button" variant="ghost" onClick={() => setEditing(null)}>Cancel</Button></div>
            </form>
          )}
          <div className="mt-6 divide-y rounded-lg border bg-card">
            {jobs.map((j) => (
              <div key={j.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-semibold">{j.title}</p>
                  <p className="text-sm text-muted-foreground">{j.location} · {apps.filter((a) => a.job_id === j.id).length} applicants</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={j.is_published ? "default" : "outline"}>{j.is_published ? "Live" : "Hidden"}</Badge>
                  <Button size="sm" variant="outline" onClick={() => setEditing(j)}>Edit</Button>
                  <Button size="sm" variant="ghost" onClick={() => del("jobs", j.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <div className="divide-y rounded-lg border bg-card">
            {profiles.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-semibold">{p.full_name || "—"}</p>
                  <p className="text-sm text-muted-foreground">{p.email}{p.headline && ` · ${p.headline}`}{p.location && ` · ${p.location}`}</p>
                </div>
                <Button size="sm" variant="outline" disabled={!p.cv_path} onClick={() => openCv(p.cv_path)}>{p.cv_path ? "View CV" : "No CV"}</Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
