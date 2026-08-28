import { Pencil, Trash2 } from "lucide-react";

/**
 * columns: [{ key, label, render?(row) }]
 */
export default function DataTable({ columns, rows, onEdit, onDelete, loading, emptyLabel }) {
  if (loading) {
    return (
      <div className="rounded-xl border border-[var(--border-subtle)] p-10 text-center text-sm text-[var(--text-secondary)]">
        Loading...
      </div>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--border-subtle)] p-10 text-center text-sm text-[var(--text-secondary)]">
        {emptyLabel || "Nothing here yet."}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-xs uppercase tracking-wider2 text-[var(--text-secondary)]">
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 text-right text-xs uppercase tracking-wider2 text-[var(--text-secondary)]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id || row.id} className="border-b border-[var(--border-subtle)] last:border-0">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-[var(--text-primary)]">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(row)}
                    aria-label="Edit"
                    className="rounded-md p-1.5 text-[var(--text-secondary)] transition-colors hover:bg-white/5 hover:text-gold"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(row)}
                    aria-label="Delete"
                    className="rounded-md p-1.5 text-[var(--text-secondary)] transition-colors hover:bg-white/5 hover:text-red-400"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
