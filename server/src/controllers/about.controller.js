import About from "../models/About.js";

// ============================================================
// GET ABOUT PAGE DATA
// GET /api/about
// ============================================================

export const getAboutData = async (req, res) => {
  try {
    const about = await About.findOne().lean();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About page data not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    console.error("Get About Data Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch About page data",
      error: error.message,
    });
  }
};

// ============================================================
// CREATE ABOUT PAGE DATA
// POST /api/about
// ============================================================

export const createAboutData = async (req, res) => {
  try {
    console.log("CREATE ABOUT REQUEST BODY:", req.body);

    const existingAbout = await About.findOne();

    if (existingAbout) {
      return res.status(409).json({
        success: false,
        message: "About page data already exists",
      });
    }

    const about = await About.create(req.body);

    return res.status(201).json({
      success: true,
      message: "About page data created successfully",
      data: about,
    });
  } catch (error) {
    console.error("Create About Data Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create About page data",
      error: error.message,
    });
  }
};

// ============================================================
// UPDATE ABOUT PAGE DATA
// PUT /api/about
// ============================================================

export const updateAboutData = async (req, res) => {
  try {
    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About page data not found",
      });
    }

    const updatedAbout = await About.findByIdAndUpdate(
      about._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    return res.status(200).json({
      success: true,
      message: "About page data updated successfully",
      data: updatedAbout,
    });
  } catch (error) {
    console.error("Update About Data Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update About page data",
      error: error.message,
    });
  }
};

// ============================================================
// DELETE ABOUT PAGE DATA
// DELETE /api/about
// ============================================================

export const deleteAboutData = async (req, res) => {
  try {
    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About page data not found",
      });
    }

    await About.findByIdAndDelete(about._id);

    return res.status(200).json({
      success: true,
      message: "About page data deleted successfully",
    });
  } catch (error) {
    console.error("Delete About Data Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete About page data",
      error: error.message,
    });
  }
};