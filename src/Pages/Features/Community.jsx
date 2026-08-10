import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  ThumbsUp,
  Bookmark,
  Share2,
  Search,
  Plus,
  Sparkles,
  TrendingUp,
  Filter,
  Users,
  Calendar,
  Award,
  ShieldCheck,
  Code,
  Image as ImageIcon,
  BarChart2,
  Tag,
  MoreHorizontal,
  Check,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Send,
  Smile,
  X,
  ChevronDown,
  ChevronUp,
  Zap,
  Flame,
  MessageCircle,
  User,
  Star,
  Compass,
  BookOpen,
  Heart,
  Pin,
  Terminal,
  Cpu,
  Globe,
  Shield,
  HelpCircle,
  Hash,
  CornerDownRight,
  Command,
  Lock,
  RefreshCw,
  Bell,
  SlidersHorizontal,
  Layers,
  Copy,
  UploadCloud,
  Paperclip
} from 'lucide-react';

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

// ==========================================
// MOCK DATA (REALISTIC EDTECH & AI COMMUNITY)
// ==========================================
const CURRENT_USER = {
  name: 'Alex Morgan',
  handle: '@alexmorgan',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  title: 'AI Engineering Major • Level 14',
  xp: 2840,
  level: 14,
  badge: 'Elite Contributor',
  contributions: 42,
  solutionsProvided: 18,
};

const CATEGORIES = [
  { id: 'all', label: 'All Discussions', icon: Compass, count: 128 },
  { id: 'ai-ml', label: 'AI & Machine Learning', icon: Cpu, count: 45 },
  { id: 'web-dev', label: 'Web Architecture', icon: Globe, count: 32 },
  { id: 'career', label: 'Career & Internships', icon: Zap, count: 24 },
  { id: 'projects', label: 'Project Showcase', icon: Terminal, count: 18 },
  { id: 'events', label: 'Hackathons & Events', icon: Calendar, count: 9 },
];

const INITIAL_POSTS = [
  {
    id: 'post-101',
    author: {
      name: 'Dr. Evelyn Vance',
      handle: '@evelynvance',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      title: 'Senior AI Researcher & Mentor',
      verified: true,
      badge: 'Faculty Mentor',
    },
    timestamp: '2 hours ago',
    category: 'ai-ml',
    categoryLabel: 'AI & Machine Learning',
    pinned: true,
    title: 'Architecting Production-Ready RAG Pipelines with PyTorch & Vector Databases',
    content:
      'Retrieval-Augmented Generation (RAG) is quickly becoming the foundation for enterprise LLM apps. Here is a breakdown of how we optimized vector retrieval latency under 40ms using hybrid sparse-dense indexing and semantic reranking.',
    codeSnippet: `// Python Hybrid RAG Retrieval Strategy
from langchain_community.vectorstores import Qdrant
from transformers import AutoTokenizer, AutoModelForSequenceClassification

def hybrid_rerank(query, documents, top_k=5):
    # 1. First Pass: Vector Similarity Search
    initial_docs = vector_db.similarity_search(query, k=20)
    # 2. Second Pass: Cross-Encoder Reranking
    scores = cross_encoder.predict([(query, doc.page_content) for doc in initial_docs])
    reranked = [doc for _, doc in sorted(zip(scores, initial_docs), reverse=True)]
    return reranked[:top_k]`,
    tags: ['RAG', 'PyTorch', 'VectorDB', 'LLMs'],
    likes: 142,
    userLiked: false,
    bookmarks: 58,
    userBookmarked: true,
    commentsCount: 24,
    comments: [
      {
        id: 'c-1',
        author: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        timestamp: '1 hour ago',
        text: 'The cross-encoder reranking pass made a huge difference in our retrieval accuracy! Did you notice any latency impact when scaling to >1M vectors?',
        likes: 12,
      },
      {
        id: 'c-2',
        author: 'Sophia Patel',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        timestamp: '45 mins ago',
        text: 'Awesome breakdown! Are you using Cohere or BGE for cross-encoder scoring?',
        likes: 8,
      },
    ],
  },
  {
    id: 'post-102',
    author: {
      name: 'Liam Chen',
      handle: '@liamchen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      title: 'Full Stack Engineer • Grad 2026',
      verified: true,
      badge: 'Student Dev',
    },
    timestamp: '4 hours ago',
    category: 'web-dev',
    categoryLabel: 'Web Architecture',
    pinned: false,
    title: 'React 19 Server Actions vs Traditional REST APIs: What is your primary stack for 2026?',
    content:
      'With React 19 now mainstream in Next.js and Vite SSR setups, Server Actions simplify client-server data mutations. What strategy are you using for large-scale production applications?',
    poll: {
      question: 'Which backend pattern do you use most in React 19?',
      totalVotes: 342,
      userVotedOption: 0,
      options: [
        { label: 'React 19 Server Actions + Server Components', votes: 164, percentage: 48 },
        { label: 'REST API (Node.js / Express / Fastify)', votes: 92, percentage: 27 },
        { label: 'GraphQL / tRPC APIs', votes: 52, percentage: 15 },
        { label: 'Python FastAPI / Django Backend', votes: 34, percentage: 10 },
      ],
    },
    tags: ['React19', 'NextJS', 'WebDev', 'Architecture'],
    likes: 89,
    userLiked: true,
    bookmarks: 23,
    userBookmarked: false,
    commentsCount: 16,
    comments: [
      {
        id: 'c-3',
        author: 'Alex Morgan',
        avatar: CURRENT_USER.avatar,
        timestamp: '2 hours ago',
        text: 'We switched our CampusHub AI dashboard to Server Actions + React 19 and saw a 35% reduction in client bundle size!',
        likes: 19,
      },
    ],
  },
  {
    id: 'post-103',
    author: {
      name: 'Sarah Jenkins',
      handle: '@sarahj',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      title: 'AI Career Lead at TechCampus',
      verified: true,
      badge: 'Career Specialist',
    },
    timestamp: '6 hours ago',
    category: 'career',
    categoryLabel: 'Career & Internships',
    pinned: false,
    title: 'Google & Microsoft Summer 2026 AI Internships: Key Requirements & Portfolio Tips',
    content:
      'Recruiters are placing immense focus on verifiable projects over traditional GPAs. Make sure your GitHub features deployed live links, clean documentation, and clear system architecture diagrams.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    tags: ['Internships', 'CareerAdvice', 'Google', 'Microsoft'],
    likes: 215,
    userLiked: false,
    bookmarks: 104,
    userBookmarked: true,
    commentsCount: 38,
    comments: [],
  },
];

