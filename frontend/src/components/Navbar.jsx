import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrolled } from "../hooks/useScrolled";
import { SITE } from "../data/config";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onBookNow }) {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#home"
            className="font-display text-2xl tracking-wider2 text-gold"
          >
            {SITE.brandName}
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs uppercase tracking-wider2 text-[var(--text-secondary)] transition-colors duration-300 hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            <ThemeToggle />

            <button
              type="button"
              onClick={onBookNow}
              className="rounded-full bg-gold px-5 py-2 text-xs uppercase tracking-wider2 text-obsidian transition-transform duration-300 hover:scale-105"
            >
              Book Now
            </button>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="text-[var(--text-primary)]"
            >
              <Menu size={26} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-[var(--bg-base)] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-display text-2xl tracking-wider2 text-gold">
                {SITE.brandName}
              </span>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-[var(--text-primary)]"
              >
                <X size={26} strokeWidth={1.5} />
              </button>
            </div>

            <ul className="mt-8 flex flex-1 flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className="font-display text-2xl text-[var(--text-primary)] transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="px-8 pb-10">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onBookNow();
                }}
                className="w-full rounded-full bg-gold py-3 text-xs uppercase tracking-wider2 text-obsidian"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}