import { MessageCircle } from "lucide-react";
import { openGeneralEnquiry } from "../utils/whatsappService";

export default function WhatsAppButton({ variant = "floating" }) {
  if (variant === "floating") {
    return (
      <button
        type="button"
        onClick={openGeneralEnquiry}
        aria-label="Enquire on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-obsidian shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
      >
        <MessageCircle size={24} strokeWidth={1.75} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openGeneralEnquiry}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-gold px-6 py-3 text-xs uppercase tracking-wider2 text-gold transition-colors duration-300 hover:bg-gold hover:text-obsidian focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <MessageCircle size={16} strokeWidth={1.75} />
      Enquire on WhatsApp
    </button>
  );
}
