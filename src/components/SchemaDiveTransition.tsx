import { useState, useRef } from "react";
import gsap from "gsap";
import SchematicLoader from "./SchematicLoader";

interface SchemaDiveTransitionProps {
    children: React.ReactNode;
}

export default function SchemaDiveTransition({ children }: SchemaDiveTransitionProps) {
    const [phase, setPhase] = useState<"loading" | "diving" | "done">("loading");
    const loaderRef = useRef<HTMLDivElement>(null);

    const handleLoadComplete = () => {
        setPhase("diving");

        if (loaderRef.current) {
            // GSAP Z-Axis Dive through the copper trace loop
            gsap.to(loaderRef.current, {
                scale: 18,
                opacity: 0,
                duration: 1.1,
                ease: "power3.in",
                onComplete: () => setPhase("done"),
            });
        } else {
            setTimeout(() => setPhase("done"), 800);
        }
    };

    return (
        <>
            {/*
        Children are ALWAYS in normal document flow.
        This is the critical fix — it gives the page real scrollable height.
        We use `visibility` (not `display:none`) so layout is computed even while hidden.
      */}
            <div style={{ visibility: phase === "done" ? "visible" : "hidden" }}>
                {children}
            </div>

            {/* Loader is a FIXED full-screen overlay — doesn't affect document layout */}
            {phase !== "done" && (
                <div
                    ref={loaderRef}
                    className="fixed inset-0 z-50 origin-center"
                    style={{ willChange: "transform, opacity" }}
                >
                    <SchematicLoader onComplete={handleLoadComplete} />
                </div>
            )}
        </>
    );
}
