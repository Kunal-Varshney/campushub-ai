import API from "./api";

// ============================================================
// GET ALL INTERNSHIPS
// ============================================================

export const getInternships = async (params = {}) => {
  const response = await API.get("/internships", {
    params,
  });

  return response.data;
};

// ============================================================
// SEARCH / FILTER INTERNSHIPS
// ============================================================

export const searchInternships = async (params = {}) => {
  const response = await API.get("/internships/search", {
    params,
  });

  return response.data;
};

// ============================================================
// GET SINGLE INTERNSHIP
// ============================================================

export const getInternshipById = async (id) => {
  const response = await API.get(`/internships/${id}`);

  return response.data;
};

// ============================================================
// SAVE / UNSAVE INTERNSHIP
// ============================================================

export const saveInternship = async (id) => {
  const response = await API.post(`/internships/${id}/save`);

  return response.data;
};

// ============================================================
// APPLY FOR INTERNSHIP
// ============================================================

export const applyInternship = async (id) => {
  const response = await API.post(`/internships/${id}/apply`);

  return response.data;
};

// ============================================================
// GET MY SAVED INTERNSHIPS
// ============================================================

export const getSavedInternships = async () => {
  const response = await API.get("/internships/saved");

  return response.data;
};

// ============================================================
// GET MY APPLICATIONS
// ============================================================

export const getMyApplications = async () => {
  const response = await API.get("/internships/applications");

  return response.data;
};
