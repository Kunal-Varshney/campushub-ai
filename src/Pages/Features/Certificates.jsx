// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Award,
//   ShieldCheck,
//   Download,
//   Share2,
//   Eye,
//   CheckCircle2,
//   Clock,
//   Sparkles,
//   ChevronRight,
//   Search,
//   ExternalLink,
//   TrendingUp,
//   Zap,
//   Terminal,
//   Cpu,
//   Globe,
//   Cloud,
//   Shield,
//   Database,
//   ChevronDown,
//   User,
//   Copy,
//   Check,
//   ArrowRight,
//   X,
//   BookOpen,
//   QrCode,
//   Plus,
//   FileText,
//   RefreshCw,
//   Link2,
//   Upload,
//   CheckCircle,
//   FileCheck
// } from 'lucide-react';

// // ==========================================
// // ANIMATION VARIANTS
// // ==========================================
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.1,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.4, ease: 'easeOut' },
//   },
// };

// // ==========================================
// // REALISTIC MOCK DATA
// // ==========================================
// const STATS = [
//   {
//     title: 'Total Certificates',
//     value: '06',
//     subtitle: 'Uploaded & Recognized',
//     icon: Award,
//     trend: '2 newly added',
//   },
//   {
//     title: 'Verified Credentials',
//     value: '05',
//     subtitle: 'Cryptographically Valid',
//     icon: ShieldCheck,
//     trend: '100% Authentic',
//   },
//   {
//     title: 'In Progress',
//     value: '02',
//     subtitle: 'Active Target Tracks',
//     icon: Clock,
//     trend: 'Est. 12 days left',
//   },
//   {
//     title: 'Connected Platforms',
//     value: '04',
//     subtitle: 'Auto-Synced Accounts',
//     icon: RefreshCw,
//     trend: 'Google, IBM, AWS, Meta',
//   },
// ];

// const CATEGORIES = [
//   { id: 'all', label: 'All Certificates', icon: Award, count: 6 },
//   { id: 'web-dev', label: 'Web Development', icon: Globe, count: 2 },
//   { id: 'ai-ml', label: 'AI & Machine Learning', icon: Cpu, count: 2 },
//   { id: 'cloud', label: 'Cloud & DevOps', icon: Cloud, count: 1 },
//   { id: 'programming', label: 'Programming & DB', icon: Terminal, count: 1 },
// ];

// const CERTIFICATES = [
//   {
//     id: 'cert-001',
//     title: 'Google AI Essentials Certification',
//     category: 'ai-ml',
//     provider: 'Google',
//     issuedTo: 'Alex Morgan',
//     issueDate: 'January 15, 2025',
//     credentialId: 'GGL-AI-2025-8942',
//     difficulty: 'Intermediate',
//     verified: true,
//     skills: ['Generative AI', 'Prompt Engineering', 'AI Ethics', 'Google Cloud AI'],
//     previewBg: 'from-cyan-900/40 via-blue-900/20 to-slate-950',
//     logoAccent: 'Google AI',
//   },
//   {
//     id: 'cert-002',
//     title: 'Meta Front-End Developer Professional Certificate',
//     category: 'web-dev',
//     provider: 'Meta',
//     issuedTo: 'Alex Morgan',
//     issueDate: 'November 28, 2024',
//     credentialId: 'META-FE-2024-7721',
//     difficulty: 'Advanced',
//     verified: true,
//     skills: ['React 19', 'JavaScript (ES6+)', 'Tailwind CSS', 'Web Architecture'],
//     previewBg: 'from-blue-900/40 via-slate-900/40 to-slate-950',
//     logoAccent: 'Meta Skills',
//   },
//   {
//     id: 'cert-003',
//     title: 'AWS Certified Cloud Practitioner',
//     category: 'cloud',
//     provider: 'Amazon Web Services',
//     issuedTo: 'Alex Morgan',
//     issueDate: 'October 10, 2024',
//     credentialId: 'AWS-CCP-2024-4410',
//     difficulty: 'Foundational',
//     verified: true,
//     skills: ['AWS S3', 'EC2', 'IAM Security', 'Cloud Billing'],
//     previewBg: 'from-cyan-950 via-slate-900 to-blue-950',
//     logoAccent: 'AWS Certified',
//   },
//   {
//     id: 'cert-004',
//     title: 'CampusHub AI Full-Stack Software Engineer Certificate',
//     category: 'web-dev',
//     provider: 'CampusHub AI',
//     issuedTo: 'Alex Morgan',
//     issueDate: 'February 02, 2025',
//     credentialId: 'CH-AI-2025-1092',
//     difficulty: 'Advanced',
//     verified: true,
//     skills: ['React 19', 'Node.js', 'MongoDB', 'AI Integration', 'Tailwind CSS'],
//     previewBg: 'from-blue-950 via-cyan-950/60 to-slate-950',
//     logoAccent: 'CampusHub AI',
//   },
//   {
//     id: 'cert-005',
//     title: 'IBM SkillsBuild Web Development & AI Fundamentals',
//     category: 'ai-ml',
//     provider: 'IBM SkillsBuild',
//     issuedTo: 'Alex Morgan',
//     issueDate: 'August 18, 2024',
//     credentialId: 'IBM-SB-2024-3390',
//     difficulty: 'Intermediate',
//     verified: true,
//     skills: ['Python', 'Machine Learning Basis', 'HTML5/CSS3', 'REST APIs'],
//     previewBg: 'from-cyan-900/30 via-slate-900 to-slate-950',
//     logoAccent: 'IBM Certified',
//   },
//   {
//     id: 'cert-006',
//     title: 'Oracle Certified Associate: Java SE & Database SQL',
//     category: 'programming',
//     provider: 'Oracle',
//     issuedTo: 'Alex Morgan',
//     issueDate: 'June 30, 2024',
//     credentialId: 'ORCL-DB-2024-5582',
//     difficulty: 'Intermediate',
//     verified: true,
//     skills: ['Java', 'Object-Oriented Design', 'SQL Queries', 'Relational DB'],
//     previewBg: 'from-blue-900/30 via-cyan-950 to-slate-950',
//     logoAccent: 'Oracle University',
//   },
// ];

// const TIMELINE = [
//   {
//     date: 'Early 2024',
//     title: 'HTML, CSS & Modern JavaScript Fundamentals',
//     subtitle: 'Mastered web core basics and DOM architecture.',
//     category: 'Foundations',
//   },
//   {
//     date: 'Mid 2024',
//     title: 'Oracle Java SE & Database SQL Certification',
//     subtitle: 'Passed relational database design and backend object-oriented programming.',
//     category: 'Backend & DB',
//   },
//   {
//     date: 'Late 2024',
//     title: 'Meta Front-End & AWS Cloud Practitioner',
//     subtitle: 'Earned professional accreditation for React web apps & AWS infrastructure.',
//     category: 'Full-Stack & Cloud',
//   },
//   {
//     date: 'Early 2025',
//     title: 'Google AI Essentials & CampusHub AI Engineer',
//     subtitle: 'Achieved verified status in Prompt Engineering, RAG integration, & AI Tooling.',
//     category: 'AI & Advanced Web',
//   },
// ];

// const SKILLS_EARNED = [
//   { name: 'React 19 & Frontend Architecture', level: 'Advanced', percentage: 92 },
//   { name: 'JavaScript & ES6+ Concepts', level: 'Advanced', percentage: 95 },
//   { name: 'Python & AI Fundamentals', level: 'Intermediate', percentage: 84 },
//   { name: 'Node.js & Express APIs', level: 'Intermediate', percentage: 82 },
//   { name: 'SQL & Database Queries (MongoDB/PostgreSQL)', level: 'Advanced', percentage: 88 },
//   { name: 'AWS Cloud Services & Deployment', level: 'Foundational', percentage: 76 },
// ];

