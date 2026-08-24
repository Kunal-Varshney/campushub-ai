import axios from "axios";

// ============================================================
// API BASE URL
// ============================================================

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://campushub-ai-um6d.onrender.com/api";

// ============================================================
// AXIOS INSTANCE
// ============================================================

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================
// TOKEN AUTOMATICALLY ATTACH
// ============================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================
// COMMON ERROR HANDLER
// ============================================================

const handleError = (error, fallback) => {
  console.error(
    fallback,
    error?.response?.data?.message || error.message
  );

  return {
    success: false,
    message:
      error?.response?.data?.message || fallback,
  };
};

// ============================================================
// ADMIN DASHBOARD
// ============================================================

export const getAdminStats = async () => {
  try {
    const { data } = await api.get("/admin/stats");
    return data;
  } catch (error) {
    return handleError(error, "Failed to fetch admin stats");
  }
};

// ============================================================
// ADMIN USERS
// ============================================================

export const getUsers = async (params = {}) => {
  try {
    const { data } = await api.get("/admin/users", {
      params,
    });

    return data;
  } catch (error) {
    return handleError(error, "Failed to fetch users");
  }
};

export const getUserActivity = async (id) => {
  try {
    const { data } = await api.get(
      `/admin/users/${id}/activity`
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to fetch user activity"
    );
  }
};

export const blockUser = async (id) => {
  try {
    const { data } = await api.patch(
      `/admin/users/${id}/block`
    );

    return data;
  } catch (error) {
    return handleError(error, "Failed to block user");
  }
};

export const unblockUser = async (id) => {
  try {
    const { data } = await api.patch(
      `/admin/users/${id}/unblock`
    );

    return data;
  } catch (error) {
    return handleError(error, "Failed to unblock user");
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await api.delete(
      `/admin/users/${id}`
    );

    return data;
  } catch (error) {
    return handleError(error, "Failed to delete user");
  }
};

export const updateUserPermissions = async (
  id,
  permissions
) => {
  try {
    const { data } = await api.patch(
      `/admin/users/${id}/permissions`,
      permissions
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to update permissions"
    );
  }
};

// ============================================================
// ADMIN NOTES
// ============================================================

export const getNotes = async (params = {}) => {
  try {
    const { data } = await api.get("/admin/notes", {
      params,
    });

    return data;
  } catch (error) {
    return handleError(error, "Failed to fetch notes");
  }
};

export const approveNote = async (id) => {
  try {
    const { data } = await api.patch(
      `/admin/notes/${id}/approve`
    );

    return data;
  } catch (error) {
    return handleError(error, "Failed to approve note");
  }
};

export const rejectNote = async (id) => {
  try {
    const { data } = await api.patch(
      `/admin/notes/${id}/reject`
    );

    return data;
  } catch (error) {
    return handleError(error, "Failed to reject note");
  }
};

export const updateNote = async (id, payload) => {
  try {
    const { data } = await api.put(
      `/admin/notes/${id}`,
      payload
    );

    return data;
  } catch (error) {
    return handleError(error, "Failed to update note");
  }
};

export const deleteNote = async (id) => {
  try {
    const { data } = await api.delete(
      `/admin/notes/${id}`
    );

    return data;
  } catch (error) {
    return handleError(error, "Failed to delete note");
  }
};

// ============================================================
// STUDENT NOTES
// ============================================================

// Get logged-in user's notes
export const getMyNotes = async () => {
  try {
    const { data } = await api.get("/notes");

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to fetch your notes"
    );
  }
};


// ============================================================
// AI NOTE GENERATOR
// POST /api/notes/generate
// ============================================================

export const generateNote = async (
  noteData = {}
) => {
  try {
    const { data } = await api.post(
      "/notes/generate",
      noteData
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to generate AI notes"
    );
  }
};


// ============================================================
// CREATE / UPLOAD NOTE
// POST /api/notes/create
// ============================================================

export const createNote = async (
  noteData = {}
) => {
  try {
    const { data } = await api.post(
      "/notes/create",
      noteData
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to create note"
    );
  }
};


// ============================================================
// NOTE DOWNLOAD
// POST /api/notes/:id/download
// ============================================================

export const recordNoteDownload = async (id) => {
  try {
    const { data } = await api.post(
      `/notes/${id}/download`
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to record note download"
    );
  }
};

// ============================================================
// ADMIN DOWNLOAD HISTORY
// ============================================================

