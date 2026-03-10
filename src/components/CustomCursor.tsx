import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-clickable], input, textarea")) {
        setHovering(true);
      }
    };

    const handleOut = () => setHovering(false);
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: pos.x - (hovering ? 20 : 6),
          y: pos.y - (hovering ? 20 : 6),
          width: hovering ? 40 : 12,
          height: hovering ? 40 : 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{
          borderRadius: hovering ? 0 : "50%",
          border: hovering
            ? "1px solid hsl(184 100% 50% / 0.8)"
            : "none",
          background: hovering
            ? "transparent"
            : "hsl(184 100% 50%)",
          boxShadow: hovering
            ? "0 0 20px hsl(184 100% 50% / 0.4), inset 0 0 20px hsl(184 100% 50% / 0.1)"
            : "0 0 15px hsl(184 100% 50% / 0.6), 0 0 30px hsl(184 100% 50% / 0.3)",
        }}
      />
      {hovering && (
        <>
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            animate={{ x: pos.x, y: pos.y - 20 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            style={{
              width: 1,
              height: 8,
              background: "hsl(184 100% 50% / 0.6)",
            }}
          />
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            animate={{ x: pos.x, y: pos.y + 12 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            style={{
              width: 1,
              height: 8,
              background: "hsl(184 100% 50% / 0.6)",
            }}
          />
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            animate={{ x: pos.x - 20, y: pos.y }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            style={{
              width: 8,
              height: 1,
              background: "hsl(184 100% 50% / 0.6)",
            }}
          />
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            animate={{ x: pos.x + 12, y: pos.y }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            style={{
              width: 8,
              height: 1,
              background: "hsl(184 100% 50% / 0.6)",
            }}
          />
        </>
      )}
    </>
  );
};

export default CustomCursor;
