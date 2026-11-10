import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X, Linkedin, Twitter, Facebook, Instagram, Phone, Mail, MapPin, Clock } from "lucide-react";
import { COMPANY, SERVICE_NAV } from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin, useUser } from "@/lib/auth";
import { FadeUp, MotionCta, motion, useReducedMotion } from "@/components/motion";
import { mobileNavContainer, mobileNavItem, transitionFast } from "@/lib/motion";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/icl-logo.png";
import logoLightImg from "@/assets/icl-logo-light.png";

const whoWeAreLinks = [
  { to: "/about", hash: "about-us", label: "About Us" },
  { to: "/about", hash: "our-team", label: "Our Team" },
] as const;

const nav = [
  { to: "/", label: "Home", exact: true },
  {
    to: "/about",
    label: "Who we are",
    children: whoWeAreLinks,
  },
  {
    to: "/services",
    label: "Services",
    children: SERVICE_NAV,
  },
  { to: "/jobs", label: "Apply for job" },
  { to: "/contact", label: "Contact" },
] as const;

const navLinkBase =
  "relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.92rem] font-semibold tracking-tight transition-all duration-300 ease-out";

export function SiteHeader() {
  const { user } = useUser();
  const isAdmin = useIsAdmin(user?.id);
  const navigate = useNavigate();
  const { pathname, hash } = useRouterState({
    select: (s) => ({ pathname: s.location.pathname, hash: s.location.hash.replace(/^#/, "") }),
  });
  const [open, setOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setDesktopMenu(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setDesktopMenu(null);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function isActive(item: (typeof nav)[number]) {
    if ("exact" in item && item.exact) return pathname === item.to;
    return pathname === item.to || pathname.startsWith(`${item.to}/`);
  }

  function isChildActive(child: { to: string; hash?: string }) {
    if (pathname !== child.to && !pathname.startsWith(`${child.to}/`)) return false;
    if (!child.hash) return true;
    return hash === child.hash;
  }

  function navLinkClass(active: boolean, openState = false) {
    return cn(
      navLinkBase,
      active || openState
        ? "bg-primary/[0.08] text-primary ring-1 ring-primary/15"
        : "text-foreground/80 hover:bg-primary/[0.06] hover:text-primary",
    );
  }

  function dropdownItemClass(active: boolean) {
    return cn(
      "group relative flex items-center rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 ease-out",
      active
        ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
        : "text-foreground/80 hover:bg-primary/[0.08] hover:text-primary",
    );
  }

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur-md"
      initial={reduce ? false : { y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={transitionFast}
    >
      <div className="relative mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link to="/" className="relative z-10 flex shrink-0 items-center" aria-label="ICL Group — home">
          <img src={logoImg} alt="ICL Group" className="h-11 w-auto object-contain sm:h-12" />
        </Link>

        <nav ref={menuRef} className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex">
          {nav.map((n) => {
            const active = isActive(n);
            if ("children" in n && n.children) {
              const isOpen = desktopMenu === n.label;
              const wide = n.children.length > 4;
              return (
                <div
                  key={n.label}
                  className="relative"
                  onMouseEnter={() => setDesktopMenu(n.label)}
                  onMouseLeave={() => setDesktopMenu(null)}
                >
                  <button
                    type="button"
                    className={navLinkClass(active, isOpen)}
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    onClick={() => setDesktopMenu(isOpen ? null : n.label)}
                  >
                    {n.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 opacity-70 transition-transform duration-300",
                        isOpen && "rotate-180 opacity-100",
                      )}
                    />
                    {active && (
                      <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" aria-hidden />
                    )}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        role="menu"
                        className={cn(
                          "absolute top-full z-50 pt-2.5",
                          wide ? "left-1/2 w-[23rem] -translate-x-1/2" : "left-1/2 w-56 -translate-x-1/2",
                        )}
                        initial={reduce ? false : { opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reduce ? undefined : { opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="overflow-hidden rounded-2xl border border-border/80 bg-background/95 p-1.5 shadow-[0_20px_50px_-24px_oklch(0.25_0.095_269_/0.45)] backdrop-blur-md">
                          {n.children.map((child) => {
                            const childActive = isChildActive(child);
                            return (
                              <Link
                                key={child.label}
                                to={child.to}
                                hash={child.hash}
                                role="menuitem"
                                className={dropdownItemClass(childActive)}
                                onClick={() => setDesktopMenu(null)}
                              >
                                <span
                                  className={cn(
                                    "mr-2.5 h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                                    childActive ? "bg-primary-foreground" : "bg-primary/25 group-hover:bg-primary",
                                  )}
                                  aria-hidden
                                />
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link key={n.label} to={n.to} className={navLinkClass(active)} aria-current={active ? "page" : undefined}>
                {n.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" aria-hidden />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 hidden items-center gap-2 lg:flex">
          {user && (
            <>
              {isAdmin && (
                <Button asChild variant="ghost" size="sm">
                  <Link to="/admin">Admin</Link>
                </Button>
              )}
              <Button asChild variant="ghost" size="sm">
                <Link to="/account">My account</Link>
              </Button>
              <Button variant="outline" size="sm" className="rounded-full" onClick={signOut}>
                Sign out
              </Button>
            </>
          )}
          <MotionCta>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md shadow-primary/30 transition-colors hover:bg-primary/90"
            >
              Let's discuss
            </Link>
          </MotionCta>
        </div>

        <button
          className="relative z-10 rounded-full p-2 text-foreground lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden border-t bg-background lg:hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flex flex-col gap-1 px-5 py-4"
              variants={reduce ? undefined : mobileNavContainer}
              initial={reduce ? false : "hidden"}
              animate="visible"
              exit="exit"
            >
              {nav.map((n) => {
                const active = isActive(n);
                if ("children" in n && n.children) {
                  const isOpen = mobileMenu === n.label;
                  return (
                    <motion.div key={n.label} className="flex flex-col" variants={reduce ? undefined : mobileNavItem}>
                      <button
                        type="button"
                        className={cn(
                          "flex items-center justify-between rounded-xl px-3 py-3 text-left text-base font-semibold transition-colors duration-200",
                          active || isOpen ? "bg-primary/[0.08] text-primary" : "text-foreground hover:bg-primary/[0.06]",
                        )}
                        aria-expanded={isOpen}
                        onClick={() => setMobileMenu(isOpen ? null : n.label)}
                      >
                        {n.label}
                        <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            className="overflow-hidden pl-2"
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reduce ? undefined : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {n.children.map((child) => {
                              const childActive = isChildActive(child);
                              return (
                                <Link
                                  key={child.label}
                                  to={child.to}
                                  hash={child.hash}
                                  className={cn(
                                    "mt-1 block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200",
                                    childActive
                                      ? "bg-primary text-primary-foreground"
                                      : "text-muted-foreground hover:bg-primary/[0.08] hover:text-primary",
                                  )}
                                  onClick={() => setOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.div key={n.label} variants={reduce ? undefined : mobileNavItem}>
                    <Link
                      to={n.to}
                      className={cn(
                        "block rounded-xl px-3 py-3 text-base font-semibold transition-colors duration-200",
                        active
                          ? "bg-primary/[0.08] text-primary"
                          : "text-foreground hover:bg-primary/[0.06] hover:text-primary",
                      )}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {n.label}
                    </Link>
                  </motion.div>
                );
              })}
              {user && (
                <>
                  {isAdmin && (
                    <motion.div variants={reduce ? undefined : mobileNavItem}>
                      <Link to="/admin" className="block rounded-lg px-3 py-3 text-base font-semibold" onClick={() => setOpen(false)}>
                        Admin
                      </Link>
                    </motion.div>
                  )}
                  <motion.div variants={reduce ? undefined : mobileNavItem}>
                    <Link to="/account" className="block rounded-lg px-3 py-3 text-base font-semibold" onClick={() => setOpen(false)}>
                      My account
                    </Link>
                  </motion.div>
                  <motion.div variants={reduce ? undefined : mobileNavItem}>
                    <button onClick={signOut} className="w-full rounded-lg px-3 py-3 text-left text-base font-semibold">
                      Sign out
                    </button>
                  </motion.div>
                </>
              )}
              <motion.div variants={reduce ? undefined : mobileNavItem}>
                <Link
                  to="/contact"
                  className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground"
                  onClick={() => setOpen(false)}
                >
                  Let's discuss
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
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
    <FadeUp>
      <footer className="bg-ink-gradient text-ink-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
          <div>
            <div className="inline-flex rounded-xl bg-white px-3 py-2">
              <img src={logoLightImg} alt="ICL Group" className="h-14 w-auto object-contain md:h-16" />
            </div>
            <p className="mt-4 max-w-sm text-sm opacity-70">Established with the primary objective of providing fast, efficient, reliable and cost effective corporate support service solutions to a wide range of clients.</p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="rounded-full border border-ink-foreground/20 p-2 opacity-80 transition-opacity hover:opacity-100"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="eyebrow">Company</p>
            <Link to="/about" hash="about-us" className="block opacity-80 hover:opacity-100">
              About Us
            </Link>
            <Link to="/about" hash="our-team" className="block opacity-80 hover:opacity-100">
              Our Team
            </Link>
            <Link to="/services" className="block opacity-80 hover:opacity-100">
              Services
            </Link>
            <Link to="/contact" className="block opacity-80 hover:opacity-100">
              Contact us
            </Link>
            <Link to="/post-job" className="block opacity-80 hover:opacity-100">
              Post a job
            </Link>
          </div>
          <div className="space-y-2 text-sm">
            <p className="eyebrow">Candidates</p>
            <Link to="/jobs" className="block opacity-80 hover:opacity-100">
              Apply for job
            </Link>
            <Link to="/auth" className="block opacity-80 hover:opacity-100">
              Sign in / Register
            </Link>
            <Link to="/account" className="block opacity-80 hover:opacity-100">
              My account
            </Link>
          </div>
          <div className="space-y-3 text-sm">
            <p className="eyebrow">Contact Info</p>
            <p className="flex gap-2.5 opacity-80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
              <span>{COMPANY.address}</span>
            </p>
            <p className="flex items-center gap-2.5 opacity-80">
              <Phone className="h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
              <a href={`tel:${COMPANY.phone.replace(/[\s-]/g, "")}`} className="hover:opacity-100">
                {COMPANY.phone}
              </a>
            </p>
            <p className="flex items-center gap-2.5 opacity-80">
              <Mail className="h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
              <a href={`mailto:${COMPANY.email}`} className="break-all hover:opacity-100">
                {COMPANY.email}
              </a>
            </p>
            <p className="flex items-center gap-2.5 opacity-80">
              <Clock className="h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
              <span>{COMPANY.hours}</span>
            </p>
          </div>
        </div>
        <div className="border-t border-ink-foreground/10 py-5 text-center text-xs opacity-60">
          © {new Date().getFullYear()} ICL Group. All rights reserved.
        </div>
      </footer>
    </FadeUp>
  );
}
