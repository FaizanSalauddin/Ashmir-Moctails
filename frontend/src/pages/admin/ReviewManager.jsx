import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  X,
} from "lucide-react";

import { reviewsApi } from "../../services/resources";
import { EVENT_TYPES } from "../../data/config";
import DataTable from "../../components/DataTable";
import ConfirmDialog from "../../components/ConfirmDialog";

const emptyForm = {
  name: "",
  eventType: EVENT_TYPES[0],
  rating: 5,
  text: "",
  published: true,
};

export default function ReviewManager() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleting, setDeleting] = useState(null);

  const load = async () => {
    setLoading(true);

    try {
      const { data } = await reviewsApi.list();
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
      name: row?.name || "",
      eventType: row?.eventType || EVENT_TYPES[0],
      rating: row?.rating || 5,
      text: row?.text || "",
      published: row?.published !== false,
    });

    setFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      rating: Number(form.rating),
    };

    if (editing) {
      await reviewsApi.update(editing._id, payload);
    } else {
      await reviewsApi.create(payload);
    }

    setFormOpen(false);
    setEditing(null);
    load();
  };

  const handleDelete = async () => {
    if (!deleting) return;

    await reviewsApi.remove(deleting._id);

    setDeleting(null);
    load();
  };

  const renderStars = (rating) => {
    const value = Number(rating) || 0;

    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={
              star <= value
                ? "fill-gold text-gold"
                : "text-[var(--border-subtle)]"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-offwhite">
            Reviews
          </h1>

          <p className="mt-1 text-sm text-muted">
            Manage client testimonials shown on the site.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="
            flex
            w-full
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
            transition
            hover:opacity-90
            sm:w-auto
            sm:py-2.5
          "
        >
          <Plus size={14} />
          Add Review
        </button>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="mt-6 hidden md:block">
        <DataTable
          loading={loading}
          rows={rows}
          onEdit={openEdit}
          onDelete={setDeleting}
          emptyLabel="No reviews yet — add your first one."
          columns={[
            {
              key: "name",
              label: "Name",
            },
            {
              key: "eventType",
              label: "Event Type",
            },
            {
              key: "rating",
              label: "Rating",
              render: (row) => (
                <div className="flex items-center gap-2">
                  {renderStars(row.rating)}

                  <span className="text-sm text-muted">
                    {row.rating}/5
                  </span>
                </div>
              ),
            },
            {
              key: "published",
              label: "Status",
              render: (row) => (
                <span
                  className={
                    row.published !== false
                      ? "text-gold"
                      : "text-muted"
                  }
                >
                  {row.published !== false
                    ? "Published"
                    : "Unpublished"}
                </span>
              ),
            },
          ]}
        />
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="mt-5 block md:hidden">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  animate-pulse
                  rounded-2xl
                  border
                  border-[var(--border-subtle)]
                  bg-[var(--bg-elevated)]
                  p-4
                "
              >
                <div className="h-4 w-40 rounded bg-[var(--border-subtle)]" />

                <div className="mt-3 h-3 w-24 rounded bg-[var(--border-subtle)]" />

                <div className="mt-4 h-12 w-full rounded bg-[var(--border-subtle)]" />
              </div>
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div
            className="
              rounded-2xl
              border
              border-[var(--border-subtle)]
              bg-[var(--bg-elevated)]
              px-5
              py-10
              text-center
            "
          >
            <p className="text-sm text-muted">
              No reviews yet — add your first one.
            </p>

            <button
              type="button"
              onClick={openCreate}
              className="
                mt-4
                rounded-full
                bg-gold
                px-5
                py-2.5
                text-xs
                uppercase
                tracking-wider2
                text-obsidian
              "
            >
              Add Review
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {rows.map((row) => (
              <div
                key={row._id}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[var(--border-subtle)]
                  bg-[var(--bg-elevated)]
                  transition
                  duration-300
                "
              >
                {/* CARD CONTENT */}
                <div className="p-4">
                  {/* NAME + RATING */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3
                        className="
                          truncate
                          text-base
                          font-semibold
                          text-offwhite
                        "
                      >
                        {row.name || "Anonymous"}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span
                          className="
                            rounded-full
                            border
                            border-[var(--border-subtle)]
                            px-2.5
                            py-1
                            text-[10px]
                            uppercase
                            tracking-wider2
                            text-muted
                          "
                        >
                          {row.eventType || "Event"}
                        </span>

                        <span
                          className={
                            row.published !== false
                              ? `
                                rounded-full
                                border
                                border-gold/30
                                bg-gold/5
                                px-2.5
                                py-1
                                text-[10px]
                                uppercase
                                tracking-wider2
                                text-gold
                              `
                              : `
                                rounded-full
                                border
                                border-[var(--border-subtle)]
                                px-2.5
                                py-1
                                text-[10px]
                                uppercase
                                tracking-wider2
                                text-muted
                              `
                          }
                        >
                          {row.published !== false
                            ? "Published"
                            : "Unpublished"}
                        </span>
                      </div>
                    </div>

                    {/* RATING */}
                    <div
                      className="
                        flex
                        shrink-0
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-gold/20
                        bg-gold/5
                        px-2.5
                        py-1.5
                      "
                    >
                      <Star
                        size={14}
                        className="fill-gold text-gold"
                      />

                      <span className="text-sm font-medium text-gold">
                        {row.rating || 0}
                      </span>
                    </div>
                  </div>

                  {/* REVIEW TEXT */}
                  <div
                    className="
                      mt-4
                      rounded-xl
                      border
                      border-[var(--border-subtle)]
                      bg-[var(--bg-surface)]
                      p-3.5
                    "
                  >
                    <div className="mb-2">
                      {renderStars(row.rating)}
                    </div>

                    <p
                      className="
                        text-sm
                        leading-6
                        text-[var(--text-secondary)]
                      "
                    >
                      "{row.text || "No review text available."}"
                    </p>
                  </div>
                </div>

                {/* ================= ACTION BUTTONS ================= */}
                <div
                  className="
                    grid
                    grid-cols-2
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
                      h-11
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      border
                      border-[var(--border-subtle)]
                      text-sm
                      text-[var(--text-secondary)]
                      transition
                      hover:border-gold
                      hover:text-gold
                    "
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleting(row)}
                    className="
                      flex
                      h-11
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      border
                      border-[var(--border-subtle)]
                      text-sm
                      text-[var(--text-secondary)]
                      transition
                      hover:border-red-400
                      hover:text-red-400
                    "
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= ADD / EDIT MODAL ================= */}
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
            {/* FLOATING CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              aria-label="Close"
              className="
                absolute
                right-4
                top-4
                z-20
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
              <X size={17} />
            </button>

            {/* MODAL TITLE */}
            <h2 className="pr-12 font-display text-xl text-offwhite">
              {editing ? "Edit Review" : "Add Review"}
            </h2>

            <div className="mt-5 flex flex-col gap-4">
              {/* CUSTOMER NAME */}
              <div>
                <label
                  className="
                    mb-2
                    block
                    text-xs
                    uppercase
                    tracking-wider2
                    text-muted
                  "
                >
                  Customer Name
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

              {/* EVENT TYPE */}
              <div>
                <label
                  className="
                    mb-2
                    block
                    text-xs
                    uppercase
                    tracking-wider2
                    text-muted
                  "
                >
                  Event Type
                </label>

                <select
                  value={form.eventType}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      eventType: e.target.value,
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
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* RATING */}
              <div>
                <label
                  className="
                    mb-2
                    block
                    text-xs
                    uppercase
                    tracking-wider2
                    text-muted
                  "
                >
                  Rating
                </label>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={form.rating}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        rating: e.target.value,
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

                  <div className="flex shrink-0 items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={17}
                        className={
                          star <= Number(form.rating)
                            ? "fill-gold text-gold"
                            : "text-[var(--border-subtle)]"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* REVIEW TEXT */}
              <div>
                <label
                  className="
                    mb-2
                    block
                    text-xs
                    uppercase
                    tracking-wider2
                    text-muted
                  "
                >
                  Review Text
                </label>

                <textarea
                  required
                  rows={4}
                  value={form.text}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      text: e.target.value,
                    }))
                  }
                  className="
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-[var(--border-subtle)]
                    bg-transparent
                    px-4
                    py-3
                    text-sm
                    leading-6
                    text-offwhite
                    outline-none
                    focus:border-gold
                  "
                />
              </div>

              {/* PUBLISHED */}
              <label
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-3
                  rounded-lg
                  border
                  border-[var(--border-subtle)]
                  px-4
                  py-3
                  text-sm
                  text-offwhite
                "
              >
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      published: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-[#d4af37]"
                />

                <span>Published</span>
              </label>
            </div>

            {/* FORM ACTIONS */}
            <div
              className="
                mt-6
                grid
                grid-cols-2
                gap-2
                sm:flex
                sm:justify-end
                sm:gap-3
              "
            >
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
                  transition
                  hover:border-gold
                  hover:text-gold
                  sm:py-2.5
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
                  transition
                  hover:opacity-90
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
        title="Delete review?"
        message={`This will permanently remove the review from "${deleting?.name}".`}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}