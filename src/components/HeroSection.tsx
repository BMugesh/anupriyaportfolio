import { motion } from "framer-motion";
import { useEffect, useState, lazy, Suspense } from "react";

const HeroScene3D = lazy(() => import("./HeroScene3D"));

const HeroSection = () => {
  const [showScene, setShowScene] = useState(false);
  const [showText, setShowText] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setShowScene(true), 200);
    setTimeout(() => setShowText(true), 4000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / window.innerHeight;
      setScrollProgress(Math.min(progress, 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Circuit grid background */}
      <div className="absolute inset-0 circuit-grid" />

      {/* 3D Scene */}
      {showScene && (
        <Suspense fallback={null}>
          <div className="absolute inset-0">
            <HeroScene3D scrollProgress={scrollProgress} />
          </div>
        </Suspense>
      )}

      {/* Scan line */}
      <div className="absolute inset-0 scan-line pointer-events-none" />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />

      {/* Hero content */}
      {showText && (
        <div className="relative z-10 text-center px-4">
          <motion.div
            className="mb-4 text-xs sm:text-sm font-mono tracking-widest text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {"// SYSTEM INITIALIZED"}
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-primary mb-4 sm:mb-6 glow-text-blue glitch-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ANUPRIYA D
          </motion.h1>

          <motion.div
            className="h-px w-32 sm:w-48 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mb-4 sm:mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />

          <motion.p
            className="text-xs sm:text-base md:text-lg font-mono text-foreground/80 max-w-2xl mx-auto tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            BRIDGING HARDWARE & CODE | EMBEDDED SYSTEMS & IoT
          </motion.p>

          <motion.div
            className="mt-8 sm:mt-12 flex items-center justify-center gap-2 text-muted-foreground text-xs font-mono"
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
