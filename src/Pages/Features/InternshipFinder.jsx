import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Search,
  MapPin,
  Wallet,
  Clock,
  Briefcase,
  Sparkles,
  Wand2,
  Loader2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Building2,
  Brain,
  Bell,
  ShieldCheck,
  Target,
  Zap,
  ChevronDown,
  ArrowRight,
  SlidersHorizontal,
  FileCheck2,
  TrendingUp,
  Users,
  Calendar,
  XCircle,
  Hourglass,
  UserCheck,
  ClipboardList,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" },
  }),
};

const INTERNSHIP_DB = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Developer Intern",
    location: "Bengaluru",
    stipend: 45000,
    duration: "3 Months",
    mode: "Hybrid",
    skills: ["React", "JavaScript", "CSS"],
    matchScore: 96,
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Cloud Engineering Intern",
    location: "Hyderabad",
    stipend: 50000,
    duration: "6 Months",
    mode: "On-site",
    skills: ["Azure", "C#", "Node.js"],
    matchScore: 91,
  },
  {
    id: 3,
    company: "Amazon",
    role: "SDE Intern",
    location: "Remote",
    stipend: 40000,
    duration: "3 Months",
    mode: "Remote",
    skills: ["Java", "DSA", "AWS"],
    matchScore: 88,
  },
  {
    id: 4,
    company: "Adobe",
    role: "UI/UX Design Intern",
    location: "Noida",
    stipend: 35000,
    duration: "4 Months",
    mode: "Hybrid",
    skills: ["Figma", "Design Systems", "CSS"],
    matchScore: 84,
  },
  {
    id: 5,
    company: "Infosys",
    role: "Full Stack Intern",
    location: "Pune",
    stipend: 25000,
    duration: "6 Months",
    mode: "On-site",
    skills: ["MERN", "MongoDB", "Express"],
    matchScore: 90,
  },
  {
    id: 6,
    company: "TCS",
    role: "Data Analyst Intern",
    location: "Chennai",
    stipend: 20000,
    duration: "3 Months",
    mode: "Remote",
    skills: ["Python", "SQL", "Power BI"],
    matchScore: 79,
  },
  {
    id: 7,
    company: "Flipkart",
    role: "Backend Developer Intern",
    location: "Bengaluru",
    stipend: 38000,
    duration: "4 Months",
    mode: "Hybrid",
    skills: ["Node.js", "MongoDB", "Docker"],
    matchScore: 87,
  },
  {
    id: 8,
    company: "Zoho",
    role: "Software Engineer Intern",
    location: "Chennai",
    stipend: 22000,
    duration: "6 Months",
    mode: "On-site",
    skills: ["Java", "Spring Boot", "MySQL"],
    matchScore: 82,
  },
  {
    id: 9,
    company: "Swiggy",
    role: "Product Design Intern",
    location: "Remote",
    stipend: 28000,
    duration: "3 Months",
    mode: "Remote",
    skills: ["Figma", "Prototyping", "UX Research"],
    matchScore: 85,
  },
  {
    id: 10,
    company: "Paytm",
    role: "React Native Intern",
    location: "Noida",
    stipend: 30000,
    duration: "4 Months",
    mode: "Hybrid",
    skills: ["React Native", "JavaScript", "Redux"],
    matchScore: 89,
  },
];

const TOP_COMPANIES = [
  { name: "Google", hiring: true, openings: 24, avgStipend: "₹45k/mo" },
  { name: "Microsoft", hiring: true, openings: 18, avgStipend: "₹48k/mo" },
  { name: "Amazon", hiring: true, openings: 31, avgStipend: "₹40k/mo" },
  { name: "Adobe", hiring: false, openings: 6, avgStipend: "₹35k/mo" },
  { name: "Infosys", hiring: true, openings: 52, avgStipend: "₹25k/mo" },
  { name: "TCS", hiring: true, openings: 60, avgStipend: "₹20k/mo" },
];

