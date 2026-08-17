import Note from "../models/note.js";
import Groq from "groq-sdk";

// ============================================================
// GROQ CONFIG
// ============================================================

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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

    // ==========================================================
    // VALIDATION
    // ==========================================================

    if (!description?.trim() && !topic?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a topic or notes requirement",
      });
    }

    const userRequirement =
      description?.trim() || topic?.trim();

    // ==========================================================
    // SMART NOTES PROMPT
    // ==========================================================

    const prompt = `
You are CampusHub AI — an intelligent Smart Notes Generator
for college students.

Your job is to convert the student's input into COMPLETE,
WELL-STRUCTURED, STUDY-READY COLLEGE NOTES.

IMPORTANT:

The student's input may be extremely short.

Examples:

"Types of Array"
"OOP"
"DBMS"
"Normalization"
"Binary Search"
"Operating System"

A short input DOES NOT mean the student wants a short answer.

SHORT INPUT = TOPIC
NOT = SHORT NOTES.

Understand the requested topic and generate proper academic
notes covering the important concepts required to understand,
learn, revise and study that topic.

============================================================
STUDENT REQUEST
============================================================

${userRequirement}

============================================================
STUDENT CONTEXT
============================================================

Subject:
${subject || "Not specified"}

Category:
${category || "Not specified"}

Branch:
${branch || "Not specified"}

Year:
${year || "Not specified"}

Learning Level:
${difficulty || "Intermediate"}


============================================================
CORE SMART NOTES RULE
============================================================

First understand exactly what topic the student wants notes for.

Then determine the natural academic scope of that topic.

Then create COMPLETE STUDY NOTES.

Do NOT simply give a short chatbot-style answer.

The result must feel like notes a college student could actually
study from.

For example:

Student input:

"Types of Array"

The output should naturally contain:

- Title
- Definition / Introduction
- Types of Arrays
- One-Dimensional Array
- Two-Dimensional Array
- Multidimensional Array
- Explanation of each type
- Examples
- Comparison where useful
- Important Points
- Quick Revision
- Exam-oriented points/questions when relevant

Student input:

"OOP"

The output should naturally contain:

- Definition
- Introduction
- OOP concept
- Main principles
- Encapsulation
- Abstraction
- Inheritance
- Polymorphism
- Explanation of each principle
- Examples
- Applications
- Important Points
- Quick Revision

Student input:

"Binary Search"

The output should naturally contain:

- Definition
- Concept
- Requirements
- Working
- Step-by-step algorithm
- Example
- Complexity
- Advantages/limitations if relevant
- Important Points
- Quick Revision

============================================================
WHAT GOOD STUDY NOTES SHOULD CONTAIN
============================================================

Depending on the topic, include relevant sections such as:

1. Title
2. Definition / Introduction
3. Concept Explanation
4. Types
5. Components
6. Principles
7. Steps / Working
8. Algorithms
9. Examples
10. Comparison
11. Diagram Explanation
12. Formula
13. Code / Pseudocode
14. Applications
15. Advantages
16. Disadvantages
17. Important Points
18. Quick Revision
19. Exam Questions / Exam Points

IMPORTANT:

These are NOT fixed sections.

Only include sections that naturally belong to the requested topic.

Never create irrelevant sections simply to make the answer longer.

============================================================
COMPLETENESS RULE
============================================================

DO NOT stop after a basic definition.

DO NOT generate only 4-5 generic points.

If the topic contains important types, explain them.

If it contains principles, explain them.

If it contains components, explain them.

If it contains steps, explain them.

If examples help understanding, provide them.

If comparison helps understanding, provide it.

If complexity is relevant, include it.

If code is relevant, provide a small correct example.

If formulas are relevant, include them.

The notes should be complete enough that a college student can
study the requested topic from the generated notes.

However, DO NOT add unrelated information.

============================================================
TOPIC-SPECIFIC BEHAVIOR
============================================================

If the student asks for TYPES:

Example:
"Types of Array"

Generate proper notes about the concept and then explain
all important types.

If the student asks for a CONCEPT:

Example:
"OOP"

Explain the concept and all major fundamentals required to
understand it.

If the student asks for a SPECIFIC CONCEPT:

Example:
"Binary Search"

Explain definition, working, algorithm, example and complexity.

If the student asks for a COMPARISON:

Example:
"Stack vs Queue"

Explain both concepts and then provide a clear comparison.

If the student asks for ADVANTAGES:

Example:
"Advantages of DBMS"

Focus mainly on DBMS advantages, but give enough introduction
to understand the context.

Do NOT generate an entire DBMS chapter.

If the student asks for a BROAD TOPIC:

Example:
"Operating System"

Generate broader chapter-style notes covering the major
fundamental concepts.

============================================================
LEARNING LEVEL
============================================================

Beginner:

Use simple student-friendly language and easy examples.

Intermediate:

Give complete conceptual explanations with useful technical
details.

Advanced:

Give deeper technical explanations, implementation details,
edge cases and complexity where relevant.

============================================================
TEXT QUALITY
============================================================

The generated content must look like genuine college study notes.

Use:

- Clear headings
- Numbered sections
- Subheadings
- Short paragraphs
- Bullet points
- Examples
- Comparisons
- Code when relevant
- Quick revision points

Avoid:

- Chatbot conversation
- "Sure, here is..."
- "I hope this helps"
- Unnecessary filler
- Repetition
- Very long unbroken paragraphs
- Generic AI language

============================================================
IMPORTANT POINTS
============================================================

Include Important Points when useful.

They should contain only the most important facts.

Do not repeat the complete notes.

============================================================
QUICK REVISION
============================================================

Include Quick Revision when useful.

Make it short and revision-friendly.

Example:

• 1D Array → Single sequence
• 2D Array → Rows and columns
• 3D+ → Multidimensional structure

============================================================
EXAM CONTENT
============================================================

If the topic is academic or clearly exam-oriented, include
relevant exam points or important questions.

Do NOT force exam content into every topic.

============================================================
OUTPUT FORMAT
============================================================

Return ONLY valid JSON.

Use exactly this structure:

{
  "title": "Clear title of the notes",
  "subject": "Actual subject or technology",
  "category": "Relevant category",
  "topic": "Actual topic covered",

  "answer": {
    "introduction": "Direct definition or introduction",

    "sections": [
      {
        "heading": "Relevant heading",

        "content": "Complete explanation",

        "points": [
          "Important point",
          "Important point"
        ],

        "examples": [
          "Useful example"
        ]
      }
    ]
  },

  "keyPoints": [
    "Important study point"
  ],

  "keywords": [
    "Relevant keyword"
  ],

  "quickRevision": [
    "Short revision point"
  ],

  "examTips": [
    "Relevant exam-oriented point"
  ]
}

============================================================
FINAL RULES
============================================================

- Return ONLY valid JSON.
- No Markdown code fences.
- No text outside JSON.
- Generate COMPLETE STUDY NOTES.
- Short input must still generate complete notes.
- Do not simply answer the student's sentence.
- Understand the academic scope of the topic.
- Explain all important fundamentals.
- Explain important types/principles/components/steps.
- Include examples when useful.
- Include comparison when useful.
- Include complexity when relevant.
- Include code when relevant.
- Include formulas when relevant.
- Include Important Points when useful.
- Include Quick Revision when useful.
- Include exam content only when relevant.
- Never add unrelated sections.
- Never repeat information unnecessarily.
- Make the output look like genuine college study notes.
`;

    // ==========================================================
    // GROQ REQUEST
    // ==========================================================

    const completion =
      await groq.chat.completions.create({
        model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",

        messages: [
          {
            role: "system",
            content: `
You are CampusHub AI Smart Notes Generator.

Convert student topics into complete, structured,
study-ready college notes.

Short student input does NOT mean short notes.

Understand the topic first, determine its academic scope,
and generate complete notes.

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
        message: "AI returned an empty response",
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
        message: "AI returned an invalid response",
      });
    }

    // ==========================================================
    // NORMALIZE AI RESPONSE
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

    const finalTopic =
      aiNotes.topic ||
      topic ||
      userRequirement;

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

    const keyPoints =
      Array.isArray(aiNotes.keyPoints)
        ? aiNotes.keyPoints
        : [];

    const keywords =
      Array.isArray(aiNotes.keywords)
        ? aiNotes.keywords
        : [];

    const quickRevision =
      Array.isArray(aiNotes.quickRevision)
        ? aiNotes.quickRevision
        : [];

    const examTips =
      Array.isArray(aiNotes.examTips)
        ? aiNotes.examTips
        : [];

    // ==========================================================
    // SAVE COMPLETE AI NOTE
    // ==========================================================

    const note =
      await Note.create({
        title: finalTitle,

        description: userRequirement,

        subject: finalSubject,

        topic: finalTopic,

        category: finalCategory,

        branch: branch || "",

        year: year || "",

        summary: introduction,

        answer: {
          introduction,
          sections,
        },

        points: keyPoints,

        keywords,

        examTips,

        quickRevision,

        fileUrl: "ai-generated",

        uploadedBy: req.user.id,

        status: "approved",
      });

    // ==========================================================
    // RESPONSE
    // ==========================================================

    return res.status(201).json({
      success: true,

      message:
        "Smart Notes Generated Successfully 🚀",

      note,
    });

  } catch (error) {
    console.error(
      "SMART NOTES GENERATION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Smart notes generation failed",
    });
  }
};


// ============================================================
// CREATE / UPLOAD NOTE
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
      summary,
      answer,
      points,
      keywords,
      examTips,
      quickRevision,
      fileUrl,
    } = req.body;

    // ==========================================================
    // VALIDATION
    // ==========================================================

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Note title is required",
      });
    }

    // ==========================================================
    // CREATE NOTE
    // ==========================================================

    const note =
      await Note.create({
        title: title.trim(),

        description:
          description?.trim() || "",

        subject:
          subject?.trim() || "General",

        topic:
          topic?.trim() || "",

        category:
          category?.trim() || subject?.trim() || "General",

        branch:
          branch || "",

        year:
          year || "",

        summary:
          summary || "",

        answer:
          answer || {
            introduction: "",
            sections: [],
          },

        points:
          Array.isArray(points)
            ? points
            : [],

        keywords:
          Array.isArray(keywords)
            ? keywords
            : [],

        examTips:
          Array.isArray(examTips)
            ? examTips
            : [],

        quickRevision:
          Array.isArray(quickRevision)
            ? quickRevision
            : [],

        fileUrl:
          fileUrl || "",

        uploadedBy:
          req.user.id,

        status:
          "pending",
      });

    // ==========================================================
    // RESPONSE
    // ==========================================================

    return res.status(201).json({
      success: true,

      message:
        "Note created successfully",

      note,
    });

  } catch (error) {
    console.error(
      "CREATE NOTE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to create note",
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
        .sort({
          createdAt: -1,
        })
        .lean();

    return res.status(200).json({
      success: true,

      count: notes.length,

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
        error?.message ||
        "Failed to fetch notes",
    });
  }
};