import mongoose from "mongoose";

import Internship from "../models/internship.model.js";
import SavedInternship from "../models/savedInternship.model.js";
import InternshipApplication from "../models/internshipApplication.model.js";

import {
  getInternshipRecommendations,
} from "../services/internshipAI.service.js";


// ============================================================
// GET ALL INTERNSHIPS
// GET /api/internship
// ============================================================

export const getInternships = async (req, res) => {
  try {
    const {
      location,
      category,
      mode,
      search,
      minStipend,
      maxStipend,
    } = req.query;

    const filter = {
      isActive: true,
    };

    if (location) {
      filter.location = location;
    }

    if (category) {
      filter.category = category;
    }

    if (mode) {
      filter.mode = mode;
    }

    if (minStipend) {
      filter.stipend = {
        ...filter.stipend,
        $gte: Number(minStipend),
      };
    }

    if (maxStipend) {
      filter.stipend = {
        ...filter.stipend,
        $lte: Number(maxStipend),
      };
    }

    if (search?.trim()) {
      const regex = new RegExp(search.trim(), "i");

      filter.$or = [
        { company: regex },
        { role: regex },
        { category: regex },
        { skills: regex },
      ];
    }

    const internships = await Internship.find(filter)
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      count: internships.length,
      internships,
    });
  } catch (error) {
    console.error("GET INTERNSHIPS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch internships",
    });
  }
};


// ============================================================
// GET SINGLE INTERNSHIP
// GET /api/internship/:id
// ============================================================

export const getInternshipById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid internship ID",
      });
    }

    const internship = await Internship.findOne({
      _id: id,
      isActive: true,
    }).lean();

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    return res.status(200).json({
      success: true,
      internship,
    });
  } catch (error) {
    console.error("GET INTERNSHIP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch internship",
    });
  }
};


// ============================================================
// AI INTERNSHIP RECOMMENDATIONS
// POST /api/internship/search
// ============================================================

export const searchInternships = async (req, res) => {
  try {
    const recommendations =
      await getInternshipRecommendations(req.body || {});

    return res.status(200).json({
      success: true,
      internships: recommendations,
    });
  } catch (error) {
    console.error("INTERNSHIP SEARCH ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to generate internship recommendations",
    });
  }
};


// ============================================================
// SAVE / UNSAVE
// POST /api/internship/save
// ============================================================

export const toggleSavedInternship = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { internshipId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(internshipId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid internship ID",
      });
    }

    const internship = await Internship.findOne({
      _id: internshipId,
      isActive: true,
    });

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    const existing = await SavedInternship.findOne({
      user: userId,
      internship: internshipId,
    });

    if (existing) {
      await SavedInternship.deleteOne({
        _id: existing._id,
      });

      return res.status(200).json({
        success: true,
        saved: false,
        message: "Internship removed from saved list",
      });
    }

    await SavedInternship.create({
      user: userId,
      internship: internshipId,
    });

    return res.status(200).json({
      success: true,
      saved: true,
      message: "Internship saved successfully",
    });
  } catch (error) {
    console.error("TOGGLE SAVE ERROR:", error);

    if (error.code === 11000) {
      return res.status(200).json({
        success: true,
        saved: true,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to save internship",
    });
  }
};


// ============================================================
// GET SAVED INTERNSHIPS
// GET /api/internship/saved
// ============================================================

export const getSavedInternships = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const saved = await SavedInternship.find({
      user: userId,
    })
      .populate("internship")
      .sort({
        createdAt: -1,
      })
      .lean();

    const internships = saved
      .map((item) => item.internship)
      .filter(Boolean);

    return res.status(200).json({
      success: true,
      count: internships.length,
      internships,
    });
  } catch (error) {
    console.error("GET SAVED INTERNSHIPS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch saved internships",
    });
  }
};


// ============================================================
// APPLY
// POST /api/internship/apply
// ============================================================

export const applyInternship = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { internshipId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(internshipId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid internship ID",
      });
    }

    const internship = await Internship.findOne({
      _id: internshipId,
      isActive: true,
    });

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    const existing = await InternshipApplication.findOne({
      user: userId,
      internship: internshipId,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this internship",
        application: existing,
      });
    }

    const application = await InternshipApplication.create({
      user: userId,
      internship: internshipId,
      status: "applied",
    });

    await Internship.findByIdAndUpdate(internshipId, {
      $inc: {
        applicantsCount: 1,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("APPLY INTERNSHIP ERROR:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this internship",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to apply for internship",
    });
  }
};


// ============================================================
// GET MY APPLICATIONS
// GET /api/internship/applications
// ============================================================

export const getMyApplications = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const applications = await InternshipApplication.find({
      user: userId,
    })
      .populate("internship")
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("GET APPLICATIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};


// ============================================================
// UPDATE APPLICATION STATUS
// PATCH /api/internship/application/:id
// ============================================================

export const updateApplicationStatus = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "applied",
      "review",
      "interview",
      "selected",
      "rejected",
      "withdrawn",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    const application = await InternshipApplication.findOne({
      _id: id,
      user: userId,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status;
    application.updatedAtStatus = new Date();

    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application status updated",
      application,
    });
  } catch (error) {
    console.error("UPDATE APPLICATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};


// ============================================================
// WITHDRAW APPLICATION
// DELETE /api/internship/application/:id
// ============================================================

export const withdrawApplication = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    const application = await InternshipApplication.findOne({
      _id: id,
      user: userId,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = "withdrawn";
    application.updatedAtStatus = new Date();

    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application withdrawn successfully",
      application,
    });
  } catch (error) {
    console.error("WITHDRAW APPLICATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update application",
    });
  }
};