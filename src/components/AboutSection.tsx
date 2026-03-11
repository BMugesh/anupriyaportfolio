import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = {
  core: {
    title: "THE LOGIC",
    tags: ["Embedded C", "Python", "JAVA", "Data Structures", "Bare-Metal Programming"],
  },
  physical: {
    title: "THE HARDWARE",
    tags: ["STM32 Discovery Board", "ESP8266", "Microcontrollers", "UART Communication"],
  },
  architecture: {
    title: "CLOUD & DATA",
    tags: ["MySQL", "MongoDB", "Firebase", "HTML", "CSS", "JavaScript"],
  },
  arsenal: {
    title: "THE WORKBENCH",
    tags: ["VSCode", "Eclipse IDE", "Proteus", "Arduino IDE", "Blynk", "Git"],
  },
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    // GSAP ScrollTrigger for the Bento Box grid stagger reveal
    const cards = gsap.utils.toArray<HTMLElement>(".bento-card");

    gsap.fromTo(cards,
      { scale: 0.9, opacity: 0, y: 40 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden bg-[#060610]">
      {/* Background Lighting for Glassmorphism Context */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f3ff] rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ffb000] rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(0,180,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <style>{`
        /* Overriding DaisyUI Mockup Code Dots to be Neutral/Monochromatic */
        .mockup-neutral::before {
          box-shadow: 1.4em 0 0 rgba(255,255,255,0.2), 2.8em 0 0 rgba(255,255,255,0.2), 4.2em 0 0 rgba(255,255,255,0.2) !important;
        }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto space-y-16">

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <div className="h-px bg-[#00b4ff]/40 flex-1 max-w-[100px]" />
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#00b4ff] uppercase">
            // DATA_CORE_ACCESS_GRANTED
          </span>
          <div className="h-px bg-[#00b4ff]/40 flex-1" />
        </motion.div>

        {/* PART 1: THE DATA CORE (SPLIT SCREEN) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* Left: The Console */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mockup-code mockup-neutral bg-base-300 border border-white/10 w-full h-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden"
          >
            <pre data-prefix=">"><code className="text-[#00b4ff]/60">INIT_ENGINEER_PROFILE --target "Anupriya D"</code></pre>
            <pre data-prefix=">" className="mt-2 flex items-center gap-2">
              <code className="text-[#00ffcc]">STATUS: ONLINE [EEE @ Sri Eshwar College of Engineering]</code>
              <span className="inline-block w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(0,255,128,0.8)]"></span>
            </pre>
            <pre data-prefix=">" className="text-warning mt-2" style={{ textShadow: "0 0 8px rgba(255,204,0,0.4)" }}><code>SPECIALIZATION: Bare-Metal C, IoT Architecture, EV Powertrains.</code></pre>
            <pre data-prefix=">" className="mt-4"><code className="text-white/40">Loading subroutines...</code></pre>
            <pre data-prefix=">" className="animate-pulse"><code>_</code></pre>
          </motion.div>

          {/* Right: The Narrative Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col justify-center transition-all duration-300 hover:border-info/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-black text-white mb-6 uppercase tracking-tight" style={{ textShadow: "0 0 20px rgba(0,180,255,0.5)" }}>
              I engineer the logic that brings hardware to life.
            </h2>

            <div className="space-y-4 font-mono text-sm md:text-base text-white/70 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                I specialize in the space where physical voltage translates into digital intelligence. From building a 1kW electric vehicle from the ground up to writing the Embedded C that drives precise STM32 microcontrollers, my focus is on full-system integration.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="text-[#00b4ff]/90"
              >
                As the Co-Founder of Anvora, I bridge the gap between engineering constraints and product innovation, building systems that are scalable, efficient, and relentless.
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* PART 2: THE BENTO BOX SKILLS GRID */}
        <div id="skills" ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto pt-10">

          {/* Mod 1: The Logic (spans 2 columns) */}
          <motion.div
            className="bento-card col-span-1 md:col-span-2 h-full bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col justify-center transition-all duration-300 hover:border-info/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]"
          >
            <span className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase mb-4">
              // {skills.core.title}
            </span>
            <div className="flex flex-wrap gap-3 mt-auto">
              {skills.core.tags.map(tag => (
                <span key={tag} className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest text-[#00f3ff] bg-[#00f3ff]/10 border border-[#00f3ff]/30 rounded-full shadow-[0_0_15px_rgba(0,243,255,0.15)]">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Mod 2: The Hardware (spans 1 column) */}
          <motion.div
            className="bento-card col-span-1 h-full bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col justify-center transition-all duration-300 hover:border-info/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]"
          >
            <span className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase mb-4">
              // {skills.physical.title}
            </span>
            <div className="flex flex-wrap gap-3 mt-auto">
              {skills.physical.tags.map(tag => (
                <span key={tag} className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest text-[#00f3ff] bg-[#00f3ff]/10 border border-[#00f3ff]/30 rounded-full shadow-[0_0_15px_rgba(0,243,255,0.15)]">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Mod 3: Cloud & Data (spans 1 column) */}
          <motion.div
            className="bento-card col-span-1 h-full bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col justify-center transition-all duration-300 hover:border-info/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]"
          >
            <span className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase mb-4">
              // {skills.architecture.title}
            </span>
            <div className="flex flex-wrap gap-3 mt-auto">
              {skills.architecture.tags.map(tag => (
                <span key={tag} className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest text-[#00f3ff] bg-[#00f3ff]/10 border border-[#00f3ff]/30 rounded-full shadow-[0_0_15px_rgba(0,243,255,0.15)]">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Mod 4: The Workbench (spans 2 columns) */}
          <motion.div
            className="bento-card col-span-1 md:col-span-2 h-full bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col justify-center transition-all duration-300 hover:border-info/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]"
          >
            <span className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase mb-4">
              // {skills.arsenal.title}
            </span>
            <div className="flex flex-wrap gap-3 mt-auto">
              {skills.arsenal.tags.map(tag => (
                <span key={tag} className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest text-[#00f3ff] bg-[#00f3ff]/10 border border-[#00f3ff]/30 rounded-full shadow-[0_0_15px_rgba(0,243,255,0.15)]">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
