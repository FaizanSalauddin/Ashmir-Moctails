import { useEffect, useState } from "react";
import {
  Check,
  Save,
  MessageCircle,
  Phone,
  Instagram,
  Facebook,
  Globe2,
  Link,
} from "lucide-react";
import { settingsApi } from "../../services/resources";

const FIELDS = [
  { key: "heroTitle", label: "Hero Title" },

  { key: "heroSubtitle", label: "Hero Subtitle" },

  {
    key: "brandDescription",
    label: "Brand Description",
    textarea: true,
  },

  {
    key: "whatsappNumber",
    label: "WhatsApp Number",
  },

  {
    key: "contactNumber",
    label: "Contact Number",
  },

  {
    key: "contactUrl",
    label: "Contact URL",
  },

  {
    key: "instagramUrl",
    label: "Instagram URL",
  },

  {
    key: "facebookUrl",
    label: "Facebook URL",
  },

  {
    key: "footerText",
    label: "Footer Text",
  },
];

const FIELD_ICONS = {
  whatsappNumber: MessageCircle,
  contactNumber: Phone,
  contactUrl: Link,
  instagramUrl: Instagram,
  facebookUrl: Facebook,
};

export default function SiteSettingsPage() {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    settingsApi
      .get()
      .then(({ data }) => setValues(data || {}))
      .catch(() => setValues({}))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setSaved(false);

    try {
      await settingsApi.update(values);

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key, value) => {
    setValues((v) => ({
      ...v,
      [key]: value,
    }));

    setSaved(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-muted">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--border-subtle)] border-t-gold" />
          Loading settings...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-10">
      {/* ================= HEADER ================= */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
              <Globe2 size={17} className="text-gold" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
              Site Configuration
            </span>
          </div>

          <h1 className="font-display text-3xl text-offwhite sm:text-4xl">
            Website Content
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Update your website's key business information, contact details
            and social links without touching the code.
          </p>
        </div>

        {saved && (
          <div className="flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs text-gold">
            <Check size={14} />
            Changes saved
          </div>
        )}
      </div>

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid gap-5 lg:grid-cols-2">
          {FIELDS.map((field) => {
            const Icon = FIELD_ICONS[field.key];

            return (
              <div
                key={field.key}
                className={`rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 transition-colors duration-200 hover:border-white/10 sm:p-5 ${
                  field.textarea ? "lg:col-span-2" : ""
                }`}
              >
                {/* Label */}
                <label className="mb-3 flex items-center gap-2">
                  {Icon && (
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold/10">
                      <Icon size={14} className="text-gold" />
                    </span>
                  )}

                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                    {field.label}
                  </span>
                </label>

                {/* Textarea */}
                {field.textarea ? (
                  <textarea
                    rows={5}
                    value={values[field.key] || ""}
                    onChange={(e) =>
                      handleChange(field.key, e.target.value)
                    }
                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                    className="
                      w-full
                      resize-y
                      rounded-xl
                      border
                      border-[var(--border-subtle)]
                      bg-[var(--bg-surface)]
                      px-4
                      py-3.5
                      text-sm
                      leading-6
                      text-offwhite
                      outline-none
                      transition
                      placeholder:text-muted/50
                      focus:border-gold
                      focus:ring-1
                      focus:ring-gold/20
                    "
                  />
                ) : (
                  <input
                    value={values[field.key] || ""}
                    onChange={(e) =>
                      handleChange(field.key, e.target.value)
                    }
                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-[var(--border-subtle)]
                      bg-[var(--bg-surface)]
                      px-4
                      py-3.5
                      text-sm
                      text-offwhite
                      outline-none
                      transition
                      placeholder:text-muted/50
                      focus:border-gold
                      focus:ring-1
                      focus:ring-gold/20
                    "
                  />
                )}

                {/* Helpful hints */}
                {field.key === "instagramUrl" && (
                  <p className="mt-2 text-[10px] text-muted/60">
                    Example: https://www.instagram.com/your-account/
                  </p>
                )}

                {field.key === "contactUrl" && (
                  <p className="mt-2 text-[10px] text-muted/60">
                    Contact icon will open this URL. If empty, Contact Number
                    will be used for calling.
                  </p>
                )}

                {field.key === "contactNumber" && (
                  <p className="mt-2 text-[10px] text-muted/60">
                    Example: +919876543210
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* ================= SAVE SECTION ================= */}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <p className="text-sm font-medium text-offwhite">
              Website settings
            </p>

            <p className="mt-1 text-xs leading-5 text-muted">
              Save your changes to update the information displayed on the
              website.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              bg-gold
              px-6
              py-3
              text-xs
              font-medium
              uppercase
              tracking-[0.14em]
              text-obsidian
              transition
              hover:brightness-105
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-60
              sm:w-auto
            "
          >
            {saving ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-obsidian/30 border-t-obsidian" />
                Saving...
              </>
            ) : (
              <>
                <Save size={14} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}