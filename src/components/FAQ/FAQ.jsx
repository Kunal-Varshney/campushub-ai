import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    id: "what-is-campushub",
    question: "What is CampusHub AI?",
    answer:
      "CampusHub AI is an AI-powered platform that helps students learn, connect and grow through smart tools built specifically for campus life.",
  },
  {
    id: "ai-help-students",
    question: "How does AI help students?",
    answer:
      "Our AI assistant generates study notes, explains difficult concepts in simple terms, and builds personalized learning plans based on your pace and goals.",
  },
  {
    id: "upload-notes",
    question: "Can I upload my notes?",
    answer:
      "Yes. You can upload, organize and share your notes with your campus community, and access quality notes shared by other students.",
  },
  {
    id: "exam-prep",
    question: "Can I prepare for exams using CampusHub AI?",
    answer:
      "Absolutely. CampusHub AI helps you generate revision material, practice with mock interviews, and follow a structured skill roadmap ahead of exams.",
  },
  {
    id: "internships",
    question: "Are internship opportunities available?",
    answer:
      "Yes, the platform surfaces internships and career opportunities matched to your skills, along with an AI resume builder to help you apply with confidence.",
  },
  {
    id: "data-security",
    question: "Is my data secure?",
    answer:
      "Your data is encrypted and handled with strict access controls. We never share your personal information or notes without your permission.",
  },
];

function FaqItem({ faq, isOpen, onToggle }) {
  const panelId = `${faq.id}-panel`;
  const buttonId = `${faq.id}-button`;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20">
      {/* Corner glow — hidden until hover */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <h3 className="relative">
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:p-7"
        >
          <span className="text-base font-semibold leading-snug sm:text-lg">
            {faq.question}
          </span>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105">
            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative overflow-hidden"
          >
            <p className="px-6 pb-6 text-base leading-relaxed text-gray-400 sm:px-7 sm:pb-7">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  const [openId, setOpenId] = useState(faqs[0].id);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-slate-950 py-24 text-white"
      aria-labelledby="faq-heading"
    >
      {/* Background — same language as Hero / Features / Stats / Testimonials */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-600/20 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-[110px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative mx-auto max-w-4xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur">
            <HelpCircle size={16} />
            Frequently Asked Questions
          </div>

          <h2
            id="faq-heading"
            className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl"
          >
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Everything you need to know about learning, building and growing
            with CampusHub AI.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-5">
          {faqs.map((faq) => (
            <FaqItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;