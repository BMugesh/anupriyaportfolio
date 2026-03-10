import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LOGS = [
  { text: "Initializing power supply...", status: "OK" },
  { text: "Loading HAL libraries...", status: "OK" },
  { text: "Configuring GPIO pins...", status: "OK" },
  { text: "Initializing STM32 Core...", status: "OK" },
  { text: "Loading UART drivers...", status: "OK" },
  { text: "ESP8266 Wi-Fi module detected...", status: "OK" },
  { text: "Mounting filesystem...", status: "OK" },
  { text: "Calibrating ADC channels...", status: "OK" },
  { text: "Loading IoT protocols...", status: "OK" },
  { text: "Establishing cloud connection...", status: "OK" },
  { text: "System check complete.", status: "READY" },
];

interface PCBLine {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const generatePCBLines = (): PCBLine[] => {
  const lines: PCBLine[] = [];
  let x = 50;
  let y = 50;
  const directions = [
    [1, 0], [0, 1], [-1, 0], [0, -1],
    [1, 1], [1, -1], [-1, 1], [-1, -1],
  ];

  for (let i = 0; i < 40; i++) {
    const dir = directions[Math.floor(Math.random() * 4)]; // prefer 90-degree
    const len = 3 + Math.random() * 8;
    const nx = Math.min(95, Math.max(5, x + dir[0] * len));
    const ny = Math.min(95, Math.max(5, y + dir[1] * len));
    lines.push({ id: i, x1: x, y1: y, x2: nx, y2: ny });
    x = nx;
    y = ny;
  }
  return lines;
};

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [phase, setPhase] = useState<"routing" | "loading" | "flash" | "done">("routing");
  const [pcbLines] = useState(() => generatePCBLines());
  const [visibleLines, setVisibleLines] = useState(0);
  const [dotVisible, setDotVisible] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Phase 1: Dot appears, then PCB routing
  useEffect(() => {
    const t1 = setTimeout(() => setDotVisible(true), 300);
    const t2 = setTimeout(() => setPhase("loading"), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Route PCB lines
  useEffect(() => {
    if (phase !== "loading" && phase !== "routing") return;
    if (visibleLines >= pcbLines.length) return;
    const t = setTimeout(() => setVisibleLines(v => v + 1), 50);
    return () => clearTimeout(t);
  }, [visibleLines, pcbLines.length, phase]);

  // Loading progress
  useEffect(() => {
    if (phase !== "loading") return;
    if (progress >= 100) {
      setPhase("flash");
      setTimeout(() => {
        setPhase("done");
        setTimeout(onComplete, 400);
      }, 600);
      return;
    }
    const speed = progress < 30 ? 40 : progress < 70 ? 25 : progress < 90 ? 50 : 30;
    const t = setTimeout(() => {
      const increment = Math.random() * 4 + 1;
      setProgress(p => Math.min(100, p + increment));
    }, speed);
    return () => clearTimeout(t);
  }, [progress, phase, onComplete]);

  // Terminal logs sync with progress
  useEffect(() => {
    const targetLog = Math.floor((progress / 100) * BOOT_LOGS.length);
    if (targetLog > logIndex && logIndex < BOOT_LOGS.length) {
      setLogIndex(targetLog);
    }
  }, [progress, logIndex]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logIndex]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-background flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* PCB routing SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {pcbLines.slice(0, visibleLines).map((line, i) => (
              <motion.line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="hsl(184 100% 50%)"
                strokeWidth="0.15"
                strokeOpacity={phase === "flash" ? 1 : 0.4}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.1 }}
              />
            ))}
            {/* Nodes at intersections */}
            {pcbLines.slice(0, visibleLines).map((line, i) => (
              <motion.circle
                key={`node-${line.id}`}
                cx={line.x2}
                cy={line.y2}
                r="0.3"
                fill={i % 5 === 0 ? "hsl(40 100% 50%)" : "hsl(184 100% 50%)"}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: phase === "flash" ? 1 : 0.6, scale: 1 }}
                transition={{ duration: 0.15 }}
              />
            ))}
          </svg>

          {/* Center dot */}
          {dotVisible && (
            <motion.div
              className="absolute w-3 h-3 bg-primary"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: phase === "flash" ? [1, 3, 0] : [0, 1.5, 1],
                opacity: phase === "flash" ? [1, 1, 0] : 1,
              }}
              transition={{ duration: phase === "flash" ? 0.6 : 0.4 }}
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 20px hsl(184 100% 50% / 0.8), 0 0 40px hsl(184 100% 50% / 0.4)",
              }}
            />
          )}

          {/* Flash overlay */}
          {phase === "flash" && (
            <motion.div
              className="absolute inset-0 bg-primary/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.6 }}
            />
          )}

          {/* Terminal logs - bottom left */}
          <div
            ref={terminalRef}
            className="absolute bottom-8 left-8 max-w-sm max-h-48 overflow-hidden"
          >
            {BOOT_LOGS.slice(0, logIndex).map((log, i) => (
              <motion.div
                key={i}
                className="text-[10px] font-mono leading-relaxed"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.7, x: 0 }}
                transition={{ duration: 0.15 }}
              >
                <span className="text-muted-foreground">[{String(i).padStart(2, "0")}] </span>
                <span className="text-foreground/60">{log.text} </span>
                <span className={log.status === "OK" ? "text-green-500" : "text-copper"}>
                  [{log.status}]
                </span>
              </motion.div>
            ))}
          </div>

          {/* Progress - bottom right */}
          <div className="absolute bottom-8 right-8 text-right">
            <div className="text-xs font-mono text-muted-foreground mb-2">SYSTEM BOOT</div>
            <div className="text-4xl font-heading font-bold text-primary glow-text-blue tabular-nums">
              {Math.floor(progress)}%
            </div>
            <div className="w-48 h-px bg-border mt-3">
              <motion.div
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Scan line */}
          <div className="absolute inset-0 scan-line pointer-events-none opacity-50" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
