import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    type: "experience",
    copper: false,
    title: "EMBEDDED SYSTEMS & IoT INTERN",
    org: "VEI Technologies Pvt. Ltd., Chennai",
    date: "July 2025",
    points: [
      "Engineered and programmed STM32 and ESP8266 hardware architectures using Embedded C/C++ and HAL libraries for IoT applications.",
      "Integrated wireless modules (Wi-Fi, Bluetooth, GSM) with cloud data platforms including Thingspeak, Firebase, and Blynk.",
      "Developed and deployed full-scale home automation systems featuring custom sensor interfacing and real-time mobile monitoring.",
    ],
  },
];

const achievements = [
  {
    copper: true,
    title: "CO-FOUNDER | ANVORA",
    description:
      "Spearheaded the technical vision and foundational architecture for Anvora. Bridged the gap between hardware engineering and product development, demonstrating entrepreneurial leadership and the ability to drive a concept from ideation to execution.",
  },
  {
    copper: false,
    title: "SMART INDIA HACKATHON 2025",
    description:
      "Selected among the Top 50 teams at the college level, recognized for innovative problem-solving and rigorous teamwork under pressure.",
  },
  {
    copper: false,
    title: "1ST PRIZE — MINI PROJECT EXPO",
    description:
      "Secured first place for the custom-built Battery Management System (BMS), earning recognition for presentation excellence and hardware-software integration.",
  },
  {
    copper: false,
    title: "INTERNATIONAL SPEAKING CONTEST 2024",
    description:
      "Participated as an active member of Toastmasters, proving an elite ability to communicate complex, technical ideas clearly to a global audience.",
  },
];

const certifications = [
  "NPTEL — Microcontroller And Microprocessor (2025)",
  "NPTEL — Industry 4.0 and Introduction to IOT (2025)",
  "MATLAB Onramp Certification (2024)",
  "Simulink Onramp Certification (2024)",
];

const TimelineNode = ({
  copper = false,
  children,
  delay = 0,
}: {
  copper?: boolean;
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 pb-12 border-l border-border last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {/* Node dot */}
      <motion.div
        className={`absolute -left-[5px] top-1 w-[10px] h-[10px] ${
          copper ? "bg-copper" : "bg-primary"
        }`}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: [0, 1.5, 1] } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        style={{
          boxShadow: copper
            ? "0 0 12px hsl(40 100% 50% / 0.6)"
            : "0 0 12px hsl(184 100% 50% / 0.4)",
        }}
      />
      {children}
    </motion.div>
  );
};

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-4 md:px-8 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 circuit-grid opacity-30" />

      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20"
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        />
      ))}

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          className="mb-4 text-xs font-mono text-muted-foreground tracking-widest"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          {"// SECTION_03"}
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-heading font-bold text-primary mb-16 glow-text-blue"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          EXPERIENCE & ACHIEVEMENTS
        </motion.h2>

        {/* Experience */}
        <div className="mb-16">
          <div className="text-[10px] font-mono text-primary/60 tracking-widest mb-8">
            {"// INDUSTRY APPLICATION"}
          </div>
          {experiences.map((exp, i) => (
            <TimelineNode key={i} delay={0.2}>
              <h3 className="text-lg font-heading font-bold text-foreground mb-1">{exp.title}</h3>
              <p className="text-xs font-mono text-muted-foreground mb-4">
                {exp.org} — {exp.date}
              </p>
              <ul className="space-y-2">
                {exp.points.map((point, j) => (
                  <li key={j} className="text-sm font-mono text-foreground/70 leading-relaxed pl-4 border-l border-border">
                    {point}
                  </li>
                ))}
              </ul>
            </TimelineNode>
          ))}
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <div className="text-[10px] font-mono text-primary/60 tracking-widest mb-8">
            {"// PROOF OF EXCELLENCE"}
          </div>
          {achievements.map((ach, i) => (
            <TimelineNode key={i} copper={ach.copper} delay={0.1 * i}>
              <h3
                className={`text-lg font-heading font-bold mb-2 ${
                  ach.copper ? "text-copper glow-text-copper" : "text-foreground"
                }`}
              >
                {ach.title}
              </h3>
              <p className="text-sm font-mono text-foreground/70 leading-relaxed">
                {ach.description}
              </p>
            </TimelineNode>
          ))}
        </div>

        {/* Certifications */}
        <div>
          <div className="text-[10px] font-mono text-primary/60 tracking-widest mb-8">
            {"// VERIFIED MODULES"}
          </div>
          {certifications.map((cert, i) => (
            <TimelineNode key={i} delay={0.1 * i}>
              <p className="text-sm font-mono text-foreground/70">{cert}</p>
            </TimelineNode>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
