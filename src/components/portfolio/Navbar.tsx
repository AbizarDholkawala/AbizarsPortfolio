import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.jpg";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 backdrop-blur-xl bg-background/60 border-b border-border" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 font-display font-bold text-lg tracking-tight">
          <img src={logo} alt="Abizar Dholkawala logo" className="w-9 h-9 rounded-full object-cover ring-1 ring-white/15 shadow-[0_0_18px_rgba(34,211,238,0.25)]" />
          
        </a>
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
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass hover:glow-neon transition-all"
          >
            Let's talk →
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