const features = [
  { icon: Brain, title: "AI Job Matching", desc: "Our AI compares your skills and goals against thousands of listings to find the closest fit." },
  { icon: Sparkles, title: "Smart Recommendations", desc: "Get a hand-picked shortlist that updates as your profile and preferences evolve." },
  { icon: ShieldCheck, title: "Verified Companies", desc: "Every listing comes from a company that has been checked for legitimacy." },
  { icon: FileCheck2, title: "Resume Match Score", desc: "See exactly how well your resume aligns with each internship before you apply." },
  { icon: Zap, title: "Instant Apply", desc: "Apply to internships in a single click using your CampusHub AI profile." },
  { icon: Bell, title: "Real-Time Alerts", desc: "Get notified the moment a role matching your skills goes live." },
];

const steps = [
  { number: "01", icon: ClipboardList, title: "Enter Skills", desc: "Tell us your skills, role and location preferences." },
  { number: "02", icon: Brain, title: "AI Analysis", desc: "Our AI studies your profile against live internship listings." },
  { number: "03", icon: Target, title: "Find Best Match", desc: "Get a ranked shortlist of the internships that fit you best." },
  { number: "04", icon: Rocket, title: "Apply Instantly", desc: "Apply directly and track every application in one place." },
];

const benefits = [
  { icon: Brain, title: "AI Matching", desc: "Matched to roles based on real skill overlap, not keywords alone." },
  { icon: Clock, title: "Save Time", desc: "Skip endless scrolling with a shortlist built for you." },
  { icon: TrendingUp, title: "Higher Selection Chance", desc: "Apply to roles you're genuinely a strong fit for." },
  { icon: ShieldCheck, title: "Verified Listings", desc: "Every internship is checked before it reaches your feed." },
  { icon: Users, title: "Career Growth", desc: "Build real experience that strengthens your placement profile." },
  { icon: Calendar, title: "Daily Updates", desc: "Fresh internships added and matched to you every day." },
];

const faqs = [
  {
    q: "How does AI recommend internships?",
    a: "CampusHub AI compares your skills, preferred role, location and stipend expectations against live listings and ranks them using a match score.",
  },
  {
    q: "Can freshers apply?",
    a: "Yes. Many listings are specifically tagged for freshers, and you can filter by experience level to see roles suited to you.",
  },
  {
    q: "Do I need a resume to apply?",
    a: "A resume improves your match score and application quality, but you can still browse and shortlist internships without one.",
  },
  {
    q: "How are companies verified?",
    a: "Every company on the platform is checked for legitimacy before their listings appear in search results or recommendations.",
  },
];

const trackerStages = [
  { key: "applied", label: "Applied", icon: FileCheck2 },
  { key: "review", label: "Under Review", icon: Hourglass },
  { key: "interview", label: "Interview", icon: UserCheck },
  { key: "selected", label: "Selected", icon: CheckCircle2 },
];

function GlowBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[130px]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />
    </div>
  );
}

function SectionBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs font-medium text-cyan-300 backdrop-blur-md">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

