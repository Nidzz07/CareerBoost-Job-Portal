const prisma = require("../config/prisma");

/** Strips passwordHash before sending user data back to the client. */
function sanitizeUser(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

/**
 * PATCH /api/user
 * Requires auth. Updates the caller's own profile fields.
 * Body (all optional): { name, location, avatarUrl }
 *
 * NOTE: bio/skills are NOT stored on User — they live on the Resume model and are
 * handled by the resume module (a later phase).
 */
async function updateProfile(req, res) {
  try {
    const { name, location, avatarUrl } = req.body;

    if (name !== undefined && (typeof name !== "string" || name.trim().length < 2)) {
      return res.status(400).json({ success: false, message: "name must be at least 2 characters" });
    }

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(location !== undefined && { location }),
        ...(avatarUrl !== undefined && { avatarUrl }),
      },
    });

    return res.status(200).json({ success: true, message: "Profile updated", data: { user: sanitizeUser(updated) } });
  } catch (err) {
    console.error("Update profile error:", err);
    return res.status(500).json({ success: false, message: "Could not update profile" });
  }
}

/**
 * GET /api/user/settings
 * Requires auth. Returns the caller's account settings object (or {} if unset).
 */
async function getSettings(req, res) {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const settings = user && user.settingsJson ? safeParse(user.settingsJson) : {};
    return res.status(200).json({ success: true, data: { settings } });
  } catch (err) {
    console.error("Get settings error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch settings" });
  }
}

/**
 * PUT /api/user/settings
 * Requires auth. Persists the caller's account settings.
 * Body: { settings: { ...arbitrary preference object... } }
 */
async function updateSettings(req, res) {
  try {
    const { settings } = req.body;
    if (settings === undefined || typeof settings !== "object" || settings === null) {
      return res.status(400).json({ success: false, message: "settings object is required" });
    }

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: { settingsJson: JSON.stringify(settings) },
    });

    return res.status(200).json({
      success: true,
      message: "Settings saved",
      data: { settings: updated.settingsJson ? safeParse(updated.settingsJson) : {} },
    });
  } catch (err) {
    console.error("Update settings error:", err);
    return res.status(500).json({ success: false, message: "Could not save settings" });
  }
}

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

module.exports = { updateProfile, getSettings, updateSettings };
