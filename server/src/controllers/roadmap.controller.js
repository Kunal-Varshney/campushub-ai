import Groq from "groq-sdk";
import Roadmap from "../models/Roadmap.js";

// ============================================================
// GROQ CLIENT
// Used only for the AI step-tutor endpoint (generateStepLearning).
// Roadmap generation itself uses the static template data below.
// ============================================================

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ============================================================
// ALLOWED CAREERS
// ============================================================

const allowedCareers = [
  "frontend",
  "backend",
  "fullstack",
  "ai",
  "ml",
  "data",
  "cyber",
  "cloud",
  "devops",
  "android",
  "uiux",
];

// ============================================================
// ALLOWED LEVELS
// ============================================================

const allowedLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

// ============================================================
// CAREER NAMES
// ============================================================

const careerNames = {
  frontend: "Frontend Developer",
  backend: "Backend Developer",
  fullstack: "Full Stack Developer",
  ai: "AI Engineer",
  ml: "Machine Learning Engineer",
  data: "Data Scientist",
  cyber: "Cyber Security Specialist",
  cloud: "Cloud Engineer",
  devops: "DevOps Engineer",
  android: "Android Developer",
  uiux: "UI/UX Designer",
};

// ============================================================
// NORMALIZE CAREER
// ============================================================

const normalizeCareer = (career) => {
  if (!career) return null;

  // If frontend sends object
  if (typeof career === "object") {
    career =
      career.id ||
      career.value ||
      career.careerId ||
      career.career ||
      career.name ||
      career.title;
  }

  if (!career) return null;

  const value = String(career)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  const careerMap = {
    // Frontend
    frontend: "frontend",
    "frontend developer": "frontend",
    "front end developer": "frontend",

    // Backend
    backend: "backend",
    "backend developer": "backend",
    "back end developer": "backend",

    // Full Stack
    fullstack: "fullstack",
    "full stack": "fullstack",
    "fullstack developer": "fullstack",
    "full stack developer": "fullstack",

    // AI
    ai: "ai",
    "ai engineer": "ai",
    "artificial intelligence": "ai",
    "artificial intelligence engineer": "ai",

    // ML
    ml: "ml",
    "machine learning": "ml",
    "machine learning engineer": "ml",

    // Data
    data: "data",
    "data science": "data",
    "data scientist": "data",

    // Cyber
    cyber: "cyber",
    cybersecurity: "cyber",
    "cyber security": "cyber",
    "cyber security specialist": "cyber",

    // Cloud
    cloud: "cloud",
    "cloud engineer": "cloud",
    "cloud computing": "cloud",

    // DevOps
    devops: "devops",
    "devops engineer": "devops",

    // Android
    android: "android",
    "android developer": "android",

    // UI/UX
    uiux: "uiux",
    "ui/ux": "uiux",
    "ui ux": "uiux",
    "ui/ux designer": "uiux",
    "ui ux designer": "uiux",
    "uiux designer": "uiux",
  };

  return careerMap[value] || null;
};

// ============================================================
// NORMALIZE LEVEL
// ============================================================

const normalizeLevel = (level) => {
  if (!level) return null;

  const value = String(level)
    .trim()
    .toLowerCase();

  const levelMap = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };

  return levelMap[value] || null;
};

// ============================================================
// GENERATE ROADMAP
// ============================================================

export const generateRoadmap = async (req, res) => {
  try {
    const userId = req.user?._id;

    const body = req.body || {};

    console.log("\n=================================");
    console.log("ROADMAP GENERATION REQUEST");
    console.log("BODY:", JSON.stringify(body, null, 2));
    console.log("USER:", userId);
    console.log("=================================\n");

    // --------------------------------------------------------
    // AUTH
    // --------------------------------------------------------

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // --------------------------------------------------------
    // GET CAREER
    // --------------------------------------------------------

    let careerInput =
      body.careerId ||
      body.career ||
      body.careerPath ||
      body.selectedCareer;

    // --------------------------------------------------------
    // GET LEVEL
    // --------------------------------------------------------

    let levelInput =
      body.level ||
      body.skillLevel ||
      body.skill_level ||
      body.selectedLevel;

    console.log("Career input:", careerInput);
    console.log("Level input:", levelInput);

    // --------------------------------------------------------
    // CAREER REQUIRED
    // --------------------------------------------------------

    if (!careerInput) {
      return res.status(400).json({
        success: false,
        message: "Career is required",
        receivedBody: body,
      });
    }

    // --------------------------------------------------------
    // NORMALIZE CAREER
    // --------------------------------------------------------

    const normalizedCareer =
      normalizeCareer(careerInput);

    console.log(
      "Normalized career:",
      normalizedCareer
    );

    if (!normalizedCareer) {
      return res.status(400).json({
        success: false,
        message: "Invalid career path",
        receivedCareer: careerInput,
        allowedCareers,
      });
    }

    // --------------------------------------------------------
    // LEVEL REQUIRED
    // --------------------------------------------------------

    if (!levelInput) {
      return res.status(400).json({
        success: false,
        message: "Skill level is required",
        receivedBody: body,
      });
    }

    // --------------------------------------------------------
    // NORMALIZE LEVEL
    // --------------------------------------------------------

    const normalizedLevel =
      normalizeLevel(levelInput);

    console.log(
      "Normalized level:",
      normalizedLevel
    );

    if (!normalizedLevel) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill level",
        receivedLevel: levelInput,
        allowedLevels,
      });
    }

    // --------------------------------------------------------
    // CAREER NAME
    // --------------------------------------------------------

    const careerName =
      careerNames[normalizedCareer];

    // --------------------------------------------------------
    // CREATE ROADMAP
    // --------------------------------------------------------

    const roadmapSteps = createRoadmap(
      normalizedCareer,
      normalizedLevel
    );

    const weeklyPlan = createWeeklyPlan(
      normalizedCareer,
      normalizedLevel
    );

    const projects = createProjects(
      normalizedCareer
    );

    const skillAnalysis =
      createSkillAnalysis(
        normalizedCareer,
        normalizedLevel
      );

    const interviewPreparation =
      createInterviewPreparation(
        normalizedCareer
      );

    // --------------------------------------------------------
    // SAVE / UPDATE
    // --------------------------------------------------------

    const roadmap =
      await Roadmap.findOneAndUpdate(
        {
          user: userId,
          career: normalizedCareer,
          level: normalizedLevel,
        },
        {
          user: userId,
          career: normalizedCareer,
          level: normalizedLevel,
          roadmapSteps,
          weeklyPlan,
          projects,
          skillAnalysis,
          interviewPreparation,
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Roadmap generated successfully",

      roadmap: {
        id: roadmap._id,
        career: careerName,
        careerId: normalizedCareer,
        level: roadmap.level,
        roadmapSteps: roadmap.roadmapSteps,
        weeklyPlan: roadmap.weeklyPlan,
        projects: roadmap.projects,
        skillAnalysis: roadmap.skillAnalysis,
        interviewPreparation:
          roadmap.interviewPreparation,
      },
    });
  } catch (error) {
    console.error("\n=================================");
    console.error("GENERATE ROADMAP ERROR");
    console.error(error);
    console.error("=================================\n");

    return res.status(500).json({
      success: false,
      message: "Failed to generate roadmap",
      error: error.message,
    });
  }
};

