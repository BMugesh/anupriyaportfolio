import { motion } from "framer-motion";

interface MaskedTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export const MaskedText = ({ text, className = "", delay = 0 }: MaskedTextProps) => {
    // Split words to animate them individually while retaining HTML spaces
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: delay,
            },
        },
    };

    const child = {
        visible: {
            y: "0%",
            transition: {
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1], // Heavy, premium cubic-bezier easing
            },
        },
        hidden: {
            y: "100%",
        },
    };

    return (
        <motion.div
            className={`flex flex-wrap ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {words.map((word, index) => (
                <span
                    className="overflow-hidden inline-block"
                    key={index}
                    style={{ marginRight: word === "" ? "0" : "0.25em" }}
                >
                    <motion.span className="inline-block origin-bottom" variants={child}>
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.div>
    );
};
