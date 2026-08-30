import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(email, password);

    if (success) {
      navigate("/admin", { replace: true });
    }
  };

  const handleForgotPassword = () => {
  
    const developerWhatsApp = "91XXXXXXXXXX";

    const message = encodeURIComponent(
      "Hello Faizan, I have forgotten my Ashmir Mocktails Admin Panel password. Please help me reset it."
    );

    window.open(
      `https://wa.me/${developerWhatsApp}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="flex min-h-svh items-center justify-center bg-obsidian px-6">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8">
        {/* Brand */}
        <h1 className="text-center font-display text-3xl tracking-wider2 text-gold">
          ASHMIR
        </h1>

        <p className="mt-1 text-center text-xs uppercase tracking-wider2 text-muted">
          Admin Panel
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-4"
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs uppercase tracking-wider2 text-muted"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-sm text-offwhite outline-none transition-colors duration-300 focus:border-gold"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs uppercase tracking-wider2 text-muted"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[var(--border-subtle)] bg-transparent px-4 py-3 pr-12 text-sm text-offwhite outline-none transition-colors duration-300 focus:border-gold"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors duration-300 hover:text-gold"
              >
                {showPassword ? (
                  <EyeOff size={18} strokeWidth={1.6} />
                ) : (
                  <Eye size={18} strokeWidth={1.6} />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-400">
              {error}
            </p>
          )}

          {/* Sign In */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-gold py-3 text-xs uppercase tracking-wider2 text-obsidian transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Forgot Password */}
        <p className="mt-6 text-center text-xs text-muted">
          Forgot Password?{" "}
          <br />
          <span className="text-gold">
            Contact Developer —  Faizan Salauddin
          </span>
        </p>
      </div>
    </div>
  );
}