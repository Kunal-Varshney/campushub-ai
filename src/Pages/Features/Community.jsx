import { Users, MessageCircle, UserPlus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function Community() {
  const cards = [
    {
      icon: Users,
      title: "Student Network",
      desc: "Connect with students from different colleges and build your network.",
    },
    {
      icon: MessageCircle,
      title: "Discussions",
      desc: "Share ideas, ask questions and discuss technology, projects and careers.",
    },
    {
      icon: UserPlus,
      title: "Collaboration",
      desc: "Find teammates for projects, hackathons and learning journeys.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-24 text-white">
      
      <div className="mx-auto max-w-6xl text-center">
        
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900 px-4 py-2 text-sm text-blue-400">
          <Sparkles size={16} />
          Campus Community
        </div>

        <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
          Connect With{" "}
          <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Students Everywhere
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-slate-400">
          A place where students collaborate, share knowledge and grow together.
        </p>


        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-left backdrop-blur-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
                  <Icon size={26} />
                </div>

                <h2 className="mt-6 text-xl font-semibold">
                  {card.title}
                </h2>

                <p className="mt-3 text-slate-400">
                  {card.desc}
                </p>

              </motion.div>
            );
          })}
        </div>

      </div>

    </div>
  );
}

export default Community;