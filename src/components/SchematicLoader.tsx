import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SchematicLoaderProps {
    onComplete: () => void;
}

const BOOT_LINES = [
    { text: "> COMPILING_FIRMWARE...", delay: 0.2 },
    { text: "> INITIALIZING_STM32_HAL... [OK]", delay: 0.7 },
    { text: "> ESTABLISHING_WIFI_GSM_LINK... [OK]", delay: 1.2 },
    { text: "> MOUNTING_FIREBASE_NODES... [OK]", delay: 1.7 },
    { text: "> CALIBRATING_1kW_MOTOR_DRIVER... [OK]", delay: 2.2 },
    { text: "> SYSTEM_READY.", delay: 2.7 },
];

// Self-drawing SVG circuit schematic
function CircuitSchematic({ progress }: { progress: number }) {
    // SVG paths forming a PCB schematic with traces, ICs, and connection nodes
    const paths = [
        // Horizontal main bus
        "M 50 250 L 750 250",
        // Vertical rails
        "M 150 100 L 150 400",
        "M 650 100 L 650 400",
        // IC chip top center
        "M 300 150 L 500 150 L 500 200 L 300 200 Z",
        // IC pins top
        "M 330 150 L 330 130", "M 360 150 L 360 130", "M 390 150 L 390 130",
        "M 420 150 L 420 130", "M 450 150 L 450 130", "M 480 150 L 480 130",
        // IC pins bottom
        "M 330 200 L 330 220", "M 360 200 L 360 220", "M 390 200 L 390 220",
        "M 420 200 L 420 220", "M 450 200 L 450 220", "M 480 200 L 480 220",
        // Connecting traces
        "M 330 220 L 330 250", "M 480 220 L 480 250",
        "M 360 130 L 360 100 L 150 100",
        "M 450 130 L 450 100 L 650 100",
        // Bottom IC component
        "M 320 300 L 480 300 L 480 350 L 320 350 Z",
        // Bottom IC pins
        "M 340 300 L 340 280", "M 370 300 L 370 280",
        "M 400 300 L 400 280", "M 430 300 L 430 280", "M 460 300 L 460 280",
        "M 340 350 L 340 370", "M 370 350 L 370 370",
        "M 400 350 L 400 370", "M 430 350 L 430 370", "M 460 350 L 460 370",
        // Left module (capacitor style)
        "M 80 220 L 80 280", "M 120 220 L 120 280",
        "M 80 250 L 50 250", "M 120 250 L 150 250",
        // Right module (resistor style)
        "M 620 250 L 650 250", "M 680 240 L 720 240 L 720 260 L 680 260 L 680 240",
        "M 720 250 L 750 250",
        // Corner traces
        "M 150 400 L 320 400 L 320 350",
        "M 650 400 L 480 400 L 480 350",
        // Node circles done via small path circles
        "M 150 250 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0",
        "M 650 250 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0",
        "M 400 250 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0",
    ];

    const totalPaths = paths.length;
    const activeUpTo = Math.floor((progress / 100) * totalPaths);

    return (
        <svg
            viewBox="0 0 800 500"
            className="w-full max-w-2xl mx-auto"
            style={{ filter: "drop-shadow(0 0 6px rgba(0,180,255,0.8))" }}
        >
            {paths.map((d, i) => (
                <motion.path
                    key={i}
                    d={d}
                    fill="none"
                    stroke="#00b4ff"
                    strokeWidth={i >= 3 && i <= 7 || (i >= 20 && i <= 26) ? 1.5 : 2}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={i < activeUpTo
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                />
            ))}

            {/* IC label */}
            {progress > 50 && (
                <motion.text
                    x="400" y="180"
                    textAnchor="middle"
                    fill="#00b4ff"
                    fontSize="12"
                    fontFamily="monospace"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                >
                    STM32F4
                </motion.text>
            )}
            {progress > 70 && (
                <motion.text
                    x="400" y="328"
                    textAnchor="middle"
                    fill="#e06c1a"
                    fontSize="10"
                    fontFamily="monospace"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                >
                    BMS_MODULE
                </motion.text>
            )}
        </svg>
    );
}

export default function SchematicLoader({ onComplete }: SchematicLoaderProps) {
    const [progress, setProgress] = useState(0);
    const [visibleLines, setVisibleLines] = useState(0);
    const completedRef = useRef(false);

    // Progress animation over 3 seconds
    useEffect(() => {
        const start = performance.now();
        const duration = 3200;

        const tick = (now: number) => {
            const elapsed = now - start;
            const p = Math.min((elapsed / duration) * 100, 100);
            setProgress(p);

            if (p < 100) {
                requestAnimationFrame(tick);
            } else if (!completedRef.current) {
                completedRef.current = true;
                setTimeout(onComplete, 300);
            }
        };
        requestAnimationFrame(tick);
    }, [onComplete]);

    // Stagger boot lines
    useEffect(() => {
        if (visibleLines >= BOOT_LINES.length) return;
        const nextLine = BOOT_LINES[visibleLines];
        if (!nextLine) return;
        const delay = visibleLines === 0 ? nextLine.delay * 1000 : 500;
        const timer = setTimeout(() => setVisibleLines((v) => v + 1), delay);
        return () => clearTimeout(timer);
    }, [visibleLines]);

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "#060610" }}
        >
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,180,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Circuit Schematic SVG */}
            <div className="relative w-full max-w-2xl px-8 mb-8">
                <CircuitSchematic progress={progress} />
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-xs mb-8 px-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[#00b4ff]/60 tracking-widest">COMPILE PROGRESS</span>
                    <span className="font-mono text-xs text-[#00b4ff]">{Math.floor(progress)}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{
                            background: "linear-gradient(90deg, #00b4ff, #00ffcc)",
                            boxShadow: "0 0 12px rgba(0,180,255,0.8)",
                            width: `${progress}%`,
                        }}
                    />
                </div>
            </div>

            {/* Boot Terminal Text */}
            <div className="absolute bottom-8 left-8 font-mono text-xs text-[#00b4ff]/80 space-y-1 max-w-sm">
                <AnimatePresence>
                    {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25 }}
                            className={i === visibleLines - 1 ? "text-[#00ffcc]" : "text-[#00b4ff]/50"}
                        >
                            {line.text}
                        </motion.div>
                    ))}
                </AnimatePresence>
                {visibleLines < BOOT_LINES.length && (
                    <motion.span
                        className="inline-block w-2 h-3 bg-[#00b4ff] align-middle ml-1"
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                    />
                )}
            </div>

            {/* Version stamp */}
            <div className="absolute bottom-8 right-8 font-mono text-[10px] text-white/10 tracking-widest">
                ANUPRIYA.PORTFOLIO v2.0
            </div>
        </div>
    );
}
