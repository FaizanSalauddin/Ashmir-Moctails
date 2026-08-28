export default function ConfirmDialog({
  open,
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 shadow-2xl">

        {/* Title */}
        <h2 className="font-display text-xl text-offwhite">
          {title}
        </h2>

        {/* Message */}
        <p className="mt-3 text-sm leading-6 text-muted">
          {message}
        </p>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">

          {/* Cancel */}
          <button
            type="button"
            onClick={onCancel}
            className="
              rounded-lg
              border
              border-[var(--border-subtle)]
              bg-white/[0.02]
              px-4
              py-2.5
              text-xs
              font-medium
              uppercase
              tracking-[0.12em]
              text-muted
              transition-all
              duration-200
              hover:border-white/20
              hover:bg-white/[0.05]
              hover:text-offwhite
            "
          >
            {cancelText}
          </button>

          {/* Confirm */}
          <button
            type="button"
            onClick={onConfirm}
            className="
              rounded-lg
              bg-red-500
              px-4
              py-2.5
              text-xs
              font-medium
              uppercase
              tracking-[0.12em]
              text-white
              transition-all
              duration-200
              hover:bg-red-600
              active:scale-[0.98]
            "
          >
            {confirmText}
          </button>

        </div>
      </div>
    </div>
  );
}