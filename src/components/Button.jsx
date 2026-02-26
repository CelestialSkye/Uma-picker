import React from "react";

const Button = ({ onClick, text = "Filter" }) => {
  // Constants for the "Y" focal point and shape positions
  const focalX = "68%";
  const focalY = "45%";

  return (
    <button
      onClick={onClick}
      className="relative px-12 py-3 rounded-[14px] text-white font-bold text-2xl tracking-tight overflow-hidden transition-all active:translate-y-[2px] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_2px_0px_#4e8000] hover:brightness-110 group"
      style={{
        fontFamily:
          "'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif",
        background: "linear-gradient(to bottom, #89d900 0%, #72ba00 100%)",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 4px 0px #4e8000",
      }}
    >
      {/* Pattern 1 */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(circle at ${focalX} ${focalY}, rgba(0, 0, 0, 0.18) 0%, transparent 60%)`,
          clipPath: `polygon(0 0, 55% 0, ${focalX} ${focalY}, 58% 100%, 0 100%)`,
        }}
      />

      {/* Pattern 2 */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(circle at ${focalX} ${focalY}, rgba(255, 255, 255, 0.45) 0%, transparent 70%)`,
          clipPath: `polygon(55% 0, 82% 0, ${focalX} ${focalY})`,
        }}
      />

      {/* Pattern 3 */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to left, rgba(255, 255, 255, 0.2), transparent)`,
          clipPath: `polygon(82% 0, 100% 0, 100% 100%, 58% 100%, ${focalX} ${focalY})`,
        }}
      />

      <span className="relative z-20 drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]">
        {text}
      </span>
    </button>
  );
};

export default Button;
