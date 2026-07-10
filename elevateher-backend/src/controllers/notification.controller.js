const prisma = require("../config/prisma");

/**
 * Serialize a Notification row into the shape the frontend expects
 * (see frontend Notification type: created_at, read, link optional).
 */
function serialize(n) {
  return {
    id: n.id,
    type: n.type,
    title: n.title,
    body: n.body || "",
    link: n.link || undefined,
    read: n.read,
    created_at: n.createdAt,
  };
}

/**
 * GET /api/notifications
 * Requires auth. Lists the logged-in user's notifications, newest first.
 */
async function listNotifications(req, res) {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ success: true, data: notifications.map(serialize) });
  } catch (err) {
    console.error("List notifications error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch notifications" });
  }
}

/**
 * POST /api/notifications/:id/read
 * Requires auth. Marks one of the caller's own notifications as read.
 */
async function markRead(req, res) {
  try {
    const { id } = req.params;

    const notification = await prisma.notification.findUnique({ where: { id } });
    if (!notification || notification.userId !== req.user.id) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    const updated = await prisma.notification.update({
      where: { id },
      data: { read: true },
    });

    return res.status(200).json({ success: true, data: serialize(updated) });
  } catch (err) {
    console.error("Mark notification read error:", err);
    return res.status(500).json({ success: false, message: "Could not update notification" });
  }
}

/**
 * POST /api/notifications/read-all
 * Requires auth. Marks all of the caller's unread notifications as read.
 */
async function markAllRead(req, res) {
  try {
    const result = await prisma.notification.updateMany({
      where: { userId: req.user.id, read: false },
      data: { read: true },
    });
    return res.status(200).json({ success: true, data: { updated: result.count } });
  } catch (err) {
    console.error("Mark all notifications read error:", err);
    return res.status(500).json({ success: false, message: "Could not update notifications" });
  }
}

module.exports = { listNotifications, markRead, markAllRead };
