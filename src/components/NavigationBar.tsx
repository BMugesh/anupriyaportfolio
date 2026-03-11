"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const NAV_ITEMS = [
    { name: "// 01. ABOUT", id: "about" },
    { name: "// 02. SKILLS", id: "skills" },
    { name: "// 03. ARCHIVE", id: "projects" },
];

const MagneticLink = ({ children, isActive, onClick }: { children: React.ReactNode; isActive: boolean; onClick: () => void }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={ref}
            onPointerMove={handleMouse}
            onPointerLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onClick={onClick}
            className={`relative px-4 py-2 font-mono text-xs sm:text-sm tracking-widest transition-colors ${isActive ? "text-[#00b4ff]" : "text-white/60 hover:text-white"
                }`}
        >
            {children}
            {isActive && (
                <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00b4ff]"
                    style={{ boxShadow: "0 0 10px rgba(0, 180, 255, 0.8)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
        </motion.button>
    );
};

export default function NavigationBar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        const elements = NAV_ITEMS.map((item) => document.getElementById(item.id));

        // Add contact section to elements for tracking if needed
        elements.push(document.getElementById("contact"));

        elements.forEach((el) => {
            if (!el) return;
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveSection(entry.target.id);
                        }
                    });
                },
                { rootMargin: "-40% 0px -40% 0px" }
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => {
            observers.forEach((obs) => obs.disconnect());
        };
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            initial="visible"
            animate={hidden ? "hidden" : "visible"}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#060610]/60 border-b border-white/5"
        >
            <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20">

                {/* Left: Logo */}
                <div className="navbar-start">
                    <motion.div
                        onClick={scrollToTop}
                        className="cursor-pointer font-black text-xl tracking-tighter"
                        initial="idle"
                        whileHover="hover"
                        style={{ fontFamily: "'Syncopate', sans-serif" }}
                    >
                        <motion.span
                            variants={{
                                idle: { textShadow: "none", x: 0 },
                                hover: {
                                    color: "#00b4ff",
                                    textShadow: "0 0 8px rgba(0,180,255,0.8)",
                                    x: [-2, 2, -1, 1, 0],
                                    transition: {
                                        x: { duration: 0.2, repeat: Infinity, repeatType: "mirror" }
                                    }
                                }
                            }}
                            className="inline-block uppercase"
                        >
                            &lt;AD /&gt;
                        </motion.span>
                    </motion.div>
                </div>

                {/* Center: Nav Links */}
                <div className="navbar-center hidden lg:flex gap-4">
                    {NAV_ITEMS.map((item) => (
                        <MagneticLink
                            key={item.id}
                            isActive={activeSection === item.id}
                            onClick={() => scrollToSection(item.id)}
                        >
                            {item.name}
                        </MagneticLink>
                    ))}
                </div>

                {/* Right: Action Protocol */}
                <div className="navbar-end">
                    <motion.button
                        onClick={() => scrollToSection("contact")}
                        className="btn btn-outline btn-sm rounded-none font-mono tracking-widest text-xs hidden sm:inline-flex"
                        style={{ borderColor: "#00b4ff", color: "#00b4ff" }}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 180, 255, 0.5)", backgroundColor: "transparent" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        &gt; INITIATE_COMMS
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    );
}
