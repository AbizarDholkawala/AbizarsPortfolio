import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Sparkles,
  Terminal,
  FilePenLine,
  Mic,
  Globe,
  Link2,
  PartyPopper,
  BicepsFlexed,
  type LucideIcon,
} from "lucide-react";

// Custom SVG Fireworks icon for clean celebratory representation
function FireworksIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2v3" />
      <path d="M12 19v3" />
      <path d="M2 12h3" />
      <path d="M19 12h3" />
      <path d="m4.93 4.93 2.12 2.12" />
      <path d="m16.95 16.95 2.12 2.12" />
      <path d="m19.07 4.93-2.12 2.12" />
      <path d="m7.05 16.95-2.12 2.12" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

interface GithubProject {
  title: string;
  desc: string;
  tags: string[];
  href: string;
  icon: LucideIcon | React.ComponentType<{ size?: number; className?: string }>;
}

const githubProjects: GithubProject[] = [
  {
    title: "QuickRead",
    desc: "AI-powered Chrome extension transforming lengthy articles and web pages into instant, concise bullet summaries using AI.",
    tags: ["Chrome Extension", "AI", "JavaScript"],
    href: "https://github.com/AbizarDholkawala/QuickRead",
    icon: FilePenLine, // 1. Pencil writing on a paper Icon
  },
  {
    title: "Banshee",
    desc: "Completely offline, secure high-performance Speech-to-Text toolkit with live microphone transcription and subtitle export powered by faster-whisper.",
    tags: ["Python", "Faster-Whisper", "Speech-to-Text"],
    href: "https://github.com/AbizarDholkawala/Banshee",
    icon: Mic, // 2. Microphone icon
  },
  {
    title: "The Grid",
    desc: "An Interactive intelligence directory cataloguing 1,200+ curated tools across 70+ categories with instant fuzzy search.",
    tags: ["React", "TypeScript", "Resource Library"],
    href: "https://github.com/AbizarDholkawala/The-Grid",
    icon: Globe, // 3. Globe web icon
  },
  {
    title: "Blockchain Projects",
    desc: "Consolidated Mono-repo containing Web3 decentralized applications (dApps) including escrow payment platforms and DAO voting.",
    tags: ["Web3", "Solidity", "dApps"],
    href: "https://github.com/AbizarDholkawala/Blockchain-Projects",
    icon: Link2, // 4. Chain link icon
  },
  {
    title: "Diwali Greeting",
    desc: "Contest-grade interactive 3D digital diya greeting experience featuring gift-box unboxing, fireworks physics, and zero-database URL sharing.",
    tags: ["React", "BG Web Audio", "Canvas FX"],
    href: "https://github.com/AbizarDholkawala/Happy-Diwali",
    icon: FireworksIcon, // 5. Fireworks icon
  },
  {
    title: "WorkoutTracker",
    desc: "A lightweight fitness tracker application for logging daily workouts, tracking personal bests, and maintaining streak progression.",
    tags: ["Fitness", "Workout Streak", "TypeScript"],
    href: "https://github.com/AbizarDholkawala/WorkoutTracker",
    icon: BicepsFlexed, // 6. Muscle bicep icon
  },
];

export default function GithubProjects() {
  return (
    <section id="github-projects" className="relative py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14"
        >
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-3 tracking-wider uppercase">
              <Terminal size={14} /> Open Source & Experiments
            </div>
            <h2 className="text-4xl md:text-6xl font-bold">
              Code & <span className="text-gradient">Projects</span>.
            </h2>
          </div>
          <a
            href="https://github.com/abizardholkawala"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono text-foreground/70 hover:text-foreground transition-colors group"
          >
            <Github size={16} /> View all on GitHub
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* List */}
        <div className="space-y-3.5">
          {githubProjects.map((repo, i) => {
            const IconComponent = repo.icon;
            return (
              <motion.a
                key={`${repo.title}-${i}`}
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                whileHover={{ x: 6 }}
                className="group relative glass rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-foreground/30 hover:glow-neon transition-all block"
              >
                <div className="flex items-start md:items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-foreground/5 border border-border/80 flex items-center justify-center shrink-0 group-hover:border-cyan-400/50 group-hover:text-cyan-400 transition-colors text-foreground/60">
                    <IconComponent size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-cyan-400 transition-colors">
                        {repo.title}
                      </h3>
                    </div>
                    <p className="text-sm text-foreground/60 leading-relaxed max-w-2xl">
                      {repo.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <div className="hidden sm:flex flex-wrap gap-1.5 justify-end">
                    {repo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-foreground/5 border border-border text-[11px] font-mono text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.a>
            );
          })}

          {/* Coming soon banner item (in list format) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: githubProjects.length * 0.05 }}
            className="relative rounded-2xl p-5 md:p-6 overflow-hidden border border-border/60 bg-foreground/[0.02] flex items-center justify-between gap-4 group"
          >
            {/* Ambient gradients */}
            <div
              className="absolute inset-0 opacity-70 animate-pulse pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 30% 50%, oklch(0.7 0.2 280 / 0.18), transparent 70%)",
              }}
            />
            <div
              className="absolute -inset-1 rounded-2xl opacity-40 blur-xl pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 0deg, oklch(0.7 0.2 220 / 0.25), oklch(0.65 0.25 300 / 0.25), oklch(0.7 0.2 220 / 0.25))",
              }}
            />

            <div className="relative z-10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 glow-neon flex items-center justify-center shrink-0 text-white animate-pulse">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-bold text-base md:text-lg text-gradient">
                  Something is brewing in the lab...
                </h3>
                <p className="text-xs md:text-sm text-foreground/60 leading-relaxed">
                  Currently exploring the realm of AI Agents and building something cool. Stay tuned for the next drop!
                </p>
              </div>
            </div>

            <div className="relative z-10 hidden sm:flex items-center">
              <span className="px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs">
                in progress
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

