import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import BookingForm from "./BookingForm";

export default function BookingModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Booking form"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[92svh] w-full overflow-y-auto rounded-t-3xl bg-[var(--bg-elevated)] p-6 sm:max-w-2xl sm:rounded-3xl sm:p-10"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl text-[var(--text-primary)]">
                Book Your Event
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close booking form"
                className="text-[var(--text-secondary)] transition-colors duration-300 hover:text-gold"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <p className="mb-8 text-sm text-[var(--text-secondary)]">
              Fill in your details below — this opens WhatsApp with your booking
              enquiry pre-filled. You'll press send yourself.
            </p>
            <BookingForm onSuccess={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
