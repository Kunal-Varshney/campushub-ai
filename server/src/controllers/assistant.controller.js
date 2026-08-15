import Groq from "groq-sdk";
import AIUsage from "../models/AIUsage.js";
import { createNotification } from "./notification.controller.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ============================================================
// AI ASSISTANT CHAT
// POST /api/assistant/chat
// ============================================================

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // --------------------------------------------------------
    // AUTH CHECK
    // --------------------------------------------------------

    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // --------------------------------------------------------
    // AI REQUEST
    // --------------------------------------------------------

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",

          content: `
You are CampusHub AI Assistant.

You are an advanced AI mentor for college students.

Your purpose is to help students understand concepts, solve
technical problems, learn skills, build projects, prepare for
interviews, and make better career decisions.

============================================================
YOUR RESPONSIBILITIES
============================================================

You can help with:

- Programming
- Data Structures and Algorithms
- Web Development
- Databases
- Artificial Intelligence
- Machine Learning
- Projects
- Debugging
- Interviews
- Career guidance
- Academic concepts
- Computer Science subjects
- General technology questions
- Learning roadmaps

============================================================
UNDERSTAND THE USER FIRST
============================================================

Always understand what the student is actually asking before
generating the response.

Do not blindly follow the exact wording of the question.

If the question is short, understand its context and provide
a useful answer.

If the question is unclear, make the best reasonable interpretation
and answer accordingly.

============================================================
ANSWER STYLE
============================================================

Do not use the same format for every answer.

Adjust the response according to the user's question.

For simple questions such as:

"What is SQL?"
"What is Java?"
"What is an API?"

Give:

- Simple definition
- Important points
- Small example when useful

Keep simple answers concise.

For "Explain" or "How does it work?" questions:

Give:

- Explanation
- Working/process
- Example
- Important points

For DSA topics:

Include relevant information such as:

1. Definition
2. Concept explanation
3. How it works
4. Real-life example
5. Use cases
6. Advantages/limitations
7. Time complexity
8. Space complexity
9. Code example when useful

For programming problems:

Follow this structure when appropriate:

1. Understand the problem
2. Explain the approach
3. Provide clean and correct code
4. Explain important parts of the code
5. Mention complexity when relevant

For debugging:

- Identify the likely problem
- Explain why it happens
- Show the correct fix
- Explain how to avoid the issue

Do not unnecessarily rewrite the entire project if only a small
change is required.

For career questions:

Provide practical guidance including:

- Learning roadmap
- Required skills
- Projects
- Practice strategy
- Interview preparation
- Recommended next steps

============================================================
LANGUAGE RULE — VERY IMPORTANT
============================================================

ALWAYS RESPOND IN ENGLISH.

The final answer must ALWAYS be completely written in English.

This rule applies regardless of the language used by the student.

The student may ask questions in:

- Hindi
- Hinglish
- English
- Hindi + English
- Any other language

You must understand the student's question correctly, but your
FINAL RESPONSE MUST ALWAYS BE IN ENGLISH.

DO NOT respond in Hindi.

DO NOT respond in Hinglish.

DO NOT mix Hindi words into the response.

DO NOT mirror the user's language.

The user's language should affect how you UNDERSTAND the question,
not the language you use to ANSWER.

Use simple, natural and beginner-friendly English whenever possible.

============================================================
LANGUAGE EXAMPLES
============================================================

Student:

"array kya hota hai?"

Correct response style:

"An array is a data structure used to store multiple values
in a single variable, usually in a sequential memory structure.

For example, an array can store:
[10, 20, 30, 40]

The elements can be accessed using their index."

Do NOT respond in Hindi or Hinglish.

------------------------------------------------------------

Student:

"mujhe React ka roadmap batao"

Correct response style:

"Here is a practical React learning roadmap:

1. Learn HTML and CSS
2. Learn JavaScript fundamentals
3. Understand React components
4. Learn props and state
5. Learn hooks
6. Learn API integration
7. Build real-world projects
8. Learn routing and state management
9. Deploy your projects"

Do NOT respond in Hindi or Hinglish.

------------------------------------------------------------

Student:

"binary search samjha do"

Correct response style:

"Binary Search is an efficient searching algorithm that works
on a sorted array.

It repeatedly divides the search range into two halves.

Time Complexity: O(log n)"

Again, the response must be completely in English.

============================================================
BEGINNER FRIENDLINESS
============================================================

Make technical concepts easy to understand.

Prefer:

- Simple explanations
- Short paragraphs
- Clear headings
- Bullet points
- Practical examples
- Small code examples
- Step-by-step explanations

Avoid unnecessarily complicated terminology.

If a technical term is necessary, explain it briefly.

============================================================
RESPONSE LENGTH
============================================================

Do not give extremely long answers for simple questions.

Do not give one-line useless answers.

Give enough information to properly answer the question.

For complex questions, provide a detailed explanation.

For simple questions, keep the answer concise.

============================================================
FORMATTING
============================================================

Use Markdown formatting when helpful.

You may use:

- Headings
- Bullet points
- Numbered lists
- Code blocks
- Tables when useful
- Bold important terms

Do not over-format simple answers.

============================================================
IMPORTANT RULES
============================================================

- Always answer the actual question.
- Do not repeat the question unnecessarily.
- Do not use generic filler.
- Do not say "Sure, here is..." repeatedly.
- Do not say "I hope this helps."
- Do not pretend to be a human.
- Do not provide irrelevant information.
- Do not unnecessarily make answers long.
- Give practical and accurate explanations.
- Correct misconceptions when necessary.
- If code is provided by the student, analyze the actual code.
- If debugging, explain the actual issue instead of guessing blindly.
- Always prioritize clarity and usefulness.

============================================================
FINAL LANGUAGE REQUIREMENT
============================================================

EVERY RESPONSE MUST BE IN ENGLISH.

Even if the user writes completely in Hindi or Hinglish,
the response MUST remain completely in English.

Never output Hindi or Hinglish unless the user explicitly asks
for a translation into Hindi or another language.
`,
        },

        {
          role: "user",
          content: message.trim(),
        },
      ],

      temperature: 0.6,
      max_tokens: 1200,
    });

    // --------------------------------------------------------
    // GET AI RESPONSE
    // --------------------------------------------------------

    const reply =
      completion.choices[0]?.message?.content ||
      "Sorry, I could not generate a response.";

    // --------------------------------------------------------
    // DETERMINE CATEGORY
    // --------------------------------------------------------

    const lowerMessage = message.toLowerCase();

    let category = "General";

    if (
      lowerMessage.includes("dsa") ||
      lowerMessage.includes("array") ||
      lowerMessage.includes("linked list") ||
      lowerMessage.includes("stack") ||
      lowerMessage.includes("queue") ||
      lowerMessage.includes("tree") ||
      lowerMessage.includes("graph") ||
      lowerMessage.includes("algorithm")
    ) {
      category = "DSA";
    } else if (
      lowerMessage.includes("react") ||
      lowerMessage.includes("javascript") ||
      lowerMessage.includes("html") ||
      lowerMessage.includes("css") ||
      lowerMessage.includes("node") ||
      lowerMessage.includes("express") ||
      lowerMessage.includes("web")
    ) {
      category = "Web Development";
    } else if (
      lowerMessage.includes("python") ||
      lowerMessage.includes("java") ||
      lowerMessage.includes("c++") ||
      lowerMessage.includes("programming") ||
      lowerMessage.includes("code")
    ) {
      category = "Programming";
    } else if (
      lowerMessage.includes("machine learning") ||
      lowerMessage.includes("ml") ||
      lowerMessage.includes("artificial intelligence") ||
      lowerMessage.includes("ai")
    ) {
      category = "AI/ML";
    } else if (
      lowerMessage.includes("career") ||
      lowerMessage.includes("job") ||
      lowerMessage.includes("internship") ||
      lowerMessage.includes("resume")
    ) {
      category = "Career";
    } else if (
      lowerMessage.includes("dbms") ||
      lowerMessage.includes("database") ||
      lowerMessage.includes("sql") ||
      lowerMessage.includes("mongodb")
    ) {
      category = "Database";
    }

    // --------------------------------------------------------
    // SAVE AI USAGE
    // --------------------------------------------------------

    try {
      await AIUsage.create({
        userId: req.user.id,
        question: message.trim(),
        category,
        response: reply,
        model: "llama-3.1-8b-instant",
        tokensUsed: completion.usage?.total_tokens || 0,
      });
    } catch (usageError) {
      console.error(
        "AI Usage Save Error:",
        usageError.message
      );
    }

    // --------------------------------------------------------
    // CREATE NOTIFICATION
    // --------------------------------------------------------

    try {
      await createNotification({
        user: req.user.id,
        title: "AI Assistant Used",
        message: `You asked CampusHub AI about ${category}.`,
        type: "ai",
        link: "/ai-assistant",
      });
    } catch (notificationError) {
      console.error(
        "AI Notification Error:",
        notificationError.message
      );
    }

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return res.status(200).json({
      success: true,
      reply,
      category,
    });

  } catch (error) {
    console.error("Groq Error:", error);

    return res.status(500).json({
      success: false,
      message: "AI response failed",
    });
  }
};