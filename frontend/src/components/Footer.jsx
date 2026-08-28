import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Globe,
  Phone,
} from "lucide-react";
import { SITE } from "../data/config";
import { useSiteSettings } from "../context/SiteSettingsContext";

const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const settings = useSiteSettings();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-obsidian px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-7xl">

        {/* =========================================================
            BRAND
        ========================================================== */}
        <div className="flex flex-col items-center text-center">
          <span className="font-display text-3xl tracking-wider2 text-offwhite">
            {SITE.brandFullName.toUpperCase()}
          </span>

          <p className="mt-2 text-xs uppercase tracking-wider2 text-muted">
            {SITE.servicesLine}
          </p>
        </div>

        {/* =========================================================
            NAVIGATION
        ========================================================== */}
        <nav className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
                text-xs
                uppercase
                tracking-wider2
                text-muted
                transition-colors
                duration-300
                hover:text-gold
              "
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* =========================================================
            ASHMIR SOCIAL / CONTACT
        ========================================================== */}
        <div className="mt-10 flex justify-center gap-4">

          {/* ---------------- Instagram ---------------- */}
          {settings.instagramUrl && (
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ashmir Instagram"
              className="
                group
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[var(--border-subtle)]
                bg-white/[0.02]
                text-muted
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-gold
                hover:bg-gold/10
                hover:text-gold
                hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]
              "
            >
              <Instagram
                size={17}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />
            </a>
          )}

          {/* ---------------- Facebook ---------------- */}
          {settings.facebookUrl && (
            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ashmir Facebook"
              className="
                group
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[var(--border-subtle)]
                bg-white/[0.02]
                text-muted
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-gold
                hover:bg-gold/10
                hover:text-gold
                hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]
              "
            >
              <Facebook
                size={17}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />
            </a>
          )}

          {/* ---------------- Contact / Call ---------------- */}
          {settings.contactNumber && (
            <a
              href={`tel:${settings.contactNumber}`}
              aria-label={`Call Ashmir at ${settings.contactNumber}`}
              className="
                group
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[var(--border-subtle)]
                bg-white/[0.02]
                text-muted
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-gold
                hover:bg-gold/10
                hover:text-gold
                hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]
              "
            >
              <Phone
                size={17}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />
            </a>
          )}
        </div>

        {/* =========================================================
            DEVELOPER CREDIT
        ========================================================== */}
        <div className="mt-14 flex flex-col items-center text-center">

          {/* Decorative Line */}
          <div
            className="
              mb-5
              h-px
              w-16
              bg-gradient-to-r
              from-transparent
              via-gold
              to-transparent
              opacity-60
            "
          />

          {/* Small Label */}
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.28em]
              text-muted
            "
          >
            Crafted with precision by
          </p>

          {/* =====================================================
              FAIZAN NAME
          ====================================================== */}
          <a
            href="https://faizan-protfolio-xi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Faizan Salauddin Portfolio"
            className="group relative mt-2 inline-block"
          >
            <span
              className="
                bg-gradient-to-r
                from-gold
                via-offwhite
                to-gold
                bg-clip-text
                font-display
                text-2xl
                tracking-[0.12em]
                text-transparent
                transition-all
                duration-500
                group-hover:tracking-[0.18em]
              "
            >
              FAIZAN SALAUDDIN
            </span>

            {/* Animated underline */}
            <span
              className="
                absolute
                -bottom-1
                left-1/2
                h-px
                w-0
                -translate-x-1/2
                bg-gold
                transition-all
                duration-500
                group-hover:w-full
              "
            />
          </a>

          {/* =====================================================
              DEVELOPER LINKS
          ====================================================== */}
          <div className="mt-6 flex items-center gap-3">

            {/* ---------------- Portfolio ---------------- */}
            <a
              href="https://faizan-protfolio-xi.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Faizan Salauddin Portfolio"
              className="
                group
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[var(--border-subtle)]
                bg-white/[0.02]
                text-muted
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-gold
                hover:bg-gold/10
                hover:text-gold
                hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]
              "
            >
              <Globe
                size={16}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />
            </a>

            {/* ---------------- LinkedIn ---------------- */}
            <a
              href="https://www.linkedin.com/in/faizan-salauddin-947768312/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Faizan Salauddin on LinkedIn"
              className="
                group
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[var(--border-subtle)]
                bg-white/[0.02]
                text-muted
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-gold
                hover:bg-gold/10
                hover:text-gold
                hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]
              "
            >
              <Linkedin
                size={16}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />
            </a>

            {/* ---------------- Email ---------------- */}
            <a
              href="mailto:faizansalauddin924@gmail.com"
              aria-label="Email Faizan Salauddin"
              className="
                group
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[var(--border-subtle)]
                bg-white/[0.02]
                text-muted
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-gold
                hover:bg-gold/10
                hover:text-gold
                hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]
              "
            >
              <Mail
                size={16}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />
            </a>

          </div>
        </div>

        {/* =========================================================
            COPYRIGHT
        ========================================================== */}
        <p className="mt-10 text-center text-[11px] text-muted">
          © {year}{" "}
          {settings.footerText ||
            `${SITE.brandFullName}. All rights reserved.`}
        </p>

      </div>
    </footer>
  );
}