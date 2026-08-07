
import Resume from "../models/Resume.js";

export const generateResume = async (req, res) => {
  try {
    const resumeData = req.body;

    // Basic validation
    if (!resumeData.fullName || !resumeData.email) {
      return res.status(400).json({
        success: false,
        message: "Full name and email are required",
      });
    }

    // Prepare the user's actual resume data for AI analysis
    const resumeText = `
Name: ${resumeData.fullName || ""}
Email: ${resumeData.email || ""}
Phone: ${resumeData.phone || ""}
LinkedIn: ${resumeData.linkedin || ""}
GitHub: ${resumeData.github || ""}
Portfolio: ${resumeData.portfolio || ""}

Education:
${resumeData.education || "Not provided"}

Skills:
${resumeData.skills || "Not provided"}

Projects:
${resumeData.projects || "Not provided"}

Experience:
${resumeData.experience || "Not provided"}

Achievements:
${resumeData.achievements || "Not provided"}

Career Objective:
${resumeData.objective || "Not provided"}

Experience Level:
${resumeData.experienceLevel || "Fresher"}
`;

    const prompt = `
You are an expert ATS resume evaluator and professional career coach.

Analyze the following resume information exactly as provided by the user.

${resumeText}

Calculate a realistic ATS score from 0 to 100 based ONLY on the information provided.

Use these factors:

1. Skills relevance and technical depth - 20 points
2. Projects quality and clarity - 20 points
3. Education - 10 points
4. Experience/internships - 15 points
5. Achievements - 10 points
6. Career objective - 10 points
7. Resume completeness - 5 points
8. Grammar, clarity and professional wording - 5 points
9. ATS-friendly keywords - 5 points

Important rules:
- Do NOT always give 92.
- Do NOT give an artificially high score.
- A weak/incomplete resume should receive a lower score.
- A strong and detailed resume should receive a higher score.
- Judge the actual information supplied by the user.
- Do not invent experience, achievements, skills or education.
- Fresher resumes can still score highly if their projects, skills and education are strong.
- Return only valid JSON.
- No markdown.
- No explanation outside the JSON.

Return exactly this structure:

{
  "atsScore": 0,
  "summary": "Short professional assessment",
  "strengths": [
    "strength 1",
    "strength 2",
    "strength 3"
  ],
  "weaknesses": [
    "weakness 1",
    "weakness 2",
    "weakness 3"
  ],
  "suggestions": [
    "specific improvement 1",
    "specific improvement 2",
    "specific improvement 3",
    "specific improvement 4"
  ]
}
`;

    // Check Groq API key
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "GROQ_API_KEY is not configured",
      });
    }

    // Call Groq API
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are an expert ATS resume evaluator. Always return valid JSON only.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.2,
          response_format: {
            type: "json_object",
          },
        }),
      }
    );

    if (!groqResponse.ok) {
      const groqError = await groqResponse.text();

      console.error("GROQ ERROR:", groqError);

      return res.status(500).json({
        success: false,
        message: "AI resume analysis failed",
      });
    }

    const groqData = await groqResponse.json();

    const aiContent =
      groqData?.choices?.[0]?.message?.content;

    if (!aiContent) {
      return res.status(500).json({
        success: false,
        message: "AI returned an empty response",
      });
    }

    // Convert AI JSON string into JavaScript object
    let aiAnalysis;

    try {
      aiAnalysis = JSON.parse(aiContent);
    } catch (parseError) {
      console.error("AI JSON PARSE ERROR:", aiContent);

      return res.status(500).json({
        success: false,
        message: "Invalid AI response format",
      });
    }

    // Keep score safely between 0 and 100
    const atsScore = Math.max(
      0,
      Math.min(100, Number(aiAnalysis.atsScore) || 0)
    );

    // Save resume + AI analysis to MongoDB
    const resume = await Resume.create({
      user: req.user.id,
      ...resumeData,
      atsScore,
      aiAnalysis: {
        summary: aiAnalysis.summary || "",
        strengths: Array.isArray(aiAnalysis.strengths)
          ? aiAnalysis.strengths
          : [],
        weaknesses: Array.isArray(aiAnalysis.weaknesses)
          ? aiAnalysis.weaknesses
          : [],
        suggestions: Array.isArray(aiAnalysis.suggestions)
          ? aiAnalysis.suggestions
          : [],
      },
    });

    return res.status(201).json({
      success: true,
      message: "Resume Generated",
      resume,
    });
  } catch (error) {
    console.error("RESUME GENERATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Resume generation failed",
    });
  }
};