// ============================================================
// GET USER ROADMAPS
// ============================================================

export const getMyRoadmaps = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const roadmaps = await Roadmap.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: roadmaps.length,
      roadmaps,
    });
  } catch (error) {
    console.error(
      "Get Roadmaps Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch roadmaps",
      error: error.message,
    });
  }
};

// ============================================================
// GET SINGLE ROADMAP
// ============================================================

export const getRoadmapById = async (req, res) => {
  try {
    const userId = req.user?._id;

    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const roadmap =
      await Roadmap.findOne({
        _id: id,
        user: userId,
      });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    return res.status(200).json({
      success: true,
      roadmap,
    });
  } catch (error) {
    console.error(
      "Get Roadmap Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch roadmap",
      error: error.message,
    });
  }
};

// ============================================================
// ROADMAP DATA
// ============================================================

const roadmapData = {

  // ========================================================
  // FRONTEND
  // ========================================================

  frontend: [
    {
      title: "HTML & Semantic Web",
      difficulty: "Beginner",
      time: "1 Week",
      description:
        "Master semantic HTML, forms, accessibility, SEO-friendly structure and modern web standards.",
    },
    {
      title: "CSS & Responsive Design",
      difficulty: "Beginner",
      time: "2 Weeks",
      description:
        "Learn Flexbox, Grid, responsive layouts, animations, positioning and mobile-first design.",
    },
    {
      title: "JavaScript Core",
      difficulty: "Beginner",
      time: "3 Weeks",
      description:
        "Master variables, functions, arrays, objects, DOM, ES6+, promises, async/await and events.",
    },
    {
      title: "Git & GitHub",
      difficulty: "Beginner",
      time: "1 Week",
      description:
        "Learn Git workflow, branches, pull requests, merge conflicts and professional collaboration.",
    },
    {
      title: "React.js",
      difficulty: "Intermediate",
      time: "3 Weeks",
      description:
        "Learn components, props, state, hooks, routing, forms, API integration and reusable components.",
    },
    {
      title: "Advanced React",
      difficulty: "Advanced",
      time: "3 Weeks",
      description:
        "Learn performance optimization, advanced hooks, state architecture, lazy loading and production patterns.",
    },
    {
      title: "Frontend Projects",
      difficulty: "Advanced",
      time: "4 Weeks",
      description:
        "Build portfolio-quality applications with authentication, APIs, responsive UI and real-world features.",
    },
    {
      title: "Deployment & Interview",
      difficulty: "Advanced",
      time: "2 Weeks",
      description:
        "Deploy applications and prepare JavaScript, React, browser and frontend interview questions.",
    },
  ],

  // ========================================================
  // BACKEND
  // ========================================================

  backend: [
    {
      title: "Programming & JavaScript Fundamentals",
      difficulty: "Beginner",
      time: "2 Weeks",
      description:
        "Build strong programming logic with JavaScript, functions, objects, arrays, modules and error handling.",
    },
    {
      title: "Node.js",
      difficulty: "Beginner",
      time: "2 Weeks",
      description:
        "Understand Node.js runtime, npm, modules, event loop, asynchronous programming and file systems.",
    },
    {
      title: "Express.js & REST APIs",
      difficulty: "Intermediate",
      time: "2 Weeks",
      description:
        "Build professional REST APIs using routes, controllers, middleware, validation and error handling.",
    },
    {
      title: "MongoDB & Mongoose",
      difficulty: "Intermediate",
      time: "2 Weeks",
      description:
        "Learn database design, schemas, CRUD, relationships, indexes, aggregation and Mongoose.",
    },
    {
      title: "Authentication & Authorization",
      difficulty: "Intermediate",
      time: "2 Weeks",
      description:
        "Implement JWT authentication, password hashing, roles, permissions and protected APIs.",
    },
    {
      title: "Backend Architecture",
      difficulty: "Advanced",
      time: "3 Weeks",
      description:
        "Learn MVC architecture, services, controllers, validation, security, logging and scalable backend design.",
    },
    {
      title: "Production Backend Projects",
      difficulty: "Advanced",
      time: "4 Weeks",
      description:
        "Build complete backend systems involving authentication, databases, APIs and real-time features.",
    },
    {
      title: "Deployment & Backend Interviews",
      difficulty: "Advanced",
      time: "2 Weeks",
      description:
        "Deploy APIs and prepare Node.js, Express, MongoDB, REST API, JWT and backend interview questions.",
    },
  ],

  // ========================================================
  // FULL STACK
  // ========================================================

  fullstack: [
    {
      title: "Web Fundamentals",
      difficulty: "Beginner",
      time: "2 Weeks",
      description:
        "Master HTML, CSS, responsive design and browser fundamentals before moving into application development.",
    },
    {
      title: "JavaScript Mastery",
      difficulty: "Beginner",
      time: "3 Weeks",
      description:
        "Learn modern JavaScript, ES6+, DOM, asynchronous programming, promises, modules and APIs.",
    },
    {
      title: "React Frontend Development",
      difficulty: "Intermediate",
      time: "3 Weeks",
      description:
        "Build modern interfaces using React, hooks, routing, forms, state management and API integration.",
    },
    {
      title: "Node.js & Express",
      difficulty: "Intermediate",
      time: "3 Weeks",
      description:
        "Create REST APIs using Node.js and Express with routing, middleware, validation and error handling.",
    },
    {
      title: "MongoDB & Authentication",
      difficulty: "Intermediate",
      time: "3 Weeks",
      description:
        "Design databases and implement JWT authentication, authorization, password security and user roles.",
    },
    {
      title: "Full Stack Architecture",
      difficulty: "Advanced",
      time: "3 Weeks",
      description:
        "Connect frontend and backend systems using scalable architecture, API patterns and secure data flow.",
    },
    {
      title: "Production Full Stack Project",
      difficulty: "Advanced",
      time: "4 Weeks",
      description:
        "Build a complete production-style application from database to frontend and deployment.",
    },
    {
      title: "Deployment & Full Stack Interviews",
      difficulty: "Advanced",
      time: "2 Weeks",
      description:
        "Deploy the complete application and prepare JavaScript, React, Node.js, MongoDB and system questions.",
    },
  ],

  // ========================================================
  // AI
  // ========================================================

  ai: [
    {
      title: "Python Programming",
      difficulty: "Beginner",
      time: "2 Weeks",
      description:
        "Build strong Python fundamentals including functions, OOP, collections, modules and error handling.",
    },
    {
      title: "Mathematics for AI",
      difficulty: "Beginner",
      time: "2 Weeks",
      description:
        "Learn the linear algebra, probability, statistics and calculus concepts required for AI.",
    },
    {
      title: "Data Processing",
      difficulty: "Intermediate",
      time: "2 Weeks",
      description:
        "Use NumPy and Pandas to clean, transform, analyze and prepare datasets for AI systems.",
    },
    {
      title: "Machine Learning Foundations",
      difficulty: "Intermediate",
      time: "4 Weeks",
      description:
        "Learn supervised and unsupervised learning, feature engineering, evaluation and model selection.",
    },
    {
      title: "Deep Learning",
      difficulty: "Advanced",
      time: "4 Weeks",
      description:
        "Learn neural networks, CNNs, RNNs, optimization and deep learning workflows.",
    },
    {
      title: "Generative AI & LLMs",
      difficulty: "Advanced",
      time: "3 Weeks",
      description:
        "Learn transformers, embeddings, prompt engineering, RAG and LLM application development.",
    },
    {
      title: "AI Application Development",
      difficulty: "Advanced",
      time: "4 Weeks",
      description:
        "Build practical AI applications and integrate trained models into real software systems.",
    },
    {
      title: "AI Portfolio & Interviews",
      difficulty: "Advanced",
      time: "2 Weeks",
      description:
        "Build AI projects and prepare machine learning, deep learning and AI engineering interviews.",
    },
  ],

  // ========================================================
  // ML
  // ========================================================

  ml: [
    {
      title: "Python for Machine Learning",
      difficulty: "Beginner",
      time: "2 Weeks",
      description:
        "Master Python, NumPy, Pandas and programming techniques required for machine learning.",
    },
    {
      title: "Statistics & Probability",
      difficulty: "Beginner",
      time: "3 Weeks",
      description:
        "Learn distributions, probability, hypothesis testing, correlation and statistical reasoning.",
    },
    {
      title: "Data Preprocessing",
      difficulty: "Intermediate",
      time: "2 Weeks",
      description:
        "Handle missing values, outliers, encoding, scaling and feature engineering.",
    },
    {
      title: "Supervised Learning",
      difficulty: "Intermediate",
      time: "3 Weeks",
      description:
        "Master regression, classification, decision trees, ensembles and model evaluation.",
    },
    {
      title: "Unsupervised Learning",
      difficulty: "Advanced",
      time: "2 Weeks",
      description:
        "Learn clustering, dimensionality reduction and pattern discovery techniques.",
    },
    {
      title: "Deep Learning",
      difficulty: "Advanced",
      time: "4 Weeks",
      description:
        "Learn neural networks, CNNs, sequence models and deep learning optimization.",
    },
    {
      title: "End-to-End ML Projects",
      difficulty: "Advanced",
      time: "4 Weeks",
      description:
        "Build complete ML systems from dataset collection and training to evaluation and deployment.",
    },
    {
      title: "ML Interview Preparation",
      difficulty: "Advanced",
      time: "2 Weeks",
      description:
        "Prepare statistics, algorithms, model evaluation, ML system and practical coding interviews.",
    },
  ],

  // ========================================================
  // DATA SCIENCE
  // ========================================================

  data: [
    {
      title: "Python for Data Science",
      difficulty: "Beginner",
      time: "2 Weeks",
      description:
        "Learn Python, NumPy, Pandas and programming techniques used for data analysis.",
    },
    {
      title: "Statistics & Probability",
      difficulty: "Beginner",
      time: "3 Weeks",
      description:
        "Build statistical thinking using distributions, probability, hypothesis testing and sampling.",
    },
    {
      title: "Data Cleaning & EDA",
      difficulty: "Intermediate",
      time: "3 Weeks",
      description:
        "Clean messy datasets and perform exploratory analysis to identify useful patterns.",
    },
    {
      title: "Data Visualization",
      difficulty: "Intermediate",
      time: "2 Weeks",
      description:
        "Create meaningful visualizations and dashboards using Matplotlib, Seaborn and visualization principles.",
    },
    {
      title: "Machine Learning",
      difficulty: "Advanced",
      time: "4 Weeks",
      description:
        "Apply regression, classification, clustering and model evaluation to real datasets.",
    },
    {
      title: "SQL & Data Analysis",
      difficulty: "Intermediate",
      time: "3 Weeks",
      description:
        "Master SQL queries, joins, aggregations, subqueries and analytical data workflows.",
    },
    {
      title: "Data Science Projects",
      difficulty: "Advanced",
      time: "4 Weeks",
      description:
        "Complete end-to-end data science projects using real-world datasets.",
    },
    {
      title: "Data Science Interviews",
      difficulty: "Advanced",
      time: "2 Weeks",
      description:
        "Prepare statistics, SQL, Python, machine learning and case-study interviews.",
    },
  ],

  // ========================================================
  // CYBER SECURITY
  // ========================================================

  cyber: [
    {
      title: "Networking Fundamentals",
      difficulty: "Beginner",
      time: "3 Weeks",
      description:
        "Learn TCP/IP, DNS, HTTP, ports, protocols, routing and network architecture.",
    },
    {
      title: "Linux & System Fundamentals",
      difficulty: "Beginner",
      time: "2 Weeks",
      description:
        "Learn Linux commands, permissions, processes, filesystems and system administration.",
    },
    {
      title: "Cyber Security Fundamentals",
      difficulty: "Intermediate",
      time: "3 Weeks",
      description:
        "Understand CIA triad, threats, vulnerabilities, risk management and security controls.",
    },
    {
      title: "Web Application Security",
      difficulty: "Intermediate",
      time: "3 Weeks",
      description:
        "Study common web vulnerabilities, secure authentication and defensive development practices.",
    },
    {
      title: "Ethical Hacking",
      difficulty: "Advanced",
      time: "4 Weeks",
      description:
        "Learn authorized security testing methodology, reconnaissance, vulnerability assessment and reporting.",
    },
    {
      title: "Security Tools & Monitoring",
      difficulty: "Advanced",
      time: "3 Weeks",
      description:
        "Work with security monitoring, logs, vulnerability scanners and incident investigation workflows.",
    },
    {
      title: "Security Projects",
      difficulty: "Advanced",
      time: "4 Weeks",
      description:
        "Build defensive security projects and document security assessments professionally.",
    },
    {
      title: "Cyber Security Interviews",
      difficulty: "Advanced",
      time: "2 Weeks",
      description:
        "Prepare networking, Linux, security concepts, web security and scenario-based interviews.",
    },
  ],

  // ========================================================
  // CLOUD
  // ========================================================

  cloud: [
    {
      title: "Linux Fundamentals",
      difficulty: "Beginner",
      time: "2 Weeks",
      description:
        "Learn Linux commands, permissions, processes, services and shell fundamentals.",
    },
    {
      title: "Networking Fundamentals",
      difficulty: "Beginner",
      time: "3 Weeks",
      description:
        "Understand IP addressing, DNS, HTTP, routing, firewalls and cloud networking concepts.",
    },
    {
      title: "Cloud Fundamentals",
      difficulty: "Intermediate",
      time: "2 Weeks",
      description:
        "Understand IaaS, PaaS, SaaS, regions, availability zones, storage and compute services.",
    },
    {
      title: "AWS / Azure Services",
      difficulty: "Intermediate",
      time: "4 Weeks",
      description:
        "Learn compute, storage, databases, networking, IAM and monitoring using a major cloud platform.",
    },
    {
      title: "Cloud Security",
      difficulty: "Advanced",
      time: "2 Weeks",
      description:
        "Implement IAM, least privilege, encryption, network security and secure cloud architecture.",
    },
    {
      title: "Cloud Architecture",
      difficulty: "Advanced",
      time: "3 Weeks",
      description:
        "Design scalable, reliable and cost-aware cloud systems.",
    },
    {
      title: "Cloud Projects",
      difficulty: "Advanced",
      time: "4 Weeks",
      description:
        "Deploy real applications using cloud infrastructure, databases, networking and monitoring.",
    },
    {
      title: "Cloud Certification & Interviews",
      difficulty: "Advanced",
      time: "2 Weeks",
      description:
        "Prepare cloud architecture, networking, security and scenario-based interviews.",
    },
  ],

  // ========================================================
  // DEVOPS
  // ========================================================

  devops: [
    {
      title: "Linux & Shell",
      difficulty: "Beginner",
      time: "2 Weeks",
      description:
        "Master Linux administration, processes, permissions, services and shell scripting.",
    },
    {
      title: "Git & GitHub",
      difficulty: "Beginner",
      time: "1 Week",
      description:
        "Learn professional Git workflows, branching, pull requests and collaboration.",
    },
    {
      title: "Docker",
      difficulty: "Intermediate",
      time: "2 Weeks",
      description:
        "Containerize applications, create images, manage containers and use Docker Compose.",
    },
    {
      title: "CI/CD",
      difficulty: "Intermediate",
      time: "3 Weeks",
      description:
        "Build automated pipelines for testing, building and deploying applications.",
    },
    {
      title: "Cloud Infrastructure",
      difficulty: "Advanced",
      time: "3 Weeks",
      description:
        "Deploy applications on cloud platforms and understand scalable infrastructure.",
    },
    {
      title: "Kubernetes",
      difficulty: "Advanced",
      time: "4 Weeks",
      description:
        "Learn containers orchestration, pods, deployments, services, scaling and cluster concepts.",
    },
    {
      title: "Infrastructure as Code",
      difficulty: "Advanced",
      time: "3 Weeks",
      description:
        "Automate infrastructure using configuration and infrastructure-as-code practices.",
    },
    {
      title: "DevOps Projects & Interviews",
      difficulty: "Advanced",
      time: "3 Weeks",
      description:
        "Build production-style CI/CD systems and prepare DevOps interviews.",
    },
  ],

  // ========================================================
  // ANDROID
  // ========================================================

  android: [
    {
      title: "Kotlin Fundamentals",
      difficulty: "Beginner",
      time: "3 Weeks",
      description:
        "Learn Kotlin syntax, functions, classes, collections, null safety and object-oriented programming.",
    },
    {
      title: "Android Studio & UI",
      difficulty: "Beginner",
      time: "2 Weeks",
      description:
        "Learn Android Studio, project structure, layouts, resources and modern UI development.",
    },
    {
      title: "Android Components",
      difficulty: "Intermediate",
      time: "3 Weeks",
      description:
        "Understand activities, fragments, lifecycle, intents, navigation and app architecture.",
    },
    {
      title: "Jetpack Compose",
      difficulty: "Intermediate",
      time: "3 Weeks",
      description:
        "Build modern Android interfaces using declarative UI and Compose.",
    },
    {
      title: "APIs & Local Storage",
      difficulty: "Intermediate",
      time: "3 Weeks",
      description:
        "Connect applications with REST APIs and implement local data storage.",
    },
    {
      title: "Android Architecture",
      difficulty: "Advanced",
      time: "3 Weeks",
      description:
        "Learn MVVM, repositories, ViewModel, dependency management and scalable architecture.",
    },
    {
      title: "Production Android App",
      difficulty: "Advanced",
      time: "4 Weeks",
      description:
        "Build a complete production-style Android application with authentication and APIs.",
    },
    {
      title: "Publishing & Interviews",
      difficulty: "Advanced",
      time: "2 Weeks",
      description:
        "Prepare Android interviews and learn app release and deployment workflows.",
    },
  ],

  // ========================================================
  // UI UX
  // ========================================================

  uiux: [
    {
      title: "Design Fundamentals",
      difficulty: "Beginner",
      time: "2 Weeks",
      description:
        "Learn typography, color theory, spacing, hierarchy, composition and visual balance.",
    },
    {
      title: "UX Research",
      difficulty: "Beginner",
      time: "2 Weeks",
      description:
        "Learn user research, interviews, personas, user journeys and problem identification.",
    },
    {
      title: "Wireframing",
      difficulty: "Intermediate",
      time: "2 Weeks",
      description:
        "Create low and high fidelity wireframes focused on user flows and usability.",
    },
    {
      title: "Figma",
      difficulty: "Intermediate",
      time: "3 Weeks",
      description:
        "Master Figma components, auto layout, variants, prototypes and design systems.",
    },
    {
      title: "Design Systems",
      difficulty: "Advanced",
      time: "2 Weeks",
      description:
        "Create reusable components, tokens, patterns and scalable product design systems.",
    },
    {
      title: "Prototyping & Usability",
      difficulty: "Advanced",
      time: "3 Weeks",
      description:
        "Build interactive prototypes and validate designs through usability testing.",
    },
    {
      title: "Portfolio Projects",
      difficulty: "Advanced",
      time: "4 Weeks",
      description:
        "Create complete case studies covering research, wireframes, UI, prototype and final solution.",
    },
    {
      title: "UI/UX Interview Preparation",
      difficulty: "Advanced",
      time: "2 Weeks",
      description:
        "Prepare design challenges, portfolio presentation and UX problem-solving interviews.",
    },
  ],
};

