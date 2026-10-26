import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({ meta: [{ title: "My account — ICL Group" }, { name: "robots", content: "noindex" }] }),
  component: Account,
});

type Profile = { full_name: string | null; phone: string | null; location: string | null; headline: string | null; cv_path: string | null; cv_name: string | null };
type App = { id: string; status: string; created_at: string; jobs: { title: string; id: string } | null };

function Account() {
  const { user } = Route.useRouteContext();
  const [p, setP] = useState<Profile | null>(null);
  const [apps, setApps] = useState<App[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase.from("profiles").select("full_name, phone, location, headline, cv_path, cv_name").eq("id", user.id).maybeSingle().then(({ data }) => setP(data));
    supabase.from("applications").select("id, status, created_at, jobs(id, title)").eq("user_id", user.id).order("created_at", { ascending: false }).then(({ data }) => setApps((data as App[]) ?? []));
  }, [user.id]);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const g = (k: string) => String(fd.get(k) ?? "").trim();
    const upd = { full_name: g("full_name").slice(0, 120), phone: g("phone").slice(0, 40), location: g("location").slice(0, 120), headline: g("headline").slice(0, 200) };
    const { error } = await supabase.from("profiles").update(upd).eq("id", user.id);
    if (error) { toast.error("Could not save profile"); return; }
    setP((prev) => (prev ? { ...prev, ...upd } : prev));
    toast.success("Profile saved");
  }

  async function uploadCv(file: File) {
    if (file.size > 5 * 1024 * 1024) { toast.error("CV must be under 5MB"); return; }
    if (!/\.(pdf|docx?)$/i.test(file.name)) { toast.error("Upload a PDF or Word document"); return; }
    setUploading(true);
    const path = `${user.id}/${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
    const { error } = await supabase.storage.from("cvs").upload(path, file);
    if (!error) await supabase.from("profiles").update({ cv_path: path, cv_name: file.name }).eq("id", user.id);
    setUploading(false);
    if (error) { toast.error("Upload failed"); return; }
    setP((prev) => (prev ? { ...prev, cv_path: path, cv_name: file.name } : prev));
    toast.success("CV uploaded");
  }

  if (!p) return <div className="mx-auto max-w-5xl px-6 py-20 text-muted-foreground">Loading…</div>;

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
      <section>
        <p className="eyebrow">My account</p>
        <h1 className="mt-3 text-4xl">{p.full_name || user.email}</h1>
        <form onSubmit={save} className="mt-8 space-y-4 rounded-lg border bg-card p-6">
          <div className="space-y-2"><Label>Full name</Label><Input name="full_name" defaultValue={p.full_name ?? ""} /></div>
          <div className="space-y-2"><Label>Professional headline</Label><Input name="headline" defaultValue={p.headline ?? ""} placeholder="e.g. Chartered Accountant, 6 yrs" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Phone</Label><Input name="phone" defaultValue={p.phone ?? ""} /></div>
            <div className="space-y-2"><Label>Location</Label><Input name="location" defaultValue={p.location ?? ""} /></div>
          </div>
          <Button type="submit">Save profile</Button>
        </form>
        <div className="mt-6 rounded-lg border bg-card p-6">
          <h2 className="text-2xl">Your CV</h2>
          <p className="mt-2 text-sm text-muted-foreground">{p.cv_name ? `On file: ${p.cv_name}` : "No CV uploaded yet."}</p>
          <Input className="mt-4" type="file" accept=".pdf,.doc,.docx" disabled={uploading} onChange={(e) => e.target.files?.[0] && uploadCv(e.target.files[0])} />
          <p className="mt-2 text-xs text-muted-foreground">PDF or Word, up to 5MB.</p>
        </div>
      </section>
      <section>
        <h2 className="mt-12 text-3xl">My applications</h2>
        <div className="mt-6 divide-y border-y">
          {apps.map((a) => (
            <div key={a.id} className="flex items-center justify-between py-4">
              <div>
                {a.jobs ? <Link to="/jobs/$id" params={{ id: a.jobs.id }} className="font-semibold">{a.jobs.title}</Link> : <span>Removed vacancy</span>}
                <p className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</p>
              </div>
              <Badge variant="secondary" className="capitalize">{a.status}</Badge>
            </div>
          ))}
          {apps.length === 0 && <p className="py-6 text-sm text-muted-foreground">No applications yet. <Link to="/jobs" className="text-primary">Browse vacancies</Link>.</p>}
        </div>
      </section>
    </div>
  );
}
