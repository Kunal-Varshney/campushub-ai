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
// POST /api/notes/create
// ============================================================

export const createNote = async (req, res) => {
  try {
    const {
      title,
      description,
      subject,
      topic,
      category,
      branch,
      year,
      fileUrl,
    } = req.body;

    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    // ----------------------------------------------------------
    // CREATE NOTE
    // ----------------------------------------------------------

    const note = await Note.create({
      title: title.trim(),

      description:
        description?.trim() || "",

      subject:
        subject?.trim() || "General",

      topic:
        topic?.trim() || "",

      category:
        category?.trim() ||
        subject?.trim() ||
        "General",

      branch:
        branch?.trim() || "",

      year:
        year || "",

      fileUrl:
        fileUrl || "",

      uploadedBy:
        req.user.id,

      status:
        "pending",
    });

    // ----------------------------------------------------------
    // RESPONSE
    // ----------------------------------------------------------

    return res.status(201).json({
      success: true,
      message: "Note Uploaded Successfully 🚀",
      note,
    });

  } catch (error) {
    console.error(
      "CREATE NOTE ERROR:",
      error
    );

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
      difficulty,
    } = req.body;


    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (!description?.trim() && !topic?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter the topic or notes requirement",
      });
    }


    const userRequirement =
      description?.trim() ||
      topic?.trim();


    // ==========================================================
    // SMART AI PROMPT
    // ==========================================================

    const prompt = `
You are CampusHub AI, an intelligent study assistant for college students.

Your most important job is to understand EXACTLY what the student is
asking and answer that requirement completely.

The student's request is the PRIMARY instruction.

Do NOT force every answer into the same structure.

Do NOT automatically add sections such as:
- Keywords
- Exam Tips
- Key Benefits
- Advantages
- Disadvantages
- Extra Information

unless they are relevant to the student's actual request.

------------------------------------------------------------
STUDENT REQUEST
------------------------------------------------------------

${userRequirement}

------------------------------------------------------------
STUDENT CONTEXT
------------------------------------------------------------

Subject:
${subject || "Not specified"}

Category:
${category || "Not specified"}

Branch:
${branch || "Not specified"}

Year:
${year || "Not specified"}

Difficulty:
${difficulty || "Intermediate"}


============================================================
UNDERSTAND THE REQUEST FIRST
============================================================

Before generating the answer, determine what the student actually wants.

Examples:

If the student asks:
"Types of Array"

The answer should primarily contain:

1. What is an Array?
2. Types of Arrays
3. Explanation of each type
4. Simple examples where useful
5. Important differences if they help understanding

Do NOT spend most of the answer discussing keywords or exam tips.

------------------------------------------------------------

If the student asks:
"Explain OOP"

The answer should contain:

1. Definition of OOP
2. Explanation of OOP
3. Main principles/concepts of OOP
4. Explanation of each principle
5. Simple examples
6. Related information that helps understand OOP

------------------------------------------------------------

If the student asks:
"What are the advantages of DBMS?"

Focus mainly on the advantages of DBMS.

You may briefly explain DBMS first if necessary for context.

Do NOT generate unrelated sections.

------------------------------------------------------------

If the student asks:
"Explain binary search with example"

Provide:

1. What binary search is
2. How it works
3. Step-by-step explanation
4. Example
5. Time complexity if relevant

------------------------------------------------------------

If the student asks:
"Prepare notes for Operating System"

Then create broader structured notes covering important OS concepts.

------------------------------------------------------------

If the student asks for exam preparation:

Include exam-focused information such as:
- important definitions
- important concepts
- commonly asked areas
- exam tips
- important questions

ONLY when exam preparation is actually requested or clearly relevant.


============================================================
CONTENT RULES
============================================================

1. ANSWER THE EXACT QUESTION FIRST.

2. Give a complete answer to the requested topic.

3. Add a small amount of useful extra information only when it helps
   the student understand the topic better.

4. Do not add unrelated information just to make the answer longer.

5. If the student asks for "types", clearly explain the types.

6. If the student asks for "definition", give the definition first.

7. If the student asks "difference between X and Y", create a clear
   comparison.

8. If the student asks "advantages", focus on advantages.

9. If the student asks "disadvantages", focus on disadvantages.

10. If the student asks "example", provide examples.

11. If programming is involved, include code or pseudocode only when
    useful or requested.

12. Use simple student-friendly language.

13. Maintain technically accurate information.

14. Use headings and subheadings whenever they improve readability.

15. Do not unnecessarily repeat the same information.

16. Do not create generic sections just because they exist in the
    response format.

17. The answer should feel like a knowledgeable teacher explaining
    the exact question to the student.

18. If a concept naturally has types, principles, components, steps,
    features, examples, applications, advantages, disadvantages,
    complexity, or other important parts, include those parts ONLY
    when they are relevant to understanding the requested topic.

19. Do not assume that every topic needs "exam tips".

20. Do not assume that every topic needs "keywords".

21. Do not assume that every topic needs "key points".

22. Give enough detail to completely answer the student's request,
    but avoid unnecessary filler.


============================================================
OUTPUT FORMAT
============================================================

Return ONLY valid JSON.

Use this structure:

{
  "title": "Clear title based on the student's request",

  "subject": "Actual subject or technology",

  "category": "Relevant category",

  "answer": {
    "introduction": "Direct introduction/definition answering the student's request",

    "sections": [
      {
        "heading": "Relevant heading",
        "content": "Clear explanation of this part",
        "points": [
          "Useful point if applicable",
          "Useful point if applicable"
        ],
        "examples": [
          "Example if useful"
        ]
      }
    ]
  },

  "keyPoints": [
    "Only include the most important points if they are useful"
  ],

  "keywords": [
    "Only include relevant keywords"
  ],

  "examTips": [
    "Only include these when exam preparation or exam relevance is appropriate"
  ]
}


============================================================
IMPORTANT OUTPUT RULES
============================================================

- Return ONLY valid JSON.
- Do not use Markdown code fences.
- Do not add text outside JSON.
- Do not create empty unnecessary sections.
- Do not force keywords, exam tips, advantages, disadvantages,
  examples, or other sections when they are not relevant.
- The "sections" must be based on the student's actual question.
- "introduction" must directly answer the student's request.
- If the student asks for multiple things, answer ALL of them.
- If the student asks for "types", explain ALL important types.
- If the student asks for a comparison, include a clear comparison.
- If the student asks for an example, include an example.
- If the student asks for an explanation, explain the concept properly.
- Keep the answer educational, complete and easy to read.
`;


    // ==========================================================
    // GROQ API
    // ==========================================================

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: `
You are CampusHub AI.

You are a highly intelligent college study assistant.

Understand the student's exact requirement before answering.

The student's question always has priority over any predefined
answer structure.

Return valid JSON only.
`,
          },

          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.3,

        response_format: {
          type: "json_object",
        },
      });


    // ==========================================================
    // GET AI RESPONSE
    // ==========================================================

    let text =
      completion?.choices?.[0]?.message?.content || "";

    text = text.trim();


    if (!text) {
      return res.status(500).json({
        success: false,
        message:
          "AI returned an empty response",
      });
    }


    // ==========================================================
    // PARSE JSON
    // ==========================================================

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


    // ==========================================================
    // NORMALIZE DATA
    // ==========================================================

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


    const answer =
      aiNotes.answer || {};


    const introduction =
      typeof answer.introduction === "string"
        ? answer.introduction
        : "";


    const sections =
      Array.isArray(answer.sections)
        ? answer.sections
        : [];


    const normalizedSections =
      sections.map((section) => ({
        heading:
          typeof section?.heading === "string"
            ? section.heading
            : "",

        content:
          typeof section?.content === "string"
            ? section.content
            : "",

        points:
          Array.isArray(section?.points)
            ? section.points
            : [],

        examples:
          Array.isArray(section?.examples)
            ? section.examples
            : [],
      }));


    const keyPoints =
      Array.isArray(aiNotes.keyPoints)
        ? aiNotes.keyPoints
        : [];


    const keywords =
      Array.isArray(aiNotes.keywords)
        ? aiNotes.keywords
        : [];


    const examTips =
      Array.isArray(aiNotes.examTips)
        ? aiNotes.examTips
        : [];


    // ==========================================================
    // SAVE AI NOTE
    // ==========================================================

    const note =
      await Note.create({

        title:
          finalTitle,

        description:
          userRequirement,

        subject:
          finalSubject,

        topic:
          topic?.trim() || "",

        category:
          finalCategory,

        branch:
          branch || "",

        year:
          year || "",

        summary:
          introduction,

        topics:
          normalizedSections
            .map((section) => section.heading)
            .filter(Boolean),

        points:
          keyPoints,

        keywords,

        examTips,

        answer: {
          introduction,

          sections:
            normalizedSections,
        },

        fileUrl:
          "ai-generated",

        uploadedBy:
          req.user.id,

        status:
          "approved",
      });


    // ==========================================================
    // RESPONSE
    // ==========================================================

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