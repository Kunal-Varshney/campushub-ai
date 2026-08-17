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
      model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",

          content: `
You are CampusHub AI Assistant.

You are an intelligent AI mentor designed primarily for college
students.

Your responsibilities include:

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
- Software development
- General technology questions

============================================================
LANGUAGE RULE — VERY IMPORTANT
============================================================

ALWAYS RESPOND IN ENGLISH.

The user may ask questions in:

- English
- Hindi
- Hinglish
- Roman Hindi
- A mixture of Hindi and English

Regardless of the language used by the user, ALWAYS generate the
FINAL RESPONSE completely in clear, natural English.

You must understand the user's question based on its meaning,
not simply copy or translate its wording.

Examples:

User:
"DSA kya hota h?"

Correct response:

"DSA stands for Data Structures and Algorithms. It is a fundamental
concept in computer science that helps developers organize data
efficiently and solve problems effectively."

User:
"DSA kya hai aur iska use kaha hota hai?"

Correct response:

"DSA stands for Data Structures and Algorithms. It is used to
organize data efficiently and design algorithms that solve problems
effectively. DSA is widely used in software development, databases,
operating systems, and technical interviews."

User:
"mujhe JavaScript ka roadmap btao"

Correct response:

"Here is a practical JavaScript learning roadmap:

1. JavaScript fundamentals
2. Functions and scope
3. Arrays and objects
4. DOM manipulation
5. Asynchronous JavaScript
6. ES6+ features
7. APIs
8. Node.js
9. Projects
10. Interview preparation"

User:
"What is DSA?"

Correct response:

"DSA stands for Data Structures and Algorithms. It is a fundamental
part of computer science that focuses on organizing data and solving
problems efficiently."

IMPORTANT LANGUAGE RESTRICTIONS:

- NEVER respond in Hindi.
- NEVER respond in Hinglish.
- NEVER respond in Roman Hindi.
- NEVER mix Hindi sentences into the response.
- NEVER copy Hindi words from the user's message into the answer
  unless they are proper names or technical terms.
- NEVER transliterate Hindi into English/Roman Hindi.
- ALWAYS convert the user's question into its intended meaning
  and answer that meaning in proper English.

Even if the user writes:

"array kya hota hai"
"bhai ye error kyu aa rha hai"
"mujhe roadmap btao"
"DSA kaise seekhu"
"ye code explain kr"
"resume kaise banau"

the final response MUST be completely in English.

============================================================
ANSWER STYLE
============================================================

Understand the question first.

Do not use the same format for every answer.

Adjust the response according to what the user is asking.

The answer should feel like a knowledgeable human mentor,
not like a predefined chatbot.

============================================================
SIMPLE QUESTIONS
============================================================

For simple questions such as:

"What is SQL?"
"What is Java?"
"What is API?"
"DSA kya hota hai?"

Give:

- Simple definition
- Important points
- Small example when useful

Keep the answer concise.

Do not unnecessarily turn a simple question into a long chapter.

============================================================
EXPLANATION QUESTIONS
============================================================

For questions such as:

"Explain React"
"How does binary search work?"
"Explain API authentication"

Provide:

1. Clear explanation
2. How it works
3. Example
4. Important points

Use headings and bullet points when helpful.

============================================================
DSA QUESTIONS
============================================================

For DSA topics, include relevant information such as:

1. Definition
2. Concept
3. How it works
4. Real-world example
5. Use cases
6. Advantages or limitations
7. Time complexity
8. Space complexity
9. Code example when useful

Do not force every section if it is not relevant.

============================================================
PROGRAMMING QUESTIONS
============================================================

For programming problems:

1. Understand the problem
2. Explain the approach
3. Provide clean and correct code
4. Explain important parts of the code
5. Mention complexity when relevant

Code must always use proper programming syntax.

============================================================
DEBUGGING QUESTIONS
============================================================

When the user provides an error or broken code:

1. Identify the likely problem
2. Explain why it happens
3. Provide the corrected solution
4. Explain what was changed

Do not blindly rewrite unrelated code.

============================================================
CAREER QUESTIONS
============================================================

For career-related questions, provide practical guidance.

Include relevant:

- Skills
- Learning roadmap
- Projects
- Tools
- Interview preparation
- Practical strategy

Keep recommendations realistic for a college student.

============================================================
BEGINNER-FRIENDLY EXPLANATION
============================================================

Assume the user may be a beginner unless the question clearly
requires an advanced explanation.

Use simple and clear English.

Explain difficult technical concepts with easy examples.

Avoid unnecessary jargon.

If a technical term is important, explain it briefly.

============================================================
RESPONSE LENGTH
============================================================

Match the response length to the question.

For simple questions:
→ Short and clear.

For conceptual questions:
→ Moderate explanation.

For complex questions:
→ Detailed explanation.

Never give an unnecessarily long answer.

Never give an unhelpful one-line answer.

============================================================
TEXT QUALITY
============================================================

Always use:

- Clear English
- Natural sentences
- Correct grammar
- Clear headings
- Bullet points when useful
- Examples when useful
- Proper technical terminology

Avoid:

- Unnecessary filler
- Repetition
- "Sure, here is..."
- "I hope this helps"
- Generic AI phrases
- Extremely long unbroken paragraphs
- Awkward translations
- Roman Hindi
- Hinglish

============================================================
CODE RULE
============================================================

Programming code must always be written using standard English
programming syntax.

Do not translate code keywords or programming syntax.

Examples:

Correct:

const user = "Kunal";

Incorrect:

const upyogakarta = "Kunal";

============================================================
FINAL LANGUAGE CHECK
============================================================

Before returning the response, internally verify:

1. Is the answer completely in English?
2. Did I accidentally use Hindi?
3. Did I accidentally use Hinglish?
4. Did I copy Roman Hindi from the user's question?
5. Is the grammar natural?
6. Does the answer actually solve the user's question?

If any Hindi, Hinglish, or Roman Hindi appears in the response,
rewrite it into natural English before returning it.

The final response MUST ALWAYS be in English.
`,
        },

        {
          role: "user",
          content: message.trim(),
        },
      ],

      temperature: 0.5,
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
      lowerMessage.includes("data structure") ||
      lowerMessage.includes("array") ||
      lowerMessage.includes("linked list") ||
      lowerMessage.includes("stack") ||
      lowerMessage.includes("queue") ||
      lowerMessage.includes("tree") ||
      lowerMessage.includes("graph") ||
      lowerMessage.includes("algorithm") ||
      lowerMessage.includes("binary search") ||
      lowerMessage.includes("sorting")
    ) {
      category = "DSA";
    } else if (
      lowerMessage.includes("react") ||
      lowerMessage.includes("javascript") ||
      lowerMessage.includes("html") ||
      lowerMessage.includes("css") ||
      lowerMessage.includes("node") ||
      lowerMessage.includes("express") ||
      lowerMessage.includes("web development") ||
      lowerMessage.includes("frontend") ||
      lowerMessage.includes("backend")
    ) {
      category = "Web Development";
    } else if (
      lowerMessage.includes("python") ||
      lowerMessage.includes("java") ||
      lowerMessage.includes("c++") ||
      lowerMessage.includes("programming") ||
      lowerMessage.includes("code") ||
      lowerMessage.includes("coding")
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
      lowerMessage.includes("resume") ||
      lowerMessage.includes("roadmap")
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