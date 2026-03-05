import React from "react";
import { motion } from "framer-motion";

const Sparkle = ({ id, x, y, twinkleDuration, popDelay, size }) => {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
      transition={{
        duration: twinkleDuration,
        repeat: Infinity,
        delay: popDelay,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        left: `${50 + x / 11}%`,
        top: `${50 + y / 8}%`,
        width: size,
        height: size,
        backgroundColor: "#FFD700", //yellow
        clipPath:
          "polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%)",
      }}
      className="z-50"
    />
  );
};

export default Sparkle;
