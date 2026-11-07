import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
  { name: "Kaizar", handle: "@Mustafa Trading Corporation", text: "This is hands down the best thing I've experienced. Highly recommend!", color: "from-amber-400 to-orange-500" },
  { name: "Hussain", handle: "@Honesty Brake Line", text: "I've never seen anything like this before. It's amazing. I love it.", color: "from-cyan-400 to-blue-500" },
  { name: "Juzer", handle: "@United Bearing Centre", text: "I don't know what to say. I'm speechless. This is amazing.", color: "from-yellow-400 to-amber-500" },
  { name: "Mufaddal", handle: "@Videographer", text: "Your sites are fireee!!", color: "from-rose-400 to-pink-500" },
  { name: "Zoe", handle: "@Swiftable", text: "This exceeded all my expectations. Absolutely stunning!", color: "from-emerald-400 to-teal-500" },
  { name: "Dave", handle: "@Bottleify", text: "Simply breathtaking. The best decision I've made in a while.", color: "from-violet-400 to-purple-500" },
  { name: "Emily", handle: "@Swiftable", text: "So glad I found this. It has changed the game for me.", color: "from-fuchsia-400 to-pink-500" },
  { name: "Grace", handle: "@Bottleify", text: "Incredible work! The attention to detail is phenomenal.", color: "from-indigo-400 to-blue-500" },
];

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <div className="w-[300px] shrink-0 glass rounded-2xl p-5 mx-3 border border-border/40 hover:border-foreground/30 hover:glow-neon transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-bold text-white`}>
          {t.name[0]}
        </div>
        <div>
          <div className="font-semibold text-sm">{t.name}</div>
          <div className="text-xs text-foreground/50 font-mono">{t.handle}</div>
        </div>
      </div>
      <p className="text-sm text-foreground/70 leading-relaxed">{t.text}</p>
    </div>
  );
}

function Marquee({ reverse = false }: { reverse?: boolean }) {
  const [paused, setPaused] = useState(false);
  return (
    <div
      className="overflow-hidden py-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex w-max"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} 50s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <Card key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Hear From My <span className="text-gradient">Clients</span>.
        </motion.h2>
      </div>
      <div className="relative space-y-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Marquee />
        <Marquee reverse />
      </div>
    </section>
  );
}
