import { motion, useReducedMotion } from "framer-motion";

export default function WorkCard({
  item,
  index,
  active = false,
  onClick,
}) {
  const reduceMotion = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 20,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
      }}
      onClick={onClick}
      className={`
        group
        relative
        w-[250px]
        min-w-[250px]
        shrink-0
        aspect-[16/10]
        cursor-pointer
        overflow-hidden
        rounded-[18px]
        border
        bg-[var(--bg-surface)]
        transition-all
        duration-500

        sm:w-[280px]
        sm:min-w-[280px]

        lg:w-[320px]
        lg:min-w-[320px]

        ${active
          ? "scale-[1.02] border-gold/40 shadow-2xl"
          : "border-[var(--border-subtle)] hover:border-gold/30"
        }
      `}
    >
      {/* ================= IMAGE ================= */}
      <div className="absolute inset-0 overflow-hidden bg-black/20">
        {item?.image ? (
          <img
            src={item.image}
            alt={item?.title || "Work"}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-1000
              ease-out
              group-hover:scale-[1.04]
            "
            onError={(e) => {
              e.currentTarget.style.opacity = "0";
            }}
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              bg-gradient-to-br
              from-charcoal
              to-burgundy
              px-6
              text-center
              text-sm
              uppercase
              tracking-wider
              text-gold/70
            "
          >
            {item?.title || "Our Work"}
          </div>
        )}
      </div>

      {/* ================= IMAGE OVERLAY ================= */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/5
        "
      />

      {/* Bottom cinematic gradient */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-[65%]
          bg-gradient-to-t
          from-black/95
          via-black/60
          to-transparent
        "
      />

      {/* Top subtle gradient */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-24
          bg-gradient-to-b
          from-black/25
          to-transparent
        "
      />

      {/* ================= CONTENT ================= */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-10
          p-5
          sm:p-6
        "
      >
        {/* Number */}
        <p
          className="
            font-display
            text-base
            font-medium
            leading-none
            text-gold
            sm:text-lg
          "
        >
          {number}
        </p>

        {/* Underline */}
        <div
          className="
            mt-2
            h-[1.5px]
            w-8
            bg-gold/80
            transition-all
            duration-300
            group-hover:w-12
          "
        />

        {/* Title */}
        <div className="mt-3 min-w-0">
          <h3
            className="
              font-display
              text-lg
              font-medium
              leading-tight
              text-white
              transition-colors
              duration-300
              group-hover:text-gold

              sm:text-xl
              lg:text-2xl
            "
          >
            {item?.title || "Untitled"}
          </h3>

          {item?.category && (
            <p
              className="
                mt-1
                text-xs
                leading-relaxed
                text-white/60
                sm:text-sm
              "
            >
              {item.category}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}