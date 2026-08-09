import Internship from "../models/internship.model.js";
import SavedInternship from "../models/savedInternship.model.js";
import InternshipApplication from "../models/internshipApplication.model.js";

// ============================================================
// SAMPLE INTERNSHIPS
// ============================================================

const SAMPLE_INTERNSHIPS = [
  {
    company: "Google",
    role: "Frontend Developer Intern",
    location: "Bengaluru",
    stipend: 45000,
    duration: "3 Months",
    mode: "Hybrid",
    skills: ["React", "JavaScript", "CSS"],
    experience: "Fresher",
    category: "Developer",
    description:
      "Work with frontend technologies and build scalable user interfaces.",
    applyUrl: "https://careers.google.com/",
  },

  {
    company: "Microsoft",
    role: "Cloud Engineering Intern",
    location: "Hyderabad",
    stipend: 50000,
    duration: "6 Months",
    mode: "On-site",
    skills: ["Azure", "C#", "Node.js"],
    experience: "Fresher",
    category: "Engineering",
    description:
      "Work on cloud infrastructure and engineering systems.",
    applyUrl: "https://careers.microsoft.com/",
  },

  {
    company: "Amazon",
    role: "SDE Intern",
    location: "Remote",
    stipend: 40000,
    duration: "3 Months",
    mode: "Remote",
    skills: ["Java", "DSA", "AWS"],
    experience: "Fresher",
    category: "Developer",
    description:
      "Build software solutions and solve real-world engineering problems.",
    applyUrl: "https://www.amazon.jobs/",
  },

  {
    company: "Adobe",
    role: "UI UX Design Intern",
    location: "Noida",
    stipend: 35000,
    duration: "4 Months",
    mode: "Hybrid",
    skills: ["Figma", "Design Systems", "CSS"],
    experience: "Fresher",
    category: "Design",
    description:
      "Design user experiences and contribute to product design systems.",
    applyUrl: "https://careers.adobe.com/",
  },

  {
    company: "Infosys",
    role: "Full Stack Developer Intern",
    location: "Pune",
    stipend: 25000,
    duration: "6 Months",
    mode: "On-site",
    skills: ["MERN", "MongoDB", "Express", "React", "Node.js"],
    experience: "Fresher",
    category: "Developer",
    description:
      "Work on full-stack applications using modern web technologies.",
    applyUrl: "https://www.infosys.com/careers/",
  },

  {
    company: "TCS",
    role: "Data Analyst Intern",
    location: "Chennai",
    stipend: 20000,
    duration: "3 Months",
    mode: "Remote",
    skills: ["Python", "SQL", "Power BI"],
    experience: "Fresher",
    category: "Data",
    description:
      "Analyze datasets and create meaningful business insights.",
    applyUrl: "https://www.tcs.com/careers",
  },

  {
    company: "Flipkart",
    role: "Backend Developer Intern",
    location: "Bengaluru",
    stipend: 38000,
    duration: "4 Months",
    mode: "Hybrid",
    skills: ["Node.js", "MongoDB", "Docker"],
    experience: "Fresher",
    category: "Developer",
    description:
      "Develop backend services and APIs for large-scale systems.",
    applyUrl: "https://www.flipkartcareers.com/",
  },

  {
    company: "Zoho",
    role: "Software Engineer Intern",
    location: "Chennai",
    stipend: 22000,
    duration: "6 Months",
    mode: "On-site",
    skills: ["Java", "Spring Boot", "MySQL"],
    experience: "Fresher",
    category: "Developer",
    description:
      "Build software products using Java and backend technologies.",
    applyUrl: "https://www.zoho.com/careers/",
  },

  {
    company: "Swiggy",
    role: "Product Design Intern",
    location: "Remote",
    stipend: 28000,
    duration: "3 Months",
    mode: "Remote",
    skills: ["Figma", "Prototyping", "UX Research"],
    experience: "Fresher",
    category: "Design",
    description:
      "Work on product design and user experience research.",
    applyUrl: "https://careers.swiggy.com/",
  },

  {
    company: "Paytm",
    role: "React Native Intern",
    location: "Noida",
    stipend: 30000,
    duration: "4 Months",
    mode: "Hybrid",
    skills: ["React Native", "JavaScript", "Redux"],
    experience: "Fresher",
    category: "Developer",
    description:
      "Build mobile applications using React Native.",
    applyUrl: "https://paytm.com/careers/",
  },
];

