import Note from "../models/note.js";

// =======================
// CREATE NOTE
// =======================
export const createNote = async (req, res) => {
  try {
    const {
      title,
      description,
      subject,
      branch,
      year,
      fileUrl,
    } = req.body;

    const note = await Note.create({
      title,
      description,
      subject,
      branch,
      year,
      fileUrl,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Note Uploaded Successfully 🚀",
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// GENERATE SMART NOTE
// =======================
export const generateNote = async (req, res) => {
  try {
    const { description, subject } = req.body;

    if (!description || description.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    const sentences = description
      .split(/[.!?]/)
      .map((item) => item.trim())
      .filter(Boolean);

    const summary =
      sentences.length >= 2
        ? `${sentences[0]}. ${sentences[1]}.`
        : description;

    const points =
      sentences.length > 0
        ? sentences.slice(0, 6)
        : [description];

    const keywords = [
      ...new Set(
        description
          .replace(/[^\w\s]/g, "")
          .split(" ")
          .filter((word) => word.length > 5)
      ),
    ].slice(0, 8);

    const examTips = [
      "Revise this topic twice.",
      "Practice previous year questions.",
      "Remember important definitions.",
      "Focus on keywords while revising.",
    ];

    const note = await Note.create({
      title: `${subject} Notes`,
      description,
      subject,
      summary,
      points,
      keywords,
      examTips,
      branch: "AI & ML",
      year: 2,
      fileUrl: "",
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Smart Notes Generated Successfully 🚀",
      note,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// GET ALL NOTES
// =======================
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find()
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};