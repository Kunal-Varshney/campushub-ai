// import API from "./api";

// // ============================================================
// // INTERNSHIP SERVICE
// // ============================================================

// // ============================================================
// // GET ALL INTERNSHIPS
// // GET /api/internship
// // ============================================================

// export const getInternships = async (params = {}) => {
//   const response = await API.get("/internship", {
//     params,
//   });

//   return response.data;
// };

// // ============================================================
// // SEARCH INTERNSHIPS
// // POST /api/internship/search
// // ============================================================

// export const searchInternships = async (searchData = {}) => {
//     try{
//       const response = await API.post(
//         "/internships/search",
//         searchData
//     );

//      return data;
//     } catch (error) {
//         return handleError(
//         error,
//         "Failed to search internships"
//         );
//     }
//     };

// // ============================================================
// // AI RECOMMENDATIONS
// // POST /api/internship/search
// // ============================================================

// export const getInternshipRecommendations = async (
//   searchData = {}
// ) => {
//     try{
//         const response = await API.post(
//         "/internship/search",
//         searchData
//   );

//    return data;
//     } catch (error) {
//         return handleError(
//         error,
//         "Failed to search internships"
//         );
//       }
//     };

// // ============================================================
// // GET SINGLE INTERNSHIP
// // GET /api/internship/:id
// // ============================================================

// export const getInternshipById = async (id) => {
//   const response = await API.get(
//     `/internship/${id}`
//   );

//   return response.data;
// };

// // ============================================================
// // SAVE / UNSAVE INTERNSHIP
// // POST /api/internship/save
// // ============================================================

// export const toggleSavedInternship = async (id) => {
//   const response = await API.post(
//     "/internship/save",
//     {
//       internshipId: id,
//     }
//   );

//   return response.data;
// };

// // ============================================================
// // SAVE INTERNSHIP
// // ============================================================

// export const saveInternship = async (id) => {
//   const response = await API.post(
//     "/internship/save",
//     {
//       internshipId: id,
//     }
//   );

//   return response.data;
// };

// // ============================================================
// // REMOVE SAVED INTERNSHIP
// // ============================================================

// export const removeSavedInternship = async (id) => {
//   // Backend currently uses the same POST endpoint
//   // for save / unsave toggle.

//   const response = await API.post(
//     "/internship/save",
//     {
//       internshipId: id,
//     }
//   );

//   return response.data;
// };

// // ============================================================
// // GET SAVED INTERNSHIPS
// // GET /api/internship/saved
// // ============================================================

// export const getSavedInternships = async () => {
//   const response = await API.get(
//     "/internship/saved"
//   );

//   return response.data;
// };

// // ============================================================
// // APPLY FOR INTERNSHIP
// // POST /api/internship/apply
// // ============================================================

// export const applyInternship = async (id) => {
//   const response = await API.post(
//     "/internship/apply",
//     {
//       internshipId: id,
//     }
//   );

//   return response.data;
// };

// // ============================================================
// // GET MY APPLICATIONS
// // GET /api/internship/applications
// // ============================================================

// export const getMyApplications = async () => {
//   const response = await API.get(
//     "/internship/applications"
//   );

//   return response.data;
// };

// // ============================================================
// // UPDATE APPLICATION STATUS
// // PATCH /api/internship/application/:id
// // ============================================================

// export const updateApplicationStatus = async (
//   applicationId,
//   status
// ) => {
//   const response = await API.patch(
//     `/internship/application/${applicationId}`,
//     {
//       status,
//     }
//   );

//   return response.data;
// };

// // ============================================================
// // WITHDRAW APPLICATION
// // ============================================================

// export const withdrawApplication = async (
//   applicationId
// ) => {
//   const response = await API.delete(
//     `/internship/application/${applicationId}`
//   );

//   return response.data;
// };





import API from "./api";

// ============================================================
// GET ALL INTERNSHIPS
// GET /api/internship
// ============================================================

export const getInternships = async (params = {}) => {
  const response = await API.get("/internship", {
    params,
  });

  return response.data;
};

// ============================================================
// SEARCH INTERNSHIPS
// POST /api/internship/search
// ============================================================

export const searchInternships = async (searchData = {}) => {
  const response = await API.post(
    "/internship/search",
    searchData
  );

  return response.data;
};

// ============================================================
// AI INTERNSHIP RECOMMENDATIONS
// POST /api/internship/search
// ============================================================

export const getInternshipRecommendations = async (searchData = {}) => {
  const response = await API.post(
    "/internship/search",
    searchData
  );

  return response.data;
};

// ============================================================
// GET SINGLE INTERNSHIP
// GET /api/internship/:id
// ============================================================

export const getInternshipById = async (id) => {
  const response = await API.get(
    `/internship/${id}`
  );

  return response.data;
};

// ============================================================
// SAVE / UNSAVE INTERNSHIP
// POST /api/internship/save
// ============================================================

export const toggleSavedInternship = async (id) => {
  const response = await API.post(
    "/internship/save",
    {
      internshipId: id,
    }
  );

  return response.data;
};

// ============================================================
// SAVE INTERNSHIP
// ============================================================

export const saveInternship = async (id) => {
  const response = await API.post(
    "/internship/save",
    {
      internshipId: id,
    }
  );

  return response.data;
};

// ============================================================
// REMOVE SAVED INTERNSHIP
// Backend currently uses toggle endpoint
// ============================================================

export const removeSavedInternship = async (id) => {
  const response = await API.post(
    "/internship/save",
    {
      internshipId: id,
    }
  );

  return response.data;
};

// ============================================================
// GET SAVED INTERNSHIPS
// GET /api/internship/saved
// ============================================================

export const getSavedInternships = async () => {
  const response = await API.get(
    "/internship/saved"
  );

  return response.data;
};

// ============================================================
// APPLY FOR INTERNSHIP
// POST /api/internship/apply
// ============================================================

export const applyInternship = async (id) => {
  const response = await API.post(
    "/internship/apply",
    {
      internshipId: id,
    }
  );

  return response.data;
};

// ============================================================
// GET MY APPLICATIONS
// GET /api/internship/applications
// ============================================================

export const getMyApplications = async () => {
  const response = await API.get(
    "/internship/applications"
  );

  return response.data;
};

// ============================================================
// UPDATE APPLICATION STATUS
// PATCH /api/internship/application/:id
// ============================================================

export const updateApplicationStatus = async (
  applicationId,
  status
) => {
  const response = await API.patch(
    `/internship/application/${applicationId}`,
    {
      status,
    }
  );

  return response.data;
};

// ============================================================
// WITHDRAW APPLICATION
// DELETE /api/internship/application/:id
// ============================================================

export const withdrawApplication = async (
  applicationId
) => {
  const response = await API.delete(
    `/internship/application/${applicationId}`
  );

  return response.data;
};