// Centralized WhatsApp utility.
// Every WhatsApp interaction in the app should go through this file —
// never build a wa.me URL or message string directly inside a component.

import { WHATSAPP_NUMBER } from "../data/config";

// Allows SiteSettingsContext to override the number at runtime once the
// real value is loaded from the backend, without every call site needing
// to know about site settings.
let activeNumber = WHATSAPP_NUMBER;

export function setWhatsAppNumber(number) {
  if (number && typeof number === "string" && number.trim()) {
    activeNumber = number.trim();
  }
}

function buildWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${activeNumber}?text=${encoded}`;
}

function openWhatsApp(message) {
  const url = buildWhatsAppUrl(message);
  window.open(url, "_blank", "noopener,noreferrer");
}

/** General "enquire" CTA — hero, final CTA section. */
export function openGeneralEnquiry() {
  const message = [
    "Hi Ashmir Mocktails,",
    "",
    "I would like to enquire about your mocktail and event services.",
    "Please share the available services and booking details.",
    "",
    "Thank you.",
  ].join("\n");
  openWhatsApp(message);
}

/** Enquiry about a single menu/product item. */
export function openProductEnquiry(productName) {
  const message = [
    "Hi Ashmir Mocktails,",
    "",
    "I am interested in:",
    productName,
    "",
    "Please share more details.",
  ].join("\n");
  openWhatsApp(message);
}

/** Enquiry about a single service (e.g. Hookah Service). */
export function openServiceEnquiry(serviceName) {
  const message = [
    "Hi Ashmir Mocktails,",
    "",
    "I would like to know more about:",
    serviceName,
    "",
    "Please share availability and details.",
  ].join("\n");
  openWhatsApp(message);
}

/**
 * Structured booking message built from the BookingForm fields.
 * Does NOT submit anywhere — only opens WhatsApp with the message pre-filled;
 * the user must press Send manually. Booking data is never persisted.
 */
export function openBookingEnquiry({
  fullName,
  whatsappNumber,
  eventType,
  eventDate,
  numberOfPersons,
  venue,
  servicesRequired = [],
  additionalRequirements,
}) {
  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const servicesBlock = servicesRequired.length
    ? servicesRequired.map((s) => `• ${s}`).join("\n")
    : "• (not specified)";

  const lines = [
    "Hello Ashmir Mocktails",
    "",
    "I would like to enquire about booking your services.",
    "",
    "━━━━━━━━━━━━━━━━",
    "BOOKING DETAILS",
    "━━━━━━━━━━━━━━━━",
    "",
    `Name: ${fullName || "-"}`,
    `WhatsApp: ${whatsappNumber || "-"}`,
    "",
    `Event Type: ${eventType || "-"}`,
    `Event Date: ${formattedDate || "-"}`,
    `Number of Persons: ${numberOfPersons || "-"}`,
    "",
    `Venue: ${venue || "-"}`,
    "",
    "Services Required:",
    servicesBlock,
  ];

  if (additionalRequirements && additionalRequirements.trim()) {
    lines.push("", "Additional Requirements:", additionalRequirements.trim());
  }

  lines.push("", "Please share availability and pricing.", "", "Thank you!");

  openWhatsApp(lines.join("\n"));
}
