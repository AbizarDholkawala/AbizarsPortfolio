import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { ArrowUpRight, Sparkles, ExternalLink } from "lucide-react";

import portfolioImg from "@/assets/project-portfolio.jpg";
import mtcImg from "@/assets/MTC.png";
import mkChaiImg from "@/assets/mkchai.png";
import smartPptImg from "@/assets/Smartpptbuilder.png";
import unspokenPagesImg from "@/assets/Theunspokenpages.jpg";
import swiftTableImg from "@/assets/SwiftTable.png";
import bottleifyImg from "@/assets/bottleify_waterdrop.png";
import playriftImg from "@/assets/playrift.svg";

// ─── project data ──────────────────────────────────────────────────────────────

interface Project {
  title: string;
  desc: string;
  tags: string[];
  gradient: string;
  image: string;
  href: string;
  previewUrl?: string; // live URL loaded in the preview iframe
  imageRounded?: string; // custom image container roundedness
  imageFit?: "cover" | "contain"; // object-fit style
}

const projects: Project[] = [
  {
    title: "Portfolio Showcase",
    desc: "This very site - an immersive 3D portfolio crafted with React Three Fiber, Framer Motion, and Tailwind. Built for speed, polish, and presence.",
    tags: ["React", "Three.js", "Framer", "Tailwind"],
    gradient: "from-cyan-500/30 to-violet-500/30",
    image: portfolioImg,
    href: "#",
  },
  {
    title: "Mustafa Trading Corporation",
    desc: "A professional landing page for Mustafa Trading Corporation showcasing hydraulics, pneumatics, and industrial supplies with a sleek, conversion-focused design.",
    tags: ["HTML", "CSS", "JavaScript"],
    gradient: "from-sky-500/30 to-teal-500/30",
    image: mtcImg,
    href: "https://mustafa-trading-corporation.web.app/",
    previewUrl: "https://mustafa-trading-corporation.web.app/",
  },
  {
    title: "MK Chai",
    desc: "A rich, organic landing page for MK Chai showcasing premium tea blends, artisanal ingredients, and an elevated daily ritual with fluid motion and modern aesthetics.",
    tags: ["React", "Tailwind", "Lenis"],
    gradient: "from-amber-600/30 to-emerald-500/30",
    image: mkChaiImg,
    href: "https://mk-chai.web.app/",
    previewUrl: "https://mk-chai.web.app/",
    imageRounded: "rounded-xl",
    imageFit: "contain",
  },
  {
    title: "Smart PPT Builder",
    desc: "An AI-powered PowerPoint generator that turns Python code into polished presentations instantly, securely, and for free. Built with React, Firebase, and Hugging Face.",
    tags: ["React", "AI-Powered", "Python"],
    gradient: "from-cyan-400/30 to-pink-500/30",
    image: smartPptImg,
    href: "https://smartpptbuilder.web.app/",
    previewUrl: "https://smartpptbuilder.web.app/",
  },
  {
    title: "SwiftTable",
    desc: "A digital-first platform helping local businesses thrive online with beautiful websites, QR digital menus, and seamless delivery integrations.",
    tags: ["React", "SaaS", "Responsive"],
    gradient: "from-violet-500/30 to-fuchsia-500/30",
    image: swiftTableImg,
    href: "https://swift-table.web.app/",
    previewUrl: "https://swift-table.web.app/",
  },
  {
    title: "Bottleify",
    desc: "A premium branded-water landing page showcasing custom-labeled bottles, eco-friendly packaging, and seamless order inquiries with fluid animations.",
    tags: ["HTML", "CSS", "JavaScript"],
    gradient: "from-blue-500/30 to-cyan-400/30",
    image: bottleifyImg,
    href: "https://bottle-ify.web.app/",
    previewUrl: "https://bottle-ify.web.app/",
    imageFit: "contain",
  },
  {
    title: "Play Rift",
    desc: "A fluid React app that serves as a centralized database for gamers to track upcoming titles, can you run it? functionality, and aggregate availability across major storefronts like Steam, Xbox, and GOG.",
    tags: ["React", "Tailwind", "Framer"],
    gradient: "from-violet-500/30 to-fuchsia-500/30",
    image: playriftImg,
    href: "https://play-rift.web.app/",
    previewUrl: "https://play-rift.web.app/",
  },
  {
    title: "The Unspoken Pages",
    desc: "A platform that transforms short stories from aspiring writers into animated videos and interactive experiences collaborative, revenue-sharing, and writer-first.",
    tags: ["HTML", "CSS", "JavaScript"],
    gradient: "from-amber-500/30 to-rose-500/30",
    image: unspokenPagesImg,
    href: "https://the-unspoken-pages.web.app/",
    previewUrl: "https://the-unspoken-pages.web.app/",
  },
];

// ─── hover preview component (Aceternity-style) ────────────────────────────────

