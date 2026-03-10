import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CircuitTrace = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute h-px bg-gradient-to-r from-transparent via-neon to-transparent"
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: [0, 1, 1, 0.3] }}
    transition={{ duration: 2, delay, ease: "easeOut" }}
    style={{
      width: `${Math.random() * 200 + 100}px`,
      left: `${Math.random() * 80}%`,
      top: `${Math.random() * 80 + 10}%`,
      transformOrigin: "left",
    }}
  />
);

const VerticalTrace = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-px bg-gradient-to-b from-transparent via-neon to-transparent"
    initial={{ scaleY: 0, opacity: 0 }}
    animate={{ scaleY: 1, opacity: [0, 1, 1, 0.3] }}
    transition={{ duration: 1.5, delay, ease: "easeOut" }}
    style={{
      height: `${Math.random() * 150 + 50}px`,
      left: `${Math.random() * 90}%`,
      top: `${Math.random() * 70}%`,
      transformOrigin: "top",
    }}
  />
);

const CircuitNode = ({ delay = 0, copper = false }: { delay?: number; copper?: boolean }) => (
  <motion.div
    className={`absolute w-2 h-2 ${copper ? "bg-copper" : "bg-neon"}`}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.6] }}
    transition={{ duration: 0.8, delay }}
    style={{
      left: `${Math.random() * 85 + 5}%`,
      top: `${Math.random() * 80 + 10}%`,
      boxShadow: copper
        ? "0 0 10px hsl(40 100% 50% / 0.6)"
        : "0 0 10px hsl(184 100% 50% / 0.6)",
    }}
  />
);

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 300);
    setTimeout(() => setShowText(true), 1800);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Circuit board background */}
      <div className="absolute inset-0 circuit-grid" />

      {/* Scan line */}
      {loaded && <div className="absolute inset-0 scan-line pointer-events-none" />}

      {/* Traces */}
      {loaded && (
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <CircuitTrace key={`h-${i}`} delay={0.3 + i * 0.15} />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <VerticalTrace key={`v-${i}`} delay={0.5 + i * 0.2} />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <CircuitNode key={`n-${i}`} delay={1 + i * 0.1} copper={i % 4 === 0} />
          ))}
        </div>
      )}

      {/* Central "chip" */}
      <motion.div
        className="absolute w-32 h-32 border border-border"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={loaded ? { opacity: [0, 0.4, 0.2], scale: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          className="absolute inset-2 border border-neon/20"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute inset-4 bg-neon/5"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: [0, 1, 0.5] } : {}}
          transition={{ delay: 1.2, duration: 1 }}
        />
      </motion.div>

      {/* Hero content */}
      {showText && (
        <div className="relative z-10 text-center px-4">
          <motion.div
            className="mb-4 text-sm font-mono tracking-widest text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {"// SYSTEM INITIALIZED"}
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-primary mb-6 glow-text-blue"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ animation: "glitch 3s infinite 4s" }}
          >
            ANUPRIYA D
          </motion.h1>

          <motion.div
            className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />

          <motion.p
            className="text-base md:text-lg font-mono text-foreground/80 max-w-2xl mx-auto tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            BRIDGING HARDWARE & CODE | EMBEDDED SYSTEMS & IoT
          </motion.p>

          <motion.div
            className="mt-12 flex items-center justify-center gap-2 text-muted-foreground text-xs font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0.5, 1] }}
            transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <span className="w-2 h-2 bg-primary/50 animate-pulse" />
            SCROLL TO NAVIGATE
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
