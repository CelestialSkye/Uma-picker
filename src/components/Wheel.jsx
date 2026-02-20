import React from "react";
import "./Wheel.css";
import UmaWheelGame from "./UmaWheelGame";

const Wheel = ({ items, rotation }) => {
  const sliceAngle = 360 / items.length;

  const getClipPath = (index) => {
    const startAngle = index * sliceAngle;

    // Generate points along the arc for smooth curve
    const points = ["50% 50%"]; // Start at center
    const steps = Math.max(12, Math.ceil(sliceAngle / 5)); // More steps for smaller slices

    for (let i = 0; i <= steps; i++) {
      const angle = startAngle + (i / steps) * sliceAngle;
      const rad = ((angle - 90) * Math.PI) / 180;
      const x = 50 + 50 * Math.cos(rad);
      const y = 50 + 50 * Math.sin(rad);
      points.push(`${x}% ${y}%`);
    }

    return `polygon(${points.join(", ")})`;
  };

  return (
    <div className="relative w-96 h-96">
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-3xl z-10 text-gray-800">
        ▼
      </div>
      <div
        className="w-full h-full rounded-full relative overflow-hidden border-8 border-gray-800
          transition-transform duration-1500 ease-out "
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="absolute w-full h-full flex items-center justify-center"
            style={{
              clipPath: getClipPath(index),
              backgroundColor: index % 2 === 0 ? "#feca57" : "#ff6b6b",
            }}
          >
            <span
              className="font-bold text-white drop-shadow-md text-center px-2 text-sm absolute"
              style={{
                transform: `rotate(${index * sliceAngle + sliceAngle / 2 - 90}deg) translateY(-65px)`,
              }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wheel;
