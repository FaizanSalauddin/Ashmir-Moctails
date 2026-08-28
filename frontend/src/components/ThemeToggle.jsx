import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!isDark}
      className={`inline-flex h-9 w-9 items-center bg-gold justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors duration-300 hover:border-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${className}`}
    >
      {isDark ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
    </button>
  );
}
