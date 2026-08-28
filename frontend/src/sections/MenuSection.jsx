import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import ProductCard from "../components/ProductCard";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data/menu";
import { productsApi, categoriesApi } from "../services/resources";
import { useApiWithFallback } from "../hooks/useApiWithFallback";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: products } = useApiWithFallback(
    productsApi.list,
    MENU_ITEMS
  );

  const { data: categoryDocs } = useApiWithFallback(
    categoriesApi.list,
    []
  );

  const categories = useMemo(() => {
    if (categoryDocs && categoryDocs.length > 0) {
      const names = [...categoryDocs]
        .sort(
          (a, b) =>
            (a.order || 0) - (b.order || 0)
        )
        .map((c) => c.name);

      return ["All", ...names];
    }

    return MENU_CATEGORIES;
  }, [categoryDocs]);

  const enabledProducts = useMemo(
    () =>
      products.filter(
        (p) => p.enabled !== false
      ),
    [products]
  );

  const filtered = useMemo(() => {
    if (activeCategory === "All") {
      return enabledProducts;
    }

    return enabledProducts.filter(
      (p) => p.category === activeCategory
    );
  }, [activeCategory, enabledProducts]);

  return (
    <section
      id="menu"
      className="
        bg-[var(--bg-base)]
        px-4
        py-16
        sm:px-8
        sm:py-20
        md:py-28
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= SECTION HEADING ================= */}
        <div className="flex w-full items-center justify-center text-center">
          <SectionHeading
            eyebrow="Our Catalog"
            title="Explore the Menu"
            description="A full range of mocktails, shakes, smoothies and blossom drinks — request a quote for your event's selection."
          />
        </div>

        {/* ================= CATEGORIES ================= */}
        <div
          className="
            mb-10
            mt-8
            -mx-4
            flex
            gap-2
            overflow-x-auto
            px-4
            pb-2
            scrollbar-hide

            sm:mx-0
            sm:flex-wrap
            sm:justify-center
            sm:gap-3
            sm:overflow-visible
            sm:px-0
            sm:pb-0
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

        {/* ================= PRODUCTS ================= */}
        <motion.div
          layout
          className="
            grid
            grid-cols-2
            gap-3

            sm:grid-cols-2
            sm:gap-5

            lg:grid-cols-4
            lg:gap-6
          "
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product._id || product.id}
                layout
                initial={{
                  opacity: 0,
                  y: 15,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(i * 0.03, 0.2),
                }}
                className="min-w-0"
              >
                <ProductCard
                  product={product}
                  index={i}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ================= EMPTY STATE ================= */}
        {filtered.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              mt-10
              rounded-2xl
              border
              border-[var(--border-subtle)]
              bg-[var(--bg-surface)]
              px-5
              py-10
              text-center
            "
          >
            <p className="text-sm text-[var(--text-secondary)]">
              No items in this category yet.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}