// ============================================================
// CREATE ROADMAP
// ============================================================

const createRoadmap = (career, level) => {
  const baseSteps =
    roadmapData[career] || [];

  return baseSteps.map((step, index) => {
    let status = "pending";
    let progress = 0;

    if (level === "Beginner") {
      if (index === 0) {
        status = "in-progress";
        progress = 35;
      }
    }

    if (level === "Intermediate") {
      if (index < 2) {
        status = "completed";
        progress = 100;
      } else if (index === 2) {
        status = "in-progress";
        progress = 45;
      }
    }

    if (level === "Advanced") {
      if (index < 4) {
        status = "completed";
        progress = 100;
      } else if (index === 4) {
        status = "in-progress";
        progress = 55;
      }
    }

    return {
      ...step,
      stepNumber: index + 1,
      status,
      progress,
    };
  });
};

// ============================================================
// WEEKLY PLAN
// ============================================================

const createWeeklyPlan = (
  career,
  level
) => {
  const plans = {

    frontend: [
      ["HTML, CSS", "Build responsive landing page"],
      ["JavaScript", "Build DOM-based application"],
      ["React", "Build React dashboard"],
      ["API Integration", "Connect real API"],
      ["State Management", "Build complex UI"],
      ["Performance", "Optimize React application"],
      ["Portfolio", "Build portfolio project"],
      ["Deployment", "Deploy final project"],
    ],

    backend: [
      ["Node.js", "Build basic server"],
      ["Express", "Create REST API"],
      ["MongoDB", "Design database"],
      ["Authentication", "Implement JWT auth"],
      ["Authorization", "Implement roles"],
      ["Security", "Secure APIs"],
      ["Backend Project", "Build complete API"],
      ["Deployment", "Deploy backend"],
    ],

    fullstack: [
      ["HTML/CSS", "Build responsive UI"],
      ["JavaScript", "Build interactive frontend"],
      ["React", "Build React application"],
      ["Node/Express", "Create REST API"],
      ["MongoDB", "Connect database"],
      ["JWT", "Implement authentication"],
      ["Full Stack Project", "Connect complete stack"],
      ["Deployment", "Deploy full application"],
    ],

    ai: [
      ["Python", "Build Python mini project"],
      ["NumPy/Pandas", "Analyze dataset"],
      ["Statistics", "Perform statistical analysis"],
      ["Machine Learning", "Train ML model"],
      ["Deep Learning", "Build neural network"],
      ["LLM", "Build AI application"],
      ["RAG", "Build knowledge-based AI"],
      ["AI Project", "Deploy AI application"],
    ],

    ml: [
      ["Python", "Build data processing script"],
      ["Statistics", "Analyze dataset"],
      ["Preprocessing", "Clean real dataset"],
      ["Regression", "Build prediction model"],
      ["Classification", "Build classifier"],
      ["Clustering", "Perform segmentation"],
      ["Deep Learning", "Train neural network"],
      ["ML Project", "Deploy ML model"],
    ],

    data: [
      ["Python", "Practice Pandas"],
      ["SQL", "Solve analytical queries"],
      ["Statistics", "Analyze business data"],
      ["EDA", "Explore real dataset"],
      ["Visualization", "Create dashboard"],
      ["Machine Learning", "Build prediction model"],
      ["Case Study", "Solve business problem"],
      ["Portfolio", "Publish data project"],
    ],

    cyber: [
      ["Networking", "Analyze network traffic"],
      ["Linux", "Practice Linux administration"],
      ["Security Basics", "Perform security assessment"],
      ["Web Security", "Study web vulnerabilities"],
      ["Monitoring", "Analyze security logs"],
      ["Ethical Hacking", "Perform authorized lab testing"],
      ["Security Project", "Create security report"],
      ["Interview", "Practice security scenarios"],
    ],

    cloud: [
      ["Linux", "Deploy Linux server"],
      ["Networking", "Configure cloud networking"],
      ["Cloud Basics", "Deploy first cloud service"],
      ["Compute", "Deploy application"],
      ["Storage", "Design storage solution"],
      ["Database", "Deploy cloud database"],
      ["Security", "Configure IAM"],
      ["Architecture", "Build cloud project"],
    ],

    devops: [
      ["Linux", "Automate shell task"],
      ["Git", "Create Git workflow"],
      ["Docker", "Containerize application"],
      ["Docker Compose", "Run multi-container app"],
      ["CI/CD", "Create pipeline"],
      ["Cloud", "Deploy application"],
      ["Kubernetes", "Deploy containerized app"],
      ["DevOps Project", "Build CI/CD system"],
    ],

    android: [
      ["Kotlin", "Build Kotlin application"],
      ["Android Studio", "Create Android app"],
      ["UI", "Build app screens"],
      ["Navigation", "Implement app navigation"],
      ["API", "Connect REST API"],
      ["Storage", "Implement local storage"],
      ["Architecture", "Build MVVM application"],
      ["Final App", "Publish production app"],
    ],

    uiux: [
      ["Design Basics", "Create visual style guide"],
      ["UX Research", "Create user persona"],
      ["User Flow", "Design complete user journey"],
      ["Wireframes", "Create low-fidelity wireframes"],
      ["Figma", "Create high-fidelity UI"],
      ["Prototype", "Build interactive prototype"],
      ["Usability", "Test design with users"],
      ["Case Study", "Publish portfolio case study"],
    ],
  };

  const selected =
    plans[career] ||
    plans.fullstack;

  const hoursByLevel = {
    Beginner: [8, 8, 10, 10, 10, 12, 12, 12],
    Intermediate: [10, 10, 12, 12, 14, 14, 15, 15],
    Advanced: [12, 12, 14, 15, 16, 16, 18, 18],
  };

  return selected.map(
    ([topic, assignment], index) => ({
      week: `Week ${index + 1}`,
      topics: [topic],
      assignment,
      miniProject:
        `${careerNames[career]} - ${topic} Project`,
      hours:
        hoursByLevel[level][index],
    })
  );
};

