import { motion, useReducedMotion } from "framer-motion";
import { openProductEnquiry } from "../utils/whatsappService";

export default function ProductCard({ product, index }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.04 }}
      className="group overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
    >
      <div className="aspect-square w-full overflow-hidden bg-charcoal">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="
                  h-full
                  w-full
                  object-contain
                  p-3
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
            onError={(e) => {
              e.currentTarget.style.opacity = "0";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-charcoal to-burgundy text-xs uppercase tracking-wider2 text-gold/60">
            {product.name}
          </div>
        )}
      </div>
      <div className="p-4">
        <span className="text-[10px] uppercase tracking-wider2 text-gold">
          {product.category}
        </span>
        <h3 className="mt-1 font-display text-lg text-[var(--text-primary)]">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-[var(--text-secondary)] line-clamp-2">
          {product.description}
        </p>
        <button
          type="button"
          onClick={() => openProductEnquiry(product.name)}
          className="mt-3 text-xs uppercase tracking-wider2 text-gold transition-colors duration-300 hover:text-gold-warm"
        >
          Enquire
        </button>
      </div>
    </motion.div>
  );
}
