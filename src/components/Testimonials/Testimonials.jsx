import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Computer Science Student",
    review:
      "CampusHub AI helped me organize my studies and understand difficult concepts easily.",
  },
  {
    name: "Priya Singh",
    role: "Engineering Student",
    review:
      "The AI assistant and notes sharing features make learning much faster and smarter.",
  },
  {
    name: "Aman Verma",
    role: "Final Year Student",
    review:
      "A perfect platform for students to connect, learn and find career opportunities.",
  },
  {
    name: "Sneha Patil",
    role: "AI/ML Student",
    review:
      "The resume builder and mock interviews gave me the confidence to apply for real roles.",
  },
  {
    name: "Karan Mehta",
    role: "Engineering Student",
    review:
      "I found my internship through CampusHub AI within weeks of using the platform.",
  },
  {
    name: "Ishita Rao",
    role: "Computer Science Student",
    review:
      "Smart notes sharing saved me hours every week during exam preparation.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-slate-900 py-24 text-white"
      aria-labelledby="testimonials-heading"
    >
      {/* Background — same language as Hero / Features / Stats */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-600/20 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-[110px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur">
            <Quote size={16} />
            Loved by Students
          </div>

          <h2
            id="testimonials-heading"
            className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl"
          >
            What Students{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Say
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Real experiences from students learning, building and growing
            with CampusHub AI.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((item) => {
            const initial = item.name.charAt(0);

            return (
              <motion.article
                key={item.name}
                variants={cardVariants}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60 p-8 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                {/* Corner glow — hidden until hover */}
                <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex h-full flex-col">
                  {/* Stars */}
                  <div className="mb-5 flex gap-1" aria-label="5 out of 5 stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="flex-1 text-base leading-relaxed text-gray-300">
                    &ldquo;{item.review}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="mt-8 flex items-center gap-4 border-t border-slate-800 pt-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-gradient-to-r from-blue-600 to-cyan-500 text-base font-semibold text-white shadow-lg shadow-blue-500/20 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      {initial}
                    </div>

                    <div>
                      <h3 className="text-base font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;