// ============================================================
// NORMALIZE
// ============================================================

const normalize = (value = "") =>
  value.toString().toLowerCase().trim();

// ============================================================
// CALCULATE AI MATCH SCORE
// ============================================================

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
  const stipend = Number(
    String(searchData.stipend || "").replace(/[^\d]/g, "")
  );

  const internshipSkills = Array.isArray(internship.skills)
    ? internship.skills.map(normalize)
    : [];

  // ==========================================================
  // SKILLS - MAX 50
  // ==========================================================

  if (userSkills.length > 0) {
    const matchedSkills = userSkills.filter((userSkill) =>
      internshipSkills.some(
        (internshipSkill) =>
          internshipSkill.includes(userSkill) ||
          userSkill.includes(internshipSkill)
      )
    );

    score += Math.min(
      50,
      matchedSkills.length * 15
    );
  }

  // ==========================================================
  // ROLE - 20
  // ==========================================================

  if (
    role &&
    normalize(internship.role).includes(role)
  ) {
    score += 20;
  } else if (
    role &&
    normalize(internship.category).includes(role)
  ) {
    score += 10;
  }

  // ==========================================================
  // LOCATION - 15
  // ==========================================================

  if (location) {
    const internshipLocation =
      normalize(internship.location);

    const internshipMode =
      normalize(internship.mode);

    if (
      internshipLocation.includes(location) ||
      (
        location === "remote" &&
        internshipMode === "remote"
      )
    ) {
      score += 15;
    }
  }

  // ==========================================================
  // WORK TYPE - 10
  // ==========================================================

  if (
    workType &&
    workType !== "all" &&
    normalize(internship.mode) === workType
  ) {
    score += 10;
  }

  // ==========================================================
  // EXPERIENCE - 5
  // ==========================================================

  if (
    experience &&
    normalize(internship.experience) === experience
  ) {
    score += 5;
  }

  // ==========================================================
  // STIPEND BONUS
  // ==========================================================

  if (
    stipend > 0 &&
    Number(internship.stipend) >= stipend
  ) {
    score += 5;
  }

  return Math.min(99, score);
};

// ============================================================
// RANK INTERNSHIPS
// ============================================================

const rankInternships = (
  internships = [],
  searchData = {}
) => {
  return internships
    .map((internship) => {
      const data =
        typeof internship?.toObject === "function"
          ? internship.toObject()
          : { ...internship };

      return {
        ...data,
        matchScore: calculateMatchScore(
          data,
          searchData
        ),
      };
    })
    .sort(
      (a, b) =>
        b.matchScore - a.matchScore
    );
};

// ============================================================
// ENSURE SAMPLE DATA
// ============================================================

const ensureInternships = async () => {
  const count =
    await Internship.countDocuments();

  if (count === 0) {
    await Internship.insertMany(
      SAMPLE_INTERNSHIPS
    );

    console.log(
      "Internship sample data inserted ✅"
    );
  }
};

// ============================================================
// GET ALL INTERNSHIPS
// GET /api/internship
// ============================================================

export const getInternships = async (
  req,
  res
) => {
  try {
    await ensureInternships();

    const internships =
      await Internship.find({
        isActive: true,
      }).sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      count: internships.length,
      internships,
    });
  } catch (error) {
    console.error(
      "Get internships error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch internships",
    });
  }
};

// ============================================================
// GET SINGLE INTERNSHIP
// GET /api/internship/:id
// ============================================================

export const getInternshipById = async (
  req,
  res
) => {
  try {
    const internship =
      await Internship.findById(
        req.params.id
      );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message:
          "Internship not found",
      });
    }

    res.json({
      success: true,
      internship,
    });
  } catch (error) {
    console.error(
      "Get internship by ID error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch internship",
    });
  }
};

// ============================================================
// AI SEARCH
// POST /api/internship/search
// ============================================================

