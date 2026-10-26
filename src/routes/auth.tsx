import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — ICL Group" },
      { name: "description", content: "Sign in or create your ICL Group candidate account." },
      { property: "og:title", content: "Sign in — ICL Group" },
      { property: "og:description", content: "Access your ICL Group account to upload your CV and apply for jobs." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up" | "reset">("in");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")).trim();
    const password = String(f.get("password") ?? "");
    setBusy(true);
    try {
      if (mode === "up") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin, data: { full_name: String(f.get("full_name")).trim().slice(0, 120) } },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account.");
      } else if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        toast.success("Password reset link sent.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/account" });
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <p className="eyebrow">Candidate & client portal</p>
      <h1 className="mt-3 text-4xl">{mode === "up" ? "Create your account" : mode === "reset" ? "Reset password" : "Welcome back"}</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-lg border bg-card p-6">
        {mode === "up" && <div className="space-y-2"><Label htmlFor="full_name">Full name</Label><Input id="full_name" name="full_name" required maxLength={120} /></div>}
        <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
        {mode !== "reset" && <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" name="password" type="password" minLength={8} required /></div>}
        <Button type="submit" className="w-full" disabled={busy}>{busy ? "Please wait…" : mode === "up" ? "Create account" : mode === "reset" ? "Send reset link" : "Sign in"}</Button>
      </form>
      <div className="mt-4 flex justify-between text-sm">
        <button className="text-primary" onClick={() => setMode(mode === "up" ? "in" : "up")}>{mode === "up" ? "Have an account? Sign in" : "New here? Create an account"}</button>
        {mode === "in" && <button className="text-muted-foreground" onClick={() => setMode("reset")}>Forgot password?</button>}
      </div>
    </div>
  );
}
