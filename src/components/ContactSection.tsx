import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, text, delay]);

  return (
    <span ref={ref}>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
      )}
    </span>
  );
};

const MagneticLink = ({
  href,
  children,
  download,
}: {
  href: string;
  children: React.ReactNode;
  download?: boolean;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        const strength = (100 - dist) / 100;
        setOffset({ x: dx * strength * 0.3, y: dy * strength * 0.3 });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      target={download ? undefined : "_blank"}
      rel="noopener noreferrer"
      download={download}
      className="inline-block text-sm font-mono text-foreground/60 hover:text-primary transition-colors duration-300 border-b border-border hover:border-primary pb-1"
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      data-clickable
    >
      {children}
    </motion.a>
  );
};

const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [buttonText, setButtonText] = useState("[ TRANSMIT ]");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonText("[ TRANSMITTING... ]");
    setTimeout(() => {
      setButtonText("[ TRANSMITTED ]");
      setTimeout(() => setButtonText("[ TRANSMIT ]"), 2000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-32 px-4 md:px-8 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 circuit-grid opacity-30" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          className="mb-4 text-xs font-mono text-muted-foreground tracking-widest"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          {"// SECTION_04"}
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-heading font-bold text-primary mb-16 glow-text-blue"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <TypewriterText text="> INITIATE_CONNECTION" delay={0.3} />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left: Direct Coordinates */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className="text-[10px] font-mono text-primary/60 tracking-widest">
              {"// DIRECT CHANNELS"}
            </div>

            <div className="space-y-6">
              <div>
                <div className="text-[10px] font-mono text-muted-foreground mb-1">EMAIL NODE</div>
                <a
                  href="mailto:anupriya.d2023eee@sece.ac.in"
                  className="text-sm font-mono text-foreground/80 border border-border px-4 py-2 inline-block hover:border-primary hover:text-primary transition-colors duration-300"
                  data-clickable
                >
                  anupriya.d2023eee@sece.ac.in
                </a>
              </div>

              <div>
                <div className="text-[10px] font-mono text-muted-foreground mb-1">COMM LINK</div>
                <p className="text-sm font-mono text-foreground/80">+91 7358152723</p>
              </div>

              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 bg-green-500"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ boxShadow: "0 0 8px hsl(120 100% 40% / 0.6)" }}
                />
                <span className="text-xs font-mono text-foreground/60">
                  SYSTEM ONLINE — Open to Opportunities
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.form
            className="space-y-6"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="text-[10px] font-mono text-primary/60 tracking-widest">
              {"// TRANSMISSION INTERFACE"}
            </div>

            <div>
              <label className="text-[10px] font-mono text-muted-foreground block mb-2">
                {"> IDENTIFICATION_STRING"}
              </label>
              <input
                type="text"
                placeholder="Your Name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-transparent border border-border px-4 py-3 text-sm font-mono text-foreground focus:border-primary focus:outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-muted-foreground block mb-2">
                {"> RETURN_NODE"}
              </label>
              <input
                type="email"
                placeholder="Your Email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-transparent border border-border px-4 py-3 text-sm font-mono text-foreground focus:border-primary focus:outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-muted-foreground block mb-2">
                {"> TRANSMISSION_PAYLOAD"}
              </label>
              <textarea
                placeholder="Your Message"
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full bg-transparent border border-border px-4 py-3 text-sm font-mono text-foreground focus:border-primary focus:outline-none transition-colors duration-300 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full border-2 border-copper px-8 py-3 text-sm font-heading font-bold text-copper tracking-widest hover:bg-copper/10 transition-all duration-300 glow-copper"
              data-clickable
            >
              {buttonText}
            </button>
          </motion.form>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-32 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <MagneticLink href="https://linkedin.com">LinkedIn</MagneticLink>
              <MagneticLink href="https://github.com">GitHub</MagneticLink>
              <MagneticLink href="#" download>[ EXTRACT_DATA.pdf ]</MagneticLink>
            </div>

            <p className="text-xs font-mono text-muted-foreground">
              © 2026 Anupriya D // Engineered with Precision.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
