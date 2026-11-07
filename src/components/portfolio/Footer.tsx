import { Github, Linkedin, Instagram, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/50">
        <p className="font-mono">© {new Date().getFullYear()} Abizar Dholkawala. Crafted with <Heart size={12} className="inline text-pink-400" /> & code.</p>
        <div className="flex items-center gap-5">
          <a href="https://github.com/abizardholkawala" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-foreground transition-colors"><Github size={18} /></a>
          <a href="https://www.linkedin.com/in/abizardholkawala" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-foreground transition-colors"><Linkedin size={18} /></a>
          <a href="https://www.instagram.com/dholkawalaabizar" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-foreground transition-colors"><Instagram size={18} /></a>
          <a href="mailto:contactsabizar@gmail.com" aria-label="Email" className="hover:text-foreground transition-colors font-mono text-xs">contactsabizar@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}