// ============================================================
// PROJECTS
// ============================================================

const projectData = {

  frontend: [
    ["Responsive Portfolio", "Beginner", ["HTML", "CSS", "JavaScript"], "1 Week"],
    ["Weather Dashboard", "Beginner", ["JavaScript", "REST API"], "1 Week"],
    ["React Task Manager", "Intermediate", ["React", "Hooks", "API"], "2 Weeks"],
    ["E-Commerce Frontend", "Advanced", ["React", "State Management", "API"], "4 Weeks"],
  ],

  backend: [
    ["REST API", "Beginner", ["Node.js", "Express"], "1 Week"],
    ["Authentication API", "Intermediate", ["Node.js", "JWT", "MongoDB"], "2 Weeks"],
    ["Task Manager API", "Intermediate", ["Express", "MongoDB", "JWT"], "2 Weeks"],
    ["Realtime Chat Backend", "Advanced", ["Node.js", "Socket.IO", "MongoDB"], "4 Weeks"],
  ],

  fullstack: [
    ["Portfolio Website", "Beginner", ["React", "CSS"], "1 Week"],
    ["Authentication System", "Intermediate", ["React", "Node.js", "JWT"], "2 Weeks"],
    ["Task Management SaaS", "Advanced", ["React", "Express", "MongoDB"], "3 Weeks"],
    ["Full Stack E-Commerce", "Advanced", ["React", "Node.js", "MongoDB", "JWT"], "5 Weeks"],
  ],

  ai: [
    ["AI Chatbot", "Beginner", ["Python", "API"], "1 Week"],
    ["Recommendation System", "Intermediate", ["Python", "Pandas", "ML"], "2 Weeks"],
    ["Image Classification", "Advanced", ["Python", "CNN", "Deep Learning"], "3 Weeks"],
    ["RAG AI Assistant", "Advanced", ["Python", "LLM", "Embeddings"], "4 Weeks"],
  ],

  ml: [
    ["House Price Prediction", "Beginner", ["Python", "Regression"], "1 Week"],
    ["Customer Churn Prediction", "Intermediate", ["Pandas", "Scikit-learn"], "2 Weeks"],
    ["Recommendation Engine", "Advanced", ["Python", "ML"], "3 Weeks"],
    ["End-to-End ML Platform", "Advanced", ["ML", "API", "Deployment"], "4 Weeks"],
  ],

  data: [
    ["Sales Data Analysis", "Beginner", ["Python", "Pandas"], "1 Week"],
    ["SQL Analytics Dashboard", "Intermediate", ["SQL", "Python"], "2 Weeks"],
    ["Customer Segmentation", "Advanced", ["Python", "Clustering"], "3 Weeks"],
    ["Business Intelligence Case Study", "Advanced", ["SQL", "Python", "Visualization"], "4 Weeks"],
  ],

  cyber: [
    ["Network Analysis Lab", "Beginner", ["Networking", "Linux"], "1 Week"],
    ["Security Assessment", "Intermediate", ["Security", "Linux"], "2 Weeks"],
    ["Web Security Lab", "Advanced", ["Web Security", "OWASP"], "3 Weeks"],
    ["SOC Monitoring Project", "Advanced", ["Logs", "Monitoring", "Security"], "4 Weeks"],
  ],

  cloud: [
    ["Cloud Static Website", "Beginner", ["Cloud Storage", "DNS"], "1 Week"],
    ["Cloud API Deployment", "Intermediate", ["Compute", "API"], "2 Weeks"],
    ["Scalable Web Architecture", "Advanced", ["Cloud", "Networking"], "3 Weeks"],
    ["Production Cloud System", "Advanced", ["Cloud", "Security", "Database"], "4 Weeks"],
  ],

  devops: [
    ["Dockerized App", "Beginner", ["Docker"], "1 Week"],
    ["CI/CD Pipeline", "Intermediate", ["GitHub Actions", "Docker"], "2 Weeks"],
    ["Kubernetes Deployment", "Advanced", ["Kubernetes", "Docker"], "3 Weeks"],
    ["Production DevOps Platform", "Advanced", ["CI/CD", "Cloud", "Kubernetes"], "4 Weeks"],
  ],

  android: [
    ["Calculator App", "Beginner", ["Kotlin", "Android"], "1 Week"],
    ["Weather App", "Intermediate", ["Kotlin", "REST API"], "2 Weeks"],
    ["Expense Manager", "Advanced", ["Kotlin", "Room", "MVVM"], "3 Weeks"],
    ["Production Android App", "Advanced", ["Kotlin", "API", "MVVM"], "4 Weeks"],
  ],

  uiux: [
    ["Mobile App Redesign", "Beginner", ["Figma", "UI"], "1 Week"],
    ["Food Delivery UX", "Intermediate", ["UX Research", "Figma"], "2 Weeks"],
    ["FinTech Product Design", "Advanced", ["Figma", "Design System"], "3 Weeks"],
    ["Complete Product Case Study", "Advanced", ["Research", "UI", "Prototype"], "4 Weeks"],
  ],
};

