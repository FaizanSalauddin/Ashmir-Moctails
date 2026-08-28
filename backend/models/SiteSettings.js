import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    heroTitle: {
      type: String,
      default: "ASHMIR",
    },

    heroSubtitle: {
      type: String,
      default: "Premium Mocktail Experiences",
    },

    brandDescription: {
      type: String,
      default:
        "Ashmir Mocktails designs and runs premium beverage counters for weddings, celebrations and corporate events.",
    },

    whatsappNumber: {
      type: String,
      default: "919000000000",
    },

    contactNumber: {
      type: String,
      default: "",
    },

    // Contact button URL
    contactUrl: {
      type: String,
      default: "",
      trim: true,
    },

    instagramUrl: {
      type: String,
      default: "",
      trim: true,
    },

    facebookUrl: {
      type: String,
      default: "",
      trim: true,
    },

    footerText: {
      type: String,
      default: "Ashmir Mocktails. All rights reserved.",
    },
  },
  { timestamps: true }
);

export default mongoose.model("SiteSettings", siteSettingsSchema);