import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  X,
  Pencil,
  Trash2,
  Star
} from "lucide-react";
import { productsApi } from "../../services/resources";
import { MENU_CATEGORIES } from "../../data/menu";
import DataTable from "../../components/DataTable";
import ConfirmDialog from "../../components/ConfirmDialog";
import ImageUploader from "../../components/ImageUploader";

const CATEGORY_CHOICES = MENU_CATEGORIES.filter((c) => c !== "All");

const emptyForm = {
  name: "",
  category: CATEGORY_CHOICES[0],
  description: "",
  image: null,
  order: 0,
  enabled: true,
};

export default function ProductManager() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleting, setDeleting] = useState(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);

    try {
      const { data } = await productsApi.list();
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
      name: row.name || "",
      category: row.category || CATEGORY_CHOICES[0],
      description: row.description || "",
      image: row.image || null,
      order: row.order || 0,
      enabled: row.enabled !== false,
    });

    setFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      category: form.category,
      description: form.description,
      image: form.image?.url || form.image,
      imagePublicId: form.image?.public_id,
      order: Number(form.order) || 0,
      enabled: form.enabled,
    };

    if (editing) {
      await productsApi.update(editing._id, payload);
    } else {
      await productsApi.create(payload);
    }

    setFormOpen(false);
    load();
  };

  const handleDelete = async () => {
    if (!deleting) return;

    await productsApi.remove(deleting._id);

    setDeleting(null);
    load();
  };

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return rows;

    return rows.filter((row) => {
      return (
        row.name?.toLowerCase().includes(query) ||
        row.category?.toLowerCase().includes(query) ||
        row.description?.toLowerCase().includes(query)
      );
    });
  }, [rows, search]);

  return (
    <div className="w-full min-w-0">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="font-display text-2xl text-offwhite sm:text-3xl">
            Menu
          </h1>

          <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted sm:text-sm">
            Manage mocktails, shakes, smoothies and blossom items.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {/* SEARCH BUTTON */}
          <button
            type="button"
            onClick={() => {
              setSearchOpen((prev) => !prev);

              if (searchOpen) {
                setSearch("");
              }
            }}
            aria-label="Search menu"
            className={`
              flex h-10 w-10 items-center justify-center
              rounded-full border
              transition-all duration-300
              ${searchOpen
                ? "border-gold bg-gold/10 text-gold"
                : "border-[var(--border-subtle)] text-muted hover:border-gold/50 hover:text-gold"
              }
            `}
          >
            {searchOpen ? (
              <X size={16} strokeWidth={1.7} />
            ) : (
              <Search size={16} strokeWidth={1.7} />
            )}
          </button>

          {/* ADD BUTTON */}
          <button
            type="button"
            onClick={openCreate}
            className="
              flex items-center gap-1.5
              rounded-full
              bg-gold
              px-4 py-2.5
              text-[10px]
              uppercase
              tracking-wider2
              text-obsidian
              transition-transform
              duration-200
              hover:scale-[1.03]
              sm:px-5
              sm:text-xs
            "
          >
            <Plus size={14} />
            <span>Add</span>
            <span className="hidden sm:inline">Item</span>
          </button>
        </div>
      </div>

      {/* SEARCH FIELD */}
      {searchOpen && (
        <div className="mt-4">
          <div className="relative">
            <Search
              size={15}
              strokeWidth={1.7}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              autoFocus
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search menu items..."
              className="
                w-full
                rounded-full
                border
                border-[var(--border-subtle)]
                bg-[var(--bg-surface)]
                py-3
                pl-11
                pr-10
                text-sm
                text-offwhite
                outline-none
                transition-colors
                placeholder:text-muted
                focus:border-gold/60
              "
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="
                  absolute
                  right-3
                  top-1/2
                  flex
                  h-7
                  w-7
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  text-muted
                  hover:bg-white/5
                  hover:text-offwhite
                "
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* DESKTOP TABLE */}
      <div className="mt-6 hidden md:block">
        <DataTable
          loading={loading}
          rows={filteredRows}
          onEdit={openEdit}
          onDelete={setDeleting}
          emptyLabel={
            search
              ? "No menu items match your search."
              : "No menu items yet — add your first one."
          }
          columns={[
            {
              key: "image",
              label: "Image",
              render: (row) =>
                row.image ? (
                  <img
                    src={row.image}
                    alt=""
                    className="h-10 w-10 rounded object-cover"
                  />
                ) : (
                  <span className="text-muted">—</span>
                ),
            },

            {
              key: "name",
              label: "Name",
            },

            {
              key: "category",
              label: "Category",
            },

            {
              key: "enabled",
              label: "Status",
              render: (row) => (
                <span
                  className={
                    row.enabled !== false
                      ? "text-gold"
                      : "text-muted"
                  }
                >
                  {row.enabled !== false ? "Enabled" : "Disabled"}
                </span>
              ),
            },
          ]}
        />
      </div>

      <div className="mt-6">
        {/* ================= MOBILE CARDS ================= */}
        <div className="flex flex-col gap-3 md:hidden">
          {loading ? (
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-center text-sm text-muted">
              Loading gallery...
            </div>
          ) : rows.length === 0 ? (
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-center text-sm text-muted">
              No gallery images yet — upload your first one.
            </div>
          ) : (
            rows.map((row) => (
              <div
                key={row._id}
                className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
              >
                {/* Card Content */}
                <div className="flex gap-3 p-3">
                  {/* Image */}
                  <div className="shrink-0">
                    {row.image ? (
                      <img
                        src={row.image}
                        alt={row.title || row.name || ""}
                        className="h-24 w-24 rounded-xl object-contain bg-[var(--bg-elevated)]"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-[var(--bg-elevated)] text-xs text-muted">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="break-words text-sm font-semibold leading-5 text-offwhite">
                          {row.title || row.name || "Untitled Image"}
                        </h3>

                        <p className="mt-1 text-xs text-muted">
                          {row.category}
                        </p>
                      </div>

                      {row.featured && (
                        <Star
                          size={17}
                          fill="currentColor"
                          className="shrink-0 text-gold"
                        />
                      )}
                    </div>

                    {/* Badges */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-[var(--border-subtle)] px-3 py-1 text-[9px] uppercase tracking-wider2 text-muted">
                        Order {row.order ?? 0}
                      </span>

                      {row.featured && (
                        <span className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[9px] uppercase tracking-wider2 text-gold">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Edit / Delete */}
                <div className="border-t border-[var(--border-subtle)] p-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(row)}
                      className="flex h-9 items-center justify-center gap-2 rounded-lg border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] transition-colors hover:border-gold/30 hover:bg-gold/5 hover:text-gold"
                    >
                      <Pencil size={14} strokeWidth={1.75} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleting(row)}
                      className="flex h-9 items-center justify-center gap-2 rounded-lg border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] transition-colors hover:border-red-400/30 hover:bg-red-400/5 hover:text-red-400"
                    >
                      <Trash2 size={14} strokeWidth={1.75} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block">
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
              { key: "title", label: "Title" },
              { key: "category", label: "Category" },
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
      </div>

      {/* FORM MODAL */}
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
              max-h-[94vh]
              w-full
              overflow-y-auto
              rounded-t-3xl
              border
              border-[var(--border-subtle)]
              bg-[var(--bg-elevated)]
              p-5
              shadow-2xl
              sm:max-w-lg
              sm:rounded-2xl
              sm:p-6
            "
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-offwhite">
                {editing ? "Edit Menu Item" : "Add Menu Item"}
              </h2>

              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[var(--border-subtle)]
                  text-muted
                  hover:text-offwhite
                "
              >
                <X size={15} />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-4">
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
                  Name
                </label>

                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      name: e.target.value,
                    }))
                  }
                  className="
                    w-full
                    rounded-xl
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
                    rounded-xl
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

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider2 text-muted">
                  Description
                </label>

                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      description: e.target.value,
                    }))
                  }
                  className="
                    w-full
                    resize-none
                    rounded-xl
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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
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
                      rounded-xl
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

                <label className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] px-4 py-3 text-sm text-offwhite">
                  <input
                    type="checkbox"
                    checked={form.enabled}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        enabled: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 accent-[var(--gold)]"
                  />

                  <span>Enabled</span>
                </label>
              </div>
            </div>

            {/* FORM ACTIONS */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="
                  rounded-full
                  border
                  border-[var(--border-subtle)]
                  px-5
                  py-3
                  text-xs
                  uppercase
                  tracking-wider2
                  text-muted
                  transition-colors
                  hover:text-offwhite
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
                  rounded-full
                  bg-gold
                  px-5
                  py-3
                  text-xs
                  uppercase
                  tracking-wider2
                  text-obsidian
                  transition-transform
                  hover:scale-[1.02]
                "
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE CONFIRM */}
      <ConfirmDialog
        open={!!deleting}
        title="Delete menu item?"
        message={`This will permanently remove "${deleting?.name}".`}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}