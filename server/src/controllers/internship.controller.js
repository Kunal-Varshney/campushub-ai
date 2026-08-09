import Internship from "../models/internship.model.js";

// ============================================================
// GET ALL INTERNSHIPS
// GET /api/internships
// ============================================================

export const getInternships = async (req, res) => {
  try {
    const {
      search,
      location,
      category,
      salary,
      remoteOnly,
      sortBy,
    } = req.query;

    let filter = {
      isActive: true,
    };

    // Search
    if (search) {
      filter.$or = [
        { role: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { skills: { $regex: search, $options: "i" } },
      ];
    }

    // Location
    if (location && location !== "All") {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    // Category
    if (category && category !== "All") {
      filter.category = category;
    }

    // Salary
    if (salary === "Below 25k") {
      filter.stipend = { $lt: 25000 };
    }

    if (salary === "25k - 40k") {
      filter.stipend = {
        $gte: 25000,
        $lte: 40000,
      };
    }

    if (salary === "Above 40k") {
      filter.stipend = { $gt: 40000 };
    }

    // Remote only
    if (remoteOnly === "true") {
      filter.mode = "Remote";
    }

    // Sorting
    let sort = { createdAt: -1 };

    if (sortBy === "Highest Stipend") {
      sort = { stipend: -1 };
    }

    if (sortBy === "Best Match") {
      sort = { matchScore: -1 };
    }

    if (sortBy === "Newest") {
      sort = { createdAt: -1 };
    }

    if (sortBy === "Most Popular") {
      sort = { company: 1 };
    }

    const internships = await Internship.find(filter).sort(sort);

    res.status(200).json({
      success: true,
      count: internships.length,
      internships,
    });
  } catch (error) {
    console.error("Get internships error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch internships",
    });
  }
};

// ============================================================
// GET SINGLE INTERNSHIP
// GET /api/internships/:id
// ============================================================

export const getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    res.status(200).json({
      success: true,
      internship,
    });
  } catch (error) {
    console.error("Get internship error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch internship",
    });
  }
};

// ============================================================
// SEARCH / AI RECOMMENDATION
// GET /api/internships/search
// ============================================================

export const searchInternships = async (req, res) => {
  try {
    const {
      skills,
      role,
      location,
      workType,
      experience,
      stipend,
    } = req.query;

    const internships = await Internship.find({
      isActive: true,
    });

    let results = internships.map((internship) => {
      let score = internship.matchScore || 0;

      // Skills matching
      if (skills) {
        const userSkills = skills
          .split(",")
          .map((skill) => skill.trim().toLowerCase())
          .filter(Boolean);

        const matchedSkills = internship.skills.filter((skill) =>
          userSkills.some((userSkill) =>
            skill.toLowerCase().includes(userSkill)
          )
        );

        score += matchedSkills.length * 5;
      }

      // Role matching
      if (
        role &&
        internship.role.toLowerCase().includes(role.toLowerCase())
      ) {
        score += 10;
      }

      // Location matching
      if (
        location &&
        internship.location
          .toLowerCase()
          .includes(location.toLowerCase())
      ) {
        score += 10;
      }

      // Work type
      if (
        workType &&
        workType !== "Remote" &&
        internship.mode === workType
      ) {
        score += 5;
      }

      // Experience
      if (
        experience &&
        internship.experience.toLowerCase() ===
          experience.toLowerCase()
      ) {
        score += 5;
      }

      // Stipend
      if (stipend) {
        const expectedStipend = Number(
          String(stipend).replace(/[^\d]/g, "")
        );

        if (
          expectedStipend &&
          internship.stipend >= expectedStipend
        ) {
          score += 5;
        }
      }

      return {
        ...internship.toObject(),
        calculatedMatchScore: Math.min(score, 100),
      };
    });

    // Sort highest match first
    results.sort(
      (a, b) =>
        b.calculatedMatchScore -
        a.calculatedMatchScore
    );

    // Return top 6
    results = results.slice(0, 6);

    res.status(200).json({
      success: true,
      count: results.length,
      internships: results,
    });
  } catch (error) {
    console.error("Search internships error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to search internships",
    });
  }
};
