import { Star } from "lucide-react";

export default function ReviewCard({ review, isFallback }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6">
      <div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < review.rating ? "fill-gold text-gold" : "text-[var(--border-subtle)]"}
            />
          ))}
        </div>
        <p className="mt-4 text-sm text-[var(--text-primary)]">“{review.text}”</p>
      </div>
      <div className="mt-6">
        <p className="text-sm font-medium text-[var(--text-primary)]">{review.name}</p>
        <p className="text-xs uppercase tracking-wider2 text-gold">{review.eventType}</p>
        {isFallback && (
          <p className="mt-1 text-[10px] uppercase tracking-wider2 text-[var(--text-secondary)]">
            Demo review
          </p>
        )}
      </div>
    </div>
  );
}
