import { motion, useReducedMotion } from "framer-motion";
import { openGeneralEnquiry } from "../utils/whatsappService";

export default function CTASection({ onBookNow }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[var(--bg-surface)] px-6 py-24 text-center sm:px-10 md:py-32"
    >
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl leading-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl"
        >
          Let's make your event unforgettable.
        </motion.h2>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-4 text-sm text-[var(--text-secondary)] sm:text-base"
        >
          Premium mocktail and event experiences crafted for your special occasion.
        </motion.p>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <button
            type="button"
            onClick={openGeneralEnquiry}
            className="rounded-full border border-gold px-8 py-3 text-xs uppercase tracking-wider2 text-gold transition-colors duration-300 hover:bg-gold hover:text-obsidian"
          >
            Enquire on WhatsApp
          </button>
          <button
            type="button"
            onClick={onBookNow}
            className="rounded-full bg-gold px-8 py-3 text-xs uppercase tracking-wider2 text-obsidian transition-transform duration-300 hover:scale-105"
          >
            Book Your Event
          </button>
        </motion.div>
      </div>
    </section>
  );
}
