import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Section } from "@/components/Section";
import { ReviewsSlider } from "@/components/ReviewsSlider";
import {
  AnimatedStat,
  AnimatedWords,
  FadeRight,
  FadeUp,
  FloatingMedia,
  HoverLift,
  ImageReveal,
  MotionCta,
  SlideUpText,
  Stagger,
  StaggerItem,
  motion,
  useReducedMotion,
} from "@/components/motion";
import { fadeUp, heroContainer, heroItem } from "@/lib/motion";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY, FAQS, INDUSTRIES, PROCESS, STATS, WHY_US } from "@/lib/site-content";
import recruitmentImg from "@/assets/services/recruitment.jpg";
import advisoryImg from "@/assets/services/advisory.jpg";
import proofOfFundsImg from "@/assets/services/proof-of-funds.jpg";
import ecobank from "@/assets/partners/ecobank.png";
import perxsion from "@/assets/partners/perxsion.png";
import hiching from "@/assets/partners/hiching.png";
import kepslo from "@/assets/partners/kepslo.png";
import groneba from "@/assets/partners/groneba.png";

const WHAT_WE_DO = [
  {
    slug: "recruitment-outsourcing",
    title: "Recruitment & Outsourcing",
    text: "We provide recruitment and outsourcing services to help your business develop with the best talents",
    image: recruitmentImg,
    alt: "Two colleagues reviewing work together on a laptop",
  },
  {
    slug: "business-advisory",
    title: "Business Advisory",
    text: "We provide recruitment and outsourcing services to help your business develop with the best talents",
    image: advisoryImg,
    alt: "A corporate team meeting around a boardroom table",
  },
  {
    slug: "proof-of-funds",
    title: "Proof of Funds",
    text: "Are you looking to travel outside the country and you need proof of funds? We are at a message away.",
    image: proofOfFundsImg,
    alt: "A professional holding a tablet in a modern office",
    imageClass: "object-contain bg-[#e8eef5]",
  },
] as const;

const PARTNER_LOGOS = [
  { src: ecobank, alt: "Ecobank" },
  { src: perxsion, alt: "Perxsion" },
  { src: hiching, alt: "HICHING" },
  { src: kepslo, alt: "Kepslo" },
  { src: groneba, alt: "Groneba Groupes" },
] as const;

const heroSrc = "/confident-executive-modern-office.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ICL Group — Connecting Talent, Empowering Businesses" },
      { name: "description", content: "Find a job, post a vacancy or request consulting, recruitment, outsourcing and corporate support from ICL Group." },
      { property: "og:title", content: "ICL Group — Connecting Talent, Empowering Businesses, Driving Growth" },
      { property: "og:description", content: "Recruitment, consulting, outsourcing and corporate support services from ICL Group." },
    ],
  }),
  component: Index,
});

function Newsletter() {
  const [busy, setBusy] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = z.string().trim().email().max(255).safeParse(new FormData(form).get("email"));
    if (!parsed.success) {
      toast.error("Enter a valid email");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: parsed.data.toLowerCase() });
    setBusy(false);
    if (error && error.code !== "23505") {
      toast.error("Could not subscribe. Please try again.");
      return;
    }
    toast.success("You're subscribed. Thank you!");
    form.reset();
  }
  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md gap-2">
      <Input name="email" type="email" required maxLength={255} placeholder="Your email address" className="h-11 bg-background text-foreground" />
      <Button type="submit" size="lg" disabled={busy} className="bg-brass text-accent-foreground hover:bg-brass/90">
        {busy ? "…" : "Subscribe"}
      </Button>
    </form>
  );
}

