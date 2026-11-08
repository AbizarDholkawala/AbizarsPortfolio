import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.jpg";
import { ArrowUpRight } from "lucide-react";

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
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? "py-3 backdrop-blur-xl bg-background/60 border-b border-border"
            : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#home"
            onClick={closeMenu}
            className="flex items-center gap-2.5 font-display font-bold text-lg tracking-tight z-50"
          >
            <img
              src={logo}
              alt="Abizar Dholkawala logo"
              className="w-9 h-9 rounded-full object-cover ring-1 ring-white/15 shadow-[0_0_18px_rgba(34,211,238,0.25)]"
            />
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

      {/* Mobile Drawer with Wavy Fade-in / Fade-out SVG Mask + Slide */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex justify-end">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              onClick={closeMenu}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Menu Panel with Wavy Curve Path */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1], // Smooth cubic ease-out
              }}
              className="relative w-[85%] max-w-sm h-full bg-card/95 border-l border-white/10 shadow-2xl flex flex-col justify-between p-8 pt-28 overflow-hidden"
              style={{
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Ambient neon decorative blobs inside drawer */}
              <div className="absolute top-1/4 -right-20 w-52 h-52 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />
              <div className="absolute bottom-1/4 -left-20 w-52 h-52 rounded-full bg-violet-500/15 blur-[80px] pointer-events-none" />

              {/* Decorative Animated Wavy SVG Edge on Left Border */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0.8 }}
                animate={{ opacity: 0.9, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0.8 }}
                transition={{ duration: 0.45 }}
                className="absolute top-0 bottom-0 -left-6 w-6 pointer-events-none overflow-hidden"
              >
                <svg
                  className="w-full h-full text-card/95"
                  viewBox="0 0 24 800"
                  preserveAspectRatio="none"
                  fill="currentColor"
                >
                  <motion.path
                    initial={{ d: "M24,0 C24,200 24,400 24,600 C24,700 24,750 24,800 L24,800 L24,0 Z" }}
                    animate={{ d: "M24,0 C6,180 -4,320 18,480 C32,600 8,700 24,800 L24,800 L24,0 Z" }}
                    exit={{ d: "M24,0 C24,200 24,400 24,600 C24,700 24,750 24,800 L24,800 L24,0 Z" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                </svg>
              </motion.div>

              {/* Top: Logo & Identity inside menu */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="flex items-center gap-3 pb-8 mb-8 border-b border-white/10"
                >
                  <img
                    src={logo}
                    alt="Abizar Dholkawala"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                  />
                  <div>
                    <h3 className="font-display font-bold text-base text-foreground">
                      Abizar Dholkawala
                    </h3>
                    <p className="font-mono text-xs text-foreground/50">
                      3D & Creative Developer
                    </p>
                  </div>
                </motion.div>

                {/* Navigation Links with Wavy Staggered Slide */}
                <ul className="space-y-4">
                  {links.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 35 + Math.sin(i * 1.3) * 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 25 + Math.sin(i * 1.3) * 15 }}
                      transition={{
                        delay: 0.16 + i * 0.06,
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <a
                        href={link.href}
                        onClick={closeMenu}
                        className="group flex items-center justify-between text-2xl font-display font-semibold text-foreground/80 hover:text-cyan-400 transition-colors py-2"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight
                          size={18}
                          className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-400"
                        />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Bottom: Mobile Let's Talk CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="pt-6 border-t border-white/10"
              >
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 text-background font-semibold text-sm glow-neon shadow-lg active:scale-95 transition-transform"
                >
                  Let's talk →
                </a>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

