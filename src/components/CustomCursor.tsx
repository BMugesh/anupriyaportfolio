import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const ringX = useSpring(rawX, { stiffness: 200, damping: 28 });
  const ringY = useSpring(rawY, { stiffness: 200, damping: 28 });

  const isOverButton = useRef(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      isOverButton.current = !!el.closest("[data-button], button, a");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [dotX, dotY, rawX, rawY]);

  return (
    <>
      {/* Outer spring ring */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: 40,
          height: 40,
          border: "1.5px solid rgba(0,180,255,0.6)",
          background: "transparent",
          mixBlendMode: "difference",
        }}
      />

      {/* Inner neon dot — instant */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          background: "#00b4ff",
          boxShadow: "0 0 10px #00b4ff",
        }}
      />
    </>
  );
}
