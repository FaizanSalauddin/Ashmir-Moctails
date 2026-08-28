import { motion, useReducedMotion } from "framer-motion";
import { useSiteSettings } from "../context/SiteSettingsContext";

const FALLBACK_DESCRIPTION =
  "Ashmir Mocktails designs and runs premium beverage counters for weddings, celebrations and corporate events — mocktails, smoothies, shakes, fresh fruit, hookah and fully custom setups, crafted live and styled to match your occasion.";

export default function BrandIntro() {
  const reduceMotion = useReducedMotion();
  const settings = useSiteSettings();

  return (
    <section className="bg-[var(--bg-base)] px-6 py-24 sm:px-10 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <motion.span
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-wider3 text-gold"
        >
          The Ashmir Philosophy
        </motion.span>

        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-3xl leading-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl"
        >
          We create experiences, not just mocktails.
        </motion.h2>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-6 max-w-xl text-sm text-[var(--text-secondary)] sm:text-base"
        >
          {settings.brandDescription || FALLBACK_DESCRIPTION}
        </motion.p>
      </div>
    </section>
  );
}