export const getDownloadHistory = async (
  params = {}
) => {
  try {
    const { data } = await api.get(
      "/admin/download-history",
      {
        params,
      }
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to fetch download history"
    );
  }
};

// ============================================================
// ADMIN ANALYTICS
// ============================================================

export const getAnalytics = async () => {
  try {
    const { data } = await api.get(
      "/admin/analytics"
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to fetch analytics"
    );
  }
};

// ============================================================
// ADMIN AI USAGE
// ============================================================

export const getAIUsage = async (
  params = {}
) => {
  try {
    const { data } = await api.get(
      "/admin/ai-usage",
      {
        params,
      }
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to fetch AI usage data"
    );
  }
};

// ============================================================
// INTERNSHIP FINDER
// ============================================================

export const getInternships = async (
  params = {}
) => {
  try {
    const { data } = await api.get(
      "/internship",
      {
        params,
      }
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to fetch internships"
    );
  }
};

export const searchInternships = async (
  searchData = {}
) => {
  try {
    const { data } = await api.post(
      "/internship/search",
      searchData
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to search internships"
    );
  }
};

export const toggleSavedInternship = async (
  internshipData
) => {
  try {
    const { data } = await api.post(
      "/internship/save",
      internshipData
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to save internship"
    );
  }
};

export const getSavedInternships = async () => {
  try {
    const { data } = await api.get(
      "/internship/saved"
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to fetch saved internships"
    );
  }
};

export const applyInternship = async (
  applicationData
) => {
  try {
    const { data } = await api.post(
      "/internship/apply",
      applicationData
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to apply for internship"
    );
  }
};

export const getInternshipApplications =
  async () => {
    try {
      const { data } = await api.get(
        "/internship/applications"
      );

      return data;
    } catch (error) {
      return handleError(
        error,
        "Failed to fetch internship applications"
      );
    }
  };

export const updateInternshipApplicationStatus =
  async (id, status) => {
    try {
      const { data } = await api.patch(
        `/internship/application/${id}`,
        {
          status,
        }
      );

      return data;
    } catch (error) {
      return handleError(
        error,
        "Failed to update internship application status"
      );
    }
  };

export const getInternshipById = async (id) => {
  try {
    const { data } = await api.get(
      `/internship/${id}`
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to fetch internship"
    );
  }
};

// ============================================================
// CAREER APPLICATIONS
// ============================================================

export const submitCareerApplication = async (
  applicationData
) => {
  try {
    const { data } = await api.post(
      "/careers/apply",
      applicationData
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to submit career application"
    );
  }
};

export const getCareerApplications = async () => {
  try {
    const { data } = await api.get(
      "/careers/applications"
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to fetch career applications"
    );
  }
};

export const updateCareerApplicationStatus =
  async (id, status) => {
    try {
      const { data } = await api.patch(
        `/careers/applications/${id}/status`,
        {
          status,
        }
      );

      return data;
    } catch (error) {
      return handleError(
        error,
        "Failed to update career application status"
      );
    }
  };

// ============================================================
// ABOUT PAGE
// ============================================================

export const getAboutData = async () => {
  try {
    const { data } = await api.get("/about");

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to fetch About page data"
    );
  }
};

// ============================================================
// NOTIFICATIONS
// ============================================================

// Get logged-in user's notifications
export const getNotifications = async () => {
  try {
    const { data } = await api.get("/notifications");
    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to fetch notifications"
    );
  }
};


// Mark one notification as read
export const markNotificationRead = async (id) => {
  try {
    const { data } = await api.patch(
      `/notifications/${id}/read`
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to mark notification as read"
    );
  }
};


// Mark all notifications as read
export const markAllNotificationsRead = async () => {
  try {
    const { data } = await api.patch(
      "/notifications/read-all"
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to mark all notifications as read"
    );
  }
};


// Delete notification
export const deleteNotification = async (id) => {
  try {
    const { data } = await api.delete(
      `/notifications/${id}`
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to delete notification"
    );
  }
};

// ============================================================
// LOGOUT
// POST /api/auth/logout
// ============================================================

export const logoutUser = async () => {
  try {
    const { data } = await api.post("/auth/logout");

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to logout"
    );
  }
};

// ============================================================
// GET SINGLE SAVED NOTE
// GET /api/notes/:id
// ============================================================

export const getNoteById = async (id) => {
  try {
    const { data } = await api.get(`/notes/${id}`);

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to fetch saved note"
    );
  }
};

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default api;