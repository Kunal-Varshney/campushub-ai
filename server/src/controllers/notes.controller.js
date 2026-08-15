import "dotenv/config";
import Note from "../models/note.js";
import Groq from "groq-sdk";

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
      description: description || "",
      subject: subject || "General",
      category: category || subject || "General",
      branch: branch || "",
      year: year || "",
      fileUrl: fileUrl || "",
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
      topic,
    } = req.body;


    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (!description?.trim() && !topic?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter the topic or notes requirement",
      });
    }


    const userRequirement =
      description?.trim() ||
      topic?.trim();


    // ----------------------------------------------------------
    // GROQ PROMPT
    // ----------------------------------------------------------

    const prompt = `
You are CampusHub AI, an advanced AI study assistant for college students.

The student can ask for notes about ANY subject, technology, concept,
programming language, university topic, exam topic, or technical topic.

There are NO fixed subjects or categories.

Student's notes requirement:
${userRequirement}

Subject:
${subject || "Not specified"}

Category:
${category || "Not specified"}

Branch:
${branch || "Not specified"}

Year:
${year || "Not specified"}


YOUR TASK:

Understand exactly what the student is asking for.

Generate complete, useful and exam-focused study notes.

If the student mentions a broad subject, identify the important topics
inside that subject.

If the student mentions a specific topic, focus mainly on that topic.

If the student asks for programming-related notes, include concepts,
examples and important points where useful.

If the student asks for exam preparation, prioritize definitions,
concepts, important questions, key points and exam tips.

If the student asks for a specific topic, do NOT force it into a
predefined category.

Generate the content according to the student's actual requirement.


Return ONLY valid JSON.

Use exactly this structure:

{
  "title": "Clear title for the notes",

  "subject": "Actual subject or technology",

  "category": "Relevant category",

  "summary": "Clear and easy explanation of the topic",

  "topics": [
    "Important topic 1",
    "Important topic 2",
    "Important topic 3",
    "Important topic 4"
  ],

  "points": [
    "Important concept 1",
    "Important concept 2",
    "Important concept 3",
    "Important concept 4",
    "Important concept 5"
  ],

  "keywords": [
    "keyword1",
    "keyword2",
    "keyword3"
  ],

  "examTips": [
    "Exam tip 1",
    "Exam tip 2",
    "Exam tip 3"
  ]
}

IMPORTANT:

- Return ONLY JSON.
- Do not use markdown.
- Do not use code fences.
- Do not add explanations outside JSON.
- Keep the notes educational and accurate.
- Use simple language where possible.
- Generate enough content to actually help the student.
`;


    // ----------------------------------------------------------
    // GROQ API
    // ----------------------------------------------------------

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content:
              "You are CampusHub AI study assistant. Always return valid JSON only.",
          },

          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.4,

        response_format: {
          type: "json_object",
        },
      });


    let text =
      completion?.choices?.[0]?.message?.content || "";


    text = text.trim();


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
      console.error(
        "AI JSON PARSE ERROR:",
        parseError
      );

      console.error(
        "AI RESPONSE:",
        text
      );

      return res.status(500).json({
        success: false,
        message:
          "AI returned an invalid response",
      });
    }


    // ----------------------------------------------------------
    // NORMALIZE AI DATA
    // ----------------------------------------------------------

    const finalSubject =
      aiNotes.subject ||
      subject ||
      "General";


    const finalCategory =
      aiNotes.category ||
      category ||
      finalSubject;


    const finalTitle =
      aiNotes.title ||
      `${finalSubject} Notes`;


    const topics =
      Array.isArray(aiNotes.topics)
        ? aiNotes.topics
        : [];


    const points =
      Array.isArray(aiNotes.points)
        ? aiNotes.points
        : [];


    const keywords =
      Array.isArray(aiNotes.keywords)
        ? aiNotes.keywords
        : [];


    const examTips =
      Array.isArray(aiNotes.examTips)
        ? aiNotes.examTips
        : [];


    // ----------------------------------------------------------
    // SAVE AI GENERATED NOTE
    // ----------------------------------------------------------

    const note =
      await Note.create({

        title: finalTitle,

        description:
          userRequirement,

        subject:
          finalSubject,

        category:
          finalCategory,

        branch:
          branch || "",

        year:
          year || "",

        summary:
          aiNotes.summary || "",

        topics,

        points,

        keywords,

        examTips,

        // AI generated note does not require a real file
        fileUrl:
          "ai-generated",

        uploadedBy:
          req.user.id,

        status:
          "approved",
      });


    // ----------------------------------------------------------
    // RESPONSE
    // ----------------------------------------------------------

    return res.status(201).json({

      success: true,

      message:
        "AI Notes Generated Successfully 🚀",

      note,

    });

  } catch (error) {

    console.error(
      "GROQ / GENERATE NOTE ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message,

    });
  }
};


// ============================================================
// GET MY NOTES
// GET /api/notes
// ============================================================

export const getNotes = async (req, res) => {
  try {

    const notes =
      await Note.find({
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

    console.error(
      "GET NOTES ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message,

    });
  }
};