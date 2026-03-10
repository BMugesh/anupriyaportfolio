import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollPin } from "@/hooks/useScrollPin";

const BADGES = [
  { label: "1kW EV Powertrains", color: "#00b4ff" },
  { label: "Bare-Metal C", color: "#e06c1a" },
  { label: "STM32 / HAL", color: "#00b4ff" },
  { label: "Cloud Integration", color: "#00ffcc" },
  { label: "BMS Design", color: "#e06c1a" },
  { label: "UART / IoT", color: "#00ffcc" },
];

// Animated circuit grid background (inline SVG pattern)
function DataStreamBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,180,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glowing horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,180,255,0.4), transparent)" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      {/* Floating neon particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "#e06c1a" : "#00b4ff",
            boxShadow: `0 0 8px ${i % 3 === 0 ? "#e06c1a" : "#00b4ff"}`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useScrollPin(heroRef as React.RefObject<HTMLElement>, cardRef as React.RefObject<HTMLDivElement>);

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight * 1.2, behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#060610" }}
    >
      <DataStreamBg />

      {/* The Glass HUD Card */}
      <motion.div
        ref={cardRef}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-4xl mx-4 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(0,180,255,0.15)",
          boxShadow: "0 0 60px rgba(0,180,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00b4ff]/50 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00b4ff]/50 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#e06c1a]/50 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#e06c1a]/50 rounded-br-2xl" />

        <div className="px-8 py-12 md:px-16 md:py-16 flex flex-col items-center text-center">
          {/* System tag */}
          <motion.div variants={itemVariants} className="font-mono text-xs text-[#00b4ff]/50 tracking-[0.3em] mb-6 uppercase">
            // SYSTEM_INITIALIZED • PORTFOLIO v2.0
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-3 whitespace-nowrap"
            style={{
              fontFamily: "'Syncopate', sans-serif",
              background: "linear-gradient(135deg, #ffffff 40%, rgba(0,180,255,0.8) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
            }}
          >
            ANUPRIYA D.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="font-mono text-sm md:text-base text-[#00b4ff]/70 tracking-widest mb-8 uppercase"
          >
            Embedded Systems &amp; IoT Engineer
          </motion.p>

          {/* Glowing divider */}
          <motion.div
            variants={itemVariants}
            className="w-32 h-px mb-8"
            style={{ background: "linear-gradient(90deg, transparent, #00b4ff, #00ffcc, transparent)" }}
          />

          {/* Tech Badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-10">
            {BADGES.map((badge, i) => (
              <motion.span
                key={badge.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.08, duration: 0.3 }}
                className="font-mono text-xs px-3 py-1.5 rounded-full border cursor-default select-none"
                style={{
                  borderColor: `${badge.color}40`,
                  color: badge.color,
                  background: `${badge.color}08`,
                  boxShadow: `0 0 12px ${badge.color}20`,
                }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: `0 0 20px ${badge.color}50`,
                  borderColor: `${badge.color}80`,
                }}
              >
                [ {badge.label} ]
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Ghost Button */}
          <motion.button
            variants={itemVariants}
            onClick={scrollDown}
            className="group font-mono text-xs tracking-[0.25em] uppercase text-[#00b4ff]/80 px-8 py-4 relative overflow-hidden"
            style={{
              border: "none",
              borderBottom: "2px solid rgba(0,180,255,0.4)",
              background: "transparent",
              cursor: "pointer",
            }}
            whileHover={{ color: "#00ffcc" }}
            data-button
          >
            <span className="relative z-10">&gt; INITIATE_SYSTEM_SCROLL</span>
            {/* Hover underline sweep */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-[#00ffcc]"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
            {/* Blink cursor */}
            <motion.span
              className="inline-block w-2 h-3 bg-[#00b4ff] ml-2 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.7 }}
            />
          </motion.button>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="font-mono text-[10px] tracking-widest text-[#00b4ff]/30">SCROLL</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-[#00b4ff]/30 to-transparent"
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </motion.div>
    </section>
  );
}
