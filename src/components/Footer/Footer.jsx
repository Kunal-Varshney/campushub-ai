import { Mail, ArrowUpRight, Heart } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionNavigation = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 150);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-slate-800 bg-slate-950 text-white"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">

        {/* ================= MAIN FOOTER ================= */}

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* ================= BRAND ================= */}

          <div>
            <Link
              to="/"
              className="inline-block text-2xl font-bold tracking-tight"
            >
              CampusHub
              <span className="text-blue-500">AI</span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              An AI-powered campus platform helping students
              learn smarter, build skills, discover opportunities,
              and move toward the right career path.
            </p>

            {/* Social Icons */}

            <div className="mt-6 flex gap-3">

              <a
                href="https://github.com/Kunal-Varshney"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/kunalvarshney/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="https://www.instagram.com/ddraaculaaa_01/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400"
              >
                <FaInstagram size={18} />
              </a>

            </div>
          </div>


          {/* ================= PLATFORM ================= */}

          <div>
            <h4 className="mb-5 text-sm font-semibold text-white">
              Platform
            </h4>

            <ul className="space-y-3 text-sm text-slate-400">

              <li>
                <button
                  onClick={() => handleSectionNavigation("features")}
                  className="transition-colors duration-300 hover:text-cyan-400"
                >
                  Features
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleSectionNavigation("how-it-works")}
                  className="transition-colors duration-300 hover:text-cyan-400"
                >
                  How It Works
                </button>
              </li>

              <li>
                <Link
                  to="/about"
                  className="transition-colors duration-300 hover:text-cyan-400"
                >
                  About CampusHub AI
                </Link>
              </li>

              <li>
                <Link
                  to="/careers"
                  className="transition-colors duration-300 hover:text-cyan-400"
                >
                  Careers
                </Link>
              </li>

            </ul>
          </div>


          {/* ================= RESOURCES ================= */}

          <div>
            <h4 className="mb-5 text-sm font-semibold text-white">
              Resources
            </h4>

            <ul className="space-y-3 text-sm text-slate-400">

              <li>
                <button
                  onClick={() => handleSectionNavigation("faq")}
                  className="transition-colors duration-300 hover:text-cyan-400"
                >
                  FAQs
                </button>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="transition-colors duration-300 hover:text-cyan-400"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="transition-colors duration-300 hover:text-cyan-400"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <a
                  href="mailto:kunalvarshney187@gmail.com"
                  className="transition-colors duration-300 hover:text-cyan-400"
                >
                  Contact Support
                </a>
              </li>

            </ul>
          </div>


          {/* ================= GET IN TOUCH ================= */}

          <div>

            <h4 className="mb-5 text-sm font-semibold text-white">
              Get in Touch
            </h4>

            <p className="mb-5 text-sm leading-6 text-slate-400">
              Have a question, suggestion, or want to know more
              about CampusHub AI?
            </p>

            <a
              href="mailto:kunalvarshney187@gmail.com"
              className="group inline-flex items-center gap-2 text-sm text-slate-300 transition-colors duration-300 hover:text-cyan-400"
            >
              <Mail className="h-4 w-4 text-cyan-400" />

              <span>
                kunalvarshney187@gmail.com
              </span>

              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <p className="mt-6 text-xs leading-5 text-slate-500">
              Built to help students discover their potential
              and move confidently toward their careers.
            </p>

          </div>

        </div>


        {/* ================= DIVIDER ================= */}

        <div className="my-10 h-px bg-slate-800" />


        {/* ================= BOTTOM BAR ================= */}

        <div className="flex flex-col gap-4 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">

          <p>
            © 2026 CampusHub AI. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-1.5 sm:justify-end">
            <span>Made for students</span>

            <Heart
              className="h-3.5 w-3.5 fill-current text-red-400"
            />

            <span>with AI</span>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;