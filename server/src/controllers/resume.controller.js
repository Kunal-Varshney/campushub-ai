import Resume from "../models/Resume.js";

const GROQ_URL =
  "https://api.groq.com/openai/v1/chat/completions";

const GROQ_MODEL =
  process.env.GROQ_MODEL || "openai/gpt-oss-120b";


// ======================================================
// GROQ HELPER
// ======================================================

const callGroq = async (prompt) => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const response = await fetch(GROQ_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },

    body: JSON.stringify({
      model: GROQ_MODEL,

      messages: [
        {
          role: "system",
          content:
            "You are an expert professional resume and ATS optimization AI. Always return valid JSON only.",
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
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error("GROQ ERROR:", errorText);

    throw new Error("AI request failed");
  }

  const data = await response.json();

  const content =
    data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("AI returned empty response");
  }

  try {
    return JSON.parse(content);
  } catch (error) {
    console.error("AI JSON ERROR:", content);

    throw new Error("Invalid AI response");
  }
};


// ======================================================
// RESUME TEXT HELPER
// ======================================================

const createResumeText = (resume) => {
  return `
Name:
${resume.fullName || ""}

Email:
${resume.email || ""}

Phone:
${resume.phone || ""}

LinkedIn:
${resume.linkedin || ""}

GitHub:
${resume.github || ""}

Portfolio:
${resume.portfolio || ""}

Education:
${resume.education || ""}

Skills:
${resume.skills || ""}

Projects:
${resume.projects || ""}

Experience:
${resume.experience || ""}

Achievements:
${resume.achievements || ""}

Career Objective:
${resume.objective || ""}

Experience Level:
${resume.experienceLevel || "Fresher"}
`;
};


// ======================================================
// GENERATE RESUME
// ======================================================

export const generateResume = async (req, res) => {
  try {
    const resumeData = req.body;

    if (!resumeData.fullName || !resumeData.email) {
      return res.status(400).json({
        success: false,
        message: "Full name and email are required",
      });
    }

    const resumeText = createResumeText(resumeData);

    const prompt = `
You are an expert ATS resume evaluator and professional career coach.

Analyze this resume:

${resumeText}

Calculate a realistic ATS score from 0 to 100.

Consider:

1. Skills relevance - 20
2. Projects quality - 20
3. Education - 10
4. Experience - 15
5. Achievements - 10
6. Career objective - 10
7. Resume completeness - 5
8. Grammar and clarity - 5
9. ATS keywords - 5

Important:

- Do NOT always give a high score.
- Do NOT invent information.
- Do NOT invent experience.
- Do NOT invent achievements.
- Judge only the provided information.
- Fresher resumes can score highly if their projects and skills are strong.

Return JSON only:

{
  "atsScore": 0,
  "summary": "short professional assessment",
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

    const aiAnalysis = await callGroq(prompt);

    const atsScore = Math.max(
      0,
      Math.min(
        100,
        Number(aiAnalysis.atsScore) || 0
      )
    );

    const resume = await Resume.create({
      user: req.user.id,

      ...resumeData,

      atsScore,

      aiAnalysis: {
        summary: aiAnalysis.summary || "",

        strengths: Array.isArray(
          aiAnalysis.strengths
        )
          ? aiAnalysis.strengths
          : [],

        weaknesses: Array.isArray(
          aiAnalysis.weaknesses
        )
          ? aiAnalysis.weaknesses
          : [],

        suggestions: Array.isArray(
          aiAnalysis.suggestions
        )
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
    console.error(
      "RESUME GENERATION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Resume generation failed",
    });
  }
};


// ======================================================
// AI ATS OPTIMIZATION
// ======================================================

export const optimizeATS = async (req, res) => {
  try {
    const { resumeId } = req.body;

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const resumeText = createResumeText(resume);

    const prompt = `
You are an expert ATS resume optimization AI.

Analyze this resume:

${resumeText}

Improve the resume ONLY using the information already provided.

Do NOT invent:
- companies
- jobs
- achievements
- technologies
- degrees
- numbers

Improve:

- ATS compatibility
- professional wording
- keyword usage
- clarity
- structure
- impact

Return the complete improved resume.

Return JSON only:

{
  "fullName": "",
  "email": "",
  "phone": "",
  "linkedin": "",
  "github": "",
  "portfolio": "",
  "education": "",
  "skills": "",
  "projects": "",
  "experience": "",
  "achievements": "",
  "objective": "",
  "atsScore": 0,
  "summary": ""
}
`;

    const result = await callGroq(prompt);

    resume.fullName =
      result.fullName || resume.fullName;

    resume.email =
      result.email || resume.email;

    resume.phone =
      result.phone || resume.phone;

    resume.linkedin =
      result.linkedin || resume.linkedin;

    resume.github =
      result.github || resume.github;

    resume.portfolio =
      result.portfolio || resume.portfolio;

    resume.education =
      result.education || resume.education;

    resume.skills =
      result.skills || resume.skills;

    resume.projects =
      result.projects || resume.projects;

    resume.experience =
      result.experience || resume.experience;

    resume.achievements =
      result.achievements ||
      resume.achievements;

    resume.objective =
      result.objective || resume.objective;

    resume.atsScore = Math.max(
      0,
      Math.min(
        100,
        Number(result.atsScore) ||
          resume.atsScore
      )
    );

    await resume.save();

    return res.json({
      success: true,
      message: "ATS optimization completed",
      resume,
    });
  } catch (error) {
    console.error(
      "ATS OPTIMIZATION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "ATS optimization failed",
    });
  }
};


// ======================================================
// GRAMMAR FIX
// ======================================================

export const fixGrammar = async (req, res) => {
  try {
    const { resumeId } = req.body;

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const prompt = `
You are a professional resume grammar editor.

Fix grammar, spelling, punctuation and sentence structure.

Keep the original meaning.

DO NOT invent any information.

Resume:

${createResumeText(resume)}

Return JSON only:

{
  "education": "",
  "skills": "",
  "projects": "",
  "experience": "",
  "achievements": "",
  "objective": ""
}
`;

    const result = await callGroq(prompt);

    resume.education =
      result.education || resume.education;

    resume.skills =
      result.skills || resume.skills;

    resume.projects =
      result.projects || resume.projects;

    resume.experience =
      result.experience || resume.experience;

    resume.achievements =
      result.achievements ||
      resume.achievements;

    resume.objective =
      result.objective || resume.objective;

    await resume.save();

    return res.json({
      success: true,
      message: "Grammar fixed successfully",
      resume,
    });
  } catch (error) {
    console.error(
      "GRAMMAR FIX ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Grammar correction failed",
    });
  }
};


// ======================================================
// SMART SUGGESTIONS
// ======================================================

export const smartSuggestions = async (
  req,
  res
) => {
  try {
    const { resumeId } = req.body;

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const prompt = `
You are an expert resume coach.

Review this resume:

${createResumeText(resume)}

Identify weak resume statements.

Give stronger versions WITHOUT inventing information.

Focus on:

- project descriptions
- experience
- achievements
- objective
- measurable impact where existing information allows it

Return JSON only:

{
  "suggestions": [
    {
      "section": "Projects",
      "original": "original sentence",
      "improved": "improved sentence"
    }
  ]
}
`;

    const result = await callGroq(prompt);

    resume.aiAnalysis = {
      ...resume.aiAnalysis?.toObject?.(),
      summary:
        resume.aiAnalysis?.summary || "",
      strengths:
        resume.aiAnalysis?.strengths || [],
      weaknesses:
        resume.aiAnalysis?.weaknesses || [],
      suggestions: Array.isArray(
        result.suggestions
      )
        ? result.suggestions.map(
            (item) =>
              `${item.section}: ${item.improved}`
          )
        : [],
    };

    await resume.save();

    return res.json({
      success: true,
      message: "Smart suggestions generated",
      suggestions:
        result.suggestions || [],
      resume,
    });
  } catch (error) {
    console.error(
      "SMART SUGGESTIONS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Smart suggestions failed",
    });
  }
};


// ======================================================
// KEYWORD OPTIMIZATION
// ======================================================

export const optimizeKeywords = async (
  req,
  res
) => {
  try {
    const {
      resumeId,
      jobDescription,
    } = req.body;

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message:
          "Job description is required",
      });
    }

    const prompt = `
You are an ATS keyword optimization expert.

Compare this resume:

${createResumeText(resume)}

Against this job description:

${jobDescription}

Identify relevant missing keywords.

Then improve the resume using ONLY information that is already present in the resume.

NEVER invent skills or experience.

Return JSON only:

{
  "missingKeywords": [
    "keyword 1",
    "keyword 2"
  ],
  "fullName": "",
  "email": "",
  "phone": "",
  "linkedin": "",
  "github": "",
  "portfolio": "",
  "education": "",
  "skills": "",
  "projects": "",
  "experience": "",
  "achievements": "",
  "objective": "",
  "atsScore": 0
}
`;

    const result = await callGroq(prompt);

    resume.education =
      result.education || resume.education;

    resume.skills =
      result.skills || resume.skills;

    resume.projects =
      result.projects || resume.projects;

    resume.experience =
      result.experience || resume.experience;

    resume.achievements =
      result.achievements ||
      resume.achievements;

    resume.objective =
      result.objective || resume.objective;

    resume.atsScore = Math.max(
      0,
      Math.min(
        100,
        Number(result.atsScore) ||
          resume.atsScore
      )
    );

    await resume.save();

    return res.json({
      success: true,

      message:
        "Keywords optimized successfully",

      missingKeywords:
        result.missingKeywords || [],

      resume,
    });
  } catch (error) {
    console.error(
      "KEYWORD OPTIMIZATION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Keyword optimization failed",
    });
  }
};


// ======================================================
// TEMPLATE
// ======================================================

export const changeTemplate = async (
  req,
  res
) => {
  try {
    const {
      resumeId,
      template,
    } = req.body;

    const allowedTemplates = [
      "Modern",
      "Professional",
      "Creative",
      "Minimal",
    ];

    if (!allowedTemplates.includes(template)) {
      return res.status(400).json({
        success: false,
        message: "Invalid template",
      });
    }

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    resume.selectedTemplate =
      template;

    await resume.save();

    return res.json({
      success: true,
      message: "Template updated",
      resume,
    });
  } catch (error) {
    console.error(
      "TEMPLATE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Template update failed",
    });
  }
};