import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — ICL Group" },
      { name: "description", content: "Choose a new password for your ICL Group account." },
      { property: "og:title", content: "Set a new password — ICL Group" },
      { property: "og:description", content: "Reset your ICL Group account password." },
    ],
  }),
  component: Reset,
});

function Reset() {
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  async function save(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) return toast.error(error.message);
    toast.success("Password updated");
    navigate({ to: "/account" });
  }
  return (
    <form onSubmit={save} className="mx-auto max-w-md space-y-4 px-6 py-20">
      <h1 className="text-4xl">Set a new password</h1>
      <Input type="password" minLength={8} required value={pw} onChange={(e) => setPw(e.target.value)} placeholder="New password" />
      <Button type="submit" className="w-full">Update password</Button>
    </form>
  );
}
