import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BlurRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export const BlurReveal = ({ children, className = "", delay = 0 }: BlurRevealProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1], // Consistent heavy easing 
                delay
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
