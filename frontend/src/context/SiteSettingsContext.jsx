import { createContext, useContext, useEffect, useState } from "react";
import { settingsApi } from "../services/resources";
import { SITE, SOCIAL_LINKS, WHATSAPP_NUMBER } from "../data/config";
import { setWhatsAppNumber } from "../utils/whatsappService";

const defaults = {
  heroTitle: SITE.brandName,
  heroSubtitle: SITE.tagline,
  brandDescription:
    "Ashmir Mocktails designs and runs premium beverage counters for weddings, celebrations and corporate events.",
  whatsappNumber: WHATSAPP_NUMBER,
  contactNumber: "",
  instagramUrl: SOCIAL_LINKS.instagram,
  facebookUrl: SOCIAL_LINKS.facebook,
  footerText: `${SITE.brandFullName}. All rights reserved.`,
};

const SiteSettingsContext = createContext(defaults);

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaults);

  useEffect(() => {
    let mounted = true;
    settingsApi
      .get()
      .then(({ data }) => {
        if (!mounted || !data) return;
        const merged = { ...defaults, ...data };
        setSettings(merged);
        setWhatsAppNumber(merged.whatsappNumber);
      })
      .catch(() => {
        // Backend not reachable yet — keep static defaults, site still works.
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