// const UPCOMING_CERTS = [
//   {
//     title: 'AWS Certified Developer - Associate',
//     provider: 'Amazon Web Services',
//     progress: 68,
//     modules: '14 / 20 Modules Completed',
//     eta: 'Est. 10 Days Left',
//     targetCategory: 'Cloud Development',
//   },
//   {
//     title: 'Google Professional Cloud Architect',
//     provider: 'Google Cloud',
//     progress: 35,
//     modules: '6 / 18 Modules Completed',
//     eta: 'Est. 3 Weeks Left',
//     targetCategory: 'Cloud Systems',
//   },
//   {
//     title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
//     provider: 'Microsoft Learn',
//     progress: 85,
//     modules: '9 / 10 Modules Completed',
//     eta: 'Est. 3 Days Left',
//     targetCategory: 'Cloud Foundations',
//   },
// ];

// const LEARNING_PATH = [
//   {
//     step: '01',
//     title: 'Core Programming & Data Structures',
//     desc: 'Foundational literacy in JavaScript, Python, and relational SQL database logic.',
//     status: 'Completed',
//   },
//   {
//     step: '02',
//     title: 'Modern Web & Cloud Infrastructure',
//     desc: 'Building responsive React applications and deploying serverless components on AWS/Vercel.',
//     status: 'Completed',
//   },
//   {
//     step: '03',
//     title: 'AI Tools & Large Language Models',
//     desc: 'Integrating AI APIs, prompt engineering frameworks, and smart automation pipelines.',
//     status: 'In Progress',
//   },
//   {
//     step: '04',
//     title: 'Industry Portfolio & Placement Sync',
//     desc: 'Exporting verified credential badges directly to CampusHub AI Resume Analyzer & LinkedIn.',
//     status: 'Upcoming',
//   },
// ];

// const CONNECTED_PLATFORMS = [
//   { name: 'Google Cloud / Coursera', status: 'Connected', lastSync: 'Synced 2h ago' },
//   { name: 'IBM SkillsBuild', status: 'Connected', lastSync: 'Synced 1d ago' },
//   { name: 'Microsoft Learn', status: 'Connected', lastSync: 'Synced 3d ago' },
//   { name: 'AWS Skill Builder', status: 'Connected', lastSync: 'Synced 12h ago' },
// ];

// const FAQS = [
//   {
//     question: 'How do I add a new certificate from Google, Coursera, or Udemy?',
//     answer:
//       'You can click the "Add Certificate" button at the top of the page. Simply paste your credential URL or upload a PDF/Image certificate file. CampusHub AI will automatically extract and verify the issuer details.',
//   },
//   {
//     question: 'How does CampusHub AI verify my certificates?',
//     answer:
//       'Each uploaded certificate is checked against official verification API endpoints or digital signatures provided by issuers like Google, Meta, Microsoft, and AWS to prevent fraudulent credentials.',
//   },
//   {
//     question: 'Will these certificates automatically appear on my AI Resume?',
//     answer:
//       'Yes! Every verified certificate synced in CampusHub AI automatically feeds into the AI Resume Builder, Resume Analyzer, and your Student Portfolio.',
//   },
//   {
//     question: 'How do I share my verification link with recruiters?',
//     answer:
//       'Click the "Share" or "Verify" button on any certificate card. You can copy a direct public URL (`/verify/your-credential-id`) that lets hiring managers inspect your verified achievement.',
//   },
// ];

// // ==========================================
// // MAIN COMPONENT
// // ==========================================
// export default function Certificates() {
//   const navigate = useNavigate();
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activePreview, setActivePreview] = useState(null);
//   const [copiedId, setCopiedId] = useState(null);
//   const [openFaq, setOpenFaq] = useState(0);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [newCertTitle, setNewCertTitle] = useState('');
//   const [newCertProvider, setNewCertProvider] = useState('');
//   const [newCertId, setNewCertId] = useState('');

//   // Filter certificates based on Category and Search Query
//   const filteredCertificates = CERTIFICATES.filter((cert) => {
//     const matchesCategory =
//       selectedCategory === 'all' || cert.category === selectedCategory;
//     const matchesSearch =
//       cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
//       cert.provider.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   // REAL DOWNLOAD FUNCTION (Triggers genuine text/document download without fake alert)
//   const handleDownload = (cert) => {
//     const certText = `==================================================
// CAMPUSHUB AI - OFFICIAL CERTIFICATE VERIFICATION DOCUMENT
// ==================================================

// Student Name:   ${cert.issuedTo}
// Certificate:    ${cert.title}
// Provider:       ${cert.provider}
// Issue Date:     ${cert.issueDate}
// Credential ID:  ${cert.credentialId}
// Verification:   ${cert.verified ? 'VERIFIED AUTHENTIC' : 'PENDING'}
// Skills Earned:  ${cert.skills.join(', ')}

// Verification URL: ${window.location.origin}/verify/${cert.credentialId}

// CampusHub AI - Smart Student Learning Platform
// ==================================================`;

//     const blob = new Blob([certText], { type: 'text/plain;charset=utf-8' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `${cert.credentialId}_Certificate.txt`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   // REAL SHARE / COPY FUNCTION
//   const handleShare = async (cert) => {
//     const shareUrl = `${window.location.origin}/verify/${cert.credentialId}`;
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: cert.title,
//           text: `Check out my verified ${cert.title} certificate on CampusHub AI!`,
//           url: shareUrl,
//         });
//         return;
//       } catch (e) {
//         // Fallback to copy if native share dismissed or unsupported
//       }
//     }
//     navigator.clipboard.writeText(shareUrl);
//     setCopiedId(cert.credentialId);
//     setTimeout(() => setCopiedId(null), 2200);
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-300 relative overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
//       {/* Ambient background glow effects */}
//       <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
//       <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
//       <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

//       {/* Main Container */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20">
        
//         {/* ==========================================
//             SECTION 1: HERO SECTION
//         ========================================== */}
//         <section className="relative pt-6 pb-10 text-center space-y-6">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-xl text-cyan-400 text-xs sm:text-sm font-medium shadow-lg shadow-cyan-500/10"
//           >
//             <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
//             <span>CampusHub AI Certificate Management</span>
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight"
//           >
//             Your Verified{' '}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
//               Certificates & Credentials
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="max-w-3xl mx-auto text-base sm:text-lg text-slate-400 font-normal leading-relaxed"
//           >
//             Manage, verify, and export your course achievements from Google, IBM, Meta, Microsoft, AWS,
//             and CampusHub AI directly to your AI Resume and Portfolio.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="flex flex-wrap items-center justify-center gap-4 pt-2"
//           >
//             <button
//               onClick={() => setIsUploadModalOpen(true)}
//               className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
//             >
//               <Plus className="w-5 h-5" />
//               <span>Add New Certificate</span>
//             </button>
//             <button
//               onClick={() => {
//                 const el = document.getElementById('certificate-grid');
//                 el?.scrollIntoView({ behavior: 'smooth' });
//               }}
//               className="px-6 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl text-slate-300 font-medium hover:text-white hover:border-slate-700 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
//             >
//               <Award className="w-5 h-5 text-cyan-400" />
//               <span>View My Credentials</span>
//             </button>
//           </motion.div>
//         </section>

//         {/* ==========================================
//             SECTION 2: CERTIFICATE STATISTICS
//         ========================================== */}
//         <section>
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: '-50px' }}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
//           >
//             {STATS.map((stat, idx) => {
//               const IconComp = stat.icon;
//               return (
//                 <motion.div
//                   key={idx}
//                   variants={itemVariants}
//                   whileHover={{ y: -4 }}
//                   className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 relative group overflow-hidden hover:border-slate-700/80 transition-all duration-300 shadow-xl"
//                 >
//                   <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
//                     <IconComp className="w-20 h-20 text-cyan-400" />
//                   </div>
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-cyan-400">
//                       <IconComp className="w-6 h-6" />
//                     </div>
//                     <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
//                       {stat.trend}
//                     </span>
//                   </div>
//                   <div className="space-y-1">
//                     <h3 className="text-3xl font-extrabold text-white tracking-tight">
//                       {stat.value}
//                     </h3>
//                     <p className="text-sm font-semibold text-slate-300">
//                       {stat.title}
//                     </p>
//                     <p className="text-xs text-slate-500">{stat.subtitle}</p>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </section>