// ============================================================
// CREATE PROJECTS
// ============================================================

const createProjects = (career) => {
  const projects =
    projectData[career] ||
    projectData.fullstack;

  return projects.map(
    ([name, difficulty, skills, time]) => ({
      name,
      difficulty,
      skills,
      time,
    })
  );
};

// ============================================================
// SKILL ANALYSIS
// ============================================================

const createSkillAnalysis = (
  career,
  level
) => {
  const scores = {
    Beginner: {
      currentSkills: 25,
      missingSkills: 75,
      industryReadiness: 20,
      interviewReadiness: 15,
      confidenceScore: 30,
    },

    Intermediate: {
      currentSkills: 55,
      missingSkills: 45,
      industryReadiness: 55,
      interviewReadiness: 45,
      confidenceScore: 60,
    },

    Advanced: {
      currentSkills: 82,
      missingSkills: 18,
      industryReadiness: 85,
      interviewReadiness: 78,
      confidenceScore: 88,
    },
  };

  return {
    ...scores[level],
    career: careerNames[career],
  };
};

// ============================================================
// INTERVIEW PREPARATION
// ============================================================

const interviewData = {

  frontend: [
    "HTML semantic elements",
    "CSS Flexbox and Grid",
    "JavaScript fundamentals",
    "Closures and asynchronous JavaScript",
    "React hooks",
    "State management",
    "Browser rendering",
    "Frontend performance",
    "REST APIs",
    "Frontend coding problems",
  ],

  backend: [
    "Node.js event loop",
    "Express middleware",
    "REST API design",
    "MongoDB schema design",
    "Indexes and aggregation",
    "JWT authentication",
    "Authorization",
    "API security",
    "Caching",
    "Backend system design",
  ],

  fullstack: [
    "JavaScript fundamentals",
    "React architecture",
    "Node.js event loop",
    "REST API design",
    "MongoDB",
    "JWT authentication",
    "Frontend-backend communication",
    "Security",
    "Deployment",
    "Full stack system design",
  ],

  ai: [
    "Python",
    "Linear algebra",
    "Statistics",
    "Machine learning",
    "Neural networks",
    "Transformers",
    "LLMs",
    "Embeddings",
    "RAG",
    "AI system design",
  ],

  ml: [
    "Probability",
    "Statistics",
    "Regression",
    "Classification",
    "Feature engineering",
    "Model evaluation",
    "Overfitting",
    "Clustering",
    "Deep learning",
    "ML system design",
  ],

  data: [
    "Python",
    "Pandas",
    "SQL",
    "Statistics",
    "EDA",
    "Data visualization",
    "Hypothesis testing",
    "Machine learning",
    "Business case studies",
    "Data interpretation",
  ],

  cyber: [
    "Networking",
    "TCP/IP",
    "Linux",
    "Authentication",
    "Web security",
    "OWASP concepts",
    "Threat modeling",
    "Incident response",
    "Security monitoring",
    "Security scenarios",
  ],

  cloud: [
    "Cloud fundamentals",
    "Networking",
    "IAM",
    "Compute",
    "Storage",
    "Databases",
    "Cloud security",
    "Scalability",
    "Availability",
    "Cloud architecture",
  ],

  devops: [
    "Linux",
    "Git",
    "Docker",
    "CI/CD",
    "Cloud",
    "Kubernetes",
    "Infrastructure",
    "Monitoring",
    "Deployment strategies",
    "DevOps architecture",
  ],

  android: [
    "Kotlin",
    "Android lifecycle",
    "Activities",
    "Jetpack Compose",
    "Navigation",
    "REST APIs",
    "Local storage",
    "MVVM",
    "Performance",
    "Android architecture",
  ],

  uiux: [
    "UX research",
    "Personas",
    "User journeys",
    "Wireframing",
    "Typography",
    "Color theory",
    "Figma",
    "Design systems",
    "Usability testing",
    "Design case studies",
  ],
};