function Index() {
  const reduce = useReducedMotion();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#101b4e] text-white">
        {/* Deep navy wave atmosphere */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,#1a2a6e_0%,transparent_55%),radial-gradient(ellipse_at_70%_80%,#0b1338_0%,transparent_50%)]" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.35]" preserveAspectRatio="none" viewBox="0 0 1440 800">
            <path
              fill="#16245f"
              d="M0,160 C240,280 480,40 720,160 C960,280 1200,80 1440,180 L1440,0 L0,0 Z"
            />
            <path
              fill="#0d1742"
              d="M0,420 C320,320 560,520 820,400 C1080,280 1280,460 1440,380 L1440,800 L0,800 Z"
            />
          </svg>
          <div className="hero-glow absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#FFA500]/15 blur-3xl" />
          <div className="hero-glow absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-white/5 blur-3xl [animation-delay:-7s]" />
        </div>

        {/* Gold swoosh — matches reference accent */}
        <svg
          className="pointer-events-none absolute -bottom-6 -right-8 z-[1] h-[42%] w-[68%] max-w-4xl sm:h-[48%] lg:w-[58%]"
          viewBox="0 0 800 320"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="#FFA500"
            d="M800,320 L800,80 C640,20 520,140 380,170 C220,210 120,120 0,200 L0,320 Z"
          />
          <path
            fill="#e69500"
            d="M800,320 L800,140 C680,90 560,190 420,210 C280,230 160,160 40,230 L0,260 L0,320 Z"
            opacity="0.55"
          />
        </svg>

        <div className="relative z-[2] mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-8 lg:py-24 xl:py-28">
          <motion.div
            variants={reduce ? undefined : heroContainer}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="relative z-[2]"
          >
            <motion.p
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm"
              variants={reduce ? undefined : heroItem}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFA500]" aria-hidden="true" />
              Consulting · Recruitment · Outsourcing
            </motion.p>

            <AnimatedWords
              text="Specialized Outsourcing for your business growth"
              className="hero-headline mt-6 max-w-[18ch] text-[2.35rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-[4.15rem]"
              standalone={false}
              accentFrom={4}
              accentClassName="text-[#FFA500]"
            />

            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
              variants={reduce ? undefined : heroItem}
            >
              Having the right people is the key to successful business, we can provide you with the right talents your business needs to succeed.
            </motion.p>

            <motion.div className="mt-9 flex flex-wrap items-center gap-3" variants={reduce ? undefined : heroItem}>
              <MotionCta>
                <Link
                  to="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FFA500] px-7 text-sm font-bold text-[#101b4e] shadow-lg shadow-black/20 transition-colors hover:bg-[#e69500]"
                >
                  Let's discuss
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </MotionCta>
              <MotionCta>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-white/40 bg-transparent px-7 font-semibold text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to="/jobs">
                    Find a Job <ArrowRight />
                  </Link>
                </Button>
              </MotionCta>
              <MotionCta>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="h-12 rounded-full px-5 font-semibold text-white/90 hover:bg-white/10 hover:text-white"
                >
                  <Link to="/services">Explore services</Link>
                </Button>
              </MotionCta>
            </motion.div>
          </motion.div>

          <FloatingMedia className="relative z-[2] mx-auto w-full max-w-[18rem] sm:max-w-md lg:max-w-lg xl:max-w-xl" amplitude={4} duration={10}>
            <ImageReveal className="relative w-full">
              <div className="relative mx-auto aspect-[1200/1096] w-full overflow-hidden rounded-2xl sm:rounded-[1.5rem] lg:rounded-[1.75rem]">
                <img
                  src={heroSrc}
                  alt="Confident executive in a modern office"
                  width={1200}
                  height={1096}
                  className="h-full w-full select-none object-cover object-[center_18%] drop-shadow-[0_24px_48px_rgba(0,0,0,0.28)]"
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, #101b4e 0%, transparent 18%), linear-gradient(0deg, #101b4e 0%, transparent 16%)",
                    opacity: 0.55,
                  }}
                  aria-hidden="true"
                />
              </div>
            </ImageReveal>
          </FloatingMedia>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">
        <SlideUpText>
          <p className="eyebrow">Welcome to ICL</p>
          <h2 className="mt-3 text-4xl">Best Recruitment Agency in Nigeria</h2>
          <p className="mt-5 text-muted-foreground">
            In an ever-changing market, we provide unparalleled support during period of growth, transformation and change. Expand the capacity of your business to do more while saving time and cost.
          </p>
          <Button asChild variant="link" className="mt-4 px-0">
            <Link to="/about">More about the company →</Link>
          </Button>
        </SlideUpText>
        <FadeRight>
          <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border" fast>
            {STATS.map((s) => (
              <StaggerItem key={s.label} variants={fadeUp} className="bg-card p-6">
                <p className="font-display text-4xl text-primary">
                  <AnimatedStat value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-2 text-xs text-muted-foreground">Placeholder figures — to be updated with verified numbers.</p>
        </FadeRight>
      </section>

      <Section eyebrow="What we do" title="Our Services" className="border-y bg-secondary">
        <Stagger className="grid gap-6 md:grid-cols-3" fast>
          {WHAT_WE_DO.map((s) => (
            <StaggerItem key={s.slug} variants={fadeUp}>
              <HoverLift>
                <Link to="/services" hash={s.slug} className="flex h-full flex-col overflow-hidden rounded-lg border bg-card text-center shadow-sm">
                  <img
                    src={s.image}
                    alt={s.alt}
                    className={`aspect-[16/9] w-full ${"imageClass" in s ? s.imageClass : "object-cover"}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="flex flex-1 flex-col px-6 py-7">
                    <h3 className="text-xl text-primary">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </Link>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="rounded-md px-8">
            <Link to="/services">
              View all Services <ArrowRight />
            </Link>
          </Button>
        </div>
      </Section>

      <section className="border-y bg-white" aria-label="Partner organisations">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-8 px-6 py-10 sm:gap-x-14 lg:justify-between lg:py-12">
          {PARTNER_LOGOS.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-8 w-auto max-w-[9.5rem] object-contain sm:h-9 lg:h-10"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </section>

      <Section eyebrow="Why choose us" title="Why choose ICL Support Services?" className="bg-ink-gradient text-ink-foreground" dark>
        <Stagger className="grid gap-8 md:grid-cols-4">
          {WHY_US.map((w) => (
            <StaggerItem key={w.title} variants={fadeUp}>
              <CheckCircle2 className="h-7 w-7 text-brass" />
              <h3 className="mt-4 text-xl">{w.title}</h3>
              <p className="mt-2 text-sm opacity-75">{w.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section id="process" eyebrow="Our recruitment process" title="From brief to placement in five steps.">
        <Stagger className="grid gap-6 md:grid-cols-5">
          {PROCESS.map((p, i) => (
            <StaggerItem key={p.title} variants={fadeUp}>
              <div className="border-t-2 border-brass pt-5">
                <span className="text-sm font-bold text-muted-foreground">Step {i + 1}</span>
                <h3 className="mt-2 text-xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section eyebrow="Industries we serve" title="Experience across sectors." className="border-y bg-secondary">
        <Stagger className="flex flex-wrap gap-3" fast>
          {INDUSTRIES.map((n) => (
            <StaggerItem key={n} variants={fadeUp}>
              <motion.span
                className="inline-block rounded-full border bg-card px-5 py-2.5 text-sm font-medium"
                whileHover={reduce ? undefined : { scale: 1.04, borderColor: "var(--brass)" }}
                transition={{ duration: 0.2 }}
              >
                {n}
              </motion.span>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section eyebrow="Testimonials" title="Our Client Reviews">
        <ReviewsSlider />
      </Section>

      <Section
        eyebrow="ICL Support Services"
        title="Best Recruitment Agency in Lagos"
        intro="We are the best recruitment agency in Lagos Nigeria with over 15 years of proven track record in providing corporate clients the best hands money can buy in the Nigerian labour market."
        className="border-t"
      >
        <Stagger className="grid gap-6 md:grid-cols-2">
          <StaggerItem variants={fadeUp}>
            <HoverLift>
              <article className="h-full rounded-lg border bg-card p-7">
                <h3 className="text-xl">Proven Track Records</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  We do not just offer our services; we work with our clients to give them the best solution with our proven success rate.
                </p>
              </article>
            </HoverLift>
          </StaggerItem>
          <StaggerItem variants={fadeUp}>
            <HoverLift>
              <article className="h-full rounded-lg border bg-card p-7">
                <h3 className="text-xl">Efficient Service Delivery</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  It is not about how far we deliver, but also, we take into consideration, how well we deliver our services.
                </p>
              </article>
            </HoverLift>
          </StaggerItem>
        </Stagger>
      </Section>

      <Section eyebrow="FAQ" title="Frequently asked questions." className="border-y bg-secondary">
        <FadeUp>
          <Accordion type="single" collapsible className="max-w-3xl">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`f${i}`}>
                <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
      </Section>

      <Section eyebrow="Contact Info" title="Let's talk about what you need.">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <Stagger className="grid gap-4 text-sm sm:grid-cols-2" fast>
            <StaggerItem variants={fadeUp} className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
              <span>{COMPANY.address}</span>
            </StaggerItem>
            <StaggerItem variants={fadeUp} className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
              <a href={`tel:${COMPANY.phone.replace(/[\s-]/g, "")}`} className="hover:text-primary">
                {COMPANY.phone}
              </a>
            </StaggerItem>
            <StaggerItem variants={fadeUp} className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
              <a href={`mailto:${COMPANY.email}`} className="break-all hover:text-primary">
                {COMPANY.email}
              </a>
            </StaggerItem>
            <StaggerItem variants={fadeUp} className="flex items-center gap-3">
              <Clock className="h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
              <span>{COMPANY.hours}</span>
            </StaggerItem>
          </Stagger>
          <FadeUp>
            <Button asChild size="lg">
              <Link to="/contact">
                Request a Consultation <ArrowRight />
              </Link>
            </Button>
          </FadeUp>
        </div>
      </Section>

      <FadeUp>
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-14">
            <div>
              <h2 className="text-3xl">Subscribe to our newsletter</h2>
              <p className="mt-2 text-sm opacity-80">Vacancies, hiring tips and business insights in your inbox.</p>
            </div>
            <Newsletter />
          </div>
        </section>
      </FadeUp>
    </>
  );
}
