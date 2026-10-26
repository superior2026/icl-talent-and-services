import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });
    return () => data.subscription.unsubscribe();
  }, []);
  return { user, loading };
}

export function useIsAdmin(userId?: string) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  useEffect(() => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    supabase
      .rpc("has_role", { _user_id: userId, _role: "admin" })
      .then(({ data }) => setIsAdmin(!!data));
  }, [userId]);
  return isAdmin;
}

export const SERVICES = [
  { slug: "consulting", title: "Business Consulting", text: "Strategy, restructuring, process improvement and growth advisory for ambitious organisations." },
  { slug: "recruitment", title: "Recruitment & Executive Search", text: "Rigorous sourcing and assessment of talent — from graduate trainees to C-suite leaders." },
  { slug: "outsourcing", title: "Staff Outsourcing", text: "Fully managed outsourced teams, payroll and HR administration so you can focus on your core." },
  { slug: "corporate", title: "Corporate Support Services", text: "Company secretarial, compliance, training and back-office support delivered with precision." },
];
