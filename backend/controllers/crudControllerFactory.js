import cloudinary from "../config/cloudinary.js";

/**
 * Deletes a Cloudinary asset by public_id, swallowing errors so a bad/missing
 * asset never blocks the actual database operation the admin is waiting on.
 */
async function safeDestroy(publicId) {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.warn(`Cloudinary cleanup failed for ${publicId}:`, err.message);
  }
}

/**
 * Builds standard REST handlers (list/create/update/remove) for a Mongoose
 * model. Public GET, admin-protected mutations (enforced via route wiring).
 *
 * If `imagePublicIdField` is set (e.g. "imagePublicId"), the factory will:
 *  - on update: delete the old Cloudinary asset if the field's value changed
 *  - on remove: delete the associated Cloudinary asset
 */
export function createCrudController(
  Model,
  { sort = { order: 1, createdAt: 1 }, imagePublicIdField = null } = {}
) {
  return {
    list: async (req, res) => {
      const docs = await Model.find().sort(sort);
      res.json(docs);
    },

    create: async (req, res) => {
      const doc = await Model.create(req.body);
      res.status(201).json(doc);
    },

    update: async (req, res) => {
      const existing = imagePublicIdField ? await Model.findById(req.params.id) : null;

      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) return res.status(404).json({ message: "Not found." });

      if (imagePublicIdField && existing) {
        const oldId = existing[imagePublicIdField];
        const newId = doc[imagePublicIdField];
        if (oldId && oldId !== newId) {
          await safeDestroy(oldId);
        }
      }

      res.json(doc);
    },

    remove: async (req, res) => {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: "Not found." });

      if (imagePublicIdField && doc[imagePublicIdField]) {
        await safeDestroy(doc[imagePublicIdField]);
      }

      res.json({ message: "Deleted successfully." });
    },
  };
}