// ============================================================
// CREATE INTERVIEW PREPARATION
// ============================================================

const createInterviewPreparation = (
  career
) => {
  return {
    focus: careerNames[career],
    topics:
      interviewData[career] ||
      interviewData.fullstack,
    mockInterviews: 5,
    codingChallenges: 10,
    portfolioReview: true,
  };
};

// ============================================================
// UPDATE ROADMAP STEP PROGRESS
// PATCH /api/roadmap/:id/progress
// ============================================================

export const updateRoadmapStepProgress = async (
  req,
  res
) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    const {
      stepIndex,
      progress,
    } = req.body;

    // --------------------------------------------------------
    // AUTH CHECK
    // --------------------------------------------------------

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // --------------------------------------------------------
    // VALIDATE STEP INDEX
    // --------------------------------------------------------

    if (
      stepIndex === undefined ||
      stepIndex === null ||
      Number.isNaN(Number(stepIndex))
    ) {
      return res.status(400).json({
        success: false,
        message: "Step index is required",
      });
    }

    const index = Number(stepIndex);

    // --------------------------------------------------------
    // VALIDATE PROGRESS
    // --------------------------------------------------------

    const numericProgress = Number(progress);

    if (
      Number.isNaN(numericProgress) ||
      numericProgress < 0 ||
      numericProgress > 100
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Progress must be a number between 0 and 100",
      });
    }

    // --------------------------------------------------------
    // FIND USER ROADMAP
    // --------------------------------------------------------

    const roadmap =
      await Roadmap.findOne({
        _id: id,
        user: userId,
      });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    // --------------------------------------------------------
    // VALIDATE STEP
    // --------------------------------------------------------

    if (
      !roadmap.roadmapSteps ||
      index < 0 ||
      index >= roadmap.roadmapSteps.length
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid roadmap step",
      });
    }

    // --------------------------------------------------------
    // UPDATE STEP
    // --------------------------------------------------------

    roadmap.roadmapSteps[index].progress =
      numericProgress;

    roadmap.roadmapSteps[index].status =
      numericProgress === 100
        ? "completed"
        : numericProgress > 0
        ? "in-progress"
        : "pending";

    await roadmap.save();

    // --------------------------------------------------------
    // CALCULATE OVERALL PROGRESS
    // --------------------------------------------------------

    const steps = roadmap.roadmapSteps;

    const totalProgress = steps.reduce(
      (total, step) =>
        total + Number(step.progress || 0),
      0
    );

    const overallProgress =
      steps.length > 0
        ? Math.round(
            totalProgress / steps.length
          )
        : 0;

    // --------------------------------------------------------
    // FIND NEXT STEP
    // --------------------------------------------------------

    let nextStep =
      steps.find(
        (step) =>
          step.status === "in-progress"
      ) || null;

    if (!nextStep) {
      nextStep =
        steps.find(
          (step) =>
            step.status === "pending"
        ) || null;
    }

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Roadmap progress updated successfully",

      roadmap: {
        id: roadmap._id,
        career: roadmap.career,
        level: roadmap.level,

        roadmapSteps:
          roadmap.roadmapSteps,

        progress:
          overallProgress,

        completedSteps:
          steps.filter(
            (step) =>
              step.status === "completed"
          ).length,

        totalSteps:
          steps.length,

        nextStep,
      },
    });
  } catch (error) {
    console.error(
      "Update Roadmap Progress Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update roadmap progress",
      error: error.message,
    });
  }
};

