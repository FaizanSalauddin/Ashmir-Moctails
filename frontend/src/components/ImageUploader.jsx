import { useRef, useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import api from "../services/api";

/**
 * Uploads a file to the backend's /api/uploads endpoint, which streams it to
 * Cloudinary and returns { url, public_id }. Calls onUploaded with that result.
 */
export default function ImageUploader({ value, onUploaded, label = "Image" }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await api.post("/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUploaded(data);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wider2 text-[var(--text-secondary)]">
        {label}
      </label>
      <div
        className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-colors hover:border-gold"
        onClick={() => inputRef.current?.click()}
      >
        {value?.url ? (
          <img src={value.url} alt="" className="h-full w-full rounded-lg object-cover" />
        ) : uploading ? (
          <Loader2 size={22} className="animate-spin text-gold" />
        ) : (
          <>
            <UploadCloud size={22} className="text-[var(--text-secondary)]" />
            <span className="text-xs text-[var(--text-secondary)]">Click to upload</span>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
