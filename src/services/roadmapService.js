import API from "./api";

/* ============================================================
   CAREER NORMALIZATION
   Accepts an ID ("fullstack") or a display name
   ("Full Stack Developer") and always resolves to the
   canonical lowercase ID the backend expects.
============================================================ */

const CAREER_ID_MAP = {
  frontend: "frontend",
  "frontend developer": "frontend",
  "front end developer": "frontend",

  backend: "backend",
  "backend developer": "backend",
  "back end developer": "backend",

  fullstack: "fullstack",
  "full stack": "fullstack",
  "fullstack developer": "fullstack",
  "full stack developer": "fullstack",

  ai: "ai",
  "ai engineer": "ai",
  "artificial intelligence": "ai",
  "artificial intelligence engineer": "ai",

  ml: "ml",
  "machine learning": "ml",
  "machine learning engineer": "ml",

  data: "data",
  "data science": "data",
  "data scientist": "data",

  cyber: "cyber",
  cybersecurity: "cyber",
  "cyber security": "cyber",
  "cyber security specialist": "cyber",

  cloud: "cloud",
  "cloud engineer": "cloud",
  "cloud computing": "cloud",

  devops: "devops",
  "devops engineer": "devops",

  android: "android",
  "android developer": "android",

  uiux: "uiux",
  "ui/ux": "uiux",
  "ui/ux designer": "uiux",
  "ui ux": "uiux",
  "ui ux designer": "uiux",
  "uiux designer": "uiux",
};

const normalizeCareerId = (career) => {
  if (!career) return null;

  const raw =
    typeof career === "object"
      ? career.id ||
        career.value ||
        career.careerId ||
        career.career ||
        career.name ||
        career.title
      : career;

  if (!raw) return null;

  const key = String(raw).trim().toLowerCase();

  return CAREER_ID_MAP[key] || null;
};

/* ============================================================
   LEVEL NORMALIZATION
   Accepts any casing ("beginner", "BEGINNER") or a
   { value } / { name } shaped object and always resolves
   to the canonical "Beginner" | "Intermediate" | "Advanced".
============================================================ */

const LEVEL_MAP = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const normalizeSkillLevel = (level) => {
  if (!level) return null;

  const raw =
    typeof level === "object"
      ? level.value || level.id || level.name || level.label
      : level;

  if (!raw) return null;

  const key = String(raw).trim().toLowerCase();

  return LEVEL_MAP[key] || null;
};

/* ============================================================
   GENERATE ROADMAP
   Always sends exactly:
     { career: "fullstack", level: "Intermediate" }
   Never a nested object, never "skillLevel".
============================================================ */

export const generateRoadmap = async (career, level) => {
  const normalizedCareer = normalizeCareerId(career);
  const normalizedLevel = normalizeSkillLevel(level);

  if (!normalizedCareer) {
    throw new Error(
      "Please select a valid career path before generating your roadmap."
    );
  }

  if (!normalizedLevel) {
    throw new Error(
      "Please select a valid skill level before generating your roadmap."
    );
  }

  try {
    const response = await API.post("/roadmap/generate", {
      career: normalizedCareer,
      level: normalizedLevel,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Generate Roadmap Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

/* ============================================================
   GET MY ROADMAPS
============================================================ */

export const getMyRoadmaps = async () => {
  try {
    const response = await API.get("/roadmap");
    return response.data;
  } catch (error) {
    console.error(
      "Get Roadmaps Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

/* ============================================================
   GET ROADMAP BY ID
============================================================ */

export const getRoadmapById = async (id) => {
  try {
    const response = await API.get(`/roadmap/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Get Roadmap By Id Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

/* ============================================================
   UPDATE ROADMAP STEP PROGRESS
============================================================ */

export const updateRoadmapStepProgress = async (
  roadmapId,
  stepIndex,
  progress
) => {
  try {
    const response = await API.patch(
      `/roadmap/${roadmapId}/progress`,
      {
        stepIndex,
        progress,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Update Roadmap Progress Error:",
      error.response?.data ||
        error.message
    );

    throw error;
  }
};