import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Star, X } from "lucide-react";
import { galleryApi } from "../../services/resources";
import { GALLERY_CATEGORIES } from "../../data/gallery";
import DataTable from "../../components/DataTable";
import ConfirmDialog from "../../components/ConfirmDialog";
import ImageUploader from "../../components/ImageUploader";

const CATEGORY_CHOICES = GALLERY_CATEGORIES.filter(
  (c) => c !== "All"
);

const emptyForm = {
  title: "",
  category: CATEGORY_CHOICES[0],
  image: null,
  order: 0,
  featured: false,
};

export default function GalleryManager() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleting, setDeleting] = useState(null);

  const load = async () => {
    setLoading(true);

    try {
      const { data } = await galleryApi.list();
      setRows(data);
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);

    setForm({
      title: row.title || "",
      category: row.category || CATEGORY_CHOICES[0],
      image: row.image || null,
      order: row.order || 0,
      featured: !!row.featured,
    });

    setFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      category: form.category,
      image: form.image?.url || form.image,
      imagePublicId: form.image?.public_id,
      order: Number(form.order) || 0,
      featured: form.featured,
    };

    if (editing) {
      await galleryApi.update(editing._id, payload);
    } else {
      await galleryApi.create(payload);
    }

    setFormOpen(false);
    load();
  };

  const handleDelete = async () => {
    if (!deleting) return;

    await galleryApi.remove(deleting._id);

    setDeleting(null);
    load();
  };

  return (
    <div className="w-full min-w-0">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-display text-2xl text-offwhite sm:text-3xl">
            Gallery
          </h1>

          <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted sm:text-sm">
            Manage event/setup photography shown on the site.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="
            flex
            w-full
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-full
            bg-gold
            px-5
            py-3
            text-xs
            uppercase
            tracking-wider2
            text-obsidian
            transition-opacity
            hover:opacity-90
            sm:w-auto
            sm:py-2.5
          "
        >
          <Plus size={14} />
          Add Image
        </button>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="mt-6 hidden md:block">
        <DataTable
          loading={loading}
          rows={rows}
          onEdit={openEdit}
          onDelete={setDeleting}
          emptyLabel="No gallery images yet — upload your first one."
          columns={[
            {
              key: "image",
              label: "Image",
              render: (row) =>
                row.image ? (
                  <img
                    src={row.image}
                    alt=""
                    className="h-10 w-14 rounded object-cover"
                  />
                ) : (
                  <span className="text-muted">—</span>
                ),
            },
            {
              key: "title",
              label: "Title",
            },
            {
              key: "category",
              label: "Category",
            },
            {
              key: "featured",
              label: "Featured",
              render: (row) =>
                row.featured ? (
                  <span className="text-gold">Yes</span>
                ) : (
                  "No"
                ),
            },
          ]}
        />
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="mt-5 space-y-3 md:hidden">
        {loading ? (
          <>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  h-28
                  animate-pulse
                  rounded-2xl
                  border
                  border-[var(--border-subtle)]
                  bg-[var(--bg-surface)]
                "
              />
            ))}
          </>
        ) : rows.length === 0 ? (
          <div
            className="
              rounded-2xl
              border
              border-[var(--border-subtle)]
              bg-[var(--bg-surface)]
              px-5
              py-10
              text-center
              text-sm
              text-muted
            "
          >
            No gallery images yet — upload your first one.
          </div>
        ) : (
          rows.map((row) => (
            <div
              key={row._id}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-[var(--border-subtle)]
                bg-[var(--bg-surface)]
                transition-colors
                duration-200
                hover:border-gold/20
              "
            >
              {/* Card Main */}
              <div className="flex gap-3 p-3">
                {/* Image */}
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--bg-base)]">
                  {row.image ? (
                    <img
                      src={row.image}
                      alt={row.title || row.name || ""}
                      className="h-24 w-24 rounded-xl object-contain bg-[var(--bg-elevated)]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-muted">
                      No Image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1 py-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="truncate text-sm font-medium text-offwhite">
                      {row.title || "Untitled"}
                    </h3>

                    {row.featured && (
                      <Star
                        size={15}
                        className="shrink-0 text-gold"
                        fill="currentColor"
                      />
                    )}
                  </div>

                  <p className="mt-1 truncate text-xs text-muted">
                    {row.category || "Uncategorized"}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <span
                      className="
                        rounded-full
                        border
                        border-[var(--border-subtle)]
                        px-2.5
                        py-1
                        text-[9px]
                        uppercase
                        tracking-wider2
                        text-muted
                      "
                    >
                      Order {row.order ?? 0}
                    </span>

                    {row.featured && (
                      <span
                        className="
                          rounded-full
                          border
                          border-gold/20
                          bg-gold/5
                          px-2.5
                          py-1
                          text-[9px]
                          uppercase
                          tracking-wider2
                          text-gold
                        "
                      >
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                  border-t
                  border-[var(--border-subtle)]
                  p-2.5
                "
              >
                <button
                  type="button"
                  onClick={() => openEdit(row)}
                  className="
                    flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-[var(--border-subtle)]
                    px-3
                    py-2
                    text-xs
                    text-[var(--text-secondary)]
                    transition-colors
                    hover:border-gold/40
                    hover:text-gold
                  "
                >
                  <Pencil size={14} />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => setDeleting(row)}
                  className="
                    flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-[var(--border-subtle)]
                    px-3
                    py-2
                    text-xs
                    text-[var(--text-secondary)]
                    transition-colors
                    hover:border-red-400/30
                    hover:text-red-400
                  "
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= FORM MODAL ================= */}
      {formOpen && (
        <div
          className="
            fixed
            inset-0
            z-[70]
            flex
            items-end
            justify-center
            bg-black/70
            p-0
            sm:items-center
            sm:p-6
          "
        >
          <form
            onSubmit={handleSubmit}
            className="
    relative
    max-h-[94svh]
    w-full
    overflow-y-auto
    rounded-t-2xl
    border
    border-[var(--border-subtle)]
    bg-[var(--bg-elevated)]
    p-4
    sm:max-h-[90vh]
    sm:max-w-lg
    sm:rounded-2xl
    sm:p-6
  "
          >
            {/* Floating Close Button */}
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              aria-label="Close"
              className="
      absolute
      right-4
      top-4
      z-10
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-full
      border
      border-[var(--border-subtle)]
      bg-[var(--bg-surface)]
      text-muted
      transition
      hover:border-gold
      hover:text-gold
      sm:right-5
      sm:top-5
    "
            >
              <span className="text-xl leading-none">×</span>
            </button>

            <h2 className="font-display text-xl text-offwhite pr-12">
              {editing ? "Edit Image" : "Add Image"}
            </h2>
            
            <div className="mt-5 flex flex-col gap-4">
              <ImageUploader
                value={
                  typeof form.image === "object"
                    ? form.image
                    : { url: form.image }
                }
                onUploaded={(img) =>
                  setForm((f) => ({
                    ...f,
                    image: img,
                  }))
                }
              />

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider2 text-muted">
                  Title
                </label>

                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      title: e.target.value,
                    }))
                  }
                  className="
                    w-full
                    rounded-lg
                    border
                    border-[var(--border-subtle)]
                    bg-transparent
                    px-4
                    py-3
                    text-sm
                    text-offwhite
                    outline-none
                    focus:border-gold
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider2 text-muted">
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      category: e.target.value,
                    }))
                  }
                  className="
                    w-full
                    rounded-lg
                    border
                    border-[var(--border-subtle)]
                    bg-[var(--bg-surface)]
                    px-4
                    py-3
                    text-sm
                    text-offwhite
                    outline-none
                    focus:border-gold
                  "
                >
                  {CATEGORY_CHOICES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="mb-2 block text-xs uppercase tracking-wider2 text-muted">
                    Order
                  </label>

                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        order: e.target.value,
                      }))
                    }
                    className="
                      w-full
                      rounded-lg
                      border
                      border-[var(--border-subtle)]
                      bg-transparent
                      px-4
                      py-3
                      text-sm
                      text-offwhite
                      outline-none
                      focus:border-gold
                    "
                  />
                </div>

                <label className="flex items-center gap-2 pt-6 text-sm text-offwhite">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        featured: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 accent-[#d4af37]"
                  />

                  Featured
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-6 flex gap-2 sm:justify-end sm:gap-3">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="
                  flex-1
                  rounded-full
                  border
                  border-[var(--border-subtle)]
                  px-5
                  py-3
                  text-xs
                  uppercase
                  tracking-wider2
                  text-muted
                  sm:flex-none
                  sm:py-2.5
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
                  flex-1
                  rounded-full
                  bg-gold
                  px-5
                  py-3
                  text-xs
                  uppercase
                  tracking-wider2
                  text-obsidian
                  sm:flex-none
                  sm:py-2.5
                "
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= DELETE CONFIRM ================= */}
      <ConfirmDialog
        open={!!deleting}
        title="Delete image?"
        message={`This will permanently remove "${deleting?.title}".`}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}