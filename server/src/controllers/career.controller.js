import Career from "../models/Career.js";

// ============================================================
// SUBMIT CAREER APPLICATION
// POST /api/careers/apply
// ============================================================

export const submitApplication = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      role,
      resume,
      portfolio,
      message,
    } = req.body;

    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email and role are required.",
      });
    }

    // ----------------------------------------------------------
    // CREATE APPLICATION
    // ----------------------------------------------------------

    const application = await Career.create({
      name,
      email,
      phone,
      role,
      resume,
      portfolio,
      message,
    });

    // ----------------------------------------------------------
    // RESPONSE
    // ----------------------------------------------------------

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      application,
    });
  } catch (error) {
    console.error(
      "Career application error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to submit application.",
    });
  }
};

// ============================================================
// GET ALL APPLICATIONS
// GET /api/careers/applications
// ============================================================

export const getApplications = async (req, res) => {
  try {
    const applications = await Career.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error(
      "Get career applications error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications.",
    });
  }
};

// ============================================================
// UPDATE APPLICATION STATUS
// PATCH /api/careers/applications/:id/status
// ============================================================

export const updateApplicationStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    // ----------------------------------------------------------
    // VALIDATE STATUS
    // ----------------------------------------------------------

    const allowedStatuses = [
      "pending",
      "reviewing",
      "shortlisted",
      "rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status.",
      });
    }

    // ----------------------------------------------------------
    // UPDATE APPLICATION
    // ----------------------------------------------------------

    const application =
      await Career.findByIdAndUpdate(
        req.params.id,
        { status },
        {
          new: true,
          runValidators: true,
        }
      );

    // ----------------------------------------------------------
    // NOT FOUND
    // ----------------------------------------------------------

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    // ----------------------------------------------------------
    // RESPONSE
    // ----------------------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Application status updated successfully.",
      application,
    });
  } catch (error) {
    console.error(
      "Update career application error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update application status.",
    });
  }
};