import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  UtensilsCrossed,
  Images,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ConfirmDialog from "../components/ConfirmDialog";

const LINKS = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/admin/services",
    label: "Services",
    icon: ListChecks,
  },
  {
    to: "/admin/menu",
    label: "Menu",
    icon: UtensilsCrossed,
  },
  {
    to: "/admin/gallery",
    label: "Gallery",
    icon: Images,
  },
  {
    to: "/admin/reviews",
    label: "Reviews",
    icon: Star,
  },
  {
    to: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const { logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const closeSidebar = () => {
    setOpen(false);
  };

  const handleLogoutClick = () => {
    setLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutConfirm(false);
    setOpen(false);
    logout();
  };

  return (
    <>
      {/* ================= MOBILE TOP TOGGLE ================= */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="
          fixed
          left-4
          top-4
          z-[80]
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-[var(--border-subtle)]
          bg-[var(--bg-surface)]
          text-gold
          shadow-lg
          transition-all
          duration-200
          hover:border-gold/40
          hover:bg-gold/5
          md:hidden
        "
      >
        {open ? (
          <X size={19} strokeWidth={1.75} />
        ) : (
          <Menu size={19} strokeWidth={1.75} />
        )}
      </button>

      {/* ================= MOBILE OVERLAY ================= */}
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeSidebar}
          className="
            fixed
            inset-0
            z-[50]
            bg-black/60
            backdrop-blur-[2px]
            md:hidden
          "
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className="
          fixed
          left-0
          top-0
          z-[60]
          flex
          h-svh
          w-60
          shrink-0
          -translate-x-full
          flex-col
          border-r
          border-[var(--border-subtle)]
          bg-[var(--bg-surface)]
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out
          md:relative
          md:z-auto
          md:h-full
          md:translate-x-0
          md:shadow-none
        "
        style={{
          transform:
            typeof window !== "undefined" && window.innerWidth < 768
              ? open
                ? "translateX(0)"
                : "translateX(-100%)"
              : undefined,
        }}
      >
        {/* ================= BRAND ================= */}
        <div className="shrink-0 px-7 pb-7 pt-16 md:pt-6">
          <span className="font-display text-xl tracking-wider2 text-gold">
            ASHMIR
          </span>

          <p className="text-[10px] uppercase tracking-wider2 text-muted">
            Admin
          </p>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-5">
          {LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              title={label}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `group flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-gold/10 text-gold"
                    : "text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]"
                }`
              }
            >
              <Icon
                size={17}
                strokeWidth={1.75}
                className="shrink-0 transition-transform duration-200 group-hover:scale-105"
              />

              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* ================= LOGOUT ================= */}
        <div className="shrink-0 p-5 pt-4">
          <button
            type="button"
            onClick={handleLogoutClick}
            title="Log Out"
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              px-3
              py-2.5
              text-sm
              text-[var(--text-secondary)]
              transition-all
              duration-200
              hover:bg-red-500/10
              hover:text-red-400
            "
          >
            <LogOut
              size={17}
              strokeWidth={1.75}
              className="shrink-0"
            />

            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* ================= LOGOUT CONFIRMATION ================= */}
      <ConfirmDialog
        open={logoutConfirm}
        title="Log out?"
        message="Are you sure you want to log out of the admin panel?"
        onCancel={() => setLogoutConfirm(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}