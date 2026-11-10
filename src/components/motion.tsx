import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import {
  easeOut,
  fadeIn,
  fadeLeft,
  fadeRight,
  fadeUp,
  heroContainer,
  heroItem,
  imageReveal,
  scaleIn,
  serviceCard,
  slideUpText,
  staggerContainer,
  staggerFast,
  viewportOnce,
  wordContainer,
  wordItem,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
} & Omit<HTMLMotionProps<"div">, "children" | "variants">;

function useSafeVariants(variants: Variants): Variants | undefined {
  const reduce = useReducedMotion();
  return reduce ? undefined : variants;
}

/** Scroll-triggered fade/slide reveal. Disabled when user prefers reduced motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  ...rest
}: RevealProps) {
  const safe = useSafeVariants(variants);
  return (
    <motion.div
      className={className}
      initial={safe ? "hidden" : false}
      whileInView={safe ? "visible" : undefined}
      viewport={viewportOnce}
      variants={safe}
      transition={delay ? { delay } : undefined}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn(props: RevealProps) {
  return <Reveal variants={fadeIn} {...props} />;
}

export function FadeUp(props: RevealProps) {
  return <Reveal variants={fadeUp} {...props} />;
}

export function FadeLeft(props: RevealProps) {
  return <Reveal variants={fadeLeft} {...props} />;
}

export function FadeRight(props: RevealProps) {
  return <Reveal variants={fadeRight} {...props} />;
}

export function ScaleIn(props: RevealProps) {
  return <Reveal variants={scaleIn} {...props} />;
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  fast?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">;

/** Parent that staggers child Reveal/StaggerItem elements on scroll. */
export function Stagger({ children, className, fast = false, ...rest }: StaggerProps) {
  const safe = useSafeVariants(fast ? staggerFast : staggerContainer);
  return (
    <motion.div
      className={className}
      initial={safe ? "hidden" : false}
      whileInView={safe ? "visible" : undefined}
      viewport={viewportOnce}
      variants={safe}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  variants = fadeUp,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? undefined : variants} {...rest}>
      {children}
    </motion.div>
  );
}

type HoverLiftProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">;

/** Subtle hover lift for cards/interactive surfaces. */
export function HoverLift({ children, className, ...rest }: HoverLiftProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={
        reduce
          ? undefined
          : {
              y: -6,
              scale: 1.015,
              boxShadow: "0 18px 40px -24px oklch(0.25 0.095 269.1 / 0.35)",
              transition: { duration: 0.28, ease: easeOut },
            }
      }
      whileTap={reduce ? undefined : { scale: 0.985 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Service / feature card with entrance + hover transition. */
export function ServiceCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("h-full", className)}
      variants={reduce ? undefined : serviceCard}
      whileHover={
        reduce
          ? undefined
          : {
              y: -6,
              borderColor: "var(--brass)",
              transition: { duration: 0.25, ease: easeOut },
            }
      }
    >
      {children}
    </motion.div>
  );
}

/** Clip-path image reveal on scroll. */
export function ImageReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={viewportOnce}
      variants={reduce ? undefined : imageReveal}
    >
      {children}
    </motion.div>
  );
}

/** Slide-up text block on scroll. */
export function SlideUpText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <Reveal variants={slideUpText} className={className}>{children}</Reveal>;
}

/** Count-up statistic when scrolled into view. */
export function AnimatedStat({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 70, damping: 22, mass: 0.6 });
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue, reduce]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
    return unsub;
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

/** Entrance sequence for page heroes (plays once on mount). */
export function HeroReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : heroContainer}
      initial={reduce ? false : "hidden"}
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

export function HeroItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? undefined : heroItem}>
      {children}
    </motion.div>
  );
}

const MotionH1 = motion.h1;
const MotionH2 = motion.h2;
const MotionP = motion.p;

/** Animate a heading word-by-word on load. Pass `standalone` when not nested in a stagger parent. */
export function AnimatedWords({
  text,
  className,
  as: Tag = "h1",
  standalone = true,
  accentFrom,
  accentClassName = "text-brass",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
  standalone?: boolean;
  /** Highlight words from this index onward (visual accent only). */
  accentFrom?: number;
  accentClassName?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = Tag === "h2" ? MotionH2 : Tag === "p" ? MotionP : MotionH1;

  const wordClass = (i: number) =>
    cn(
      "mr-[0.28em] inline-block last:mr-0",
      accentFrom != null && i >= accentFrom ? accentClassName : undefined,
    );

  if (reduce) {
    return (
      <Tag className={className}>
        {accentFrom == null
          ? text
          : words.map((word, i) => (
              <span key={`${word}-${i}`} className={wordClass(i)}>
                {word}
              </span>
            ))}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      aria-label={text}
      variants={wordContainer}
      {...(standalone ? { initial: "hidden" as const, animate: "visible" as const } : {})}
    >
      <span aria-hidden="true">
        {words.map((word, i) => (
          <motion.span key={`${word}-${i}`} className={wordClass(i)} variants={wordItem}>
            {word}
          </motion.span>
        ))}
      </span>
    </MotionTag>
  );
}

/** Soft continuous float for hero imagery. */
export function FloatingMedia({
  children,
  className,
  amplitude = 10,
  duration = 7,
}: {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={
        reduce
          ? undefined
          : {
              y: [0, -amplitude, 0, amplitude * 0.6, 0],
            }
      }
      transition={
        reduce
          ? undefined
          : {
              duration,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      {children}
    </motion.div>
  );
}

/** CTA with polished hover / tap motion. */
export function MotionCta({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={
        reduce
          ? undefined
          : {
              y: -3,
              scale: 1.03,
              transition: { duration: 0.28, ease: easeOut },
            }
      }
      whileTap={reduce ? undefined : { scale: 0.97 }}
    >
      {children}
    </motion.div>
  );
}

export { motion, useReducedMotion };
