/**
 * Admin / Moderator Middleware
 *
 * Requires auth middleware to run first
 * and set req.user with:
 * {
 *   id,
 *   role,
 *   permissions
 * }
 */

// Allows only admin or moderator roles
const isAdminOrModerator = (req, res, next) => {
  if (!req.user || !["admin", "moderator"].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin or moderator role required.",
    });
  }

  next();
};

// Allows only full admins
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin role required.",
    });
  }

  next();
};

// Permission-based middleware
//
// Admins automatically pass.
// Moderators need the required permission in:
// req.user.permissions
//
// Usage:
// router.get(
//   "/users",
//   checkPermission("manageUsers"),
//   getAllUsers
// );

const checkPermission = (permissionKey) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // Admin has all permissions
    if (req.user.role === "admin") {
      return next();
    }

    const hasPermission =
      req.user.permissions &&
      req.user.permissions[permissionKey] === true;

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Missing permission: ${permissionKey}`,
      });
    }

    next();
  };
};

export {
  isAdmin,
  isAdminOrModerator,
  checkPermission,
};