// ============================================================
// AI STEP-LEVEL LEARNING TUTOR
// POST /api/roadmap/:id/steps/:stepIndex/learn
//
// Generates a structured, beginner-friendly learning module
// for ONE specific roadmap step. This is completely separate
// from roadmap generation and from step completion:
//   - It does NOT touch roadmap.roadmapSteps[index].progress
//   - It does NOT touch roadmap.roadmapSteps[index].status
//   - It is never called by "Complete Step" / progress toggling
//
// IMPORTANT: roadmapId and stepIndex come from the URL
// (req.params.id, req.params.stepIndex) — matching the route
// defined in roadmap.routes.js. career/level/step are OPTIONAL
// context sent in the body by the frontend; if omitted, they
// fall back to whatever is already saved on the roadmap.
// ============================================================

/*
 * Builds the AI prompt for a single roadmap step.
 * Kept outside the handler so it's easy to tune independently.
 */
const buildLearningPrompt = ({ careerName, level, step }) => {
  const topicsLine =
    Array.isArray(step.topics) && step.topics.length
      ? `- Related Topics: ${step.topics.join(", ")}\n`
      : "";

  return `
You are an expert personal learning tutor inside "CampusHub AI", a platform that helps beginner students follow a step-by-step career roadmap toward their goal career.

The student is currently on ONE SPECIFIC STEP of a larger roadmap. Your job is to teach ONLY this step, in depth. Do NOT generate a new roadmap. Do NOT jump ahead to unrelated or advanced topics outside this step. Do NOT summarize the whole career path — stay scoped to this one step.

STUDENT CONTEXT
- Career Path: ${careerName}
- Skill Level: ${level}
- Current Roadmap Step: ${step.title}
- Step Description: ${step.description || "Not provided"}
- Step Difficulty: ${step.difficulty || "General"}
- Estimated Time: ${step.time || "Flexible"}
${topicsLine}
LANGUAGE RULES
- The student's own questions or context may arrive in Hindi, Hinglish, or English. Understand all of these.
- Your ENTIRE generated response content must be written in English only, unless the student explicitly asked for a different language.

TEACHING RULES
- Teach like a patient, encouraging personal tutor for a "${level}" student.
- Use simple, clear language. Explain from the basics first, then build up. Avoid unnecessary jargon.
- Stay strictly scoped to "${step.title}" — do not teach unrelated topics.
- If this is a programming/technical topic, include real, runnable code examples.
- If this is a non-programming topic (design, research, communication, etc.), replace code examples with concrete practical exercises instead, and you may return an empty array for codeExamples.

Respond with ONLY a single valid JSON object — no markdown code fences, no commentary before or after — matching EXACTLY this shape:

{
  "title": string,
  "overview": string,
  "whyItMatters": string,
  "whatYouWillLearn": string[],
  "coreConcepts": [
    { "title": string, "explanation": string, "example": string }
  ],
  "codeExamples": [
    { "label": string, "code": string }
  ],
  "commonMistakes": string[],
  "practiceQuestions": string[],
  "handsOnTask": string,
  "interviewQuestions": string[],
  "keyTakeaways": string[],
  "suggestedNextStep": string
}

Return ONLY the JSON object described above.
`.trim();
};

