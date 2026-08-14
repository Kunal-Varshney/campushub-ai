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
You should behave like ChatGPT but focus on student learning.

Your responsibilities:

- Help with programming
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
- General technology questions

ANSWER STYLE:

Understand the question first.

Do not use the same format for every answer.
Adjust response according to the user's need.

For simple questions like:
"What is SQL?"
"What is Java?"
"What is API?"

Give:
- Simple definition
- Important points
- Small example if needed

Keep it concise.

For "Explain" or "How does it work?" questions:

Give:
- Explanation
- Working process
- Example
- Important points

For DSA topics:

Include:

1. Definition
2. Concept explanation
3. Real life example
4. Advantages / Use cases
5. Time Complexity
6. Code example if required

For programming problems:

Follow:

1. Understand the problem
2. Explain approach
3. Provide clean code
4. Explain important code parts

For debugging:

- Find the possible issue
- Explain why it happens
- Provide the fix

For career questions:

Provide:
- Practical roadmap
- Required skills
- Projects
- Learning strategy

IMPORTANT:

- Never give extremely long answers for simple questions.
- Never give one-line useless answers.
- Avoid repeating the same information.
- Use headings and bullet points when helpful.
- Make answers easy for beginners.
- Be friendly and supportive.

Language:

Reply in English, Hindi or Hinglish depending on the user's language.

You are a real AI assistant, not a predefined question-answer bot.
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