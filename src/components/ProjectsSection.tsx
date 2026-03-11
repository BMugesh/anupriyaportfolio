import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const projects = [
  {
    id: "01",
    title: "1kW ELECTRIC VEHICLE",
    subtitle: "EBDC",
    objective:
      "To engineer and build a complete, high-performance 1kW electric bike from scratch for the Alpha category at South India's largest e-bike event.",
    engineering:
      "Focused heavily on system-level innovation, encompassing custom battery management, precision motor control, and overall performance optimization. Evaluated the complete business feasibility and cost-efficiency of the prototype.",
    impact:
      "Delivered a fully operational EV, demonstrating hands-on expertise in high-voltage systems, mechanical-electrical integration, and cross-functional teamwork.",
    tags: ["Motor Control", "Battery Systems", "High-Voltage", "EV Architecture"],
  },
  {
    id: "02",
    title: "INTELLIGENT BMS",
    subtitle: "BATTERY MANAGEMENT SYSTEM",
    objective:
      "To solve the critical challenge of real-time battery degradation and safety by developing a fully integrated hardware-software monitoring solution.",
    engineering:
      "Engineered a localized hardware unit using ESP8266 and UART communication to continuously track micro-fluctuations in voltage, current, and temperature. Bridged the hardware to the cloud using Firebase, pushing real-time analytics to a custom React-based web dashboard.",
    impact:
      "Secured 1st Place at the college-level Mini Project Expo, recognized specifically for presentation excellence, teamwork, and robust system architecture.",
    tags: ["ESP8266", "UART", "Firebase", "React", "Real-Time Monitoring"],
  },
  {
    id: "03",
    title: "IoT WASTE MANAGEMENT",
    subtitle: "SMART ECOSYSTEM",
    objective:
      "To modernize municipal waste tracking by building an interconnected network of smart bins capable of real-time capacity monitoring.",
    engineering:
      "Integrated hardware sensors with IoT modules to transmit live garbage levels. Developed the entire front-end user platform using HTML, CSS, and JavaScript to visualize the data and provide actionable environmental insights.",
    impact:
      "Created a scalable proof-of-concept that optimizes waste collection routes and actively promotes community volunteering and eco-friendly practices through its digital platform.",
    tags: ["IoT Sensors", "Cloud Integration", "Web Dashboard", "Environmental Tech"],
  },
];

const ProjectBlade = ({ project, index }: { project: typeof projects[0]; index: number }) => (
  <div className="relative min-w-[100vw] md:min-w-[100vw] h-full flex items-center justify-center px-4 sm:px-8 md:px-16">
    <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
      {/* Left: Project info */}
      <div className="space-y-4 sm:space-y-8">
        <div>
          <div className="text-[10px] sm:text-xs font-mono text-muted-foreground tracking-widest mb-2">
            {"// CASE_STUDY_"}{project.id}
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary glow-text-blue">
            {project.title}
          </h3>
          <p className="text-[10px] sm:text-xs font-mono text-muted-foreground mt-1">{project.subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 sm:px-3 py-0.5 sm:py-1 border border-primary/20 text-[8px] sm:text-[10px] font-mono text-primary/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right: Case study breakdown */}
      <div className="space-y-4 sm:space-y-6">
        {[
          { label: "THE OBJECTIVE", text: project.objective },
          { label: "THE ENGINEERING", text: project.engineering },
          { label: "THE IMPACT", text: project.impact },
        ].map((section) => (
          <div key={section.label} className="border-l-2 border-primary/20 pl-3 sm:pl-4">
            <div className="text-[9px] sm:text-[10px] font-mono text-primary/60 tracking-widest mb-1 sm:mb-2">
              {section.label}
            </div>
            <p className="text-xs sm:text-sm font-mono text-foreground/70 leading-relaxed">
              {section.text}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Background project number */}
    <div className="absolute right-4 sm:right-8 bottom-4 sm:bottom-8 text-[100px] sm:text-[200px] font-heading font-bold text-primary/[0.03] leading-none select-none pointer-events-none">
      {project.id}
    </div>
  </div>
);

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !scrollRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const sectionHeight = containerRef.current.offsetHeight - windowH;

      if (rect.top <= 0 && rect.bottom >= windowH) {
        const progress = Math.abs(rect.top) / sectionHeight;
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalSlides = projects.length;
  const translateX = -(scrollProgress * (totalSlides - 1) * 100);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative"
      style={{ height: `${totalSlides * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 circuit-grid opacity-30" />

        <motion.div
          className="mb-4 text-xs font-mono text-muted-foreground tracking-widest absolute top-8 left-8 z-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          {"// SECTION_02 — CORE PROJECTS"}
        </motion.div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-px bg-border z-10">
          <motion.div
            className="h-full bg-primary"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Project indicators */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={`w-1 h-8 transition-colors duration-300 ${scrollProgress >= i / totalSlides && scrollProgress < (i + 1) / totalSlides
                ? "bg-primary glow-blue"
                : "bg-border"
                }`}
            />
          ))}
        </div>

        <div
          ref={scrollRef}
          className="flex h-full transition-transform duration-100 ease-out"
          style={{ transform: `translateX(${translateX}vw)` }}
        >
          {projects.map((project, index) => (
            <ProjectBlade key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