const TRENDING_TAGS = [
  { tag: 'React19', count: '1.4k posts' },
  { tag: 'PyTorch', count: '980 posts' },
  { tag: 'LangChain', count: '750 posts' },
  { tag: 'AIInternships', count: '620 posts' },
  { tag: 'GoogleCloud', count: '430 posts' },
];

const UPCOMING_EVENTS = [
  {
    id: 'evt-1',
    title: 'CampusHub Annual AI Hackathon 2026',
    date: 'Aug 24-26, 2026',
    attendees: '480 Joined',
    type: 'Hackathon',
  },
  {
    id: 'evt-2',
    title: 'Building Autonomous Agents with CrewAI',
    date: 'Aug 18, 2026 • 6:00 PM IST',
    attendees: '210 Registered',
    type: 'Live Workshop',
  },
];

const SUGGESTED_GROUPS = [
  { name: 'AI & Deep Learning Guild', members: '3.2k members', icon: Cpu },
  { name: 'Full-Stack Web Architects', members: '2.8k members', icon: Globe },
  { name: 'Competitive Coding & DSA', members: '4.1k members', icon: Terminal },
];

const LEADERBOARD = [
  { name: 'Dr. Evelyn Vance', xp: '4,920 XP', rank: '#1', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' },
  { name: 'Alex Morgan (You)', xp: '2,840 XP', rank: '#4', avatar: CURRENT_USER.avatar },
  { name: 'Marcus Vance', xp: '2,710 XP', rank: '#5', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
];

const FAQS = [
  {
    question: 'How do I earn XP and level badges in the community?',
    answer:
      'You earn XP by posting high-quality technical discussions, answering questions, receiving upvotes, and having your answers marked as verified solutions.',
  },
  {
    question: 'Can I link my GitHub or Portfolio directly in my posts?',
    answer:
      'Yes! Formatted code blocks, GitHub repository links, live project URLs, and rich media attachments are fully supported and encouraged.',
  },
  {
    question: 'How are discussions routed to mentors for help?',
    answer:
      'Tagging your post with relevant category badges like "AI & Machine Learning" or "Career" immediately notifies verified mentors in that domain.',
  },
];

// ==========================================
// MEMOIZED SUB-COMPONENTS FOR PERFORMANCE
// ==========================================
const CategoryBadge = React.memo(({ icon: Icon, label, count, isActive, onClick }) => (
  <button
    onClick={onClick}
    aria-label={`Filter by category ${label}`}
    className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-medium whitespace-nowrap border transition-all duration-200 ${
      isActive
        ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/10 font-semibold'
        : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700/80 hover:bg-slate-900'
    }`}
  >
    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
    <span>{label}</span>
    <span
      className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono border ${
        isActive
          ? 'bg-cyan-400/20 text-cyan-200 border-cyan-400/30 font-bold'
          : 'bg-slate-950 text-slate-500 border-slate-800'
      }`}
    >
      {count}
    </span>
  </button>
));

const PostCard = React.memo(({
  post,
  onLike,
  onBookmark,
  onVotePoll,
  onToggleComments,
  onAddComment,
  onShare,
  isExpanded,
  commentInput,
  onCommentInputChange,
  copiedCodeId,
  onCopyCode
}) => {
  return (
    <motion.article
      variants={itemVariants}
      className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-5 sm:p-6 space-y-5 hover:border-slate-700/80 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/5 relative overflow-hidden group"
    >
      {/* Pinned Ribbon Badge */}
      {post.pinned && (
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full w-fit shadow-inner">
          <Pin className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
          <span>Pinned Discussion</span>
        </div>
      )}

      {/* Author Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-11 h-11 rounded-2xl object-cover border border-slate-800/80 shadow-md"
              loading="lazy"
            />
            {post.author.verified && (
              <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-slate-950 border border-slate-800 text-cyan-400">
                <ShieldCheck className="w-3.5 h-3.5 fill-cyan-500/20 text-cyan-400" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-bold text-white hover:text-cyan-300 transition cursor-pointer">
                {post.author.name}
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-950/80 border border-slate-800/80 text-slate-400">
                {post.author.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {post.author.title} • <span className="text-slate-500">{post.timestamp}</span>
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 border border-slate-800/80 text-cyan-300 shadow-inner whitespace-nowrap">
          {post.categoryLabel}
        </span>
      </div>

      {/* Discussion Title & Body */}
      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-bold text-white leading-snug hover:text-cyan-300 transition cursor-pointer">
          {post.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal whitespace-pre-line">
          {post.content}
        </p>
      </div>

      {/* Image Preview Attachment */}
      {post.imageUrl && (
        <div className="rounded-2xl overflow-hidden border border-slate-800/80 max-h-80 relative group/img bg-slate-950">
          <img
            src={post.imageUrl}
            alt="Discussion Attachment"
            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
        </div>
      )}

      {/* Code Snippet Attachment */}
      {post.codeSnippet && (
        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800/90 font-mono text-xs overflow-x-auto text-cyan-200 leading-relaxed relative shadow-inner">
          <div className="flex justify-between items-center pb-2.5 mb-2.5 border-b border-slate-900 text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-400">
              <Code className="w-3.5 h-3.5 text-cyan-400" /> CODE SNIPPET
            </span>
            <button
              onClick={() => onCopyCode(post.id, post.codeSnippet)}
              className="text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1 text-[11px] font-medium"
            >
              {copiedCodeId === post.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
          <pre className="selection:bg-cyan-500/40">{post.codeSnippet}</pre>
        </div>
      )}

      {/* Interactive Poll Attachment */}
      {post.poll && (
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-inner">
          <h4 className="text-xs sm:text-sm font-bold text-slate-200 tracking-wide flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-cyan-400" />
            {post.poll.question}
          </h4>
          <div className="space-y-2.5">
            {post.poll.options.map((option, idx) => {
              const isVoted = post.poll.userVotedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => onVotePoll(post.id, idx)}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all duration-200 relative overflow-hidden flex items-center justify-between ${
                    isVoted
                      ? 'border-cyan-500/50 bg-cyan-500/10 text-white font-bold shadow-sm shadow-cyan-500/10'
                      : 'border-slate-800/80 bg-slate-900/60 text-slate-300 hover:border-slate-700/80 hover:bg-slate-900'
                  }`}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-cyan-500/15 pointer-events-none transition-all duration-500"
                    style={{ width: `${option.percentage}%` }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    {isVoted && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                    {option.label}
                  </span>
                  <span className="relative z-10 font-mono text-cyan-400 font-bold">
                    {option.percentage}%
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-500 text-right font-mono">
            {post.poll.totalVotes} total votes cast
          </p>
        </div>
      )}

      {/* Hashtag Chips */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {post.tags.map((tag, i) => (
          <span
            key={i}
            className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400 font-medium hover:text-cyan-300 transition cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Action Toolbar */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onLike(post.id)}
            aria-label="Upvote Post"
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl border transition-all duration-200 active:scale-95 ${
              post.userLiked
                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 font-bold shadow-sm shadow-cyan-500/10'
                : 'bg-slate-950/80 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${post.userLiked ? 'fill-cyan-400 text-cyan-400' : ''}`} />
            <span>{post.likes}</span>
          </button>

          <button
            onClick={() => onToggleComments(post.id)}
            aria-label="View Comments"
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl border transition-all duration-200 active:scale-95 ${
              isExpanded
                ? 'bg-slate-900 border-slate-700 text-white font-bold'
                : 'bg-slate-950/80 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>{post.commentsCount} Comments</span>
          </button>

          <button
            onClick={() => onBookmark(post.id)}
            aria-label="Bookmark Discussion"
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl border transition-all duration-200 active:scale-95 ${
              post.userBookmarked
                ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 font-bold shadow-sm shadow-indigo-500/10'
                : 'bg-slate-950/80 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${post.userBookmarked ? 'fill-indigo-400 text-indigo-400' : ''}`} />
            <span>{post.bookmarks}</span>
          </button>
        </div>

        <button
          onClick={() => onShare(post)}
          aria-label="Share Discussion Link"
          className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900 transition active:scale-95"
          title="Share Discussion"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Expandable Threaded Comments */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="pt-4 border-t border-slate-800/80 space-y-4"
          >
            {/* Reply Input Box */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Write a constructive response..."
                value={commentInput || ''}
                onChange={(e) => onCommentInputChange(post.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onAddComment(post.id);
                }}
                className="flex-1 px-4 py-2.5 bg-slate-950/90 border border-slate-800/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 shadow-inner"
              />
              <button
                onClick={() => onAddComment(post.id)}
                aria-label="Send Comment"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95 transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Comments List */}
            {post.comments.length > 0 ? (
              <div className="space-y-2.5 pt-1">
                {post.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3.5 space-y-1.5 shadow-inner"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          className="w-6 h-6 rounded-full object-cover border border-slate-800"
                        />
                        <span className="font-bold text-white">{comment.author}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 pl-8 leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic text-center py-2 font-normal">
                No responses yet. Be the first to share your thoughts!
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
});

// ==========================================
// MAIN COMMUNITY COMPONENT
// ==========================================
export default function Community() {
  const navigate = useNavigate();

  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('trending'); // 'trending' | 'latest' | 'top' | 'bookmarked'
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'groups' | 'events' | 'leaderboard'
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // New Post Modal State
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('ai-ml');
  const [newPostTags, setNewPostTags] = useState('');
  const [newPostCode, setNewPostCode] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  // Expandable Comments & Feedback State
  const [expandedComments, setExpandedComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [copiedCodeId, setCopiedCodeId] = useState(null);

  // Filter & Search Logic with Memoization
  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const matchesCategory =
          activeCategory === 'all' || post.category === activeCategory;
        const matchesSearch =
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        let matchesFilter = true;
        if (activeFilter === 'bookmarked') {
          matchesFilter = post.userBookmarked;
        }

        return matchesCategory && matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        if (activeFilter === 'top') return b.likes - a.likes;
        if (activeFilter === 'latest') return b.id.localeCompare(a.id);
        return b.likes + b.commentsCount - (a.likes + a.commentsCount); // Trending default
      });
  }, [posts, activeCategory, searchQuery, activeFilter]);

  // Handlers with useCallback for Performance Optimization
  const handleLike = useCallback((postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = post.userLiked;
          return {
            ...post,
            userLiked: !isLiked,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  }, []);

  const handleBookmark = useCallback((postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isBookmarked = post.userBookmarked;
          return {
            ...post,
            userBookmarked: !isBookmarked,
            bookmarks: isBookmarked ? post.bookmarks - 1 : post.bookmarks + 1,
          };
        }
        return post;
      })
    );
  }, []);

  const handleVotePoll = useCallback((postId, optionIdx) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId && post.poll) {
          const updatedOptions = post.poll.options.map((opt, i) => {
            if (i === optionIdx) {
              return { ...opt, votes: opt.votes + 1 };
            }
            return opt;
          });
          const newTotal = post.poll.totalVotes + 1;
          const recalculatedOptions = updatedOptions.map((opt) => ({
            ...opt,
            percentage: Math.round((opt.votes / newTotal) * 100),
          }));
          return {
            ...post,
            poll: {
              ...post.poll,
              totalVotes: newTotal,
              userVotedOption: optionIdx,
              options: recalculatedOptions,
            },
          };
        }
        return post;
      })
    );
  }, []);

  const handleToggleComments = useCallback((postId) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  }, []);

  const handleCommentInputChange = useCallback((postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  }, []);

  const handleAddComment = useCallback((postId) => {
    setCommentInputs((prevInputs) => {
      const text = prevInputs[postId];
      if (!text || !text.trim()) return prevInputs;

      const newComment = {
        id: `c-${Date.now()}`,
        author: CURRENT_USER.name,
        avatar: CURRENT_USER.avatar,
        timestamp: 'Just now',
        text: text.trim(),
        likes: 0,
      };

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              commentsCount: post.commentsCount + 1,
              comments: [newComment, ...post.comments],
            };
          }
          return post;
        })
      );

      setExpandedComments((prev) => ({ ...prev, [postId]: true }));
      return { ...prevInputs, [postId]: '' };
    });
  }, []);

  const handlePublishPost = useCallback((e) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const createdPost = {
      id: `post-${Date.now()}`,
      author: {
        name: CURRENT_USER.name,
        handle: CURRENT_USER.handle,
        avatar: CURRENT_USER.avatar,
        title: CURRENT_USER.title,
        verified: true,
        badge: 'Student Dev',
      },
      timestamp: 'Just now',
      category: newPostCategory,
      categoryLabel: CATEGORIES.find((c) => c.id === newPostCategory)?.label || 'Discussion',
      pinned: false,
      title: newPostTitle,
      content: newPostContent,
      codeSnippet: newPostCode.trim() ? newPostCode : null,
      tags: newPostTags
        ? newPostTags.split(',').map((t) => t.trim().replace(/^#/, ''))
        : ['General', 'Community'],
      likes: 1,
      userLiked: true,
      bookmarks: 0,
      userBookmarked: false,
      commentsCount: 0,
      comments: [],
    };

    setPosts((prev) => [createdPost, ...prev]);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostCode('');
    setNewPostTags('');
    setIsCreatingPost(false);
  }, [newPostTitle, newPostContent, newPostCategory, newPostTags, newPostCode]);

  const handleCopyCode = useCallback((postId, codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeId(postId);
    setTimeout(() => setCopiedCodeId(null), 2000);
  }, []);

  const handleShare = useCallback(async (post) => {
    const url = `${window.location.origin}/community#${post.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: `Check out this discussion on CampusHub AI Community: ${post.title}`,
          url: url,
        });
        return;
      } catch (e) {
        // Fallback to clipboard copy
      }
    }
    navigator.clipboard.writeText(url);
    alert('Discussion link copied to clipboard!');
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 relative overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* SaaS Ambient Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none -z-10" />

      {/* Layered Background Glows */}
      <div className="absolute top-0 left-1/3 w-[650px] h-[380px] bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[350px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* ==========================================
            SECTION 1: HERO SECTION
        ========================================== */}
        <section className="relative pt-4 pb-2 text-center space-y-6 max-w-4xl mx-auto">
          {/* Animated Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800/80 backdrop-blur-2xl text-cyan-400 text-xs sm:text-sm font-medium shadow-xl shadow-cyan-500/5 hover:border-cyan-500/30 transition-all duration-300"
          >
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>CampusHub AI Developer Community</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12]"
          >
            Connect, Build & Accelerate with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              15,000+ Campus Developers
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Ask technical AI questions, share architectural insights, showcase real projects, and collaborate with student engineers and faculty mentors.
          </motion.p>

          {/* Search & Action Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-2xl mx-auto"
          >
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search discussions, tags, mentors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-20 py-3.5 bg-slate-900/90 backdrop-blur-2xl border border-slate-800/80 rounded-2xl text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear Search"
                    className="p-1 rounded-full text-slate-500 hover:text-white hover:bg-slate-800 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <div className="hidden sm:flex items-center gap-0.5 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-500 font-mono">
                  <Command className="w-3 h-3" />
                  <span>K</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsCreatingPost(true)}
              className="w-full sm:w-auto whitespace-nowrap px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Start Discussion</span>
            </button>
          </motion.div>

          {/* Key Community Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium"
          >
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-cyan-400" /> 15,420 Active Members
            </span>
            <span className="hidden sm:inline text-slate-800">•</span>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-blue-400" /> 1,240 Solutions Provided
            </span>
            <span className="hidden sm:inline text-slate-800">•</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-indigo-400" /> &lt; 12min Avg Response Time
            </span>
          </motion.div>
        </section>

        {/* ==========================================
            SECTION 2: MAIN COMMUNITY LAYOUT (GRID)
        ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ==========================================
              LEFT / PRIMARY COLUMN (8 COLS)
          ========================================== */}
          <div className="lg:col-span-8 space-y-6">

            {/* Navigation Tabs Bar */}
            <div className="flex items-center justify-between bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-2 shadow-lg">
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none w-full sm:w-auto">
                {[
                  { id: 'feed', label: 'Feed', icon: Flame },
                  { id: 'groups', label: 'Explore Guilds', icon: Users },
                  { id: 'events', label: 'Events & Hackathons', icon: Calendar },
                  { id: 'leaderboard', label: 'Leaderboard', icon: Award },
                ].map((tab) => {
                  const IconComp = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap active:scale-95 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                          : 'text-slate-400 hover:text-white hover:bg-slate-950/60'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <CategoryBadge
                  key={cat.id}
                  icon={cat.icon}
                  label={cat.label}
                  count={cat.count}
                  isActive={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                />
              ))}
            </div>

            {/* Sorting Filter Controls */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-semibold text-slate-500 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-cyan-400" /> Sort By:
                </span>
                {[
                  { id: 'trending', label: 'Trending' },
                  { id: 'latest', label: 'Latest' },
                  { id: 'top', label: 'Most Upvoted' },
                  { id: 'bookmarked', label: 'Saved Discussions' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`font-medium transition-colors ${
                      activeFilter === f.id
                        ? 'text-cyan-400 font-bold underline underline-offset-4 decoration-cyan-400'
                        : 'hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <span className="hidden sm:inline font-mono text-[11px] text-slate-500">
                Showing {filteredPosts.length} posts
              </span>
            </div>

            {/* CREATE POST CARD / INLINE COMPOSER */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-5 space-y-4 shadow-xl hover:border-slate-700/80 transition-all">
              <div className="flex items-center gap-3">
                <img
                  src={CURRENT_USER.avatar}
                  alt={CURRENT_USER.name}
                  className="w-10 h-10 rounded-2xl object-cover border border-slate-800/80 shadow-md"
                />
                <button
                  onClick={() => setIsCreatingPost(true)}
                  className="flex-1 text-left px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-xs sm:text-sm text-slate-500 hover:text-slate-300 hover:border-slate-700 transition-all shadow-inner"
                >
                  Start a technical discussion or ask a mentor...
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsCreatingPost(true)}
                    className="flex items-center gap-1.5 hover:text-cyan-400 transition"
                  >
                    <Code className="w-4 h-4 text-cyan-400" />
                    <span>Code Snippet</span>
                  </button>
                  <button
                    onClick={() => setIsCreatingPost(true)}
                    className="flex items-center gap-1.5 hover:text-cyan-400 transition"
                  >
                    <BarChart2 className="w-4 h-4 text-blue-400" />
                    <span>Poll</span>
                  </button>
                  <button
                    onClick={() => setIsCreatingPost(true)}
                    className="flex items-center gap-1.5 hover:text-cyan-400 transition"
                  >
                    <ImageIcon className="w-4 h-4 text-indigo-400" />
                    <span>Attachment</span>
                  </button>
                </div>

                <button
                  onClick={() => setIsCreatingPost(true)}
                  className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-semibold hover:bg-cyan-500/20 transition active:scale-95"
                >
                  New Post
                </button>
              </div>
            </div>

            {/* TAB CONTENT: COMMUNITY FEED */}
            {activeTab === 'feed' && (
              <AnimatePresence mode="wait">
                {filteredPosts.length > 0 ? (
                  <motion.div
                    key={activeCategory + activeFilter + searchQuery}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    {filteredPosts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onLike={handleLike}
                        onBookmark={handleBookmark}
                        onVotePoll={handleVotePoll}
                        onToggleComments={handleToggleComments}
                        onAddComment={handleAddComment}
                        onShare={handleShare}
                        isExpanded={expandedComments[post.id]}
                        commentInput={commentInputs[post.id]}
                        onCommentInputChange={handleCommentInputChange}
                        copiedCodeId={copiedCodeId}
                        onCopyCode={handleCopyCode}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-12 text-center space-y-4 shadow-xl"
                  >
                    <MessageSquare className="w-12 h-12 text-slate-600 mx-auto" />
                    <h3 className="text-lg font-bold text-white">No discussions found</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                      Try adjusting your search criteria or start a new discussion topic in this category.
                    </p>
                    <button
                      onClick={() => setIsCreatingPost(true)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition"
                    >
                      Create First Discussion
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* TAB CONTENT: GROUPS & GUILDS */}
            {activeTab === 'groups' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { name: 'AI & Machine Learning Guild', desc: 'PyTorch, RAG architectures, LLMs, and autonomous agent systems.', members: '3.2k Developers', icon: Cpu },
                  { name: 'Full-Stack Web Architects', desc: 'React 19, Next.js, Server Actions, microservices, and Tailwind.', members: '2.8k Developers', icon: Globe },
                  { name: 'Competitive Coding & DSA', desc: 'Daily LeetCode challenges, algorithm practice, and tech interview prep.', members: '4.1k Developers', icon: Terminal },
                  { name: 'Cloud Native & DevOps', desc: 'AWS, Kubernetes, Docker, and CI/CD automated deployment pipelines.', members: '1.9k Developers', icon: Shield },
                ].map((g, idx) => {
                  const IconComp = g.icon;
                  return (
                    <div key={idx} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 space-y-4 hover:border-slate-700/80 transition-all shadow-xl">
                      <div className="p-3 w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-400 flex items-center justify-center shadow-inner">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{g.name}</h3>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{g.desc}</p>
                      </div>
                      <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-mono">{g.members}</span>
                        <button onClick={() => alert(`Joined ${g.name}!`)} className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 font-semibold hover:bg-slate-900 transition active:scale-95">
                          Join Guild
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB CONTENT: EVENTS & HACKATHONS */}
            {activeTab === 'events' && (
              <div className="space-y-4">
                {UPCOMING_EVENTS.map((evt) => (
                  <div key={evt.id} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700/80 transition-all shadow-xl">
                    <div className="space-y-1">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 uppercase tracking-wider">
                        {evt.type}
                      </span>
                      <h3 className="text-lg font-bold text-white pt-1">{evt.title}</h3>
                      <p className="text-xs text-slate-400">{evt.date} • {evt.attendees}</p>
                    </div>
                    <button onClick={() => alert(`RSVP confirmed for ${evt.title}`)} className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition">
                      RSVP Spot
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: LEADERBOARD */}
            {activeTab === 'leaderboard' && (
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 space-y-4 shadow-xl">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" /> Top Community Contributors
                </h3>
                <div className="space-y-3">
                  {LEADERBOARD.map((item, idx) => (
                    <div key={idx} className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between shadow-inner">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-extrabold font-mono text-cyan-400 w-6">{item.rank}</span>
                        <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-slate-800" />
                        <div>
                          <h4 className="text-sm font-bold text-white">{item.name}</h4>
                          <p className="text-xs text-slate-500">Verified Technical Contributor</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                        {item.xp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ==========================================
              RIGHT COLUMN / STICKY SIDEBAR (4 COLS)
          ========================================== */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">

            {/* USER QUICK PROFILE CARD */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 space-y-5 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3">
                <img
                  src={CURRENT_USER.avatar}
                  alt={CURRENT_USER.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-cyan-500/50 shadow-md shadow-cyan-500/20"
                />
                <div>
                  <h3 className="text-base font-bold text-white">{CURRENT_USER.name}</h3>
                  <p className="text-xs text-cyan-400 font-medium">{CURRENT_USER.title}</p>
                </div>
              </div>

              {/* XP Level Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Level {CURRENT_USER.level} Progress</span>
                  <span className="font-bold text-cyan-400 font-mono">{CURRENT_USER.xp} XP</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full" style={{ width: '72%' }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-center text-xs">
                <div className="bg-slate-950/70 p-2.5 rounded-2xl border border-slate-800/80 shadow-inner">
                  <p className="text-slate-500 text-[10px]">Contributions</p>
                  <p className="font-bold text-white">{CURRENT_USER.contributions}</p>
                </div>
                <div className="bg-slate-950/70 p-2.5 rounded-2xl border border-slate-800/80 shadow-inner">
                  <p className="text-slate-500 text-[10px]">Solutions</p>
                  <p className="font-bold text-cyan-400">{CURRENT_USER.solutionsProvided}</p>
                </div>
              </div>
            </div>

            {/* TRENDING TOPICS */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-cyan-400" /> Trending Topics
              </h3>
              <div className="space-y-2.5">
                {TRENDING_TAGS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(item.tag)}
                    className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition text-left text-xs active:scale-98"
                  >
                    <span className="font-semibold text-slate-200">#{item.tag}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* UPCOMING EVENTS MINI WIDGET */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" /> Upcoming Events
                </h3>
                <button onClick={() => setActiveTab('events')} className="text-xs text-cyan-400 hover:underline font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {UPCOMING_EVENTS.map((evt) => (
                  <div key={evt.id} className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-3.5 space-y-1 shadow-inner">
                    <p className="text-xs font-bold text-white">{evt.title}</p>
                    <p className="text-[11px] text-slate-400">{evt.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* POPULAR GUILDS MINI WIDGET */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" /> Suggested Guilds
              </h3>
              <div className="space-y-3">
                {SUGGESTED_GROUPS.map((g, idx) => {
                  const IconComp = g.icon;
                  return (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 shadow-inner">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-200">{g.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{g.members}</p>
                        </div>
                      </div>
                      <button onClick={() => alert(`Joined ${g.name}!`)} className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-semibold text-cyan-400 hover:bg-slate-900 transition active:scale-95">
                        Join
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* ==========================================
            SECTION 3: COMMUNITY FAQ SECTION
        ========================================== */}
        <section className="space-y-8 max-w-4xl mx-auto pt-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Community Guidelines & FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              How to participate, share code, and connect with technical mentors.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 space-y-2 shadow-xl">
                <h4 className="text-sm sm:text-base font-bold text-white">{faq.question}</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            SECTION 4: FINAL CTA BANNER
        ========================================== */}
        <section>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 border border-slate-800/80 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl space-y-6"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-cyan-400 text-xs font-semibold">
              <MessageSquare className="w-4 h-4" />
              <span>Ready to share your technical project?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
              Start Your First Discussion on CampusHub AI
            </h2>

            <p className="text-slate-400 text-xs sm:text-base max-w-xl mx-auto leading-relaxed">
              Share code architecture, ask for mentor code reviews, or collaborate on hackathon builds with campus developers.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setIsCreatingPost(true)}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Discussion</span>
              </button>
            </div>
          </motion.div>
        </section>

      </div>

      {/* ==========================================
          MODAL: CREATE NEW POST / DISCUSSION
      ========================================== */}
      <AnimatePresence>
        {isCreatingPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
            onClick={() => setIsCreatingPost(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800/80 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsCreatingPost(false)}
                aria-label="Close Modal"
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-400 shadow-inner">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Start a Technical Discussion</h3>
                  <p className="text-xs text-slate-400">Share code, ask questions, or post project updates.</p>
                </div>
              </div>

              <form onSubmit={handlePublishPost} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Discussion Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., How to optimize PyTorch tensor operations in RAG pipelines?"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-2xl text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50 shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Category</label>
                    <select
                      value={newPostCategory}
                      onChange={(e) => setNewPostCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-2xl text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50"
                    >
                      {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Tags (Comma Separated)</label>
                    <input
                      type="text"
                      placeholder="React19, PyTorch, LangChain"
                      value={newPostTags}
                      onChange={(e) => setNewPostTags(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-2xl text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-slate-300">Content / Question</label>
                    <span className="text-[10px] text-slate-500 font-mono">{newPostContent.length} / 1000</span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    maxLength={1000}
                    placeholder="Provide detailed context, error logs, or problem description..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-2xl text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50 shadow-inner"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Code Snippet (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="// Paste relevant code or logic here..."
                    value={newPostCode}
                    onChange={(e) => setNewPostCode(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-2xl text-cyan-200 font-mono text-xs focus:outline-none focus:border-cyan-500/50 shadow-inner"
                  />
                </div>

                {/* Drag & Drop Attachments Dropzone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                  }}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    isDragOver
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-slate-800/80 bg-slate-950/60'
                  }`}
                >
                  <UploadCloud className="w-6 h-6 text-slate-500 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">
                    Drag and drop attachments or click to select files (Images, Screenshots, PDFs)
                  </p>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreatingPost(false)}
                    className="flex-1 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition"
                  >
                    Publish Discussion
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