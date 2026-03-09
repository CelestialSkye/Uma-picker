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
        left: `${50 + x / 50}%`,
        top: `${50 + y / 25}%`,
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="z-50"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "100%",
          filter: "drop-shadow(0px 0px 3px rgba(255, 215, 0, 0.9))",
        }}
      >
        <defs>
          {/* white to yellow transition*/}
          <linearGradient
            id="sparkleGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FFF9E0" />{" "}
            <stop offset="100%" stopColor="#FFD700" />{" "}
          </linearGradient>
        </defs>

        <path
          d="M50 0C50 40 60 50 100 50C60 50 50 60 50 100C50 60 40 50 0 50C40 50 50 40 50 0Z"
          fill="url(#sparkleGradient)"
          stroke="rgba(255, 215, 0, 1)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
};

export default Sparkle;
