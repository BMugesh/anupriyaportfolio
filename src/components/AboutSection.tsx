import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const skills = {
  core: {
    title: "CORE LOGIC",
    languages: ["C", "Embedded C", "Python", "JAVA"],
    concepts: ["Bare-Metal Programming", "Microcontrollers", "DSA", "Embedded Systems"],
  },
  physical: {
    title: "PHYSICAL LAYER",
    hardware: ["STM32 Discovery Board", "ESP8266", "Sensors"],
    comms: ["UART Communication", "IoT Systems", "Wi-Fi", "Bluetooth", "GSM"],
  },
  architecture: {
    title: "ARCHITECTURE",
    databases: ["MySQL", "MongoDB", "Firebase"],
    web: ["HTML", "CSS", "JavaScript", "React"],
  },
  arsenal: {
    title: "THE ARSENAL",
    simulation: ["Proteus", "Blynk", "MATLAB", "Simulink"],
    dev: ["Eclipse IDE", "Arduino IDE", "VSCode", "GitHub", "Git Bash"],
  },
};

const SkillTag = ({ name, delay }: { name: string; delay: number }) => (
  <motion.span
    className="inline-block px-3 py-1 border border-border text-xs font-mono text-foreground/80 hover:border-primary hover:text-primary transition-colors duration-300"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    data-clickable
  >
    {name}
  </motion.span>
);

const TerminalTyping = ({ items }: { items: string[] }) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < items.length) {
      const timer = setTimeout(() => setVisibleCount((c) => c + 1), 200);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, items.length]);

  return (
    <div className="font-mono text-xs space-y-1">
      {items.slice(0, visibleCount).map((item, i) => (
        <div key={i} className="text-foreground/70">
          <span className="text-primary/60">$</span> {item}
        </div>
      ))}
      {visibleCount < items.length && (
        <span className="inline-block w-2 h-4 bg-primary/60 animate-pulse" />
      )}
    </div>
  );
};

const ModuleCard = ({
  title,
  children,
  className = "",
  delay = 0,
  copper = false,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  copper?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={`relative border border-border bg-card p-6 overflow-hidden group hover:border-primary/40 transition-colors duration-500 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {/* Power-on flash */}
      {isInView && (
        <motion.div
          className={`absolute inset-0 ${copper ? "bg-copper/5" : "bg-primary/5"}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        />
      )}

      <div className="text-[10px] font-mono text-muted-foreground mb-4 tracking-widest">
        {"// "}{title}
      </div>
      {children}

      {/* Corner markers */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/30" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/30" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/30" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/30" />
    </motion.div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-4 md:px-8 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 circuit-grid opacity-50" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="mb-4 text-xs font-mono text-muted-foreground tracking-widest"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          {"// SECTION_01"}
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6 glow-text-blue"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          SYSTEM DIAGNOSTICS
        </motion.h2>

        <motion.p
          className="text-sm md:text-base font-mono text-foreground/70 max-w-3xl mb-16 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          I am an Electrical and Electronics Engineer who speaks the language of software.
          My focus lies at the absolute edge of hardware and digital logic—where bare-metal
          programming meets intelligent system architecture.
        </motion.p>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Core Logic - Large */}
          <ModuleCard title={skills.core.title} className="md:col-span-2 md:row-span-2" delay={0.2}>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] font-mono text-primary/60 mb-2">LANGUAGES</div>
                <div className="flex flex-wrap gap-2">
                  {skills.core.languages.map((s, i) => (
                    <SkillTag key={s} name={s} delay={0.4 + i * 0.05} />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-primary/60 mb-2">CORE CONCEPTS</div>
                <div className="flex flex-wrap gap-2">
                  {skills.core.concepts.map((s, i) => (
                    <SkillTag key={s} name={s} delay={0.6 + i * 0.05} />
                  ))}
                </div>
              </div>
            </div>
          </ModuleCard>

          {/* Physical Layer - Wide */}
          <ModuleCard title={skills.physical.title} className="md:col-span-2" delay={0.4}>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] font-mono text-primary/60 mb-2">HARDWARE</div>
                <div className="flex flex-wrap gap-2">
                  {skills.physical.hardware.map((s, i) => (
                    <SkillTag key={s} name={s} delay={0.6 + i * 0.05} />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-primary/60 mb-2">IoT & COMMS</div>
                <div className="flex flex-wrap gap-2">
                  {skills.physical.comms.map((s, i) => (
                    <SkillTag key={s} name={s} delay={0.7 + i * 0.05} />
                  ))}
                </div>
              </div>
            </div>
          </ModuleCard>

          {/* Architecture */}
          <ModuleCard title={skills.architecture.title} className="md:col-span-2" delay={0.6}>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] font-mono text-primary/60 mb-2">DATABASES</div>
                <div className="flex flex-wrap gap-2">
                  {skills.architecture.databases.map((s, i) => (
                    <SkillTag key={s} name={s} delay={0.8 + i * 0.05} />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-primary/60 mb-2">WEB</div>
                <div className="flex flex-wrap gap-2">
                  {skills.architecture.web.map((s, i) => (
                    <SkillTag key={s} name={s} delay={0.9 + i * 0.05} />
                  ))}
                </div>
              </div>
            </div>
          </ModuleCard>

          {/* Arsenal - Terminal style */}
          <ModuleCard title={skills.arsenal.title} className="md:col-span-2" delay={0.8}>
            {isInView && (
              <TerminalTyping items={[...skills.arsenal.simulation, ...skills.arsenal.dev]} />
            )}
          </ModuleCard>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
