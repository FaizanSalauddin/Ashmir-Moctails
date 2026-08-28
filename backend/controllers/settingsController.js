import SiteSettings from "../models/SiteSettings.js";

async function getOrCreateSettings() {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  return settings;
}

export async function getSettings(req, res) {
  const settings = await getOrCreateSettings();
  res.json(settings);
}

export async function updateSettings(req, res) {
  const settings = await getOrCreateSettings();
  Object.assign(settings, req.body);
  await settings.save();
  res.json(settings);
}