//         {/* ==========================================
//             SECTION 3 & 4: CATEGORIES & CERTIFICATE CARDS
//         ========================================== */}
//         <section id="certificate-grid" className="space-y-8">
//           {/* Header & Controls */}
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
//                 <ShieldCheck className="w-7 h-7 text-cyan-400" />
//                 <span>Earned Credentials</span>
//               </h2>
//               <p className="text-sm text-slate-400 mt-1">
//                 Filter and manage your verified certificates and credentials.
//               </p>
//             </div>

//             {/* Search Input */}
//             <div className="relative w-full md:w-80">
//               <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
//               <input
//                 type="text"
//                 placeholder="Search skills, providers, titles..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-11 pr-4 py-3 bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
//               />
//             </div>
//           </div>

//           {/* Category Tabs */}
//           <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
//             {CATEGORIES.map((cat) => {
//               const IconComp = cat.icon;
//               const isActive = selectedCategory === cat.id;
//               return (
//                 <button
//                   key={cat.id}
//                   onClick={() => setSelectedCategory(cat.id)}
//                   className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
//                     isActive
//                       ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-lg shadow-cyan-500/20 scale-105'
//                       : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
//                   }`}
//                 >
//                   <IconComp className="w-4 h-4" />
//                   <span>{cat.label}</span>
//                   <span
//                     className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
//                       isActive
//                         ? 'bg-white/20 text-white'
//                         : 'bg-slate-800 text-slate-400'
//                     }`}
//                   >
//                     {cat.count}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Cards Grid */}
//           <AnimatePresence mode="wait">
//             {filteredCertificates.length > 0 ? (
//               <motion.div
//                 key={selectedCategory + searchQuery}
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="hidden"
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//               >
//                 {filteredCertificates.map((cert) => (
//                   <motion.div
//                     key={cert.id}
//                     variants={itemVariants}
//                     whileHover={{ scale: 1.01 }}
//                     className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 flex flex-col justify-between relative group hover:border-slate-700/80 transition-all duration-300 shadow-xl overflow-hidden"
//                   >
//                     {/* Background Accent */}
//                     <div
//                       className={`absolute top-0 left-0 right-0 h-28 bg-gradient-to-b ${cert.previewBg} opacity-60 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
//                     />

//                     <div>
//                       {/* Top Bar */}
//                       <div className="flex items-center justify-between mb-4">
//                         <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 border border-slate-800 text-cyan-300 backdrop-blur-md">
//                           {cert.difficulty}
//                         </span>
//                         {cert.verified && (
//                           <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 backdrop-blur-md">
//                             <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
//                             Verified
//                           </span>
//                         )}
//                       </div>

//                       {/* Certificate Visual Thumbnail Placeholder */}
//                       <div className="relative w-full h-36 rounded-2xl bg-slate-950/70 border border-slate-800 p-4 flex flex-col justify-between mb-5 group-hover:border-cyan-500/30 transition-all overflow-hidden shadow-inner">
//                         <div className="flex justify-between items-start">
//                           <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
//                             <Award className="w-5 h-5" />
//                           </div>
//                           <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
//                             {cert.credentialId}
//                           </span>
//                         </div>
//                         <div>
//                           <p className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wide">
//                             {cert.provider}
//                           </p>
//                           <h4 className="text-sm font-bold text-white truncate mt-0.5">
//                             {cert.title}
//                           </h4>
//                         </div>
//                       </div>

//                       {/* Details */}
//                       <div className="space-y-2 mb-4">
//                         <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
//                           {cert.title}
//                         </h3>
//                         <p className="text-xs text-slate-400">
//                           Issued by{' '}
//                           <span className="text-slate-300 font-medium">
//                             {cert.provider}
//                           </span>{' '}
//                           • {cert.issueDate}
//                         </p>
//                       </div>

//                       {/* Skills Earned */}
//                       <div className="flex flex-wrap gap-1.5 mb-6">
//                         {cert.skills.map((skill, i) => (
//                           <span
//                             key={i}
//                             className="px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300 font-medium"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="pt-4 border-t border-slate-800/80 grid grid-cols-4 gap-1.5">
//                       <button
//                         onClick={() => setActivePreview(cert)}
//                         className="py-2 px-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center gap-1 transition-all"
//                         title="Preview Details"
//                       >
//                         <Eye className="w-3.5 h-3.5 text-cyan-400" />
//                         <span className="hidden sm:inline">Preview</span>
//                       </button>

//                       <button
//                         onClick={() => handleDownload(cert)}
//                         className="py-2 px-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center gap-1 transition-all"
//                         title="Download Certificate File"
//                       >
//                         <Download className="w-3.5 h-3.5 text-cyan-400" />
//                         <span className="hidden sm:inline">Download</span>
//                       </button>

//                       <button
//                         onClick={() => navigate(`/verify/${cert.credentialId}`)}
//                         className="py-2 px-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 flex items-center justify-center gap-1 transition-all"
//                         title="Verify Public Route"
//                       >
//                         <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
//                         <span className="hidden sm:inline">Verify</span>
//                       </button>

//                       <button
//                         onClick={() => handleShare(cert)}
//                         className="py-2 px-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center gap-1 transition-all"
//                         title="Share Verification Link"
//                       >
//                         {copiedId === cert.credentialId ? (
//                           <Check className="w-3.5 h-3.5 text-cyan-400" />
//                         ) : (
//                           <Share2 className="w-3.5 h-3.5 text-slate-400" />
//                         )}
//                         <span className="hidden sm:inline">
//                           {copiedId === cert.credentialId ? 'Copied' : 'Share'}
//                         </span>
//                       </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center space-y-4"
//               >
//                 <Award className="w-12 h-12 text-slate-600 mx-auto" />
//                 <h3 className="text-lg font-bold text-white">
//                   No certificates match your query
//                 </h3>
//                 <p className="text-slate-400 text-sm max-w-md mx-auto">
//                   Try clearing your search query or switching to another category.
//                 </p>
//                 <button
//                   onClick={() => {
//                     setSelectedCategory('all');
//                     setSearchQuery('');
//                   }}
//                   className="px-4 py-2 rounded-xl bg-slate-800 text-cyan-400 text-xs font-medium hover:bg-slate-700 transition"
//                 >
//                   Reset Search Filters
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </section>

//         {/* ==========================================
//             SECTION 5: REALISTIC ACHIEVEMENT TIMELINE
//         ========================================== */}
//         <section className="space-y-8">
//           <div>
//             <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
//               <TrendingUp className="w-7 h-7 text-cyan-400" />
//               <span>Learning Milestone Timeline</span>
//             </h2>
//             <p className="text-sm text-slate-400 mt-1">
//               Your realistic step-by-step progress from fundamental web basics to AI engineering.
//             </p>
//           </div>

//           <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
//             <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-8">
//               {TIMELINE.map((item, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.4, delay: idx * 0.1 }}
//                   className="relative pl-6 sm:pl-8 group"
//                 >
//                   {/* Timeline Node Icon */}
//                   <div className="absolute -left-[17px] top-0.5 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-500/50 text-cyan-400 flex items-center justify-center group-hover:border-cyan-400 group-hover:scale-110 transition-all shadow-md shadow-cyan-500/20">
//                     <CheckCircle2 className="w-4 h-4" />
//                   </div>

//                   <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
//                     <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
//                       <span className="text-xs font-bold text-cyan-400 font-mono">
//                         {item.date}
//                       </span>
//                       <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-900 border border-slate-800 text-slate-400">
//                         {item.category}
//                       </span>
//                     </div>
//                     <h4 className="text-base font-bold text-white">
//                       {item.title}
//                     </h4>
//                     <p className="text-xs text-slate-400 mt-1">
//                       {item.subtitle}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ==========================================
//             SECTION 6: REALISTIC SKILLS EARNED
//         ========================================== */}
//         <section className="space-y-8">
//           <div>
//             <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
//               <Zap className="w-7 h-7 text-cyan-400" />
//               <span>Verified Skill Competencies</span>
//             </h2>
//             <p className="text-sm text-slate-400 mt-1">
//               Skills automatically verified through completed certifications and assessments.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {SKILLS_EARNED.map((skill, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 15 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.3, delay: idx * 0.05 }}
//                 className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 space-y-3"
//               >
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-2.5">
//                     <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400">
//                       <Terminal className="w-4 h-4" />
//                     </div>
//                     <span className="font-bold text-slate-200 text-sm sm:text-base">
//                       {skill.name}
//                     </span>
//                   </div>
//                   <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
//                     {skill.level} ({skill.percentage}%)
//                   </span>
//                 </div>