export const generateStepLearning = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // --------------------------------------------------------
    // ROADMAP ID + STEP INDEX COME FROM THE URL
    // Route: /:id/steps/:stepIndex/learn
    // --------------------------------------------------------

    const { id: roadmapId, stepIndex } = req.params;

    if (!roadmapId) {
      return res.status(400).json({
        success: false,
        message: "Roadmap id is required in the URL",
      });
    }

    if (
      stepIndex === undefined ||
      stepIndex === null ||
      Number.isNaN(Number(stepIndex))
    ) {
      return res.status(400).json({
        success: false,
        message: "A valid step index is required in the URL",
      });
    }

    const index = Number(stepIndex);

    // --------------------------------------------------------
    // OPTIONAL CONTEXT FROM THE BODY
    // (career / level / step details the frontend may send;
    // all optional — we always fall back to the saved roadmap)
    // --------------------------------------------------------

    const body = req.body || {};
    const { career, level, step } = body;

    // --------------------------------------------------------
    // LOAD ROADMAP (SCOPED TO THIS USER)
    // --------------------------------------------------------

    const roadmap = await Roadmap.findOne({
      _id: roadmapId,
      user: userId,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    // --------------------------------------------------------
    // VALIDATE STEP EXISTS
    // --------------------------------------------------------

    if (
      !roadmap.roadmapSteps ||
      index < 0 ||
      index >= roadmap.roadmapSteps.length
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid roadmap step",
      });
    }

    const savedStep = roadmap.roadmapSteps[index];

    // --------------------------------------------------------
    // RESOLVE STEP DETAILS
    // Prefer whatever the frontend sent for this step, fall
    // back to what's actually saved on the roadmap so the
    // AI always has accurate context even if the frontend
    // sends a partial object (or nothing at all).
    // --------------------------------------------------------

    const resolvedStep = {
      title: step?.title || savedStep.title,
      description: step?.description || savedStep.description,
      difficulty: step?.difficulty || savedStep.difficulty,
      time: step?.time || savedStep.time,
      topics: Array.isArray(step?.topics) ? step.topics : [],
    };

    const careerName =
      careerNames[roadmap.career] || career || roadmap.career;

    const skillLevel = level || roadmap.level;

    // --------------------------------------------------------
    // BUILD PROMPT
    // --------------------------------------------------------

    const prompt = buildLearningPrompt({
      careerName,
      level: skillLevel,
      step: resolvedStep,
    });

    // --------------------------------------------------------
    // CALL AI (GROQ)
    // NOTE: verify this model string matches the one used in
    // assistant.controller.js's chatWithAI for consistency.
    // --------------------------------------------------------

    let aiRawContent = "";

    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are a precise JSON API. You always return a single valid JSON object and nothing else — no markdown fences, no commentary.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.6,
        max_tokens: 3000,
        response_format: { type: "json_object" },
      });

      aiRawContent = completion?.choices?.[0]?.message?.content || "";
    } catch (aiError) {
      console.error("Groq Step Learning Error:", aiError);

      return res.status(502).json({
        success: false,
        message:
          "The AI tutor is temporarily unavailable. Please try again in a moment.",
      });
    }

    // --------------------------------------------------------
    // PARSE AI RESPONSE
    // Defensive cleanup in case the model wraps JSON in
    // markdown fences despite instructions.
    // --------------------------------------------------------

    const cleaned = aiRawContent
      .trim()
      .replace(/^```json/i, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    let learningModule;

    try {
      learningModule = JSON.parse(cleaned);
    } catch (parseError) {
      console.error(
        "Failed to parse AI learning module:",
        parseError,
        "RAW:",
        aiRawContent
      );

      return res.status(502).json({
        success: false,
        message:
          "The AI tutor returned an unexpected response. Please try again.",
      });
    }

    // --------------------------------------------------------
    // RESPONSE
    // Note: intentionally NOT saved to the roadmap — this is
    // learning content, not progress. Progress only changes
    // via updateRoadmapStepProgress ("Complete Step").
    // --------------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Learning module generated successfully",
      roadmapId: roadmap._id,
      stepIndex: index,
      learningModule,
    });
  } catch (error) {
    console.error("\n=================================");
    console.error("GENERATE STEP LEARNING ERROR");
    console.error(error);
    console.error("=================================\n");

    return res.status(500).json({
      success: false,
      message: "Failed to generate learning module",
      error: error.message,
    });
  }
};