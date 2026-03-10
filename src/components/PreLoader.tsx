import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface PreLoaderProps {
    onComplete: () => void;
}

const TERMINAL_LOGS = [
    "> INITIALIZING_SYSTEM...",
    "> CALIBRATING_VOLTAGE...",
    "> SYNCHRONIZING_STM32_CLOCK... [OK]",
    "> ESTABLISHING_UART_LINK... [OK]",
    "> MOUNTING_FIREBASE_NODES... [OK]",
    "> KICKSTARTING_EV_MOTOR... [READY]",
];

export default function PreLoader({ onComplete }: PreLoaderProps) {
    const [progress, setProgress] = useState(0);
    const [visibleLogs, setVisibleLogs] = useState<string[]>([TERMINAL_LOGS[0]]);
    const [flatline, setFlatline] = useState(false);
    const pathRef = useRef<SVGPathElement>(null);

    // Terminal text simulation
    useEffect(() => {
        let currentLogIndex = 0;
        const interval = setInterval(() => {
            currentLogIndex++;
            if (currentLogIndex < TERMINAL_LOGS.length) {
                setVisibleLogs((prev) => [...prev, TERMINAL_LOGS[currentLogIndex]]);
            } else {
                clearInterval(interval);
            }
        }, 400);

        return () => clearInterval(interval);
    }, []);

    // Progress simulation (0 to 100)
    useEffect(() => {
        let start = performance.now();
        const duration = 3000; // 3 seconds to load

        const animateProgress = (time: number) => {
            let elapsed = time - start;
            let p = Math.min((elapsed / duration) * 100, 100);
            setProgress(p);

            if (p < 100) {
                requestAnimationFrame(animateProgress);
            } else {
                // Phase 2: Flatline then Arc Flash
                setFlatline(true);
                setTimeout(() => {
                    onComplete();
                }, 300); // Flatline duration
            }
        };
        requestAnimationFrame(animateProgress);
    }, [onComplete]);

    // Wave drawing
    useEffect(() => {
        if (flatline) {
            if (pathRef.current) {
                pathRef.current.setAttribute("d", "M 0 50 L 1000 50");
            }
            return;
        }

        let frameId: number;
        let time = 0;

        const drawWave = () => {
            time += 0.05;
            const width = 1000;
            const height = 100;
            const centerY = height / 2;
            let path = `M 0 ${centerY}`;

            // Progress normalized (0 to 1)
            const p = progress / 100;

            const numPoints = 200;
            for (let i = 0; i <= numPoints; i++) {
                const x = (i / numPoints) * width;

                // Base sine wave frequency
                let frequency = 0.05 + p * 0.05; // tighter as progress goes up

                // Noise (chaos early on)
                const noise = (Math.random() - 0.5) * 40 * (1 - p);

                // Pure sine wave
                const sineY = Math.sin(x * frequency + time) * 30;

                // Pure square wave (sign of sine * amplitude)
                const squareY = Math.sign(Math.sin(x * frequency + time)) * 30;

                // Lerp from noisy sine to square wave based on progress
                // At 90% (p = 0.9), it should be almost perfectly digital square
                const digitalFactor = Math.pow(p, 4); // exponential shift to square wave near the end
                const rawY = sineY * (1 - digitalFactor) + squareY * digitalFactor + noise;

                // Keep in bounds
                const y = centerY + rawY;

                path += ` L ${x} ${y}`;
            }

            if (pathRef.current) {
                pathRef.current.setAttribute("d", path);
            }
            frameId = requestAnimationFrame(drawWave);
        };

        frameId = requestAnimationFrame(drawWave);
        return () => cancelAnimationFrame(frameId);
    }, [progress, flatline]);


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] overflow-hidden rounded-none border-none">
            <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Oscilloscope View */}
                <div className="w-full max-w-4xl h-32 relative">
                    <svg
                        viewBox="0 0 1000 100"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                        style={{
                            filter: "drop-shadow(0 0 8px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 16px rgba(0, 255, 255, 0.4))",
                        }}
                    >
                        <path
                            ref={pathRef}
                            fill="none"
                            stroke="#00ffff"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    {/* Progress textual indicator overlaying faintly */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#00ffff] opacity-20 text-6xl font-mono font-bold font-black tracking-widest mix-blend-screen">
                        {Math.floor(progress)}%
                    </div>
                </div>

                {/* Terminal Text */}
                <div className="absolute bottom-8 left-8 flex flex-col items-start justify-end font-mono text-[#00ffff] text-sm md:text-base">
                    {visibleLogs.map((log, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-1 text-shadow-glow"
                        >
                            {log}
                        </motion.div>
                    ))}
                    {!flatline && (
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.5 }}
                            className="inline-block w-2 text-[#00ffff] bg-[#00ffff] h-4 mt-1"
                        >
                            &nbsp;
                        </motion.span>
                    )}
                </div>
            </div>
        </div>
    );
}