//                 {/* Progress Bar */}
//                 <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-800 overflow-hidden">
//                   <motion.div
//                     initial={{ width: 0 }}
//                     whileInView={{ width: `${skill.percentage}%` }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 1, ease: 'easeOut' }}
//                     className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
//                   />
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* ==========================================
//             SECTION 7: UPCOMING CERTIFICATIONS
//         ========================================== */}
//         <section id="upcoming-section" className="space-y-8">
//           <div>
//             <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
//               <Clock className="w-7 h-7 text-cyan-400" />
//               <span>Upcoming Certifications</span>
//             </h2>
//             <p className="text-sm text-slate-400 mt-1">
//               Active learning tracks in progress to expand your credential portfolio.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {UPCOMING_CERTS.map((item, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.4, delay: idx * 0.1 }}
//                 className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all"
//               >
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-950 border border-slate-800 text-cyan-400">
//                       {item.targetCategory}
//                     </span>
//                     <span className="text-xs text-slate-400 font-mono">
//                       {item.eta}
//                     </span>
//                   </div>
//                   <div>
//                     <h3 className="text-base font-bold text-white line-clamp-2">
//                       {item.title}
//                     </h3>
//                     <p className="text-xs text-slate-400 mt-1">
//                       {item.provider}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-3 pt-2">
//                   <div className="flex justify-between items-center text-xs">
//                     <span className="text-slate-400">{item.modules}</span>
//                     <span className="font-bold text-cyan-400 font-mono">
//                       {item.progress}%
//                     </span>
//                   </div>
//                   <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden">
//                     <div
//                       className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full"
//                       style={{ width: `${item.progress}%` }}
//                     />
//                   </div>
//                   <button
//                     onClick={() => {
//                       // Navigate to Skill Roadmap or Assistant page
//                       navigate('/skill-roadmap');
//                     }}
//                     className="w-full mt-2 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:border-cyan-500/50 hover:bg-slate-900 transition-all flex items-center justify-center gap-2 group"
//                   >
//                     <span>Continue Track</span>
//                     <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* ==========================================
//             SECTION 8: LEARNING PATH (ROADMAP STYLE)
//         ========================================== */}
//         <section className="space-y-8">
//           <div>
//             <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
//               <BookOpen className="w-7 h-7 text-cyan-400" />
//               <span>Certification Roadmap</span>
//             </h2>
//             <p className="text-sm text-slate-400 mt-1">
//               Structured progressive roadmap designed to build job-ready software credentials.
//             </p>
//           </div>

//           <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
//               {LEARNING_PATH.map((step, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.4, delay: idx * 0.1 }}
//                   className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between relative group hover:border-slate-700 transition-all"
//                 >
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <span className="text-2xl font-black font-mono text-cyan-400/80">
//                         {step.step}
//                       </span>
//                       <span
//                         className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
//                           step.status === 'Completed'
//                             ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
//                             : step.status === 'In Progress'
//                             ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
//                             : 'bg-slate-900 border-slate-800 text-slate-500'
//                         }`}
//                       >
//                         {step.status}
//                       </span>
//                     </div>
//                     <h4 className="text-base font-bold text-white leading-snug">
//                       {step.title}
//                     </h4>
//                     <p className="text-xs text-slate-400 leading-relaxed">
//                       {step.desc}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ==========================================
//             SECTION 9: CAMPUSHUB AI INTEGRATION SHOWCASE
//         ========================================== */}
//         <section className="space-y-8">
//           <div>
//             <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
//               <FileCheck className="w-7 h-7 text-cyan-400" />
//               <span>CampusHub AI Auto-Sync Integration</span>
//             </h2>
//             <p className="text-sm text-slate-400 mt-1">
//               How your certificates automatically empower your Resume Analyzer, AI Portfolio, and Internship Finder.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 space-y-4">
//               <div className="p-3 w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-400 flex items-center justify-center">
//                 <FileText className="w-6 h-6" />
//               </div>
//               <h3 className="text-base font-bold text-white">AI Resume Builder</h3>
//               <p className="text-xs text-slate-400 leading-relaxed">
//                 All verified credentials instantly sync into your dynamic resume, highlighting your Google, AWS, and Meta certifications for recruiters.
//               </p>
//               <button
//                 onClick={() => navigate('/resume-analyzer')}
//                 className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition"
//               >
//                 <span>Open Resume Analyzer</span>
//                 <ChevronRight className="w-3.5 h-3.5" />
//               </button>
//             </div>

//             <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 space-y-4">
//               <div className="p-3 w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-400 flex items-center justify-center">
//                 <Globe className="w-6 h-6" />
//               </div>
//               <h3 className="text-base font-bold text-white">Public Student Portfolio</h3>
//               <p className="text-xs text-slate-400 leading-relaxed">
//                 Generate a clean public profile with a shareable verification link so employers can inspect your real projects and badges.
//               </p>
//               <button
//                 onClick={() => navigate('/dashboard')}
//                 className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition"
//               >
//                 <span>View Student Dashboard</span>
//                 <ChevronRight className="w-3.5 h-3.5" />
//               </button>
//             </div>

//             <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 space-y-4">
//               <div className="p-3 w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-400 flex items-center justify-center">
//                 <Zap className="w-6 h-6" />
//               </div>
//               <h3 className="text-base font-bold text-white">Smart Internship Matching</h3>
//               <p className="text-xs text-slate-400 leading-relaxed">
//                 CampusHub AI uses your certified skill tags to match you with top relevant internship openings that fit your credentials.
//               </p>
//               <button
//                 onClick={() => navigate('/internship-finder')}
//                 className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition"
//               >
//                 <span>Explore Internships</span>
//                 <ChevronRight className="w-3.5 h-3.5" />
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* ==========================================
//             SECTION 10: CONNECTED PLATFORMS SYNC
//         ========================================== */}
//         <section className="space-y-8">
//           <div>
//             <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
//               <RefreshCw className="w-7 h-7 text-cyan-400" />
//               <span>Connected Learning Accounts</span>
//             </h2>
//             <p className="text-sm text-slate-400 mt-1">
//               External platforms actively connected for automatic certificate imports.
//             </p>
//           </div>

//           <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               {CONNECTED_PLATFORMS.map((platform, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3"
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-bold text-white">
//                       {platform.name}
//                     </span>
//                     <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
//                       <Check className="w-3 h-3 text-cyan-400" />
//                       Synced
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center text-xs text-slate-500">
//                     <span>{platform.lastSync}</span>
//                     <button
//                       onClick={() => alert(`Re-syncing ${platform.name}...`)}
//                       className="text-cyan-400 hover:text-cyan-300 font-medium"
//                     >
//                       Sync Now
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ==========================================
//             SECTION 11: FAQ SECTION
//         ========================================== */}
//         <section className="space-y-8 max-w-4xl mx-auto">
//           <div className="text-center space-y-2">
//             <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
//               Frequently Asked Questions
//             </h2>
//             <p className="text-sm text-slate-400">
//               Everything you need to know about uploading and verifying certificates on CampusHub AI.
//             </p>
//           </div>

//           <div className="space-y-4">
//             {FAQS.map((faq, idx) => {
//               const isOpen = openFaq === idx;
//               return (
//                 <div
//                   key={idx}
//                   className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden transition-colors"
//                 >
//                   <button
//                     onClick={() => setOpenFaq(isOpen ? null : idx)}
//                     className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors"
//                   >
//                     <span>{faq.question}</span>
//                     <ChevronDown
//                       className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
//                         isOpen ? 'rotate-180 text-cyan-400' : ''
//                       }`}
//                     />
//                   </button>
//                   <AnimatePresence>
//                     {isOpen && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: 'auto', opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="px-5 pb-5 text-xs sm:text-sm text-slate-400 border-t border-slate-800/50 pt-3 leading-relaxed"
//                       >
//                         {faq.answer}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               );
//             })}
//           </div>
//         </section>

