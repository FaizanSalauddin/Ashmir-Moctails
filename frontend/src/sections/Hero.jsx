import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import VideoBackground from "../components/VideoBackground";
import { SITE } from "../data/config";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { openGeneralEnquiry } from "../utils/whatsappService";

export default function Hero({ onBookNow }) {
  const reduceMotion = useReducedMotion();
  const settings = useSiteSettings();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.8,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        };

  return (
    <section
      id="home"
      className="relative h-svh w-full overflow-hidden"
    >
      <VideoBackground
        desktopSrc="/videos/hero-desktop.mp4"
        mobileSrc="/videos/hero-mobile.mp4"
        poster="/placeholders/hero-poster.svg"
        className="absolute inset-0"
        overlayClassName="bg-gradient-to-b from-black/50 via-black/40 to-black/70"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          {...fadeUp(0.1)}
          className="font-display text-6xl tracking-wider2 text-offwhite sm:text-7xl md:text-8xl"
        >
          {settings.heroTitle || SITE.brandName}
        </motion.h1>

        <motion.p
          {...fadeUp(0.25)}
          className="mt-4 text-xs uppercase tracking-wider3 text-gold sm:text-sm"
        >
          {settings.heroSubtitle || SITE.tagline}
        </motion.p>

        <motion.p
          {...fadeUp(0.35)}
          className="mt-3 max-w-md text-sm text-offwhite/80 sm:text-base"
        >
          {SITE.servicesLine}
        </motion.p>

        <motion.div
          {...fadeUp(0.5)}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
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
            Book Now
          </button>
        </motion.div>
      </div>

      {/* Scroll to Explore */}
      <motion.div
        {...fadeUp(0.9)}
        className="absolute bottom-8 left-0 right-0 z-10 flex w-full justify-center text-offwhite/70"
      >
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <span className="whitespace-nowrap text-[10px] uppercase tracking-wider2">
            Scroll to explore
          </span>

          <ChevronDown
            size={16}
            className={reduceMotion ? "" : "animate-bounce"}
          />
        </div>
      </motion.div>
    </section>
  );
}