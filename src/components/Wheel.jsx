import React from "react";
import "./Wheel.css";
import TapButton from "../assets/TapButton.png";
import SkipButton from "../assets/SkipButton.png";
import RedShape from "../assets/redShape.svg";

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
      className="relative mx-auto shrink-0"
      style={{ width: "min(72vmin, 650px)", height: "min(72vmin, 650px)" }}
    >
      {/* Red Shape Overlay */}
      <div className="absolute inset-0 pointer-events-none z-200">
        {Array.from({ length: 11 }).map((_, index) => {
          // add 1 to index so we skip the 0th position
          const slotIndex = index + 1;
          const angle = (360 / 12) * slotIndex;

          const rad = ((angle - 90) * Math.PI) / 180;
          const radius = 45.5;
          const x = 50 + radius * Math.cos(rad);
          const y = 50 + radius * Math.sin(rad);

          return (
            <img
              key={index}
              src={RedShape}
              alt=""
              className="absolute"
              style={{
                width: "22%",
                height: "22%",
                top: `${y}%`,
                left: `${x}%`,
                paddingBottom: "8px",
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              }}
            />
          );
        })}
      </div>

      {/* Indicator (this should be where the uma be*/}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-4xl z-40 text-gray-800"
        style={{ top: "-4%" }}
      ></div>

      {/* Wheel Ring */}
      <div
        className="absolute overflow-hidden border-8 border-[#FBD62D] transition-transform duration-1500 ease-out rounded-full z-20 shadow-[0_0_0_5px_rgba(219,187,113,1),inset_0_0_0_4px_rgba(236,185,43,1)]"
        style={{
          transform: `rotate(${rotation}deg)`,
          top: "9%",
          left: "9%",
          right: "9%",
          bottom: "9%",
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="absolute w-full h-full"
            style={{
              clipPath: getRingClipPath(index),
              backgroundColor: index % 2 === 0 ? "#EFC37D" : "#DC9A65",
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
        className="absolute inset-0 m-auto z-30 rounded-full transition-all active:scale-95 disabled:cursor-not-allowed disabled:grayscale bg-transparent border-none p-0 outline-none flex items-center justify-center overflow-hidden"
        style={{
          width: "80%",
          height: "80%",
          clipPath: "circle(20%)",
          WebkitClipPath: "circle(20%)",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {isSpinning ? (
          <img
            src={SkipButton}
            alt="Skip"
            className="object-contain pointer-events-none"
            style={{ width: "77%", height: "77%" }}
          />
        ) : (
          <img
            src={TapButton}
            alt="Spin"
            className="object-contain pointer-events-none"
            style={{
              width: "92%",
              height: "92%",
              marginBottom: "8px",
              marginLeft: "4px",
            }}
          />
        )}
      </button>
      {/* inner circle green border */}
      <div
        className="absolute rounded-full border-[#A3DF02] z-100 pointer-events-none"
        style={{
          top: "29%",
          left: "29%",
          right: "29%",
          bottom: "29%",
          borderWidth: "2.8vmin",
          boxShadow: "0 0 0 4px #57A515, inset 0 0 0 4px #948895",
        }}
      />

      {/* White Circle Behind */}
      <div
        className="absolute rounded-full border-5 border-[#94879A] bg-white z-10 pointer-events-none"
        style={{
          top: "-2%",
          left: "-2%",
          right: "-2%",
          bottom: "-2%",
        }}
      />

      <div
        className="absolute rounded-full z-[100] pointer-events-none bg-gradient-to-b from-[#abee02] to-[#61BB34]"
        style={{
          top: "1.5%",
          left: "1.5%",
          right: "1.5%",
          bottom: "1.5%",

          padding: "3.2vmin",

          /* The Mask (This cuts the hole) */
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
        }}
      />
      {/* Inner border of green ring */}
      <div
        className="absolute rounded-full pointer-events-none z-101"
        style={{
          top: "calc(1.5% + 3.2vmin)",
          left: "calc(1.5% + 3.2vmin)",
          right: "calc(1.5% + 3.2vmin)",
          bottom: "calc(1.5% + 3.2vmin)",
          border: "5px solid #65BA19",
        }}
      />
    </div>
  );
};

export default Wheel;
