const normalize = (value = "") =>
  value.toString().toLowerCase().trim();

const calculateMatchScore = (internship, searchData = {}) => {
  let score = 0;

  const userSkills = normalize(searchData.skills)
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const role = normalize(searchData.role);
  const location = normalize(searchData.location);
  const workType = normalize(searchData.workType);
  const experience = normalize(searchData.experience);

  const internshipSkills = Array.isArray(internship.skills)
    ? internship.skills.map(normalize)
    : [];

  // =========================
  // SKILLS
  // =========================

  if (userSkills.length > 0) {
    const matchedSkills = userSkills.filter((userSkill) =>
      internshipSkills.some(
        (internshipSkill) =>
          internshipSkill.includes(userSkill) ||
          userSkill.includes(internshipSkill)
      )
    );

    score += Math.min(50, matchedSkills.length * 15);
  }

  // =========================
  // ROLE
  // =========================

  if (
    role &&
    normalize(internship.role).includes(role)
  ) {
    score += 20;
  }

  // =========================
  // LOCATION
  // =========================

  if (location) {
    const internshipLocation = normalize(
      internship.location
    );

    const internshipMode = normalize(
      internship.mode
    );

    if (
      internshipLocation.includes(location) ||
      (location === "remote" && internshipMode === "remote")
    ) {
      score += 15;
    }
  }

  // =========================
  // WORK TYPE
  // =========================

  if (
    workType &&
    workType !== "all" &&
    normalize(internship.mode) === workType
  ) {
    score += 10;
  }

  // =========================
  // EXPERIENCE
  // =========================

  if (
    experience &&
    internship.experience &&
    normalize(internship.experience) === experience
  ) {
    score += 5;
  }

  return Math.min(99, score);
};

// ============================================================
// RANK INTERNSHIPS
// ============================================================

export const rankInternships = (
  internships = [],
  searchData = {}
) => {
  return internships
    .map((internship) => {
      // MongoDB document ko plain object mein convert karo
      const internshipData =
        typeof internship?.toObject === "function"
          ? internship.toObject()
          : { ...internship };

      return {
        ...internshipData,
        matchScore: calculateMatchScore(
          internshipData,
          searchData
        ),
      };
    })
    .sort(
      (a, b) => b.matchScore - a.matchScore
    );
};

export default {
  rankInternships,
};