//         {/* ==========================================
//             SECTION 12: FINAL CTA BANNER
//         ========================================== */}
//         <section>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.98 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl space-y-6"
//           >
//             {/* Background Glow */}
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

//             <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-cyan-400 text-xs font-semibold">
//               <Award className="w-4 h-4" />
//               <span>Expand Your Student Credentials</span>
//             </div>

//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
//               Add Your Next Certification to CampusHub AI
//             </h2>

//             <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
//               Upload external course certificates or complete built-in AI tracks to boost your Resume Analyzer score.
//             </p>

//             <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
//               <button
//                 onClick={() => setIsUploadModalOpen(true)}
//                 className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
//               >
//                 <Plus className="w-4 h-4" />
//                 <span>Upload Certificate</span>
//               </button>
//             </div>
//           </motion.div>
//         </section>
//       </div>

//       {/* ==========================================
//           MODAL 1: HIGH-FIDELITY PREVIEW MODAL
//       ========================================== */}
//       <AnimatePresence>
//         {activePreview && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
//             onClick={() => setActivePreview(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//               className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden"
//             >
//               <button
//                 onClick={() => setActivePreview(null)}
//                 className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
//               >
//                 <X className="w-5 h-5" />
//               </button>

//               <div className="flex items-center gap-3">
//                 <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
//                   <Award className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
//                     Official Credential Preview
//                   </span>
//                   <h3 className="text-xl font-bold text-white">
//                     {activePreview.title}
//                   </h3>
//                 </div>
//               </div>

//               {/* Realistic Certificate Layout Preview Frame */}
//               <div className="bg-slate-950 rounded-2xl p-6 sm:p-8 border-2 border-slate-800 space-y-6 text-center relative overflow-hidden shadow-inner">
//                 {/* Decorative Seal Accent */}
//                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

//                 <div className="flex justify-between items-center border-b border-slate-800/80 pb-4">
//                   <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
//                     {activePreview.provider}
//                   </span>
//                   <span className="text-xs text-slate-500 font-mono">
//                     ID: {activePreview.credentialId}
//                   </span>
//                 </div>

//                 <div className="space-y-2 py-2">
//                   <p className="text-xs text-slate-400 uppercase tracking-wider">
//                     This certifies that
//                   </p>
//                   <h2 className="text-2xl font-extrabold text-white tracking-tight">
//                     {activePreview.issuedTo}
//                   </h2>
//                   <p className="text-xs text-slate-400 max-w-md mx-auto pt-1">
//                     has successfully completed all requirements and verified competencies for
//                   </p>
//                   <h4 className="text-lg font-bold text-cyan-300 pt-1">
//                     {activePreview.title}
//                   </h4>
//                 </div>

//                 <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
//                   <div className="text-left space-y-1">
//                     <p className="text-[11px] text-slate-500">
//                       Issue Date: <span className="text-slate-300 font-semibold">{activePreview.issueDate}</span>
//                     </p>
//                     <p className="text-[11px] text-slate-500">
//                       Verification Status:{' '}
//                       <span className="text-cyan-400 font-semibold">Authentic & Signed</span>
//                     </p>
//                   </div>

//                   {/* QR Code Placeholder Box */}
//                   <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
//                     <QrCode className="w-8 h-8 text-cyan-400" />
//                     <div className="text-left">
//                       <p className="text-[9px] font-mono text-slate-400">Scan to Verify</p>
//                       <p className="text-[10px] font-bold text-slate-200">CampusHub AI</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Skills Tags */}
//               <div className="space-y-2">
//                 <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
//                   Associated Skill Competencies
//                 </h5>
//                 <div className="flex flex-wrap gap-2">
//                   {activePreview.skills.map((s, idx) => (
//                     <span
//                       key={idx}
//                       className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300"
//                     >
//                       {s}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Action Toolbar */}
//               <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
//                 <button
//                   onClick={() => handleDownload(activePreview)}
//                   className="py-3 px-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center gap-2"
//                 >
//                   <Download className="w-4 h-4 text-cyan-400" />
//                   <span>Download Document</span>
//                 </button>

//                 <button
//                   onClick={() => {
//                     navigate(`/verify/${activePreview.credentialId}`);
//                     setActivePreview(null);
//                   }}
//                   className="py-3 px-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 flex items-center justify-center gap-2"
//                 >
//                   <CheckCircle className="w-4 h-4 text-cyan-400" />
//                   <span>Verify Route</span>
//                 </button>

//                 <button
//                   onClick={() => handleShare(activePreview)}
//                   className="py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2"
//                 >
//                   <Share2 className="w-4 h-4" />
//                   <span>Share Verification</span>
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ==========================================
//           MODAL 2: ADD NEW CERTIFICATE MODAL
//       ========================================== */}
//       <AnimatePresence>
//         {isUploadModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
//             onClick={() => setIsUploadModalOpen(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//               className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative"
//             >
//               <button
//                 onClick={() => setIsUploadModalOpen(false)}
//                 className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
//               >
//                 <X className="w-5 h-5" />
//               </button>

//               <div className="flex items-center gap-3">
//                 <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-400">
//                   <Upload className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-white">Add New Certificate</h3>
//                   <p className="text-xs text-slate-400">Sync external credentials to your profile.</p>
//                 </div>
//               </div>

//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   alert(`Certificate submitted for AI verification: ${newCertTitle || 'New Certificate'}`);
//                   setIsUploadModalOpen(false);
//                   setNewCertTitle('');
//                   setNewCertProvider('');
//                   setNewCertId('');
//                 }}
//                 className="space-y-4"
//               >
//                 <div className="space-y-1">
//                   <label className="text-xs font-semibold text-slate-300">Certificate Title</label>
//                   <input
//                     type="text"
//                     required
//                     placeholder="e.g. Google Data Analytics Professional"
//                     value={newCertTitle}
//                     onChange={(e) => setNewCertTitle(e.target.value)}
//                     className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50"
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="text-xs font-semibold text-slate-300">Provider / Organization</label>
//                   <input
//                     type="text"
//                     required
//                     placeholder="e.g. Google, IBM, Coursera, Udemy"
//                     value={newCertProvider}
//                     onChange={(e) => setNewCertProvider(e.target.value)}
//                     className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50"
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="text-xs font-semibold text-slate-300">Credential ID / URL (Optional)</label>
//                   <input
//                     type="text"
//                     placeholder="e.g. GGL-123456 or verification link"
//                     value={newCertId}
//                     onChange={(e) => setNewCertId(e.target.value)}
//                     className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50"
//                   />
//                 </div>

//                 <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center space-y-2">
//                   <Upload className="w-6 h-6 text-slate-500 mx-auto" />
//                   <p className="text-xs text-slate-400">Drag and drop PDF/Image certificate file or click to browse</p>
//                   <input type="file" className="hidden" id="cert-file-input" />
//                   <label
//                     htmlFor="cert-file-input"
//                     className="inline-block px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-400 cursor-pointer hover:bg-slate-850"
//                   >
//                     Select File
//                   </label>
//                 </div>

//                 <div className="pt-2 flex gap-3">
//                   <button
//                     type="button"
//                     onClick={() => setIsUploadModalOpen(false)}
//                     className="flex-1 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-white"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition"
//                   >
//                     Verify & Add
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }






import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  Download,
  Share2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Search,
  ExternalLink,
  TrendingUp,
  Zap,
  Terminal,
  Cpu,
  Globe,
  Cloud,
  Shield,
  Database,
  ChevronDown,
  User,
  Copy,
  Check,
  ArrowRight,
  X,
  QrCode,
  Plus,
  FileText,
  RefreshCw,
  Link2,
  Upload,
  CheckCircle,
  FileCheck,
  Loader2,
  AlertTriangle,
  Trash2,
  PlugZap,
} from 'lucide-react';

