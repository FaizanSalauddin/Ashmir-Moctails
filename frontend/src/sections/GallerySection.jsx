import { useMemo, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import WorkCard from "../components/WorkCard";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "../data/gallery";
import { galleryApi } from "../services/resources";
import { useApiWithFallback } from "../hooks/useApiWithFallback";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data, usingFallback } = useApiWithFallback(
    galleryApi.list,
    GALLERY_ITEMS
  );

  const categories = useMemo(() => {
    if (usingFallback) return GALLERY_CATEGORIES;

    const names = Array.from(
      new Set(data.map((g) => g.category))
    ).sort();

    return ["All", ...names];
  }, [data, usingFallback]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return data;

    return data.filter(
      (g) => g.category === activeCategory
    );
  }, [activeCategory, data]);

  return (
    <section
      id="gallery"
      className="
        overflow-hidden
        bg-[var(--bg-base)]
        px-4
        py-16
        sm:px-6
        sm:py-20
        md:px-10
        md:py-28
      "
    >
      <div className="mx-auto w-full max-w-7xl">

        {/* ================= SECTION HEADING ================= */}
        <div className="flex w-full items-center justify-center text-center">
          <SectionHeading
            eyebrow="Visual Story"
            title="Gallery"
            description="Browse setups by event type — placeholder imagery until real event photography is uploaded."
          />
        </div>

        {/* ================= CATEGORY FILTER ================= */}
        <div className="mb-8 mt-8 sm:mb-10">
          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-2
              sm:gap-3
            "
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`
                  shrink-0
                  rounded-full
                  border
                  px-4
                  py-2.5
                  text-[10px]
                  uppercase
                  tracking-wider2
                  whitespace-nowrap
                  transition-all
                  duration-300
                  active:scale-95

                  sm:px-5
                  sm:py-2
                  sm:text-xs

                  ${
                    activeCategory === cat
                      ? "border-gold bg-gold text-obsidian shadow-[0_4px_20px_rgba(212,175,55,0.15)]"
                      : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-gold hover:text-gold"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ================= GALLERY GRID ================= */}
        {filtered.length > 0 && (
          <div
            className="
              grid
              w-full
              grid-cols-1
              gap-5

              sm:grid-cols-2
              sm:gap-5

              lg:grid-cols-3
              lg:gap-6

              xl:grid-cols-4
            "
          >
            {filtered.map((item, i) => (
              <div
                key={item._id || item.id}
                className="
                  min-w-0
                  w-full
                  overflow-hidden

                  [&>div]:!w-full
                  [&>div]:!shrink
                  [&>div]:!cursor-default

                  [&_img]:!object-contain
                "
              >
                <WorkCard
                  item={item}
                  index={i}
                />
              </div>
            ))}
          </div>
        )}

        {/* ================= EMPTY STATE ================= */}
        {filtered.length === 0 && (
          <div
            className="
              mt-10
              rounded-2xl
              border
              border-[var(--border-subtle)]
              bg-[var(--bg-surface)]
              px-5
              py-12
              text-center
            "
          >
            <p className="text-sm text-[var(--text-secondary)]">
              No images in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}