import { motion } from "framer-motion";
import { Copy, Check, Code2 } from "lucide-react";
import { useState } from "react";
import Globe from "./Globe";

const techStack = [
  "React",
  "TypeScript",
  "Three.js",
  "Next.js",
  "Node",
  "Tailwind",
  "Framer",
  "WebGL",
  "GraphQL",
  "Postgres",
  "Vite",
  "Docker",
  "Prisma",
  "GLSL",
];

const codeSnippet = `class Developer {
  name = "Abizar";
  stack = ["React", "Three.js"];
  passion = "immersive web";

  build() {
    return this.stack
      .map(s => craft(s))
      .reduce(ship);
  }
}`;

export default function About() {
  const [copied, setCopied] = useState(false);
  const email = "contactsabizar@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { }
  };

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold">
            About <span className="text-gradient">Me</span>.
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-5 auto-rows-fr">
          {/* Big intro / code card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 md:row-span-1 glass rounded-3xl p-8 relative overflow-hidden group"
          >
            <div className="absolute top-6 right-6 w-72 max-w-[55%] rounded-xl bg-foreground/5 border border-border p-4 font-mono text-[11px] leading-relaxed text-foreground/70 shadow-2xl rotate-3 hidden md:block">
              <div className="flex gap-1.5 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <pre className="text-cyan-400/90 whitespace-pre-wrap">
                <code>{codeSnippet}</code>
              </pre>
            </div>
            <div className="relative z-10 max-w-md">
              <Code2 className="text-primary mb-4" size={28} />
              <h3 className="text-2xl font-bold mb-3">Hi, I'm Abizar Dholkawala</h3>
              <p className="text-foreground/70 leading-relaxed">
                3+ years of sharpening the digital edge. I build dynamic, performant software with a focus on immersive
                UX and technical logic. Driven by high-energy innovation and a preference for tech that lasts.
              </p>
            </div>
          </motion.div>

          {/* Tech stack card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-1 md:row-span-1 glass rounded-3xl p-6 relative overflow-hidden"
          >
            <h3 className="text-lg font-bold mb-2">Tech Stack</h3>
            <p className="text-xs text-foreground/60 mb-4">
              I specialize in a variety of languages, frameworks, and tools that allow me to build robust and scalable
              applications.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-foreground/5 border border-border text-[10px] font-mono text-foreground/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Email CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-1 rounded-3xl p-8 relative overflow-hidden flex flex-col items-center justify-center text-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 285) 0%, oklch(0.45 0.25 305) 50%, oklch(0.6 0.2 250) 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{ background: "radial-gradient(circle at 30% 20%, oklch(0.95 0.15 200 / 0.4), transparent 60%)" }}
            />
            <h3 className="relative text-xl md:text-2xl font-bold text-white mb-5 leading-snug">
              Do you want to start a project together?
            </h3>
            <button
              onClick={copyEmail}
              className="relative inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/80 hover:bg-black text-white text-sm font-medium transition-all hover:scale-105"
            >
              {copied ? (
                <>
                  <Check size={16} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={16} /> Copy Email Address
                </>
              )}
            </button>
          </motion.div>

          {/* Time zone / globe card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 glass rounded-3xl p-8 relative overflow-hidden min-h-[280px] flex flex-col justify-center"
          >
            <div className="relative z-10 max-w-xs">
              <h3 className="text-2xl font-bold mb-2">Time Zone</h3>
              <p className="text-foreground/70 leading-relaxed">
                I'm based in <span className="text-gradient font-semibold">India</span>, and open to remote work
                worldwide.
              </p>
              <p className="mt-3 font-mono text-xs text-foreground/50"></p>
            </div>
            <div className="absolute -right-10 -bottom-10 w-[340px] h-[340px] md:w-[400px] md:h-[400px] pointer-events-none">
              <Globe />
            </div>
          </motion.div>
        </div>

        {/* Tech stack marquee */}
        <div className="mt-24 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div
            className="flex w-max gap-12 md:gap-16 py-3"
            style={{ animation: "marquee 20s linear infinite" }}
          >
            {[...techStack, ...techStack].map((m, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl font-display font-bold text-foreground/15 hover:text-gradient transition-colors whitespace-nowrap"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
