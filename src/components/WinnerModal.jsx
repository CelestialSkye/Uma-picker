import React, { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sparkle from "./Sparkle";

const WinnerModal = ({ winnerData, onClose }) => {
  const isOpen = !!winnerData;

  // data generation for sparkles using values
  const sparkleData = useMemo(() => {
    if (!isOpen) return [];
    const seededRandom = (seed) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: 20 }).map((_, i) => ({
      id: `sparkle-${i}`,
      x: (seededRandom(i) - 0.5) * 1100,
      y: (seededRandom(i + 100) - 0.5) * 800,
      twinkleDuration: 1 + seededRandom(i + 5000) * 2,
      popDelay: i * 0.006,
      size: 15 + seededRandom(i + 300) * 30,
    }));
  }, [isOpen]);

  if (!winnerData) return null;

  const name = winnerData.name || "";
  const splitIndex = name.length > 6 ? Math.ceil(name.length / 2) : 4;
  const firstHalf = name.slice(0, splitIndex);
  const secondHalf = name.slice(splitIndex);

  const commonTextStyle =
    "text-5xl md:text-8xl font-[1000] italic leading-none text-transparent bg-clip-text pb-4 select-none inline-block";
  const commonFilter = `
    drop-shadow(3px 3px 0px white) 
    drop-shadow(-3px -3px 0px white) 
    drop-shadow(3px -3px 0px white) 
    drop-shadow(-3px 3px 0px white)
  `;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-slate-950/60  flex items-center justify-center z-[9999] overflow-hidden"
        onClick={onClose}
      >
        {/* Sparkle Field */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {sparkleData.map((s, idx) => (
            <Sparkle key={s.id} index={idx} {...s} />
          ))}
        </div>

        {/* Modal Content */}
        <div
          className="relative flex flex-col items-center z-50 p-4 w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 transform skew-x-[-12deg]"
          >
            <span className="bg-[#ee528c] text-white px-6 py-2 text-sm md:text-xl font-black italic tracking-widest uppercase shadow-[6px_6px_0px_#c21051]">
              your next career is
            </span>
          </motion.div>

          {/* Winner Image*/}
          <motion.img
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            src={winnerData.image}
            alt="winner"
            className="w-[150px] max-w-[150px] min-w-[150px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-6"
          />

          {/* Winner Name with gradients */}
          <motion.div
            initial={{ scale: 4, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 1.2,
            }}
            className="flex items-end justify-center transform skew-x-[-10deg]"
          >
            <h1
              className={commonTextStyle}
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, #fffb9e 0%, #ffcf4b 45%, #f5a623 55%, #f5a623 100%)",
                WebkitTextStroke: "1.5px white",
                filter: `${commonFilter} drop-shadow(8px 8px 0px #d48806)`,
              }}
            >
              {firstHalf}
            </h1>
            <h1
              className={commonTextStyle}
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, #ffc9e0 0%, #ff7eb3 45%, #ee528c 55%, #ee528c 100%)",
                WebkitTextStroke: "1.5px white",
                filter: `${commonFilter} drop-shadow(8px 8px 0px #c21051)`,
              }}
            >
              {secondHalf}
            </h1>
          </motion.div>

          {/* Pulse Instruction */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-white/40 mt-12 font-black italic tracking-[0.4em] text-[10px] animate-pulse"
          >
            CLICK ANYWHERE TO CLOSE
          </motion.p>
        </div>

        {/* Slam Impact Flash */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute inset-0 bg-white z-[100] pointer-events-none"
        />
      </div>
    </AnimatePresence>
  );
};

export default WinnerModal;
