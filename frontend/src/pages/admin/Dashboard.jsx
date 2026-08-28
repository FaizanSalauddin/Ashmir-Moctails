import { useEffect, useState } from "react";
import {
  servicesApi,
  productsApi,
  galleryApi,
  reviewsApi,
} from "../../services/resources";

const CARDS = [
  { key: "services", label: "Services" },
  { key: "products", label: "Menu Items" },
  { key: "gallery", label: "Gallery Items" },
  { key: "reviews", label: "Reviews" },
];

export default function Dashboard() {
  const [counts, setCounts] = useState({
    services: null,
    products: null,
    gallery: null,
    reviews: null,
  });

  useEffect(() => {
    let mounted = true;

    Promise.allSettled([
      servicesApi.list(),
      productsApi.list(),
      galleryApi.list(),
      reviewsApi.list(),
    ]).then(([services, products, gallery, reviews]) => {
      if (!mounted) return;

      setCounts({
        services:
          services.status === "fulfilled"
            ? services.value.data.length
            : 0,

        products:
          products.status === "fulfilled"
            ? products.value.data.length
            : 0,

        gallery:
          gallery.status === "fulfilled"
            ? gallery.value.data.length
            : 0,

        reviews:
          reviews.status === "fulfilled"
            ? reviews.value.data.length
            : 0,
      });
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <div className="max-w-full">
        <h1 className="font-display text-2xl text-offwhite sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted sm:text-sm">
          Overview of your Ashmir Mocktails content.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {CARDS.map((card) => (
          <div
            key={card.key}
            className="
              min-w-0
              rounded-xl
              border
              border-[var(--border-subtle)]
              bg-[var(--bg-surface)]
              p-4
              transition-all
              duration-300
              hover:border-gold/40
              sm:p-6
            "
          >
            <p className="font-display text-2xl text-gold sm:text-3xl">
              {counts[card.key] === null
                ? "—"
                : counts[card.key]}
            </p>

            <p className="mt-1 break-words text-[9px] uppercase tracking-[0.12em] text-muted sm:text-xs sm:tracking-wider2">
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}