function HoverPreview({
  url,
  isVisible,
  x,
  y,
}: {
  url: string;
  isVisible: boolean;
  x: number;
  y: number;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: x,
            top: y,
            zIndex: 9999,
            pointerEvents: "none",
          }}
          className="hidden md:block"
        >
          {/* Browser chrome */}
          <div className="relative w-[380px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0e0e14]">
            {/* Title-bar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#17171e] border-b border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              <span className="ml-2 flex-1 text-[10px] font-mono text-white/30 truncate">
                {url}
              </span>
            </div>
            {/* Iframe */}
            <div className="relative w-full h-[240px] overflow-hidden">
              <iframe
                src={url}
                title="Preview"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                className="w-[1280px] h-[800px] border-0"
                style={{
                  transform: "scale(0.297)",
                  transformOrigin: "top left",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── single project card ────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLAnchorElement>(null);
  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!project.previewUrl) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const viewportW = window.innerWidth;
        const previewWidth = 384;
        const pad = 24;

        let px = clientX + pad;
        if (px + previewWidth > viewportW) {
          px = clientX - previewWidth - pad;
        }
        let py = clientY - 140;
        if (py < 12) py = 12;
        if (py + 280 > window.innerHeight) py = window.innerHeight - 292;

        setPreviewPos({ x: px, y: py });
      });
    },
    [project.previewUrl],
  );

  return (
    <>
      <motion.a
        ref={cardRef}
        key={project.title}
        href={project.href}
        target={project.href === "#" ? undefined : "_blank"}
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -6 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="group relative glass rounded-3xl p-8 overflow-hidden hover:glow-neon transition-all block"
      >
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />
        <div className="relative">
          {/* Logo + external link */}
          <div className="flex items-start justify-between mb-6">
            {/* Logo with rounded border + glow */}
            <div
              className={`w-12 h-12 ${project.imageRounded ?? "rounded-full"
                } overflow-hidden ring-2 ring-white/10 glow-neon flex-shrink-0 bg-background/50 flex items-center justify-center p-0.5`}
            >
              <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full ${project.imageFit === "contain"
                  ? "object-contain p-1"
                  : "object-cover"
                  } ${project.imageRounded ?? "rounded-full"}`}
              />
            </div>
            <div className="flex items-center gap-2">
              {project.previewUrl && (
                <span className="text-[10px] font-mono text-foreground/30 group-hover:text-foreground/60 transition-colors hidden sm:inline">
                  hover to preview
                </span>
              )}
              <ArrowUpRight className="text-foreground/40 group-hover:text-foreground group-hover:rotate-12 transition-all" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
          <p className="text-foreground/60 text-sm leading-relaxed mb-5">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md bg-foreground/5 text-xs font-mono text-foreground/70"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Mobile: "Visit" button for external projects */}
          {project.previewUrl && (
            <div className="mt-4 flex md:hidden">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                <ExternalLink size={12} /> Visit live site
              </span>
            </div>
          )}
        </div>
      </motion.a>

      {/* Hover preview portal */}
      {project.previewUrl && (
        <HoverPreview
          url={project.previewUrl}
          isVisible={isHovered}
          x={previewPos.x}
          y={previewPos.y}
        />
      )}
    </>
  );
}

// ─── preserved coming soon card component (for reuse anywhere on the site) ─────
export function ComingSoonCard({
  title = "New Sites Underway..",
  desc = "Something new is brewing in the lab. Stay tuned for the next drop.",
}: {
  title?: string;
  desc?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl p-8 overflow-hidden border border-border/60 bg-foreground/[0.02] flex flex-col items-center justify-center text-center min-h-[280px] group"
    >
      <div
        className="absolute inset-0 opacity-70 animate-pulse"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.7 0.2 280 / 0.25), transparent 70%)",
        }}
      />
      <div
        className="absolute -inset-1 rounded-3xl opacity-50 blur-2xl"
        style={{
          background:
            "conic-gradient(from 0deg, oklch(0.7 0.2 220 / 0.4), oklch(0.65 0.25 300 / 0.4), oklch(0.7 0.22 200 / 0.4), oklch(0.7 0.2 220 / 0.4))",
        }}
      />
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 glow-neon flex items-center justify-center mb-5 animate-pulse">
          <Sparkles className="text-white" size={24} />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-gradient">{title}</h3>
        <p className="text-foreground/60 text-sm leading-relaxed max-w-xs">{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── main component ─────────────────────────────────────────────────────────────

export default function Projects() {
  const isOddTotal = projects.length % 2 !== 0;
  const gridProjects = isOddTotal ? projects.slice(0, -1) : projects;
  const lastProject = isOddTotal ? projects[projects.length - 1] : null;

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold">
            Things I've <span className="text-gradient">built</span>.
          </h2>
        </motion.div>

        {/* Main 2-col grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {gridProjects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* Centered orphan card if odd count */}
        {lastProject && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-start-1 md:col-end-3 flex justify-center">
              <div className="w-full md:w-[calc(50%-0.75rem)]">
                <ProjectCard
                  key={lastProject.title}
                  project={lastProject}
                  index={projects.length - 1}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
