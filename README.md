# 🎓 CampusHub AI

**An AI-powered platform that helps beginners find direction and move toward their career path.**

---

## 📖 About CampusHub AI

Most students don't struggle because they lack effort — they struggle because they don't know **where to start, what to learn next, or how to get from "beginner" to "job-ready."**

CampusHub AI brings the tools a student actually needs for their career journey into one connected platform — instead of scattering them across ten different apps, YouTube tabs, and half-finished spreadsheets. From figuring out a learning path, to building a resume, to finding and applying for internships, to preparing for interviews — CampusHub AI is built to guide a student through that entire journey, one step at a time.

It isn't a note-sharing app. It isn't a resume tool. It isn't a job board.
**It's the layer that connects all of it — so a student always knows what to do next.**

---

## ❓ Why CampusHub AI Exists

Ask any beginner in college a simple question: *"What should you be doing right now to get ready for your career?"*

Most don't have a clear answer. Not because they aren't capable — but because:

- There's no single place that tells them **what to learn next**
- Career advice is scattered, generic, and rarely personalized
- Resume building, internship hunting, and interview prep all live in separate, disconnected tools
- Notes and learning material live in random PDFs, forwarded links, and lost chats
- There's no track of progress — no way to see how far they've actually come

CampusHub AI exists to fix this. It gives a student **one platform** where their learning, career direction, and job-readiness tools work together — so progress feels visible instead of overwhelming.

---

## ✨ Core Features

### 🧭 AI Career Roadmap
Tell CampusHub AI the career path you're interested in and your current skill level, and it generates a personalized, step-by-step roadmap — so you always know exactly what to learn next instead of guessing.

### 🤖 AI Assistant
A built-in AI chat assistant that answers doubts, explains concepts, and helps with coding problems in real time — like having a mentor available whenever you're stuck.

### 📝 Smart Notes
Generate AI-assisted notes, save your own, and download them for revision — so exam prep and concept review stay organized in one place instead of scattered PDFs and screenshots.

### 📄 AI Resume Builder
Build a resume with AI help — including ATS optimization, grammar fixing, smart content suggestions, and keyword optimization — so your resume is actually ready for how modern hiring systems screen candidates.

### 💼 Internship Finder
Search and filter internships, save the ones you're interested in, and apply to relevant opportunities — making it easier to move from learning toward real-world experience.

### 🎯 Mock Interview Practice
Practice interviews in a structured environment to build confidence and identify gaps before the real thing.

### 📜 Certificates
Add and manage the certifications you've earned, complete with a public verification link — so achievements are easy to showcase and easy for others to trust.

### 🌐 Community
Connect with other students — share posts, comment, like, bookmark useful discussions, and participate in polls — so the learning journey doesn't feel like it's happening alone.

### 📊 Student Dashboard
A single home base that pulls together your progress, recent activity, and quick access to every tool — so you can see where you stand at a glance.

---

## 🚶 How the Student Journey Works

CampusHub AI is designed around a simple idea: **a student's career journey has a natural order, and the platform should reflect that.**

1. **Sign up** and land on your personal Student Dashboard
2. **Discover** what CampusHub AI offers and where to begin
3. Generate your **AI Career Roadmap** to understand what to learn, and in what order
4. Use the **AI Assistant** and **Smart Notes** to actually learn and revise
5. Build a job-ready profile with the **AI Resume Builder**
6. Search, save, and apply to relevant opportunities with the **Internship Finder**
7. Practice with **Mock Interviews** to prepare with confidence
8. Track certifications and engage with the **Community** along the way

Every feature exists to answer one question at each stage: *"What should I do next?"*

---

## 🛠️ Admin Dashboard

Alongside the student experience, CampusHub AI includes a secondary **Admin Dashboard** used to keep the platform running smoothly — managing users (view, block/unblock, activity, permissions), reviewing and managing notes, tracking downloads, and monitoring platform and AI usage analytics. This is a support layer for the platform, not the core product — the focus of CampusHub AI remains the student's career journey.

---

## 🧰 Technology Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- Recharts
- React Markdown

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- JWT & bcrypt authentication
- Google OAuth (Passport.js)
- Multer + Cloudinary (file uploads)
- Nodemailer (password reset emails)
- PDFKit (document generation)

**AI**
- Groq for the AI Assistant
- Google Generative AI for roadmap and resume intelligence

**Deployment**
- Frontend: Vercel
- Backend: Render (or any Node-compatible host)

---

## 🌍 Live Website

🔗 [campushub-ai-five.vercel.app](https://campushub-ai-five.vercel.app/)

---

## 📦 GitHub Repository

🔗 [github.com/Kunal-Varshney/campushub-ai](https://github.com/Kunal-Varshney/campushub-ai)

---

## 🚀 Getting Started

To run CampusHub AI locally, you'll need:

- Node.js (v18 or higher recommended)
- A MongoDB database (local or MongoDB Atlas)
- API keys for Groq, Google Generative AI, Cloudinary, and Google OAuth (see below)

Clone the repository:

```bash
git clone https://github.com/Kunal-Varshney/campushub-ai.git
cd campushub-ai
```

---

## 🔐 Environment Variables

### Frontend (`.env` in the root folder)

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Backend (`.env` inside the `server` folder)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:5173

# AI
GROQ_API_KEY=your_groq_api_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_generative_ai_key

# Cloudinary (file uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email (for password reset)
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
```

> Adjust variable names to match your own service configuration where relevant.

---

## 💻 Running the Frontend

```bash
npm install
npm run dev
```

Vite will display the local development URL in the terminal.

---

## 🖥️ Running the Backend

```bash
cd server
npm install
npm run dev
```

The backend will start on the port defined in your `.env` file (default: `5000`).

---

## ☁️ Deployment

- The **frontend** is deployed on **Vercel**.
- The **backend** is deployed on **Render**.
- MongoDB is hosted using **MongoDB Atlas**.
- File uploads (certificates, resumes, notes) are handled through **Cloudinary**.

Make sure environment variables are configured on your hosting platform to match your local `.env` setup.

---

## 🔮 Future Scope

CampusHub AI is actively evolving. Planned directions include deeper personalization of the career roadmap, expanded interview preparation tools, richer community features, and continued refinement of the AI-powered guidance that sits at the core of the platform.

---

## 👤 Author

**Kunal Varshney**
GitHub: [@Kunal-Varshney](https://github.com/Kunal-Varshney)

---

## 📄 License

Copyright © 2026 Kunal Varshney. All rights reserved.

This project is publicly available for viewing and educational/reference purposes.
No permission is granted to copy, modify, distribute, sublicense, or use this project or its source code for commercial purposes without prior written permission from the author.