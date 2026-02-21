import React from "react";
import "./Wheel.css";

const Wheel = ({ items, rotation, onSpin, isSpinning, traineeCount }) => {
  const sliceAngle = 360 / items.length;
  const innerRadius = 50; // Inner circle radius %

  const getRingClipPath = (index) => {
    const startAngle = index * sliceAngle - 90;
    const steps = 20; // Points for smooth curves

    const points = [];

    // Outer arc (start to end)
    for (let i = 0; i <= steps; i++) {
      const angle = startAngle + (i / steps) * sliceAngle;
      const rad = (angle * Math.PI) / 180;
      const x = 50 + 50 * Math.cos(rad);
      const y = 50 + 50 * Math.sin(rad);
      points.push(`${x}% ${y}%`);
    }

    // Inner arc (end to start, going backwards)
    for (let i = steps; i >= 0; i--) {
      const angle = startAngle + (i / steps) * sliceAngle;
      const rad = (angle * Math.PI) / 180;
      const x = 50 + (innerRadius / 2) * Math.cos(rad);
      const y = 50 + (innerRadius / 2) * Math.sin(rad);
      points.push(`${x}% ${y}%`);
    }

    return `polygon(${points.join(", ")})`;
  };

  return (
    <div
      className="relative w-full max-w-155 aspect-square mx-auto"
      style={{ containerType: "size" }}
    >
      {/* Indicator */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-4xl z-40 text-gray-800"
        style={{ top: "-4%" }}
      >
        ▼
      </div>

      {/* Wheel Ring */}
      <div
        className="absolute overflow-hidden border-8 border-yellow-600 transition-transform duration-1500 ease-out rounded-full z-20"
        style={{
          transform: `rotate(${rotation}deg)`,
          top: "8%",
          left: "8%",
          right: "8%",
          bottom: "8%",
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="absolute w-full h-full"
            style={{
              clipPath: getRingClipPath(index),
              backgroundColor: index % 2 === 0 ? "#feca57" : "#ff6b6b",
            }}
          >
            <span
              className="font-bold text-white drop-shadow-md text-center px-2 text-sm absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: `rotate(${index * sliceAngle + sliceAngle / 2}deg) translateY(-11.3%) translateX(-50%)`,
              }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Center Button */}
      <button
        onClick={onSpin}
        disabled={!isSpinning && traineeCount !== 8}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-lg shadow-lg transition-all"
        style={{ width: "15.5%", height: "15.5%", aspectRatio: "1" }}
      >
        {isSpinning ? "SKIP" : "SPIN"}
      </button>
      <div
        className="absolute rounded-full border-green-400 z-100 pointer-events-none"
        style={{
          top: "29%",
          left: "29%",
          right: "29%",
          bottom: "29%",
          borderWidth: "4.5cqw",
        }}
      />
      {/* White Circle Behind */}
      <div className="absolute inset-0 rounded-full border-4 border-gray-600 bg-white z-10 pointer-events-none" />

      <div
        className="absolute rounded-full border-green-600 z-100 pointer-events-none"
        style={{
          top: "2.5%",
          left: "2.5%",
          right: "2.5%",
          bottom: "2.5%",
          borderWidth: "4.5cqw",
        }}
      />
    </div>
  );
};

export default Wheel;
