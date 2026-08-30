import { useState } from "react";
import { Check } from "lucide-react";
import { EVENT_TYPES, SERVICE_OPTIONS } from "../data/config";
import { openBookingEnquiry } from "../utils/whatsappService";

const initialState = {
  fullName: "",
  whatsappNumber: "",
  eventDate: "",
  eventType: "",
  numberOfPersons: "",
  venue: "",
  servicesRequired: [],
  additionalRequirements: "",
};

function validate(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your name.";
  }

  if (!values.whatsappNumber.trim()) {
    errors.whatsappNumber = "Please enter a WhatsApp number.";
  } else {
    const phone = values.whatsappNumber.trim().replace(/[\s-]/g, "");
    const phoneRegex = /^(?:\+91)?[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      errors.whatsappNumber =
        "Please enter a valid 10-digit Indian mobile number.";
    }
  }

  if (!values.eventDate) {
    errors.eventDate = "Please select an event date.";
  } else {
    const today = new Date();
    const selectedDate = new Date(values.eventDate + "T00:00:00");

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.eventDate = "Event date cannot be in the past.";
    }
  }

  if (!values.eventType) {
    errors.eventType = "Please select an event type.";
  }

  if (!values.venue.trim()) {
    errors.venue = "Please enter a venue or location.";
  }

  return errors;
}

export default function BookingForm({ onSuccess }) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];

  const update = (field, value) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const toggleService = (service) => {
    setValues((v) => {
      const has = v.servicesRequired.includes(service);
      return {
        ...v,
        servicesRequired: has
          ? v.servicesRequired.filter((s) => s !== service)
          : [...v.servicesRequired, service],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    openBookingEnquiry(values);
    onSuccess?.();
  };

  const inputClass =
    "w-full rounded-lg border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-colors duration-300 placeholder:text-[var(--text-secondary)] focus:border-gold";
  const labelClass = "mb-2 block text-xs uppercase tracking-wider2 text-[var(--text-secondary)]";
  const errorClass = "mt-1 text-xs text-red-400";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      {/* 01 — YOUR DETAILS */}
      <fieldset>
        <legend className="mb-4 text-xs uppercase tracking-wider3 text-gold">
          01 — Your Details
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              className={inputClass}
              placeholder="Your name"
              value={values.fullName}
              onChange={(e) => update("fullName", e.target.value)}
            />
            {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
          </div>
          <div>
            <label className={labelClass} htmlFor="whatsappNumber">WhatsApp Number</label>
            <input
              id="whatsappNumber"
              type="tel"
              className={inputClass}
              placeholder="+91 XXXXXXXXXX"
              value={values.whatsappNumber}
              onChange={(e) => update("whatsappNumber", e.target.value)}
            />
            {errors.whatsappNumber && <p className={errorClass}>{errors.whatsappNumber}</p>}
          </div>
        </div>
      </fieldset>

      {/* 02 — EVENT DETAILS */}
      <fieldset>
        <legend className="mb-4 text-xs uppercase tracking-wider3 text-gold">
          02 — Event Details
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="eventDate">Event Date</label>
            <input
              id="eventDate"
              type="date"
              min={today}
              className={inputClass}
              value={values.eventDate}
              onChange={(e) => update("eventDate", e.target.value)}
            />
            {errors.eventDate && <p className={errorClass}>{errors.eventDate}</p>}
          </div>
          <div>
            <label className={labelClass} htmlFor="eventType">Event Type</label>
            <select
              id="eventType"
              className={inputClass}
              value={values.eventType}
              onChange={(e) => update("eventType", e.target.value)}
            >
              <option value="">Select event type</option>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.eventType && <p className={errorClass}>{errors.eventType}</p>}
          </div>
          <div>
            <label className={labelClass} htmlFor="numberOfPersons">Number of Persons</label>
            <input
              id="numberOfPersons"
              type="number"
              min="1"
              className={inputClass}
              placeholder="e.g. 150"
              value={values.numberOfPersons}
              onChange={(e) => update("numberOfPersons", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="venue">Venue / Location</label>
            <input
              id="venue"
              type="text"
              className={inputClass}
              placeholder="City / venue name"
              value={values.venue}
              onChange={(e) => update("venue", e.target.value)}
            />
            {errors.venue && <p className={errorClass}>{errors.venue}</p>}
          </div>
        </div>
      </fieldset>

      {/* 03 — SERVICES */}
      <fieldset>
        <legend className="mb-4 text-xs uppercase tracking-wider3 text-gold">
          03 — Services Required
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SERVICE_OPTIONS.map((service) => {
            const checked = values.servicesRequired.includes(service);
            return (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                aria-pressed={checked}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors duration-300 ${checked
                  ? "border-gold bg-gold/10 text-[var(--text-primary)]"
                  : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-gold"
                  }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${checked ? "border-gold bg-gold text-obsidian" : "border-[var(--border-subtle)]"
                    }`}
                >
                  {checked && <Check size={12} strokeWidth={3} />}
                </span>
                {service}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* 04 — MESSAGE */}
      <fieldset>
        <legend className="mb-4 text-xs uppercase tracking-wider3 text-gold">
          04 — Message
        </legend>
        <label className={labelClass} htmlFor="additionalRequirements">
          Additional Requirements (optional)
        </label>
        <textarea
          id="additionalRequirements"
          rows={4}
          className={inputClass}
          placeholder="Theme, colour palette, special requests..."
          value={values.additionalRequirements}
          onChange={(e) => update("additionalRequirements", e.target.value)}
        />
      </fieldset>

      <button
        type="submit"
        className="w-full rounded-full bg-gold py-3.5 text-xs uppercase tracking-wider2 text-obsidian transition-transform duration-300 hover:scale-[1.02]"
      >
        Send via WhatsApp
      </button>
    </form>
  );
}
