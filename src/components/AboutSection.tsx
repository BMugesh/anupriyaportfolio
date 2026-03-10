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
    <section ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden bg-[#060610]">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,180,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.2) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative max-w-6xl mx-auto space-y-16">

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
            className="mockup-code bg-[#020205] border border-[#00b4ff]/20 text-sm font-mono shadow-[0_0_30px_rgba(0,180,255,0.05)] w-full"
          >
            <pre data-prefix=">"><code className="text-[#00b4ff]/60">INIT_ENGINEER_PROFILE --target "Anupriya D"</code></pre>
            <pre data-prefix=">" className="text-[#00ffcc] mt-2"><code>STATUS: ONLINE [EEE @ Sri Eshwar College of Engineering]</code></pre>
            <pre data-prefix=">" className="text-warning mt-2"><code>SPECIALIZATION: Bare-Metal C, IoT Architecture, EV Powertrains.</code></pre>
            <pre data-prefix=">" className="mt-4"><code className="text-white/40">Loading subroutines...</code></pre>
            <pre data-prefix=">" className="animate-pulse"><code>_</code></pre>
          </motion.div>

          {/* Right: The Narrative Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card glass border border-[#00b4ff]/10 backdrop-blur-xl bg-white/[0.02]"
          >
            <div className="card-body p-8 md:p-10">
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
            </div>
          </motion.div>
        </div>

        {/* PART 2: THE BENTO BOX SKILLS GRID */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 pt-10">

          {/* Mod 1: The Logic (Large Block) */}
          <motion.div
            className="bento-card card glass border border-[#00b4ff]/20 bg-[#00b4ff]/[0.02] md:col-span-2 md:row-span-2 shadow-[inset_0_0_40px_rgba(0,180,255,0.02)]"
            whileHover={{ scale: 1.02, boxShadow: "0px 0px 25px rgba(0, 180, 255, 0.15)", borderColor: "rgba(0,180,255,0.4)" }}
          >
            <div className="card-body p-6 md:p-8">
              <span className="font-mono text-[10px] text-[#00b4ff]/60 tracking-[0.2em] mb-4 uppercase">
                // {skills.core.title}
              </span>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {skills.core.tags.map(tag => (
                  <span key={tag} className="badge badge-info badge-outline border-[#00b4ff]/50 bg-[#00b4ff]/5 font-mono text-[#00b4ff] py-3 px-4 shadow-[0_0_10px_rgba(0,180,255,0.1)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mod 2: The Hardware (Wide Block) */}
          <motion.div
            className="bento-card card glass border border-[#e06c1a]/20 bg-[#e06c1a]/[0.02] md:col-span-2 shadow-[inset_0_0_40px_rgba(224,108,26,0.02)]"
            whileHover={{ scale: 1.02, boxShadow: "0px 0px 25px rgba(224, 108, 26, 0.15)", borderColor: "rgba(224,108,26,0.4)" }}
          >
            <div className="card-body p-6">
              <span className="font-mono text-[10px] text-[#e06c1a]/60 tracking-[0.2em] mb-4 uppercase">
                // {skills.physical.title}
              </span>
              <div className="flex flex-wrap gap-2">
                {skills.physical.tags.map(tag => (
                  <span key={tag} className="badge border-[#e06c1a]/40 bg-[#e06c1a]/5 text-[#e06c1a] font-mono whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mod 3: Cloud & Data (Square Block) */}
          <motion.div
            className="bento-card card glass border border-white/10 bg-white/[0.02] md:col-span-1 shadow-[inset_0_0_40px_rgba(255,255,255,0.01)]"
            whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.08)", borderColor: "rgba(255,255,255,0.3)" }}
          >
            <div className="card-body p-6">
              <span className="font-mono text-[10px] text-white/40 tracking-[0.2em] mb-4 uppercase">
                // {skills.architecture.title}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skills.architecture.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono text-white/60 border border-white/10 px-2 py-1 bg-black/20 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mod 4: The Workbench (Square Block) */}
          <motion.div
            className="bento-card card glass border border-[#00ffcc]/20 bg-[#00ffcc]/[0.02] md:col-span-1 shadow-[inset_0_0_40px_rgba(0,255,204,0.02)]"
            whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(0, 255, 204, 0.15)", borderColor: "rgba(0,255,204,0.4)" }}
          >
            <div className="card-body p-6">
              <span className="font-mono text-[10px] text-[#00ffcc]/60 tracking-[0.2em] mb-4 uppercase">
                // {skills.arsenal.title}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skills.arsenal.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono text-[#00ffcc]/80 border border-[#00ffcc]/20 px-2 py-1 bg-[#00ffcc]/5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
