import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { COMPANY } from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin, useUser } from "@/lib/auth";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/jobs", label: "Vacancies" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Request a Service" },
] as const;

export function SiteHeader() {
  const { user } = useUser();
  const isAdmin = useIsAdmin(user?.id);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold text-primary">ICL</span>
          <span className="eyebrow">Group</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-medium text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              {isAdmin && <Button asChild variant="ghost" size="sm"><Link to="/admin">Admin</Link></Button>}
              <Button asChild variant="ghost" size="sm"><Link to="/account">My account</Link></Button>
              <Button variant="outline" size="sm" onClick={signOut}>Sign out</Button>
            </>
          ) : (
            <Button asChild size="sm"><Link to="/auth">Sign in</Link></Button>
          )}
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="flex flex-col gap-3 border-t px-6 py-4 md:hidden" onClick={() => setOpen(false)}>
          {nav.map((n) => <Link key={n.to} to={n.to} className="text-sm font-medium">{n.label}</Link>)}
          {user ? (
            <>
              {isAdmin && <Link to="/admin" className="text-sm font-medium">Admin</Link>}
              <Link to="/account" className="text-sm font-medium">My account</Link>
              <button onClick={signOut} className="text-left text-sm font-medium">Sign out</button>
            </>
          ) : <Link to="/auth" className="text-sm font-medium">Sign in</Link>}
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const socials = [
    { href: COMPANY.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: COMPANY.socials.x, label: "X", Icon: Twitter },
    { href: COMPANY.socials.facebook, label: "Facebook", Icon: Facebook },
    { href: COMPANY.socials.instagram, label: "Instagram", Icon: Instagram },
  ];
  return (
    <footer className="bg-ink-gradient text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-3xl">ICL Group</p>
          <p className="mt-3 max-w-sm text-sm opacity-70">Connecting talent, empowering businesses, driving growth.</p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a key={label} href={href} aria-label={label} className="rounded-full border border-ink-foreground/20 p-2 opacity-80 hover:opacity-100"><Icon className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <p className="eyebrow">Company</p>
          <Link to="/about" className="block opacity-80 hover:opacity-100">About</Link>
          <Link to="/services" className="block opacity-80 hover:opacity-100">Services</Link>
          <Link to="/contact" className="block opacity-80 hover:opacity-100">Request a service</Link>
          <Link to="/post-job" className="block opacity-80 hover:opacity-100">Post a job</Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="eyebrow">Candidates</p>
          <Link to="/jobs" className="block opacity-80 hover:opacity-100">Vacancies</Link>
          <Link to="/auth" className="block opacity-80 hover:opacity-100">Sign in / Register</Link>
          <Link to="/account" className="block opacity-80 hover:opacity-100">My account</Link>
        </div>
        <div className="space-y-2 text-sm opacity-80">
          <p className="eyebrow">Contact</p>
          <p>{COMPANY.phone}</p>
          <p>{COMPANY.email}</p>
          <p>{COMPANY.address}</p>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 py-5 text-center text-xs opacity-60">© {new Date().getFullYear()} ICL Group. All rights reserved.</div>
    </footer>
  );
}
