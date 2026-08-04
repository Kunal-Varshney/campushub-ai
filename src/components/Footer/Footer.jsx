import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-slate-800 bg-slate-950 text-white"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-600/10 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold">
              CampusHub
              <span className="text-blue-500">AI</span>
            </h3>

            <p className="mt-4 leading-relaxed text-gray-400">
              AI-powered campus platform helping students learn smarter,
              connect better and build their future.
            </p>
          </div>


          {/* Product */}
          <div>
            <h4 className="mb-4 font-semibold">
              Product
            </h4>

            <ul className="space-y-3 text-gray-400">

              <li>
                <a
                  href="#ai-assistant"
                  className="transition-colors duration-300 hover:text-blue-400"
                >
                  AI Assistant
                </a>
              </li>

              <li>
                <a
                  href="#smart-notes"
                  className="transition-colors duration-300 hover:text-blue-400"
                >
                  Smart Notes
                </a>
              </li>

              <li>
                <a
                  href="#internship-finder"
                  className="transition-colors duration-300 hover:text-blue-400"
                >
                  Internship Finder
                </a>
              </li>

              <li>
                <a
                  href="#community"
                  className="transition-colors duration-300 hover:text-blue-400"
                >
                  Community
                </a>
              </li>

            </ul>
          </div>


          {/* Company */}
          <div>
            <h4 className="mb-4 font-semibold">
              Company
            </h4>

            <ul className="space-y-3 text-gray-400">

              <li>
                <Link
                  to="/about"
                  className="transition-colors duration-300 hover:text-blue-400"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/careers"
                  className="transition-colors duration-300 hover:text-blue-400"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="transition-colors duration-300 hover:text-blue-400"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="transition-colors duration-300 hover:text-blue-400"
                >
                  Terms & Conditions
                </Link>
              </li>


              <li>
                <a
                  href="mailto:kunalvarshney187@gmail.com"
                  className="transition-colors duration-300 hover:text-blue-400"
                >
                  Contact
                </a>
              </li>

            </ul>
          </div>


          {/* Connect */}
          <div>
            <h4 className="mb-4 font-semibold">
              Connect
            </h4>

            <div className="mb-5 flex gap-4">

              <a
                href="https://github.com/Kunal-Varshney"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900/80 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <FaGithub size={18} />
              </a>


              <a
                href="https://www.linkedin.com/in/kunalvarshney/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900/80 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <FaLinkedin size={18} />
              </a>


              <a
                href="https://www.instagram.com/ddraaculaaa_01/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900/80 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <FaInstagram size={18} />
              </a>

            </div>


            <a
              href="mailto:kunalvarshney187@gmail.com"
              className="flex items-center gap-2 text-gray-400 transition-colors duration-300 hover:text-blue-400"
            >
              <Mail size={18} />
              kunalvarshney187@gmail.com
            </a>

          </div>

        </div>


        {/* Bottom */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-gray-500">
          © 2026 CampusHub AI. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;