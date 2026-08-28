import { motion, useReducedMotion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}) {
  const reduceMotion = useReducedMotion();
  const alignClass = align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <motion.div
      className={`flex flex-col ${alignClass} mb-12 md:mb-16`}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {eyebrow && (
        <span className="mb-3 text-xs uppercase tracking-wider3 text-gold">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl leading-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-sm text-[var(--text-secondary)] sm:text-base">
          {description}
        </p>
      )}
    </motion.div>
  );
}
