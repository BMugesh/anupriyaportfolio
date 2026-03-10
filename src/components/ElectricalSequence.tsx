import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PreLoader from "./PreLoader";
import ElectricalScene from "./ElectricalScene";

interface ElectricalSequenceProps {
    onSequenceComplete?: () => void;
}

export default function ElectricalSequence({ onSequenceComplete }: ElectricalSequenceProps) {
    const [phase, setPhase] = useState<"loading" | "3d_scene">("loading");
    const [flash, setFlash] = useState(false);

    const handlePreLoaderComplete = () => {
        // Trigger flash, then mount 3D scene shortly after, and slowly fade out flash
        setFlash(true);
        setTimeout(() => {
            setPhase("3d_scene");
            setTimeout(() => {
                setFlash(false);
            }, 100); // the peak flash holds for 100ms before starting fade
        }, 150); // wait 150ms into the flash before mounting the heavy 3D scene
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#050505]">
            {phase === "loading" && <PreLoader onComplete={handlePreLoaderComplete} />}

            {phase === "3d_scene" && (
                <ElectricalScene onLockIn={onSequenceComplete} />
            )}

            {/* Unified Arc Flash */}
            <AnimatePresence>
                {flash && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 z-50 bg-[#ffffff] pointer-events-none"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
