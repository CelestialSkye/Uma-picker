import React from "react";

const Button = ({
  onClick,
  text = "Filter",
  className = "",
  disabled = false,
}) => {
  const focalX = "70%";
  const focalY = "50%";

  // Dynamic Colors
  const background = disabled
    ? "linear-gradient(to bottom, #d1d5db 0%, #9ca3af 100%)"
    : "linear-gradient(to bottom, #89d900 0%, #72ba00 100%)";

  const boxShadow = disabled
    ? `inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 4px 0px #6b7280`
    : `inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 4px 0px #4e8000`;

  return (
    <button
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={`relative px-12 py-3 rounded-[14px] text-white font-bold text-2xl tracking-tight overflow-hidden transition-all group ${className} 
        ${
          !disabled
            ? "active:translate-y-[2px] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_2px_0px_#4e8000] hover:brightness-110 cursor-pointer"
            : "cursor-not-allowed grayscale-[0.5] opacity-90"
        }`}
      style={{
        fontFamily:
          "'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif",
        background: background,
        boxShadow: boxShadow,
        border: disabled ? "2px solid #6b7280" : "2px solid #3f6f00",
      }}
    >
      {/* Pattern 1 */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${focalX} ${focalY}, rgba(0, 0, 0, ${disabled ? 0.08 : 0.18}) 0%, transparent 60%)`,
          clipPath: `polygon(0 0, 55% 0, ${focalX} ${focalY}, 58% 100%, 0 100%)`,
        }}
      />

      {/* Pattern 2 */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: disabled
            ? "linear-gradient(to right, #9ca3af 0%, #d1d5db 100%)"
            : "linear-gradient(to right, #4e8000 0%, #b4f000 100%)",
          clipPath: `polygon(55% 0, 82% 0, ${focalX} ${focalY})`,
        }}
      />

      {/* Pattern 3  */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: disabled
            ? "linear-gradient(to right, #6b7280 0%, #d1d5db 100%)"
            : "linear-gradient(to right, #3f6f00 0%, #a3e635 100%)",
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
