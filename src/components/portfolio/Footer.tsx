import { Github, Linkedin, Instagram, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 text-sm text-foreground/50">
        <div className="font-mono text-center md:text-left flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-1.5">
          <span>© {new Date().getFullYear()} Abizar Dholkawala.</span>
          <span className="inline-flex items-center justify-center">
            <span>Crafted with</span>
            <Heart size={12} className="inline text-pink-400 fill-pink-400/40 mx-2 -translate-y-px" />
            <span>& code.</span>
          </span>
        </div>
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <a
            href="https://github.com/abizardholkawala"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-foreground transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/abizardholkawala"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-foreground transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://www.instagram.com/dholkawalaabizar"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hover:text-foreground transition-colors"
          >
            <Instagram size={18} />
          </a>
          <a
            href="mailto:contactsabizar@gmail.com"
            aria-label="Email"
            className="hover:text-foreground transition-colors font-mono text-xs"
          >
            contactsabizar@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}