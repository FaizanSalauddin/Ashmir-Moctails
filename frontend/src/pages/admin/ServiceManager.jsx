import { useEffect, useState } from "react";
import { servicesApi } from "../../services/resources";
import DataTable from "../../components/DataTable";
import ConfirmDialog from "../../components/ConfirmDialog";
import ImageUploader from "../../components/ImageUploader";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const emptyForm = { title: "", description: "", image: null, order: 0, enabled: true };

export default function ServiceManager() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleting, setDeleting] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await servicesApi.list();
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
      title: form.title,
      description: form.description,
      image: form.image?.url || form.image,
      imagePublicId: form.image?.public_id,
      order: Number(form.order) || 0,
      enabled: form.enabled,
    };
    if (editing) {
      await servicesApi.update(editing._id, payload);
    } else {
      await servicesApi.create(payload);
    }
    setFormOpen(false);
    load();
  };

  const handleDelete = async () => {
    if (!deleting) return;
    await servicesApi.remove(deleting._id);
    setDeleting(null);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-offwhite">Services</h1>
          <p className="mt-1 text-sm text-muted">Manage the service counters shown on the site.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs uppercase tracking-wider2 text-obsidian"
        >
          <Plus size={14} /> Add Service
        </button>
      </div>

      <div className="mt-6">
        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block">
          <DataTable
            loading={loading}
            rows={rows}
            onEdit={openEdit}
            onDelete={setDeleting}
            emptyLabel="No services yet — add your first one."
            columns={[
              {
                key: "image",
                label: "Image",
                render: (row) =>
                  row.image ? (
                    <img
                      src={row.image}
                      alt={row.title || "Service"}
                      className="h-10 w-14 rounded object-cover"
                    />
                  ) : (
                    <span className="text-muted">—</span>
                  ),
              },
              { key: "title", label: "Title" },
              { key: "order", label: "Order" },
              {
                key: "enabled",
                label: "Status",
                render: (row) => (
                  <span
                    className={
                      row.enabled !== false ? "text-gold" : "text-muted"
                    }
                  >
                    {row.enabled !== false ? "Enabled" : "Disabled"}
                  </span>
                ),
              },
            ]}
          />
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="space-y-3 md:hidden">
          {loading ? (
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-center text-sm text-muted">
              Loading services...
            </div>
          ) : rows.length === 0 ? (
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-center text-sm text-muted">
              No services yet — add your first one.
            </div>
          ) : (
            rows.map((row) => (
              <div
                key={row._id}
                className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
              >
                {/* ================= CARD CONTENT ================= */}
                <div className="flex gap-3 p-3 sm:gap-4 sm:p-4">
                  {/* Image */}
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-black sm:h-28 sm:w-28">
                    {row.image ? (
                      <img
                        src={row.image}
                        alt={row.title || "Service"}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-center text-[10px] text-muted">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-offwhite sm:text-base">
                      {row.title || "Untitled Service"}
                    </h3>

                    {row.description && (
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">
                        {row.description}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-[var(--border-subtle)] px-3 py-1 text-[10px] uppercase tracking-wider2 text-muted">
                        Order {row.order ?? 0}
                      </span>

                      <span
                        className={`text-[10px] uppercase tracking-wider2 ${row.enabled !== false
                          ? "text-gold"
                          : "text-muted"
                          }`}
                      >
                        {row.enabled !== false ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ================= ACTION BUTTONS ================= */}
                <div className="grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] p-3">
                  <button
                    type="button"
                    onClick={() => openEdit(row)}
                    className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] transition-all duration-200 hover:border-gold/40 hover:bg-gold/5 hover:text-gold"
                  >
                    <Pencil size={15} strokeWidth={1.75} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleting(row)}
                    className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] transition-all duration-200 hover:border-red-400/30 hover:bg-red-400/5 hover:text-red-400"
                  >
                    <Trash2 size={15} strokeWidth={1.75} />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-6">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg overflow-y-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 max-h-[90vh]"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-offwhite">
                {editing ? "Edit Service" : "Add Service"}
              </h2>

              <button
                type="button"
                onClick={() => setFormOpen(false)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] text-muted transition-colors hover:border-gold hover:text-gold"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <ImageUploader
                value={typeof form.image === "object" ? form.image : { url: form.image }}
                onUploaded={(img) => setForm((f) => ({ ...f, image: img }))}
              />
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider2 text-muted">Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full rounded-lg border border-[var(--border-subtle)] bg-transparent px-4 py-2.5 text-sm text-offwhite outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider2 text-muted">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full rounded-lg border border-[var(--border-subtle)] bg-transparent px-4 py-2.5 text-sm text-offwhite outline-none focus:border-gold"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="mb-2 block text-xs uppercase tracking-wider2 text-muted">Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border-subtle)] bg-transparent px-4 py-2.5 text-sm text-offwhite outline-none focus:border-gold"
                  />
                </div>
                <label className="flex items-center gap-2 pt-6 text-sm text-offwhite">
                  <input
                    type="checkbox"
                    checked={form.enabled}
                    onChange={(e) => setForm((f) => ({ ...f, enabled: e.target.checked }))}
                  />
                  Enabled
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="rounded-full border border-[var(--border-subtle)] px-5 py-2.5 text-xs uppercase tracking-wider2 text-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-gold px-5 py-2.5 text-xs uppercase tracking-wider2 text-obsidian"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      <ConfirmDialog
        open={!!deleting}
        title="Delete service?"
        message={`This will permanently remove "${deleting?.title}".`}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
