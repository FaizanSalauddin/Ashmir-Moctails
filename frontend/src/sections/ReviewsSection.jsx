import SectionHeading from "../components/SectionHeading";
import ReviewCard from "../components/ReviewCard";
import { REVIEWS } from "../data/reviews";
import { reviewsApi } from "../services/resources";
import { useApiWithFallback } from "../hooks/useApiWithFallback";

export default function ReviewsSection() {
  const { data, usingFallback } = useApiWithFallback(
    reviewsApi.list,
    REVIEWS
  );

  const reviews = data.filter((r) => r.published !== false);

  return (
    <section
      id="reviews"
      className="overflow-hidden bg-[var(--bg-base)] px-6 py-20 sm:px-10 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
          description={
            usingFallback
              ? "Demo/placeholder reviews shown until the owner adds genuine client reviews through the admin panel."
              : "Real feedback from Ashmir Mocktails clients."
          }
        />

        {/* Mobile: Horizontal Premium Swipe */}
        <div className="relative -mx-6 sm:hidden">
          <div
            className="
              flex
              gap-5
              overflow-x-auto
              px-6
              pb-6
              snap-x
              snap-mandatory
              overscroll-x-contain
              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {reviews.map((review) => (
              <div
                key={review._id || review.id}
                className="
                  w-[84vw]
                  min-w-[84vw]
                  shrink-0
                  snap-center
                  first:ml-0
                "
              >
                <ReviewCard
                  review={review}
                  isFallback={usingFallback}
                />
              </div>
            ))}
          </div>

          {/* Swipe indicator */}
          {reviews.length > 1 && (
            <div className="mt-1 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-gold/40" />
              <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">
                Swipe to explore
              </span>
              <span className="h-px w-8 bg-gold/40" />
            </div>
          )}
        </div>

        {/* Tablet + Desktop: Grid */}
        <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id || review.id}
              review={review}
              isFallback={usingFallback}
            />
          ))}
        </div>
      </div>
    </section>
  );
}