export const searchInternships = async (
  req,
  res
) => {
  try {
    await ensureInternships();

    const {
      skills = "",
      role = "",
      location = "",
      stipend = "",
      workType = "",
      experience = "Fresher",
    } = req.body;

    const internships =
      await Internship.find({
        isActive: true,
      });

    const ranked =
      rankInternships(
        internships,
        {
          skills,
          role,
          location,
          stipend,
          workType,
          experience,
        }
      );

    const recommendations =
      ranked.slice(0, 6);

    res.json({
      success: true,
      count: recommendations.length,

      search: {
        skills,
        role,
        location,
        stipend,
        workType,
        experience,
      },

      recommendations,
    });
  } catch (error) {
    console.error(
      "Internship search error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to search internships",
    });
  }
};

// ============================================================
// SAVE / UNSAVE INTERNSHIP
// POST /api/internship/save
// ============================================================

export const saveInternship = async (
  req,
  res
) => {
  try {
    const userId = req.user._id;

    const { internshipId } =
      req.body;

    if (!internshipId) {
      return res.status(400).json({
        success: false,
        message:
          "Internship ID is required",
      });
    }

    const internship =
      await Internship.findById(
        internshipId
      );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message:
          "Internship not found",
      });
    }

    const existing =
      await SavedInternship.findOne({
        user: userId,
        internship: internshipId,
      });

    if (existing) {
      await SavedInternship.deleteOne({
        _id: existing._id,
      });

      return res.json({
        success: true,
        saved: false,
        message:
          "Internship removed from saved",
      });
    }

    const saved =
      await SavedInternship.create({
        user: userId,
        internship: internshipId,
      });

    res.status(201).json({
      success: true,
      saved: true,
      data: saved,
    });
  } catch (error) {
    console.error(
      "Save internship error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to save internship",
    });
  }
};

// ============================================================
// GET SAVED INTERNSHIPS
// GET /api/internship/saved
// ============================================================

export const getSavedInternships =
  async (req, res) => {
    try {
      const saved =
        await SavedInternship.find({
          user: req.user._id,
        })
          .populate("internship")
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        count: saved.length,
        internships: saved,
      });
    } catch (error) {
      console.error(
        "Get saved internships error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch saved internships",
      });
    }
  };

// ============================================================
// APPLY
// POST /api/internship/apply
// ============================================================

export const applyInternship = async (
  req,
  res
) => {
  try {
    const userId = req.user._id;

    const { internshipId } =
      req.body;

    if (!internshipId) {
      return res.status(400).json({
        success: false,
        message:
          "Internship ID is required",
      });
    }

    const internship =
      await Internship.findById(
        internshipId
      );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message:
          "Internship not found",
      });
    }

    const existing =
      await InternshipApplication.findOne({
        user: userId,
        internship: internshipId,
      });

    if (existing) {
      return res.status(400).json({
        success: false,
        message:
          "You have already applied",
        application: existing,
      });
    }

    const application =
      await InternshipApplication.create({
        user: userId,
        internship: internshipId,
        status: "applied",
      });

    res.status(201).json({
      success: true,
      message:
        "Internship application submitted successfully",
      application,
    });
    } catch (error) {
    console.error("================================");
    console.error("APPLY INTERNSHIP ERROR:");
    console.error(error);
    console.error("ERROR MESSAGE:", error.message);
    console.error("ERROR NAME:", error.name);
    console.error("================================");

    res.status(500).json({
        success: false,
        message: "Failed to apply",
        error: error.message,
    });
    }
};

// ============================================================
// GET APPLICATIONS
// GET /api/internship/applications
// ============================================================

export const getApplications = async (
  req,
  res
) => {
  try {
    const applications =
      await InternshipApplication.find({
        user: req.user._id,
      })
        .populate("internship")
        .sort({
          createdAt: -1,
        });

    res.json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error(
      "Get applications error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch applications",
    });
  }
};

// ============================================================
// UPDATE APPLICATION STATUS
// PATCH /api/internship/application/:id
// ============================================================

export const updateApplicationStatus =
  async (req, res) => {
    try {
      const { status } =
        req.body;

      const allowedStatuses = [
        "applied",
        "review",
        "interview",
        "selected",
        "rejected",
      ];

      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid application status",
        });
      }

      const application =
        await InternshipApplication.findOneAndUpdate(
          {
            _id: req.params.id,
            user: req.user._id,
          },
          {
            status,
          },
          {
            new: true,
          }
        ).populate("internship");

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            "Application not found",
        });
      }

      res.json({
        success: true,
        message:
          "Application status updated",
        application,
      });
    } catch (error) {
      console.error(
        "Update application error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update application",
      });
    }
  };
