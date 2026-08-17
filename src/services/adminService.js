import axios from "axios";

// ============================================================
// BACKEND API URL
// ============================================================

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://campushub-ai-um6d.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================
// JWT TOKEN ATTACH
// ============================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================
// COMMON ERROR HANDLER
// ============================================================

const getErrorMessage = (error, fallback) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    fallback
  );
};

// ============================================================
// ADMIN STATS
// ============================================================

export const getAdminStats = async () => {
  try {
    const response = await api.get("/admin/stats");

    return response.data;
  } catch (error) {
    console.error(
      "Admin Stats Error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to load stats"
      ),
      stats: {
        totalUsers: 0,
        students: 0,
        admins: 0,
        totalNotes: 0,
      },
    };
  }
};

// ============================================================
// GET ALL USERS
// ============================================================

export const getUsers = async (params = {}) => {
  try {
    const response = await api.get("/admin/users", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Users Error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to load users"
      ),
      users: [],
      totalUsers: 0,
    };
  }
};

// ============================================================
// GET USER BY ID
// ============================================================

export const getUserById = async (id) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "User ID is required.",
      };
    }

    const response = await api.get(
      `/admin/users/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Get User Error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to load user"
      ),
    };
  }
};

// ============================================================
// GET USER ACTIVITY
// ============================================================

export const getUserActivity = async (id) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "User ID is required.",
      };
    }

    const response = await api.get(
      `/admin/users/${id}/activity`
    );

    return response.data;
  } catch (error) {
    console.error(
      "User Activity Error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to load user activity"
      ),
      activity: {
        downloadCount: 0,
        aiQueryCount: 0,
        recentDownloads: [],
        recentQueries: [],
      },
    };
  }
};

// ============================================================
// BLOCK USER
// ============================================================

export const blockUser = async (id) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "User ID is required.",
      };
    }

    const response = await api.patch(
      `/admin/users/${id}/block`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Block User Error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to block user"
      ),
    };
  }
};

// ============================================================
// UNBLOCK USER
// ============================================================

export const unblockUser = async (id) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "User ID is required.",
      };
    }

    const response = await api.patch(
      `/admin/users/${id}/unblock`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Unblock User Error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to unblock user"
      ),
    };
  }
};

// ============================================================
// DELETE USER
// ============================================================

export const deleteUser = async (id) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "User ID is required.",
      };
    }

    const response = await api.delete(
      `/admin/users/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Delete User Error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to delete user"
      ),
    };
  }
};

// ============================================================
// UPDATE USER PERMISSIONS
// ============================================================

export const updateUserPermissions = async (
  id,
  permissions
) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "User ID is required.",
      };
    }

    const response = await api.patch(
      `/admin/users/${id}/permissions`,
      permissions
    );

    return response.data;
  } catch (error) {
    console.error(
      "Update Permissions Error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to update permissions"
      ),
    };
  }
};

// ============================================================
// GET ALL NOTES
// ============================================================

export const getNotes = async (params = {}) => {
  try {
    const response = await api.get("/admin/notes", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Notes Error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to load notes"
      ),
      notes: [],
      totalNotes: 0,
    };
  }
};

// ============================================================
// GET NOTE CATEGORIES
// ============================================================

export const getNoteCategories = async () => {
  try {
    const response = await api.get(
      "/admin/notes/categories"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Note Categories Error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to load note categories"
      ),
      categories: [],
    };
  }
};

// ============================================================
// APPROVE NOTE
// ============================================================

export const approveNote = async (id) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "Note ID is required.",
      };
    }

    const response = await api.patch(
      `/admin/notes/${id}/approve`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Approve Note Error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to approve note"
      ),
    };
  }
};

// ============================================================
// REJECT NOTE
// ============================================================

export const rejectNote = async (id) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "Note ID is required.",
      };
    }

    const response = await api.patch(
      `/admin/notes/${id}/reject`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Reject Note Error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to reject note"
      ),
    };
  }
};

// ============================================================
// UPDATE NOTE
// ============================================================

export const updateNote = async (
  id,
  payload
) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "Note ID is required.",
      };
    }

    const response = await api.put(
      `/admin/notes/${id}`,
      payload
    );

    return response.data;
  } catch (error) {
    console.error(
      "Update Note Error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to update note"
      ),
    };
  }
};

// ============================================================
// DELETE NOTE
// ============================================================

export const deleteNote = async (id) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "Note ID is required.",
      };
    }

    const response = await api.delete(
      `/admin/notes/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Delete Note Error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to delete note"
      ),
    };
  }
};

// ============================================================
// DOWNLOAD HISTORY
// ============================================================

export const getDownloadHistory = async (
  params = {}
) => {
  try {
    const response = await api.get(
      "/admin/download-history",
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Download History Error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to load download history"
      ),
      downloads: [],
      totalDownloads: 0,
    };
  }
};

// ============================================================
// ANALYTICS
// ============================================================

export const getAnalytics = async () => {
  try {
    const response = await api.get(
      "/admin/analytics"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Analytics Error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to load analytics"
      ),
      analytics: {
        totalUsers: 0,
        totalNotes: 0,
        totalDownloads: 0,
        activeUsers: 0,
        aiRequests: 0,
        userGrowth: [],
        downloadGrowth: [],
        popularNotes: [],
      },
    };
  }
};

// ============================================================
// AI USAGE
// ============================================================

export const getAIUsage = async (
  params = {}
) => {
  try {
    const response = await api.get(
      "/admin/ai-usage",
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "AI Usage Error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to load AI usage"
      ),
      totalQueries: 0,
      uniqueUsers: 0,
      popularTopics: [],
      queries: [],
    };
  }
};

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default api;