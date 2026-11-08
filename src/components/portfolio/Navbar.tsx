import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.jpg";
import { ArrowUpRight, Github, Linkedin, Instagram } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled && !isOpen
          ? "py-3 backdrop-blur-xl bg-background/60 border-b border-border"
          : "py-4 md:py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#home"
            onClick={closeMenu}
            className="flex items-center gap-2.5 font-display font-bold text-lg tracking-tight z-50 group"
          >
            <img
              src={logo}
              alt="Abizar Dholkawala logo"
              className="w-9 h-9 rounded-full object-cover ring-1 ring-white/15 shadow-[0_0_18px_rgba(34,211,238,0.25)]"
            />
            <span className="text-zinc-300 font-display font-semibold text-base md:text-lg tracking-tight group-hover:text-white transition-colors">
              Abizar.
            </span>
          </a>

          {/* Desktop Nav Items */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors group"
                >
                  {l.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-cyan-400 to-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass hover:glow-neon transition-all"
            >
              Let's talk →
            </a>

            {/* Seamless 3-line hamburger to Cross 'X' button */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="relative w-10 h-10 rounded-xl glass border border-white/10 md:hidden flex flex-col items-center justify-center gap-1.5 z-50 text-foreground hover:glow-neon transition-all focus:outline-none"
            >
              {/* Top line -> rotates 45deg & moves down 8px to meet center */}
              <motion.span
                animate={
                  isOpen
                    ? { rotate: 45, y: 8, width: 20 }
                    : { rotate: 0, y: 0, width: 20 }
                }
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-0.5 bg-foreground rounded-full origin-center"
              />
              {/* Middle line -> fades out & scales to 0 */}
              <motion.span
                animate={
                  isOpen
                    ? { opacity: 0, x: -6, scaleX: 0 }
                    : { opacity: 1, x: 0, scaleX: 1, width: 20 }
                }
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="h-0.5 bg-foreground rounded-full"
              />
              {/* Bottom line -> rotates -45deg & moves up 8px to meet center */}
              <motion.span
                animate={
                  isOpen
                    ? { rotate: -45, y: -8, width: 20 }
                    : { rotate: 0, y: 0, width: 20 }
                }
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-0.5 bg-foreground rounded-full origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1], // Smooth cubic ease-out
            }}
            className="fixed inset-0 z-40 md:hidden bg-background/98 backdrop-blur-3xl flex flex-col justify-between px-6 pt-24 pb-8 overflow-hidden select-none"
          >
            {/* Ambient neon decorative background glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
              <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-cyan-500/10 blur-[90px]" />
              <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-violet-500/15 blur-[90px]" />
            </div>

            {/* Main Menu Body */}
            <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full py-4">
              {/* Role Subtitle with static site accent gradient */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.35 }}
                className="text-center py-3 mb-10 space-y-2.5"
              >
                <p className="font-mono text-[18px] sm:text-[19px] font-bold tracking-wider uppercase py-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                  Full Stack Developer
                </p>
                <p className="font-mono text-[15px] sm:text-base font-semibold tracking-wider uppercase py-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                  AI & ML Engineer
                </p>
              </motion.div>

              {/* Navigation Links - Center-aligned, No Numbering */}
              <ul className="space-y-6 text-center w-full">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{
                      delay: 0.12 + i * 0.05,
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="inline-block text-3xl sm:text-4xl font-display font-bold text-foreground/85 hover:text-cyan-400 active:scale-95 transition-all py-1"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Bottom: Mobile Let's Talk CTA & Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.35 }}
              className="max-w-xs mx-auto w-full flex flex-col items-center"
            >
              <a
                href="#contact"
                onClick={closeMenu}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 text-background font-bold text-sm sm:text-base glow-neon shadow-lg active:scale-95 transition-transform mb-8"
              >
                Let's talk →
              </a>

              <div className="flex items-center justify-center gap-6 text-foreground/60 font-mono text-xs pt-1">
                <a
                  href="https://github.com/abizardholkawala"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Github size={15} /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/abizardholkawala"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/dholkawalaabizar"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Instagram size={15} /> Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

