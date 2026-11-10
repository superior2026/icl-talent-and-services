import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { TESTIMONIALS } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export type Review = {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
};

const FALLBACK_REVIEWS: Review[] = TESTIMONIALS.map((t, i) => ({
  id: `fallback-${i}`,
  quote: t.quote,
  name: t.name,
  role: t.role,
  rating: t.rating,
}));

async function fetchApprovedReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("customer_reviews")
    .select("id, quote, author_name, author_role, rating")
    .eq("is_approved", true)
    .order("sort_order", { ascending: true });

  // Table may not be migrated yet — keep the section usable with local reviews.
  if (error) return FALLBACK_REVIEWS;
  if (!data?.length) return FALLBACK_REVIEWS;

  return data.map((row) => ({
    id: row.id,
    quote: row.quote,
    name: row.author_name,
    role: row.author_role,
    rating: row.rating,
  }));
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="relative h-full rounded-lg border bg-card px-6 pb-8 pt-12 text-center shadow-sm sm:px-7">
      <span
        className="absolute left-1/2 top-0 flex h-11 w-14 -translate-x-1/2 -translate-y-1/2 items-end justify-center bg-background pb-1 font-serif text-5xl leading-none text-[#FFA500]"
        aria-hidden="true"
      >
        ”
      </span>
      <blockquote className="text-[0.95rem] leading-relaxed text-[#1a2a4a]">{review.quote}</blockquote>
      <figcaption className="mt-6">
        <p className="font-bold text-[#101b4e]">{review.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{review.role}</p>
        <div className="mt-3 flex justify-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: review.rating }, (_, i) => (
            <Star key={i} className="h-4 w-4 fill-[#FFA500] text-[#FFA500]" aria-hidden="true" />
          ))}
        </div>
      </figcaption>
      <span className="absolute inset-x-8 bottom-0 h-0.5 bg-primary/80" aria-hidden="true" />
    </figure>
  );
}

export function ReviewsSlider() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [paused, setPaused] = useState(false);

  const { data: reviews = FALLBACK_REVIEWS, isLoading } = useQuery({
    queryKey: ["customer-reviews", "approved"],
    queryFn: fetchApprovedReviews,
    staleTime: 60_000,
    placeholderData: FALLBACK_REVIEWS,
    retry: 1,
  });

  const onSelect = useCallback((instance: CarouselApi) => {
    if (!instance) return;
    setSelected(instance.selectedScrollSnap());
    setSnapCount(instance.scrollSnapList().length);
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api) return;
    api.reInit();
    onSelect(api);
  }, [api, reviews, onSelect]);

  useEffect(() => {
    if (!api || paused || reviews.length <= 1) return;
    const id = window.setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => window.clearInterval(id);
  }, [api, paused, reviews.length]);

  if (isLoading && reviews.length === 0) {
    return <p className="text-center text-sm text-muted-foreground">Loading reviews…</p>;
  }

  if (reviews.length === 0) {
    return <p className="text-center text-sm text-muted-foreground">Client reviews will appear here soon.</p>;
  }

  return (
    <div
      className="relative mx-auto max-w-6xl px-10 sm:px-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
          dragFree: false,
          skipSnaps: false,
          containScroll: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 pt-6">
          {reviews.map((review) => (
            <CarouselItem key={review.id} className="basis-full pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="h-full pb-1">
                <ReviewCard review={review} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="absolute -left-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-primary/20 bg-background text-primary shadow-sm hover:bg-primary hover:text-primary-foreground sm:-left-4"
          aria-label="Previous reviews"
          onClick={() => api?.scrollPrev()}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="absolute -right-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-primary/20 bg-background text-primary shadow-sm hover:bg-primary hover:text-primary-foreground sm:-right-4"
          aria-label="Next reviews"
          onClick={() => api?.scrollNext()}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </Carousel>

      <div className="mt-8 flex items-center justify-center gap-2" role="tablist" aria-label="Review slides">
        {Array.from({ length: Math.max(snapCount, 1) }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={selected === i}
            aria-label={`Go to review group ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              selected === i ? "w-8 bg-primary" : "w-5 bg-primary/25 hover:bg-primary/45",
            )}
            onClick={() => api?.scrollTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
