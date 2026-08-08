
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Token automatically attach karega
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

// Common error handler
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

/* ============================================================
   ADMIN DASHBOARD
============================================================ */

export const getAdminStats = async () => {
  try {
    const { data } = await api.get("/admin/stats");
    return data;
  } catch (error) {
    return handleError(error, "Failed to fetch admin stats");
  }
};

/* ============================================================
   USERS
============================================================ */

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

/* ============================================================
   NOTES
============================================================ */

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

/* ============================================================
   DOWNLOAD HISTORY
============================================================ */

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

/* ============================================================
   ANALYTICS
============================================================ */

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

/* ============================================================
   AI ASSISTANT MONITORING
============================================================ */

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

/* ============================================================
   DEFAULT EXPORT
============================================================ */

export default api;
