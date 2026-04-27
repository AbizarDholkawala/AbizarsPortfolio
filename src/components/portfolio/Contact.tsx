import { motion } from "framer-motion";
import { useState, useRef, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

// ─── helpers ──────────────────────────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isValidEmail(value: string) {
  return EMAIL_REGEX.test(value.trim());
}

// ─── component ────────────────────────────────────────────────────────────────
export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string>("");
  const [captchaError, setCaptchaError] = useState<string>("");

  const formRef = useRef<HTMLFormElement>(null);
  // Turnstile exposes a reset method via its ref
  const turnstileRef = useRef<TurnstileInstance>(null);

  // ── email field live validation ────────────────────────────────────────────
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && !isValidEmail(e.target.value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  // ── form submit ────────────────────────────────────────────────────────────
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 1. Validate email
    const emailVal =
      (formRef.current?.elements.namedItem("reply_to") as HTMLInputElement)
        ?.value ?? "";
    if (!isValidEmail(emailVal)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // 2. Require completed Turnstile
    if (!captchaToken) {
      setCaptchaError("Please complete the security check before sending.");
      return;
    }
    setCaptchaError("");
    setStatus("sending");

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Demo / dev mode — no env vars set
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      await new Promise((r) => setTimeout(r, 900));
      setStatus("sent");
      formRef.current?.reset();
      turnstileRef.current?.reset();
      setCaptchaToken(null);
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY);
      setStatus("sent");
      formRef.current?.reset();
      turnstileRef.current?.reset();
      setCaptchaToken(null);
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      // Force re-solve on next attempt
      turnstileRef.current?.reset();
      setCaptchaToken(null);
    }
  };

  const SITE_KEY =
    import.meta.env.VITE_TURNSTILE_SITE_KEY ??
    "1x00000000000000000000AA"; // Cloudflare's official always-passes test key

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-mono text-xs text-cyan-400 mb-3"></p>
          <h2 className="text-4xl md:text-6xl font-bold">
            Let's build something{" "}
            <span className="text-gradient">unforgettable</span>.
          </h2>
          <p className="mt-5 text-foreground/60 max-w-xl mx-auto">
            Have an idea, project, or just want to say hi? My inbox is always
            open.
          </p>
        </motion.div>

        <motion.form
          ref={formRef}
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 glass rounded-3xl p-8 md:p-10 space-y-5"
        >
          {/* Name + Email row */}
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Name" name="from_name" type="text" placeholder="Your name" />

            {/* Email with live validation */}
            <div>
              <label className="block text-xs font-mono text-foreground/60 mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                name="reply_to"
                required
                placeholder="you@email.com"
                onChange={handleEmailChange}
                className={`w-full px-4 py-3 rounded-xl bg-foreground/5 border outline-none transition-all ${
                  emailError
                    ? "border-red-400/70 focus:border-red-400"
                    : "border-white/5 focus:border-cyan-400/50 focus:bg-foreground/10"
                }`}
              />
              {emailError && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle size={13} />
                  {emailError}
                </p>
              )}
            </div>
          </div>

          <Field label="Subject" name="subject" type="text" placeholder="What's this about?" />

          <div>
            <label className="block text-xs font-mono text-foreground/60 mb-2 uppercase tracking-wider">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell me about your project..."
              className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-white/5 focus:border-cyan-400/50 focus:bg-foreground/10 outline-none transition-all resize-none"
            />
          </div>

          {/* ── Cloudflare Turnstile ───────────────────────────────────────── */}
          <div className="flex flex-col items-center gap-1.5">
            <Turnstile
              ref={turnstileRef}
              siteKey={SITE_KEY}
              options={{ theme: "dark", size: "normal" }}
              onSuccess={(token) => {
                setCaptchaToken(token);
                setCaptchaError("");
              }}
              onExpire={() => {
                setCaptchaToken(null);
                setCaptchaError("Security check expired — please redo it.");
              }}
              onError={() => {
                setCaptchaToken(null);
                setCaptchaError("Security check failed. Please try again.");
              }}
            />
            {captchaError && (
              <p className="flex items-center gap-1.5 text-xs text-red-400">
                <AlertCircle size={13} />
                {captchaError}
              </p>
            )}
          </div>

          {/* ── Submit ────────────────────────────────────────────────────── */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={status === "sending" || !!emailError}
              className="w-full md:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 text-background font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform glow-neon disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            >
              {status === "sent" ? (
                <>
                  <CheckCircle2 size={18} /> Message sent!
                </>
              ) : status === "sending" ? (
                <>Sending...</>
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </button>
          </div>

          {status === "error" && (
            <p className="flex items-center gap-1.5 text-sm text-red-400">
              <AlertCircle size={15} />
              Something went wrong. Try again or email me directly.
            </p>
          )}
        </motion.form>

        <div className="mt-12 flex items-center justify-center gap-2 text-foreground/50">
          <a
            href="mailto:contactsabizar@gmail.com"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Mail size={16} />{" "}
            <span className="font-mono text-sm">Contactsabizar@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── generic input field ──────────────────────────────────────────────────────
function Field({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-xs font-mono text-foreground/60 mb-2 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-white/5 focus:border-cyan-400/50 focus:bg-foreground/10 outline-none transition-all"
      />
    </div>
  );
}
