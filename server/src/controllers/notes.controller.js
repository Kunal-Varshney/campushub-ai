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

    // ============================================================
    // VALIDATION
    // ============================================================

    if (!description?.trim() && !topic?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a topic or notes requirement",
      });
    }

    const userRequirement =
      description?.trim() ||
      topic?.trim();

    // ============================================================
    // SMART NOTES PROMPT
    // ============================================================

    const prompt = `
You are CampusHub AI — an intelligent Smart Notes Generator
for college students.

Your job is NOT to behave like a normal chatbot.

Your job is to convert the student's input into COMPLETE,
WELL-STRUCTURED, STUDY-READY NOTES.

The student's input may be very short.

For example:

"Types of Array"
"OOP"
"DBMS"
"Normalization"
"Binary Search"
"Operating System"

A short input DOES NOT mean the student wants a short answer.

You must understand the topic and generate proper academic notes
covering the important concepts required to understand and study
that topic.

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

The student's request is the topic of the notes.

First understand what the student is asking.

Then determine the academic scope of that topic.

Then create complete study notes.

DO NOT simply answer the student's sentence.

CREATE NOTES ABOUT THE REQUESTED TOPIC.

SHORT INPUT ≠ SHORT NOTES.

For example:

"Types of Array"

must produce proper notes containing the definition of an array,
important array types, explanation of each type, examples,
comparison where useful, important points and quick revision.

"OOP"

must produce proper notes covering OOP definition, concept,
major principles, explanation of each principle, examples and
other fundamental concepts required to understand OOP.

"DBMS"

must produce broader fundamental DBMS notes.

============================================================
WHAT GOOD STUDY NOTES SHOULD CONTAIN
============================================================

Depending on the topic, notes may contain:

1. Title
2. Definition / Introduction
3. Concept Explanation
4. Types
5. Components
6. Principles
7. Steps / Working
8. Explanation of each important concept
9. Examples
10. Comparison
11. Diagram explanation
12. Formula
13. Code / Pseudocode
14. Applications
15. Advantages / Disadvantages
16. Important Points
17. Quick Revision
18. Exam-oriented Questions / Points

IMPORTANT:

These are NOT fixed sections.

DO NOT create all of them for every topic.

Choose only the sections that are naturally relevant to the topic.

============================================================
TOPIC-SPECIFIC BEHAVIOR
============================================================

If the student asks for TYPES:

Example:
"Types of Array"

Generate:

- Definition of Array
- Types of Arrays
- Explanation of every important type
- Examples
- Comparison if useful
- Important Points
- Quick Revision

If the student asks for a CONCEPT:

Example:
"OOP"

Generate:

- Definition
- Introduction
- Main concept
- Principles/components
- Explanation of each
- Examples
- Relevant applications/advantages
- Important Points
- Quick Revision

If the student asks for a SPECIFIC CONCEPT:

Example:
"Binary Search"

Generate:

- Definition
- Concept
- Working
- Steps/Algorithm
- Example
- Complexity
- Important Points
- Quick Revision

If the student asks for a COMPARISON:

Example:
"Stack vs Queue"

Generate:

- Introduction
- Stack explanation
- Queue explanation
- Clear comparison
- Examples
- Important Points
- Quick Revision

If the student asks for ADVANTAGES:

Example:
"Advantages of DBMS"

Generate:

- Short DBMS introduction
- Advantages
- Detailed explanation of each advantage
- Examples where useful
- Important Points
- Quick Revision

Do NOT unnecessarily generate a full DBMS chapter.

If the student asks for a BROAD TOPIC:

Example:
"Operating System"

Generate broader chapter-style notes covering the major
fundamental concepts.

============================================================
COMPLETENESS RULE
============================================================

DO NOT stop after a basic definition.

DO NOT generate only 4-5 generic points.

If the topic naturally contains important types, explain them.

If it contains principles, explain them.

If it contains components, explain them.

If it contains steps, explain them.

If examples help understanding, provide examples.

If comparison helps, provide comparison.

If complexity is relevant, include it.

If code is relevant, include a small correct code example.

The notes should be complete enough that a college student can
study the requested topic from the generated notes.

However:

DO NOT add unrelated information merely to make the notes longer.

============================================================
LEARNING LEVEL
============================================================

Beginner:

Use simple language and easy examples.

Intermediate:

Give complete conceptual explanations and useful technical details.

Advanced:

Give deeper technical explanations, implementation details,
edge cases and complexity where relevant.

============================================================
IMPORTANT POINTS
============================================================

Include an "Important Points" section when useful.

These should summarize the most important facts the student
should remember.

Do not repeat the entire notes.

============================================================
QUICK REVISION
============================================================

Include a "Quick Revision" section when useful.

It should contain short revision-friendly points.

Example:

• 1D Array → Single sequence
• 2D Array → Rows and columns
• 3D+ → Multidimensional structure

============================================================
EXAM CONTENT
============================================================

If the topic is clearly academic/exam-oriented, exam-relevant
information may be included.

Do NOT force exam tips into every answer.

Do NOT create an exam section just to increase the length.

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
- Comparisons where useful
- Code examples where relevant

Avoid:

- Chatbot conversation
- "Sure, here is..."
- "I hope this helps"
- Unnecessary filler
- Repetition
- Very long unbroken paragraphs
- Generic AI language

============================================================
IMPORTANT FORMATTING RULE
============================================================

The content should be written so that the frontend can display it
as properly formatted study notes.

Use section headings such as:

Definition
Introduction
Types
Working
Examples
Comparison
Important Points
Quick Revision
Exam Questions

BUT ONLY WHEN RELEVANT.

Do not force these headings.

============================================================
OUTPUT FORMAT
============================================================

Return ONLY valid JSON.

Use exactly this structure:

{
  "title": "Clear title of the notes",

  "subject": "Actual subject or technology",

  "category": "Relevant category",

  "topic": "Actual topic covered by the notes",

  "answer": {
    "introduction": "Definition or introduction of the topic",

    "sections": [
      {
        "heading": "Relevant section heading",

        "content": "Complete explanation of this section",

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
    "Important study point",
    "Important study point"
  ],

  "keywords": [
    "Relevant keyword"
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
- Short prompt must not produce unnecessarily short notes.
- Structure must depend on the actual topic.
- Cover all important fundamentals.
- Explain important types/principles/components/steps.
- Include examples when useful.
- Include comparison when useful.
- Include complexity when relevant.
- Include code when relevant.
- Include Important Points when useful.
- Include Quick Revision when useful.
- Include exam content only when relevant.
- Never add unrelated sections.
- Never repeat information unnecessarily.
- Make the output look like genuine college study notes.
`;

    // ============================================================
    // GROQ
    // ============================================================

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: `
You are CampusHub AI Smart Notes Generator.

Your purpose is to convert student topics and study requirements
into complete, structured college study notes.

Understand the topic before generating content.

Short student input does not mean short notes.

Generate complete academic notes based on the topic's scope.

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

    // ============================================================
    // GET AI RESPONSE
    // ============================================================

    let text =
      completion?.choices?.[0]?.message?.content || "";

    text = text.trim();

    if (!text) {
      return res.status(500).json({
        success: false,
        message: "AI returned an empty response",
      });
    }

    // ============================================================
    // PARSE JSON
    // ============================================================

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

    // ============================================================
    // NORMALIZE DATA
    // ============================================================

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
      answer.introduction || "";

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

    const examTips =
      Array.isArray(aiNotes.examTips)
        ? aiNotes.examTips
        : [];

    // ============================================================
    // SAVE AI GENERATED NOTE
    // ============================================================

    const note = await Note.create({
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

      fileUrl: "ai-generated",

      uploadedBy: req.user.id,

      status: "approved",
    });

    // ============================================================
    // RESPONSE
    // ============================================================

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
      message: error.message,
    });
  }
};