// ASSUMPTION: adjust this import to wherever your project's shared axios
// instance lives (you mentioned an api service already exists).
import api from '../../services/api';

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// ==========================================
// STATIC / DECORATIVE DATA
// These sections (learning path, upcoming tracks, FAQs) have no backend
// concept in this app yet — kept as informational UI per the "don't
// invent a backend that doesn't exist" instruction. Only the certificate
// list itself, stats, timeline, and skills are now real.
// ==========================================
const CATEGORY_META = {
  all: { label: 'All Certificates', icon: Award },
  'web-dev': { label: 'Web Development', icon: Globe },
  'ai-ml': { label: 'AI & Machine Learning', icon: Cpu },
  cloud: { label: 'Cloud & DevOps', icon: Cloud },
  programming: { label: 'Programming & DB', icon: Terminal },
  other: { label: 'Other', icon: Award },
};

const UPCOMING_CERTS = [
  {
    title: 'AWS Certified Developer - Associate',
    provider: 'Amazon Web Services',
    progress: 68,
    modules: '14 / 20 Modules Completed',
    eta: 'Est. 10 Days Left',
    targetCategory: 'Cloud Development',
  },
  {
    title: 'Google Professional Cloud Architect',
    provider: 'Google Cloud',
    progress: 35,
    modules: '6 / 18 Modules Completed',
    eta: 'Est. 3 Weeks Left',
    targetCategory: 'Cloud Systems',
  },
  {
    title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    provider: 'Microsoft Learn',
    progress: 85,
    modules: '9 / 10 Modules Completed',
    eta: 'Est. 3 Days Left',
    targetCategory: 'Cloud Foundations',
  },
];

const LEARNING_PATH = [
  {
    step: '01',
    title: 'Core Programming & Data Structures',
    desc: 'Foundational literacy in JavaScript, Python, and relational SQL database logic.',
    status: 'Completed',
  },
  {
    step: '02',
    title: 'Modern Web & Cloud Infrastructure',
    desc: 'Building responsive React applications and deploying serverless components on AWS/Vercel.',
    status: 'Completed',
  },
  {
    step: '03',
    title: 'AI Tools & Large Language Models',
    desc: 'Integrating AI APIs, prompt engineering frameworks, and smart automation pipelines.',
    status: 'In Progress',
  },
  {
    step: '04',
    title: 'Industry Portfolio & Placement Sync',
    desc: 'Exporting verified credential badges directly to CampusHub AI Resume Analyzer & LinkedIn.',
    status: 'Upcoming',
  },
];

// No real platform-sync integration exists yet. Rather than faking a
// successful sync, this now honestly reflects "not connected."
const CONNECTED_PLATFORMS = [
  { name: 'Google Cloud / Coursera' },
  { name: 'IBM SkillsBuild' },
  { name: 'Microsoft Learn' },
  { name: 'AWS Skill Builder' },
];