function AISearchingIndicator() {
  return (
    <span className="inline-flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-cyan-400"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}

function MatchBadge({ score }) {
  const color =
    score >= 90 ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" : score >= 80 ? "text-cyan-300 border-cyan-500/30 bg-cyan-500/10" : "text-amber-300 border-amber-500/30 bg-amber-500/10";
  return (
    <span className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${color}`}>
      <Target className="h-3 w-3" />
      {score}% Match
    </span>
  );
}

function InternshipCard({ item, index, saved, applied, onSave, onApply }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      whileHover={{ y: -6, borderColor: "rgba(34,211,238,0.4)" }}
      className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white">
            {item.company.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{item.role}</h4>
            <p className="text-xs text-slate-400">{item.company}</p>
          </div>
        </div>
        <MatchBadge score={item.matchScore} />
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-cyan-400" /> {item.location}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="h-3.5 w-3.5 text-cyan-400" /> {item.mode}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-cyan-400" /> {item.duration}
        </span>
        <span className="flex items-center gap-1">
          <Wallet className="h-3.5 w-3.5 text-cyan-400" /> ₹{item.stipend.toLocaleString("en-IN")}/mo
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-0.5 text-[11px] text-slate-300"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <motion.button
          onClick={() => onApply(item.id)}
          whileHover={{ scale: applied ? 1 : 1.03 }}
          whileTap={{ scale: applied ? 1 : 0.97 }}
          disabled={applied}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition ${
            applied
              ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
          }`}
        >
          {applied ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" /> Applied
            </>
          ) : (
            <>
              Apply <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </motion.button>
        <motion.button
          onClick={() => onSave(item.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition ${
            saved ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300" : "border-slate-700 bg-slate-800/60 text-slate-400"
          }`}
        >
          {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </motion.button>
      </div>
    </motion.div>
  );
}

function FAQItem({ item, isOpen, onClick }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md">
      <button onClick={onClick} className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left">
        <span className="text-sm font-medium text-white sm:text-base">{item.q}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-5 w-5 shrink-0 text-cyan-400" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-slate-400">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function InternshipFinder() {
  const [searchForm, setSearchForm] = useState({
    skills: "",
    role: "",
    location: "",
    stipend: "",
    workType: "Remote",
    experience: "Fresher",
  });
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    location: "All",
    category: "All",
    salary: "All",
    remoteOnly: false,
    sortBy: "Best Match",
  });

  const [savedIds, setSavedIds] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [trackerStage, setTrackerStage] = useState(1);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFindInternship = () => {
    setIsSearching(true);
    setHasSearched(false);
    setTimeout(() => {
      const skillTerm = searchForm.skills.toLowerCase().trim();
      const locationTerm = searchForm.location.toLowerCase().trim();

      let results = INTERNSHIP_DB.filter((item) => {
        const matchesSkill =
          !skillTerm || item.skills.some((s) => s.toLowerCase().includes(skillTerm)) || item.role.toLowerCase().includes(skillTerm);
        const matchesLocation =
          !locationTerm || item.location.toLowerCase().includes(locationTerm) || (locationTerm === "remote" && item.mode === "Remote");
        const matchesMode = searchForm.workType === "Remote" ? true : item.mode === searchForm.workType;
        return matchesSkill && matchesLocation;
      });

      if (results.length === 0) {
        results = [...INTERNSHIP_DB].sort((a, b) => b.matchScore - a.matchScore).slice(0, 6);
      }

      results = [...results].sort((a, b) => b.matchScore - a.matchScore).slice(0, 6);

      setRecommendations(results);
      setIsSearching(false);
      setHasSearched(true);
    }, 2000);
  };

  const filteredList = useMemo(() => {
    let list = [...INTERNSHIP_DB];

    if (filters.search.trim()) {
      const term = filters.search.toLowerCase();
      list = list.filter(
        (item) =>
          item.role.toLowerCase().includes(term) ||
          item.company.toLowerCase().includes(term) ||
          item.skills.some((s) => s.toLowerCase().includes(term))
      );
    }

    if (filters.location !== "All") {
      list = list.filter((item) => item.location === filters.location);
    }

    if (filters.category !== "All") {
      list = list.filter((item) => item.role.toLowerCase().includes(filters.category.toLowerCase()));
    }

    if (filters.salary !== "All") {
      if (filters.salary === "Below 25k") list = list.filter((item) => item.stipend < 25000);
      if (filters.salary === "25k - 40k") list = list.filter((item) => item.stipend >= 25000 && item.stipend <= 40000);
      if (filters.salary === "Above 40k") list = list.filter((item) => item.stipend > 40000);
    }

    if (filters.remoteOnly) {
      list = list.filter((item) => item.mode === "Remote");
    }

    if (filters.sortBy === "Highest Stipend") list.sort((a, b) => b.stipend - a.stipend);
    if (filters.sortBy === "Best Match") list.sort((a, b) => b.matchScore - a.matchScore);
    if (filters.sortBy === "Newest") list.sort((a, b) => b.id - a.id);
    if (filters.sortBy === "Most Popular") list.sort((a, b) => a.company.localeCompare(b.company));

    return list;
  }, [filters]);

  const locationOptions = ["All", ...new Set(INTERNSHIP_DB.map((i) => i.location))];

  const toggleSave = (id) => {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleApply = (id) => {
    setAppliedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 text-slate-100">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden px-6 pb-24 pt-28 sm:px-10 lg:px-20">
        <GlowBackground />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <SectionBadge>
              <Rocket className="h-3.5 w-3.5" /> AI Internship Finder
            </SectionBadge>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Find Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Dream Internship
              </span>{" "}
              Powered by AI
            </h1>
            <p className="mt-6 max-w-xl text-base text-slate-400 sm:text-lg">
              CampusHub AI helps students discover internships based on skills, interests, education and
              career goals.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.a
                href="#filters"
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(34,211,238,0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
              >
                Browse Internships <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#search"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur-md"
              >
                <Wand2 className="h-4 w-4" /> AI Recommendation
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-medium text-cyan-300">
                  <Brain className="h-4 w-4" /> AI Searching <AISearchingIndicator />
                </span>
                <MatchBadge score={96} />
              </div>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white">
                  GO
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Frontend Developer Intern</h4>
                  <p className="text-xs text-slate-400">Google</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400" /> Bengaluru
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-cyan-400" /> Hybrid
                </span>
                <span className="flex items-center gap-1.5">
                  <Wallet className="h-3.5 w-3.5 text-cyan-400" /> ₹45,000/mo
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-cyan-400" /> 3 Months
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= AI INTERNSHIP SEARCH ================= */}
      <section id="search" className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <SectionBadge>AI Search</SectionBadge>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Let AI find your best-fit internship</h2>
            <p className="mt-3 text-slate-400">Enter your details and get matched instantly.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl sm:p-10"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-slate-400">Skills</label>
                <input
                  name="skills"
                  value={searchForm.skills}
                  onChange={handleSearchChange}
                  placeholder="React, Node.js, Python"
                  className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-slate-400">Preferred Role</label>
                <input
                  name="role"
                  value={searchForm.role}
                  onChange={handleSearchChange}
                  placeholder="Frontend Developer Intern"
                  className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-slate-400">Preferred Location</label>
                <input
                  name="location"
                  value={searchForm.location}
                  onChange={handleSearchChange}
                  placeholder="Bengaluru, Remote"
                  className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-slate-400">Expected Stipend</label>
                <input
                  name="stipend"
                  value={searchForm.stipend}
                  onChange={handleSearchChange}
                  placeholder="₹25,000"
                  className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-slate-400">Work Type</label>
                <select
                  name="workType"
                  value={searchForm.workType}
                  onChange={handleSearchChange}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
                >
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>On-site</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-slate-400">Experience</label>
                <select
                  name="experience"
                  value={searchForm.experience}
                  onChange={handleSearchChange}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
                >
                  <option>Fresher</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            <motion.button
              onClick={handleFindInternship}
              disabled={isSearching}
              whileHover={{ scale: isSearching ? 1 : 1.02 }}
              whileTap={{ scale: isSearching ? 1 : 0.98 }}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 disabled:opacity-70 sm:w-auto"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Finding Internships...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" /> Find Internship
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ================= AI RECOMMENDATIONS ================= */}
      <AnimatePresence>
        {hasSearched && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="relative px-6 py-10 sm:px-10 lg:px-20"
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 text-center">
                <SectionBadge>AI Recommendations</SectionBadge>
                <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                  Top matches picked for you
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((item, i) => (
                  <InternshipCard
                    key={item.id}
                    item={item}
                    index={i}
                    saved={savedIds.includes(item.id)}
                    applied={appliedIds.includes(item.id)}
                    onSave={toggleSave}
                    onApply={toggleApply}
                  />
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ================= FILTER + LISTING SECTION ================= */}
      <section id="filters" className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-10 text-center"
          >
            <SectionBadge>Browse Internships</SectionBadge>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">All internships</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-10 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-300">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
              <div className="relative sm:col-span-2 lg:col-span-2">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  value={filters.search}
                  onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                  placeholder="Search role, company, skill"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 pl-9 pr-4 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>

              <select
                value={filters.location}
                onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
                className="rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
              >
                {locationOptions.map((loc) => (
                  <option key={loc}>{loc}</option>
                ))}
              </select>

              <select
                value={filters.category}
                onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
                className="rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
              >
                <option value="All">All Categories</option>
                <option value="Developer">Developer</option>
                <option value="Design">Design</option>
                <option value="Data">Data</option>
                <option value="Engineering">Engineering</option>
              </select>

              <select
                value={filters.salary}
                onChange={(e) => setFilters((f) => ({ ...f, salary: e.target.value }))}
                className="rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
              >
                <option value="All">Any Stipend</option>
                <option value="Below 25k">Below 25k</option>
                <option value="25k - 40k">25k - 40k</option>
                <option value="Above 40k">Above 40k</option>
              </select>

              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value }))}
                className="rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
              >
                <option>Best Match</option>
                <option>Newest</option>
                <option>Highest Stipend</option>
                <option>Most Popular</option>
              </select>
            </div>

            <label className="mt-4 flex w-fit items-center gap-2 text-xs text-slate-400">
              <input
                type="checkbox"
                checked={filters.remoteOnly}
                onChange={(e) => setFilters((f) => ({ ...f, remoteOnly: e.target.checked }))}
                className="h-4 w-4 rounded border-slate-700 bg-slate-950 accent-cyan-500"
              />
              Remote Only
            </label>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredList.length === 0 ? (
              <p className="col-span-full text-center text-sm text-slate-500">
                No internships match your filters. Try adjusting them.
              </p>
            ) : (
              filteredList.map((item, i) => (
                <InternshipCard
                  key={item.id}
                  item={item}
                  index={i}
                  saved={savedIds.includes(item.id)}
                  applied={appliedIds.includes(item.id)}
                  onSave={toggleSave}
                  onApply={toggleApply}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <SectionBadge>Features</SectionBadge>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Everything you need to land the role</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -6, borderColor: "rgba(34,211,238,0.4)" }}
                className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl transition"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 transition group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TOP COMPANIES ================= */}
      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <SectionBadge>Top Companies</SectionBadge>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Companies hiring right now</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOP_COMPANIES.map((company, i) => (
              <motion.div
                key={company.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-white">{company.name}</h3>
                  </div>
                  {company.hiring && (
                    <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" /> Hiring
                    </span>
                  )}
                </div>
                <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                  <span>Open Positions</span>
                  <span className="font-semibold text-slate-200">{company.openings}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>Average Stipend</span>
                  <span className="font-semibold text-cyan-300">{company.avgStipend}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= APPLICATION TRACKER ================= */}
      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <SectionBadge>Application Tracker</SectionBadge>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Track every application</h2>
            <p className="mt-3 text-slate-400">Follow your journey from applied to selected.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-xl"
          >
            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 right-0 top-5 h-0.5 bg-slate-800">
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600"
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${(trackerStage / (trackerStages.length - 1)) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              {trackerStages.map((stage, i) => {
                const reached = i <= trackerStage;
                return (
                  <div key={stage.key} className="relative z-10 flex flex-col items-center gap-2">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-semibold transition ${
                        reached
                          ? "border-cyan-400 bg-gradient-to-br from-cyan-500 to-blue-600 text-white"
                          : "border-slate-700 bg-slate-900 text-slate-500"
                      }`}
                    >
                      <stage.icon className="h-4 w-4" />
                    </div>
                    <span className={`text-xs ${reached ? "text-slate-200" : "text-slate-500"}`}>{stage.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {trackerStages.map((stage, i) => (
                <motion.button
                  key={stage.key}
                  onClick={() => setTrackerStage(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-xl border px-4 py-2 text-xs font-medium transition ${
                    trackerStage === i
                      ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300"
                      : "border-slate-700 bg-slate-800/60 text-slate-400"
                  }`}
                >
                  Mark {stage.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => setTrackerStage(-1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-medium text-red-400"
              >
                <XCircle className="h-3.5 w-3.5" /> Mark Rejected
              </motion.button>
            </div>

            {trackerStage === -1 && (
              <p className="mt-4 text-center text-xs text-red-400">
                This application was marked as rejected. Keep applying — the right match is next.
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <SectionBadge>How It Works</SectionBadge>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Four steps to your internship</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                className="relative rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl"
              >
                <span className="absolute right-5 top-4 text-4xl font-bold text-slate-800">{step.number}</span>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STUDENT BENEFITS ================= */}
      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <SectionBadge>Student Benefits</SectionBadge>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Why students choose CampusHub AI</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ x: 6 }}
                className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-xl"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-1 text-xs text-slate-400">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <SectionBadge>FAQ</SectionBadge>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Frequently asked questions</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((item, i) => (
              <motion.div key={item.q} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <FAQItem item={item} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-12 text-center backdrop-blur-xl sm:p-16"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/25 blur-[100px]" />
          </div>
          <div className="relative">
            <SectionBadge>Get Started</SectionBadge>
            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
              Ready to Start Your Career?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Let CampusHub AI match you with internships that fit your skills and goals — apply in one click.
            </p>
            <motion.a
              href="#search"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(34,211,238,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30"
            >
              Find My Internship <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}