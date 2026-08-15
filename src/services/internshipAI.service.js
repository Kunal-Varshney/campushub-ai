import Internship from "../models/internship.model.js";

const normalize = (value = "") =>
  String(value)
    .toLowerCase()
    .trim();

const tokenize = (value = "") =>
  normalize(value)
    .split(/[,\s]+/)
    .map((item) => item.trim())
    .filter(Boolean);

const calculateSkillScore = (
  userSkills,
  internshipSkills
) => {
  if (!userSkills.length || !internshipSkills.length) {
    return 0;
  }

  const normalizedInternshipSkills =
    internshipSkills.map(normalize);

  const matched = userSkills.filter((skill) =>
    normalizedInternshipSkills.some(
      (internshipSkill) =>
        internshipSkill.includes(skill) ||
        skill.includes(internshipSkill)
    )
  );

  return Math.min(
    100,
    Math.round(
      (matched.length /
        Math.max(userSkills.length, 1)) *
        100
    )
  );
};

const calculateRoleScore = (
  preferredRole,
  internshipRole
) => {
  if (!preferredRole) return 0;

  const role = normalize(internshipRole);
  const preferred = normalize(preferredRole);

  if (role === preferred) return 100;

  if (
    role.includes(preferred) ||
    preferred.includes(role)
  ) {
    return 90;
  }

  const preferredWords = tokenize(preferred);
  const roleWords = tokenize(role);

  const matches = preferredWords.filter((word) =>
    roleWords.includes(word)
  );

  if (!matches.length) return 0;

  return Math.round(
    (matches.length /
      Math.max(preferredWords.length, 1)) *
      100
  );
};

const calculateLocationScore = (
  preferredLocation,
  internshipLocation
) => {
  if (!preferredLocation) return 0;

  const preferred = normalize(preferredLocation);
  const location = normalize(internshipLocation);

  if (preferred === "remote" && location === "remote") {
    return 100;
  }

  if (
    location.includes(preferred) ||
    preferred.includes(location)
  ) {
    return 100;
  }

  const preferredLocations = preferred
    .split(",")
    .map(normalize)
    .filter(Boolean);

  if (
    preferredLocations.some((item) =>
      location.includes(item)
    )
  ) {
    return 100;
  }

  return 0;
};

const calculateWorkTypeScore = (
  workType,
  internshipMode
) => {
  if (!workType) return 0;

  return normalize(workType) ===
    normalize(internshipMode)
    ? 100
    : 0;
};

const calculateExperienceScore = (
  experience,
  internshipExperience
) => {
  if (!experience) return 0;

  return normalize(experience) ===
    normalize(internshipExperience)
    ? 100
    : 0;
};

const calculateStipendScore = (
  expectedStipend,
  internshipStipend
) => {
  if (!expectedStipend) return 0;

  const expected = Number(
    String(expectedStipend).replace(/[^\d]/g, "")
  );

  if (!expected || expected <= 0) {
    return 0;
  }

  if (internshipStipend >= expected) {
    return 100;
  }

  if (internshipStipend >= expected * 0.8) {
    return 70;
  }

  if (internshipStipend >= expected * 0.6) {
    return 40;
  }

  return 0;
};

export const getInternshipRecommendations =
  async (searchData = {}) => {
    const {
      skills = "",
      role = "",
      location = "",
      stipend = "",
      workType = "",
      experience = "",
    } = searchData;

    const internships = await Internship.find({
      isActive: true,
    }).lean();

    const userSkills = tokenize(skills);

    const scoredInternships =
      internships.map((internship) => {
        const skillScore =
          calculateSkillScore(
            userSkills,
            internship.skills
          );

        const roleScore =
          calculateRoleScore(
            role,
            internship.role
          );

        const locationScore =
          calculateLocationScore(
            location,
            internship.location
          );

        const workTypeScore =
          calculateWorkTypeScore(
            workType,
            internship.mode
          );

        const experienceScore =
          calculateExperienceScore(
            experience,
            internship.experience
          );

        const stipendScore =
          calculateStipendScore(
            stipend,
            internship.stipend
          );

        const matchScore = Math.round(
          skillScore * 0.40 +
            roleScore * 0.20 +
            locationScore * 0.15 +
            workTypeScore * 0.10 +
            experienceScore * 0.10 +
            stipendScore * 0.05
        );

        return {
          ...internship,
          matchScore,
        };
      });

    scoredInternships.sort(
      (a, b) => b.matchScore - a.matchScore
    );

    return scoredInternships.slice(0, 12);
  };