const FAQS = [
  {
    question: 'How do I add a new certificate from Google, Coursera, or Udemy?',
    answer:
      'Click the "Add Certificate" button at the top of the page. Fill in the details and optionally attach a PDF/image of the certificate.',
  },
  {
    question: 'How does CampusHub AI verify my certificates?',
    answer:
      'Each certificate gets a unique credential ID that anyone can check on the public verification page. Automatic checking against issuer APIs (Google, Meta, AWS, etc.) is not implemented yet — verification currently confirms the credential exists in our records, not that the issuing organization independently confirmed it.',
  },
  {
    question: 'Will these certificates automatically appear on my AI Resume?',
    answer:
      'That sync is planned but not built yet.',
  },
  {
    question: 'How do I share my verification link with recruiters?',
    answer:
      'Click "Share" on any certificate card to copy a public verification URL you can send to anyone.',
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function Certificates() {
  const navigate = useNavigate();

  const [certificates, setCertificates] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePreview, setActivePreview] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertProvider, setNewCertProvider] = useState('');
  const [newCertCategory, setNewCertCategory] = useState('web-dev');
  const [newCertId, setNewCertId] = useState('');
  const [newCertIssueDate, setNewCertIssueDate] = useState('');
  const [newCertSkills, setNewCertSkills] = useState('');
  const [newCertFile, setNewCertFile] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [downloadingId, setDownloadingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchCertificates = useCallback(async () => {
    setListLoading(true);
    setListError('');
    try {
      const res = await api.get('/certificates');
      setCertificates(res.data.data || []);
    } catch (err) {
      setListError(err.response?.data?.message || 'Could not load your certificates. Please try again.');
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  // ---- Derived data (real, computed from actual certificates) ----

  const categories = useMemo(() => {
    const counts = { all: certificates.length };
    certificates.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    const cats = ['all', ...new Set(certificates.map((c) => c.category))];
    return cats.map((id) => ({
      id,
      label: CATEGORY_META[id]?.label || id,
      icon: CATEGORY_META[id]?.icon || Award,
      count: counts[id] || 0,
    }));
  }, [certificates]);

  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        (cert.skills || []).some((s) => s.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [certificates, selectedCategory, searchQuery]);

  const stats = useMemo(() => {
    const total = certificates.length;
    const verified = certificates.filter((c) => c.verified).length;
    const expired = certificates.filter((c) => c.isExpired).length;
    const categoriesCount = new Set(certificates.map((c) => c.category)).size;
    return [
      { title: 'Total Certificates', value: String(total).padStart(2, '0'), subtitle: 'Uploaded & Recorded', icon: Award },
      { title: 'Verified Credentials', value: String(verified).padStart(2, '0'), subtitle: 'Marked as verified', icon: ShieldCheck },
      { title: 'Expired', value: String(expired).padStart(2, '0'), subtitle: 'Past their expiry date', icon: Clock },
      { title: 'Categories Covered', value: String(categoriesCount).padStart(2, '0'), subtitle: 'Distinct skill areas', icon: RefreshCw },
    ];
  }, [certificates]);

  const timeline = useMemo(() => {
    return [...certificates]
      .sort((a, b) => new Date(a.issueDate) - new Date(b.issueDate))
      .map((c) => ({
        date: new Date(c.issueDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
        title: c.title,
        subtitle: `Issued by ${c.issuer}`,
        category: CATEGORY_META[c.category]?.label || c.category,
      }));
  }, [certificates]);

  const skillsEarned = useMemo(() => {
    const counts = {};
    certificates.forEach((c) => (c.skills || []).forEach((s) => (counts[s] = (counts[s] || 0) + 1)));
    const max = Math.max(1, ...Object.values(counts));
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / max) * 100),
        level: count > 1 ? 'Reinforced' : 'Introduced',
      }));
  }, [certificates]);

  // ---- Actions ----

  const handleDownload = async (cert) => {
    setDownloadingId(cert._id);
    try {
      const res = await api.get(`/certificates/${cert._id}/download`, { responseType: 'blob' });
      const contentType = res.headers['content-type'] || 'application/pdf';
      const blob = new Blob([res.data], { type: contentType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cert.credentialId}_Certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.response?.data?.message || 'Download failed. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleShare = async (cert) => {
    const shareUrl = `${window.location.origin}/verify/${cert.credentialId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: cert.title,
          text: `Check out my verified ${cert.title} certificate on CampusHub AI!`,
          url: shareUrl,
        });
        return;
      } catch (e) {
        // Fallback to copy if native share dismissed or unsupported
      }
    }
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(cert.credentialId);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleDelete = async (cert) => {
    if (!window.confirm(`Delete "${cert.title}"? This can't be undone.`)) return;
    setDeletingId(cert._id);
    try {
      await api.delete(`/certificates/${cert._id}`);
      setCertificates((prev) => prev.filter((c) => c._id !== cert._id));
      setActivePreview(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const resetUploadForm = () => {
    setNewCertTitle('');
    setNewCertProvider('');
    setNewCertCategory('web-dev');
    setNewCertId('');
    setNewCertIssueDate('');
    setNewCertSkills('');
    setNewCertFile(null);
    setSubmitError('');
  };

  const handleCreateCertificate = async (e) => {
    e.preventDefault();
    if (!newCertTitle || !newCertProvider || !newCertIssueDate) {
      setSubmitError('Title, provider, and issue date are required.');
      return;
    }
    setSubmitLoading(true);
    setSubmitError('');
    try {
      const formData = new FormData();
      formData.append('title', newCertTitle);
      formData.append('issuer', newCertProvider);
      formData.append('category', newCertCategory);
      formData.append('issueDate', newCertIssueDate);
      if (newCertId) formData.append('credentialId', newCertId);
      if (newCertSkills) {
        formData.append(
          'skills',
          JSON.stringify(newCertSkills.split(',').map((s) => s.trim()).filter(Boolean))
        );
      }
      if (newCertFile) formData.append('certificateFile', newCertFile);

      const res = await api.post('/certificates', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setCertificates((prev) => [res.data.data, ...prev]);
      setIsUploadModalOpen(false);
      resetUploadForm();
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Could not save certificate. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 relative overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Ambient background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20">

        {/* SECTION 1: HERO */}
        <section className="relative pt-6 pb-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-xl text-cyan-400 text-xs sm:text-sm font-medium shadow-lg shadow-cyan-500/10"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>CampusHub AI Certificate Management</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight"
          >
            Your Verified{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              Certificates & Credentials
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-slate-400 font-normal leading-relaxed"
          >
            Manage, verify, and export your course achievements directly to your AI Resume and Portfolio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Certificate</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('certificate-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl text-slate-300 font-medium hover:text-white hover:border-slate-700 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
            >
              <Award className="w-5 h-5 text-cyan-400" />
              <span>View My Credentials</span>
            </button>
          </motion.div>
        </section>

        {/* SECTION 2: STATS (real, derived) */}
        {!listLoading && !listError && certificates.length > 0 && (
          <section>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {stats.map((stat, idx) => {
                const IconComp = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 relative group overflow-hidden hover:border-slate-700/80 transition-all duration-300 shadow-xl"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <IconComp className="w-20 h-20 text-cyan-400" />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-cyan-400">
                        <IconComp className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</h3>
                      <p className="text-sm font-semibold text-slate-300">{stat.title}</p>
                      <p className="text-xs text-slate-500">{stat.subtitle}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>
        )}

        {/* SECTION 3 & 4: CATEGORIES & CERTIFICATE CARDS */}
        <section id="certificate-grid" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <ShieldCheck className="w-7 h-7 text-cyan-400" />
                <span>Earned Credentials</span>
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Filter and manage your verified certificates and credentials.
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search skills, providers, titles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
              />
            </div>
          </div>

          {/* Category Tabs — only shown once we have data */}
          {!listLoading && !listError && certificates.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => {
                const IconComp = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-lg shadow-cyan-500/20 scale-105'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                    <span>{cat.label}</span>
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* LOADING STATE */}
          {listLoading && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-16 text-center">
              <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mx-auto mb-4" />
              <p className="text-sm text-slate-400">Loading your certificates…</p>
            </div>
          )}

          {/* ERROR STATE */}
          {!listLoading && listError && (
            <div className="bg-slate-900/50 border border-red-900/40 rounded-3xl p-12 text-center space-y-4">
              <AlertTriangle className="w-10 h-10 text-red-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Couldn't load certificates</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">{listError}</p>
              <button
                onClick={fetchCertificates}
                className="px-4 py-2 rounded-xl bg-slate-800 text-cyan-400 text-xs font-medium hover:bg-slate-700 transition inline-flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry
              </button>
            </div>
          )}

          {/* TRUE EMPTY STATE — user has zero certificates at all */}
          {!listLoading && !listError && certificates.length === 0 && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <Award className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No certificates yet</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Add your first certificate to start building your verified credential portfolio.
              </p>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold hover:scale-105 transition inline-flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Certificate
              </button>
            </div>
          )}

          {/* CARDS GRID */}
          {!listLoading && !listError && certificates.length > 0 && (
            <AnimatePresence mode="wait">
              {filteredCertificates.length > 0 ? (
                <motion.div
                  key={selectedCategory + searchQuery}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredCertificates.map((cert) => (
                    <motion.div
                      key={cert._id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.01 }}
                      className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 flex flex-col justify-between relative group hover:border-slate-700/80 transition-all duration-300 shadow-xl overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-cyan-900/40 via-blue-900/20 to-slate-950 opacity-60 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 border border-slate-800 text-cyan-300 backdrop-blur-md">
                            {cert.difficulty}
                          </span>
                          <div className="flex items-center gap-2">
                            {cert.isExpired && (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-300">
                                Expired
                              </span>
                            )}
                            {cert.verified && (
                              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 backdrop-blur-md">
                                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                                Verified
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="relative w-full h-36 rounded-2xl bg-slate-950/70 border border-slate-800 p-4 flex flex-col justify-between mb-5 group-hover:border-cyan-500/30 transition-all overflow-hidden shadow-inner">
                          <div className="flex justify-between items-start">
                            <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                              <Award className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                              {cert.credentialId}
                            </span>
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wide">{cert.issuer}</p>
                            <h4 className="text-sm font-bold text-white truncate mt-0.5">{cert.title}</h4>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                            {cert.title}
                          </h3>
                          <p className="text-xs text-slate-400">
                            Issued by <span className="text-slate-300 font-medium">{cert.issuer}</span> •{' '}
                            {new Date(cert.issueDate).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {(cert.skills || []).map((skill, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300 font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-800/80 grid grid-cols-4 gap-1.5">
                        <button
                          onClick={() => setActivePreview(cert)}
                          className="py-2 px-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center gap-1 transition-all"
                          title="Preview Details"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="hidden sm:inline">Preview</span>
                        </button>

                        <button
                          onClick={() => handleDownload(cert)}
                          disabled={downloadingId === cert._id}
                          className="py-2 px-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center gap-1 transition-all disabled:opacity-50"
                          title="Download Certificate File"
                        >
                          {downloadingId === cert._id ? (
                            <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                          ) : (
                            <Download className="w-3.5 h-3.5 text-cyan-400" />
                          )}
                          <span className="hidden sm:inline">Download</span>
                        </button>

                        <button
                          onClick={() => navigate(`/verify/${cert.credentialId}`)}
                          className="py-2 px-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 flex items-center justify-center gap-1 transition-all"
                          title="Verify Public Route"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="hidden sm:inline">Verify</span>
                        </button>

                        <button
                          onClick={() => handleShare(cert)}
                          className="py-2 px-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center gap-1 transition-all"
                          title="Share Verification Link"
                        >
                          {copiedId === cert.credentialId ? (
                            <Check className="w-3.5 h-3.5 text-cyan-400" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5 text-slate-400" />
                          )}
                          <span className="hidden sm:inline">{copiedId === cert.credentialId ? 'Copied' : 'Share'}</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center space-y-4"
                >
                  <Award className="w-12 h-12 text-slate-600 mx-auto" />
                  <h3 className="text-lg font-bold text-white">No certificates match your query</h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Try clearing your search query or switching to another category.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-cyan-400 text-xs font-medium hover:bg-slate-700 transition"
                  >
                    Reset Search Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </section>

        {/* SECTION 5: TIMELINE (real, derived) */}
        {!listLoading && !listError && timeline.length > 0 && (
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-cyan-400" />
                <span>Learning Milestone Timeline</span>
              </h2>
              <p className="text-sm text-slate-400 mt-1">Your certificates, in the order you earned them.</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
              <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-8">
                {timeline.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="relative pl-6 sm:pl-8 group"
                  >
                    <div className="absolute -left-[17px] top-0.5 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-500/50 text-cyan-400 flex items-center justify-center group-hover:border-cyan-400 group-hover:scale-110 transition-all shadow-md shadow-cyan-500/20">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-cyan-400 font-mono">{item.date}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-900 border border-slate-800 text-slate-400">
                          {item.category}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{item.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 6: SKILLS EARNED (real, derived) */}
        {!listLoading && !listError && skillsEarned.length > 0 && (
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <Zap className="w-7 h-7 text-cyan-400" />
                <span>Skills From Your Certificates</span>
              </h2>
              <p className="text-sm text-slate-400 mt-1">Tallied from the skills listed on each certificate.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillsEarned.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400">
                        <Terminal className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-200 text-sm sm:text-base">{skill.name}</span>
                    </div>
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                      {skill.level}
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================
                SECTION 7: UPCOMING CERTIFICATIONS
                Backend driven — future issueDate certificates
            ============================================================ */}

            <section id="upcoming-section" className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                  <Clock className="w-7 h-7 text-cyan-400" />
                  <span>Upcoming Certifications</span>
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  Certifications scheduled for a future date.
                </p>
              </div>

              {(() => {
                const upcomingCertificates = certificates
                  .filter((certificate) => {
                    if (!certificate.issueDate) return false;

                    return new Date(certificate.issueDate) > new Date();
                  })
                  .sort(
                    (a, b) =>
                      new Date(a.issueDate) - new Date(b.issueDate)
                  );

                if (upcomingCertificates.length === 0) {
                  return (
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 text-center">
                      <Clock className="w-10 h-10 text-slate-600 mx-auto mb-4" />

                      <h3 className="text-base font-semibold text-white">
                        No Upcoming Certifications
                      </h3>

                      <p className="text-sm text-slate-500 mt-2">
                        Your upcoming certifications will appear here
                        when their issue date is in the future.
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {upcomingCertificates.map((item, idx) => (
                      <motion.div
                        key={item._id || item.credentialId}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: idx * 0.1,
                        }}
                        className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all"
                      >
                        <div className="space-y-4">

                          {/* Category + Date */}
                          <div className="flex items-center justify-between gap-3">
                            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-950 border border-slate-800 text-cyan-400">
                              {item.category || "other"}
                            </span>

                            <span className="text-xs text-slate-400 font-mono">
                              {new Date(item.issueDate).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Certificate Info */}
                          <div>
                            <h3 className="text-base font-bold text-white line-clamp-2">
                              {item.title}
                            </h3>

                            <p className="text-xs text-slate-400 mt-1">
                              {item.issuer}
                            </p>
                          </div>

                          {/* Difficulty */}
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-500">
                              Difficulty:
                            </span>

                            <span className="text-[11px] text-slate-300 font-medium">
                              {item.difficulty || "Intermediate"}
                            </span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-3 pt-2">

                          {/* Skills */}
                          {item.skills?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {item.skills.slice(0, 4).map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-slate-400"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Status */}
                          <div className="flex items-center gap-2 text-xs">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />

                            <span className="text-slate-400">
                              Scheduled for
                            </span>

                            <span className="text-cyan-400 font-semibold">
                              {new Date(item.issueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                );
              })()}
            </section>

        {/* SECTION 10: CONNECTED PLATFORMS — honest "not connected" state, no fake sync */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <RefreshCw className="w-7 h-7 text-cyan-400" />
              <span>Connected Learning Accounts</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Automatic imports from these platforms aren't set up yet — this integration hasn't been built.
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CONNECTED_PLATFORMS.map((platform, idx) => (
                <div key={idx} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{platform.name}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-900 border border-slate-800 text-slate-500">
                      <PlugZap className="w-3 h-3" />
                      Not connected
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Add certificates from this provider manually for now.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 11: FAQ */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-400">Everything you need to know about uploading and verifying certificates.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden transition-colors">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 text-xs sm:text-sm text-slate-400 border-t border-slate-800/50 pt-3 leading-relaxed"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 12: FINAL CTA */}
        <section>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl space-y-6"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-cyan-400 text-xs font-semibold">
              <Award className="w-4 h-4" />
              <span>Expand Your Student Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
              Add Your Next Certification to CampusHub AI
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Upload external course certificates to boost your Resume Analyzer score.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Certificate</span>
              </button>
            </div>
          </motion.div>
        </section>
      </div>

      {/* MODAL 1: PREVIEW MODAL */}
      <AnimatePresence>
        {activePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
            onClick={() => setActivePreview(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActivePreview(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Certificate Preview</span>
                  <h3 className="text-xl font-bold text-white">{activePreview.title}</h3>
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl p-6 sm:p-8 border-2 border-slate-800 space-y-6 text-center relative overflow-hidden shadow-inner">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-4">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{activePreview.issuer}</span>
                  <span className="text-xs text-slate-500 font-mono">ID: {activePreview.credentialId}</span>
                </div>

                <div className="space-y-2 py-2">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">This certifies completion of</p>
                  <h4 className="text-lg font-bold text-cyan-300 pt-1">{activePreview.title}</h4>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left space-y-1">
                    <p className="text-[11px] text-slate-500">
                      Issue Date: <span className="text-slate-300 font-semibold">{new Date(activePreview.issueDate).toLocaleDateString()}</span>
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Status:{' '}
                      <span className="text-cyan-400 font-semibold">
                        {activePreview.verified ? 'Verified' : 'Unverified'}{activePreview.isExpired ? ' · Expired' : ''}
                      </span>
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <QrCode className="w-8 h-8 text-cyan-400" />
                    <div className="text-left">
                      <p className="text-[9px] font-mono text-slate-400">Scan to Verify</p>
                      <p className="text-[10px] font-bold text-slate-200">CampusHub AI</p>
                    </div>
                  </div>
                </div>
              </div>

              {activePreview.skills?.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Associated Skill Competencies</h5>
                  <div className="flex flex-wrap gap-2">
                    {activePreview.skills.map((s, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleDownload(activePreview)}
                  disabled={downloadingId === activePreview._id}
                  className="py-3 px-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {downloadingId === activePreview._id ? (
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 text-cyan-400" />
                  )}
                  <span>Download</span>
                </button>

                <button
                  onClick={() => {
                    navigate(`/verify/${activePreview.credentialId}`);
                    setActivePreview(null);
                  }}
                  className="py-3 px-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  <span>Verify Route</span>
                </button>

                <button
                  onClick={() => handleShare(activePreview)}
                  className="py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Verification</span>
                </button>
              </div>

              <button
                onClick={() => handleDelete(activePreview)}
                disabled={deletingId === activePreview._id}
                className="w-full py-2.5 rounded-2xl border border-red-900/40 text-xs font-semibold text-red-400 hover:bg-red-950/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {deletingId === activePreview._id ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                <span>Delete Certificate</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 2: ADD NEW CERTIFICATE */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
            onClick={() => !submitLoading && setIsUploadModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => !submitLoading && setIsUploadModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-400">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Add New Certificate</h3>
                  <p className="text-xs text-slate-400">Save a credential to your profile.</p>
                </div>
              </div>

              <form onSubmit={handleCreateCertificate} className="space-y-4">
                {submitError && (
                  <div className="px-4 py-2.5 rounded-xl bg-red-950/40 border border-red-900/40 text-red-300 text-xs">
                    {submitError}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Certificate Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google Data Analytics Professional"
                    value={newCertTitle}
                    onChange={(e) => setNewCertTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Provider / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google, IBM, Coursera, Udemy"
                    value={newCertProvider}
                    onChange={(e) => setNewCertProvider(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Category</label>
                    <select
                      value={newCertCategory}
                      onChange={(e) => setNewCertCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50"
                    >
                      <option value="web-dev">Web Development</option>
                      <option value="ai-ml">AI & Machine Learning</option>
                      <option value="cloud">Cloud & DevOps</option>
                      <option value="programming">Programming & DB</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Issue Date</label>
                    <input
                      type="date"
                      required
                      value={newCertIssueDate}
                      onChange={(e) => setNewCertIssueDate(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Credential ID (Optional — auto-generated if left blank)</label>
                  <input
                    type="text"
                    placeholder="e.g. GGL-123456"
                    value={newCertId}
                    onChange={(e) => setNewCertId(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Skills (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. React, Node.js, MongoDB"
                    value={newCertSkills}
                    onChange={(e) => setNewCertSkills(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center space-y-2">
                  <Upload className="w-6 h-6 text-slate-500 mx-auto" />
                  <p className="text-xs text-slate-400">
                    {newCertFile ? newCertFile.name : 'Attach PDF/Image certificate file (optional — a certificate will be generated if you skip this)'}
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="cert-file-input"
                    onChange={(e) => setNewCertFile(e.target.files?.[0] || null)}
                  />
                  <label
                    htmlFor="cert-file-input"
                    className="inline-block px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-400 cursor-pointer hover:bg-slate-850"
                  >
                    Select File
                  </label>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    disabled={submitLoading}
                    className="flex-1 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {submitLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>{submitLoading ? 'Saving…' : 'Save Certificate'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}