import { motion, useReducedMotion } from "framer-motion";
import VideoBackground from "../components/VideoBackground";
import { openGeneralEnquiry } from "../utils/whatsappService";

export default function ShowcaseVideo() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-[var(--bg-base)] px-6 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.span
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="block text-center text-xs uppercase tracking-wider3 text-gold"
        >
          The Ashmir Experience
        </motion.span>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-8 h-[420px] w-full overflow-hidden rounded-2xl sm:h-[500px] md:aspect-video md:h-auto"
        >
          <VideoBackground
            desktopSrc="/videos/showcase-desktop.mp4"
            mobileSrc="/videos/showcase-mobile.mp4"
            poster="/placeholders/showcase-poster.svg"
            className="absolute inset-0"
            overlayClassName="bg-black/20"
          />
        </motion.div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center text-center">
          <p className="text-sm text-[var(--text-secondary)] sm:text-base">
            From an intimate private gathering to a five-hundred-guest wedding,
            every Ashmir counter is designed, styled and served live — a
            beverage experience built around your event, not the other way
            around.
          </p>
          <button
            type="button"
            onClick={openGeneralEnquiry}
            className="mt-6 rounded-full border border-gold px-8 py-3 text-xs uppercase tracking-wider2 text-gold transition-colors duration-300 hover:bg-gold hover:text-obsidian"
          >
            Enquire on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
