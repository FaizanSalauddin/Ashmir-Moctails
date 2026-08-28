import { useRef } from "react";
import SectionHeading from "../components/SectionHeading";
import WorkCard from "../components/WorkCard";
import { GALLERY_ITEMS } from "../data/gallery";
import { galleryApi } from "../services/resources";
import { useApiWithFallback } from "../hooks/useApiWithFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WorksSection() {
  const { data } = useApiWithFallback(galleryApi.list, GALLERY_ITEMS);
  const scrollRef = useRef(null);

  const sorted = [...data].sort((a, b) => {
    const featuredDiff = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    if (featuredDiff !== 0) return featuredDiff;
    return (a.order || 0) - (b.order || 0);
  });
  const featured = sorted.slice(0, 8);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="work" className="bg-[var(--bg-base)] px-4 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header with Nav Buttons */}
        <div className="flex w-full items-center justify-center text-center">
          <SectionHeading
            eyebrow="Our Work"
            title="The Ashmir Experience"
            description="A glimpse of the memorable events and setups we've crafted."
          />
        </div>

        {/* Horizontal Carousel Container */}
        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth py-4 px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featured.map((item, i) => (
            <WorkCard key={item._id || item.id} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}