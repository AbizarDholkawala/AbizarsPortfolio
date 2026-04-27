import { motion } from "framer-motion";
import Scene3D from "./Scene3D";
import { ArrowDown, Github, Linkedin, Instagram } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      <div className="absolute inset-0">
        <Scene3D />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-20 grid md:grid-cols-2 gap-10 items-center min-h-screen pointer-events-none">
        <div className="pointer-events-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold leading-[0.95] mx-0 px-0 py-0 border-0 text-left"
          >
            Hey, I'm{" "}
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, oklch(0.82 0.18 80), oklch(0.72 0.22 25), oklch(0.68 0.25 350))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Abizar
            </span>
            <br />
            <span className="text-foreground/60">Dholkawala.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 max-w-md text-lg text-foreground/70 leading-relaxed"
          >
            Full-stack developer crafting immersive web experiences with{" "}
            <span className="font-mono text-cyan-400">3D</span>, motion, and obsessive attention to detail.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 text-background font-medium hover:scale-105 transition-transform glow-neon"
            >
              View Work
            </a>
            <a href="#contact" className="px-6 py-3 rounded-full glass font-medium hover:bg-white/5 transition-colors">
              Get in touch
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 flex items-center gap-5 text-foreground/50"
          >
            <a
              href="https://github.com/abizardholkawala"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-foreground transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/abizardholkawala"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-foreground transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.instagram.com/dholkawalaabizar"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-foreground transition-colors"
            >
              <Instagram size={20} />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-foreground/40 text-xs font-mono"
      >
        <span>SCROLL</span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
