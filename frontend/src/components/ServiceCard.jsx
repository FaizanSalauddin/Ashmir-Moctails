import { motion, useReducedMotion } from "framer-motion";
import { openServiceEnquiry } from "../utils/whatsappService";

export default function ServiceCard({ service, index }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-charcoal">
        {service.image ? (
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.opacity = "0";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-charcoal to-burgundy text-xs uppercase tracking-wider2 text-gold/60">
            {service.title}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl text-[var(--text-primary)]">
          {service.title}
        </h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          {service.description}
        </p>
        <button
          type="button"
          onClick={() => openServiceEnquiry(service.title)}
          className="mt-4 text-xs uppercase tracking-wider2 text-gold transition-colors duration-300 hover:text-gold-warm"
        >
          Enquire for Details →
        </button>
      </div>
    </motion.div>
  );
}
