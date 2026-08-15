import axios from "axios";

// ============================================================
// API BASE URL
// ============================================================

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

console.log("CHECK API:", BASE_URL);

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
// USERS
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
    return handleError(error, "Failed to fetch user activity");
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
// NOTES
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
// DOWNLOAD HISTORY
// ============================================================

export const getDownloadHistory = async (params = {}) => {
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
// ANALYTICS
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
// AI ASSISTANT MONITORING
// ============================================================

export const getAIUsage = async (params = {}) => {
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

export const getInternshipRecommendations = async (
  searchData
) => {
  try {
    const { data } = await api.post(
      "/internship/recommend",
      searchData
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to get internship recommendations"
    );
  }
};

export const searchInternships = async (params = {}) => {
  try {
    const { data } = await api.get(
      "/internship/search",
      {
        params,
      }
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to search internships"
    );
  }
};

export const toggleSavedInternship = async (id) => {
  try {
    const { data } = await api.post(
      `/internship/${id}/save`
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to save internship"
    );
  }
};

export const applyInternship = async (id) => {
  try {
    const { data } = await api.post(
      `/internship/${id}/apply`
    );

    return data;
  } catch (error) {
    return handleError(
      error,
      "Failed to apply for internship"
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

export const updateCareerApplicationStatus = async (
  id,
  status
) => {
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
// DEFAULT EXPORT
// ============================================================

export default api;