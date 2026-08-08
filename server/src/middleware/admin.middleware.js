/**
 * Requires your existing auth middleware to have already run and set
 * req.user (decoded JWT payload with at least { id, role, permissions }).
 * If your auth middleware is named differently (e.g. `protect`,
 * `verifyToken`), chain it before these on your routes.
 */

// Allows only admin or moderator roles through
const isAdminOrModerator = (req, res, next) => {
  if (!req.user || !["admin", "moderator"].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin or moderator role required.",
    });
  }
  next();
};

// Allows only full admins through
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin role required.",
    });
  }
  next();
};

/**
 * Permission-based gate.
 * Admins always pass. Moderators/others must have the specific
 * permission flag set to true on req.user.permissions.
 *
 * Usage: router.get("/users", checkPermission("manageUsers"), getAllUsers)
 */
const checkPermission = (permissionKey) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }

  if (req.user.role === "admin") return next();

  const hasPermission = req.user.permissions && req.user.permissions[permissionKey];
  if (!hasPermission) {
    return res.status(403).json({
      success: false,
      message: `Access denied. Missing permission: ${permissionKey}`,
    });
  }

  next();
};

module.exports = { isAdmin, isAdminOrModerator, checkPermission };