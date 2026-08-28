import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ show }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      // Keep loading screen visible for at least 6 seconds
      // so all animations can complete.
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-obsidian"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Subtle background glow */}
          <motion.div
            className="absolute h-[420px] w-[420px] rounded-full bg-gold/10 blur-[120px]"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 2.5,
              ease: "easeOut",
            }}
          />

          <div className="relative flex flex-col items-center text-center">
            {/* Welcome */}
            <motion.p
              className="mb-3 text-xs uppercase tracking-[0.45em] text-gold/70"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.4,
              }}
            >
              Welcome To
            </motion.p>

            {/* ASHMIR */}
            <motion.h1
              className="font-display text-5xl tracking-[0.28em] text-gold sm:text-6xl md:text-7xl"
              initial={{
                opacity: 0,
                y: 20,
                letterSpacing: "0.55em",
              }}
              animate={{
                opacity: 1,
                y: 0,
                letterSpacing: "0.28em",
              }}
              transition={{
                duration: 1.8,
                delay: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              ASHMIR
            </motion.h1>

            {/* MOCKTAILS */}
            <motion.p
              className="mt-2 text-sm uppercase tracking-[0.55em] text-gold/80 sm:text-base"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1.4,
                delay: 1.2,
                ease: "easeOut",
              }}
            >
              MOCKTAILS
            </motion.p>

            {/* Divider */}
            <motion.div
              className="mt-10 h-px bg-gold/40"
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: 90,
                opacity: 1,
              }}
              transition={{
                duration: 1.2,
                delay: 2,
                ease: "easeOut",
              }}
            />

            {/* Developed By */}
            <motion.div
              className="mt-8"
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1.2,
                delay: 2.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.p
                className="text-[9px] uppercase tracking-[0.4em] text-white/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 3,
                }}
              >
                Developed By
              </motion.p>

              <motion.p
                className="mt-2 font-display text-xl tracking-[0.18em] text-gold sm:text-xxl"
                initial={{
                  opacity: 0,
                  y: 10,
                  letterSpacing: "0.05em",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  letterSpacing: "0.18em",
                }}
                transition={{
                  duration: 1.3,
                  delay: 3.2,
                  ease: "easeOut",
                }}
              >
                Faizan Salauddin
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom loading line */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <motion.div
              className="h-px bg-gold/20"
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{
                duration: 5,
                delay: 0.5,
                ease: "linear",
              }}
            >
              <motion.div
                className="h-full bg-gold"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 5,
                  delay: 0.5,
                  ease: "linear",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}