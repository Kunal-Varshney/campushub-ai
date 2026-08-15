import "dotenv/config";
import Note from "../models/note.js";
import Groq from "groq-sdk";

console.log("GROQ_API_KEY =", process.env.GROQ_API_KEY);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

console.log(
  "Groq Key:",
  process.env.GROQ_API_KEY ? "Loaded ✅" : "Missing ❌"
);

// ============================================================
// CREATE NOTE
// POST /api/notes
// ============================================================

export const createNote = async (req, res) => {
  try {
    const {
      title,
      description,
      subject,
      category,
      branch,
      year,
      fileUrl,
    } = req.body;

    const note = await Note.create({
      title,
      description,
      subject,
      category: category || subject || "General",
      branch,
      year,
      fileUrl,
      uploadedBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Note Uploaded Successfully 🚀",
      note,
    });

  } catch (error) {
    console.error("CREATE NOTE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ============================================================
// AI SMART NOTE GENERATOR
// POST /api/notes/generate
// ============================================================

export const generateNote = async (req, res) => {
  try {
    const {
      description,
      subject,
      category,
      branch,
      year,
    } = req.body;

    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (!description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Description required",
      });
    }

    // ----------------------------------------------------------
    // GROQ PROMPT
    // ----------------------------------------------------------

    const prompt = `
You are CampusHub AI study assistant.

Create detailed, clear and exam-focused study notes.

Subject:
${subject || "General"}

Category:
${category || subject || "General"}

Topic Content:
${description}

Return ONLY valid JSON.

Format:

{
  "title": "Topic name",
  "summary": "Short and clear explanation",
  "points": [
    "point 1",
    "point 2",
    "point 3"
  ],
  "keywords": [
    "keyword1",
    "keyword2"
  ],
  "examTips": [
    "tip1",
    "tip2"
  ]
}
`;

    // ----------------------------------------------------------
    // GROQ API
    // ----------------------------------------------------------

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    });

    let text =
      completion?.choices?.[0]?.message?.content || "";

    text = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    if (!text) {
      return res.status(500).json({
        success: false,
        message: "AI returned an empty response",
      });
    }

    // ----------------------------------------------------------
    // PARSE AI RESPONSE
    // ----------------------------------------------------------

    let aiNotes;

    try {
      aiNotes = JSON.parse(text);
    } catch (parseError) {
      console.error("AI JSON PARSE ERROR:", parseError);
      console.error("AI RESPONSE:", text);

      return res.status(500).json({
        success: false,
        message: "AI returned an invalid response",
      });
    }

    // ----------------------------------------------------------
    // SAVE AI NOTE
    // ----------------------------------------------------------

    const note = await Note.create({
      title:
        aiNotes.title ||
        `${subject || "General"} Notes`,

      description,

      subject:
        subject || "General",

      category:
        category ||
        subject ||
        "General",

      summary:
        aiNotes.summary || "",

      points:
        Array.isArray(aiNotes.points)
          ? aiNotes.points
          : [],

      keywords:
        Array.isArray(aiNotes.keywords)
          ? aiNotes.keywords
          : [],

      examTips:
        Array.isArray(aiNotes.examTips)
          ? aiNotes.examTips
          : [],

      branch:
        branch || "",

      year:
        year || null,

      // AI generated notes do not have an uploaded file.
      // Model requires fileUrl, so use a valid placeholder.
      fileUrl:
        "ai-generated",

      uploadedBy:
        req.user.id,
    });

    // ----------------------------------------------------------
    // RESPONSE
    // ----------------------------------------------------------

    return res.status(201).json({
      success: true,
      message: "AI Notes Generated Successfully 🚀",
      note,
    });

  } catch (error) {
    console.error("GROQ / GENERATE NOTE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ============================================================
// GET MY NOTES
// GET /api/notes
// ============================================================

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      uploadedBy: req.user.id,
    })
      .populate(
        "uploadedBy",
        "name email"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      notes,
    });

  } catch (error) {
    console.error("GET NOTES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};