import React from "react";

const UmaCard = ({ children, className = "", style = {} }) => {
  // Pattern
  const glassLinesStyle = {
    background: `repeating-linear-gradient(
      135deg,
      #f1f1f7,
      #f1f1f7 10px,
      #e8e8f2 10px,
      #e8e8f2 20px
    )`,
  };

  const thickGlassBorderStyle = {
    background: `linear-gradient(to bottom, #f8f8fb 0%, #c5c5d9 50%, #ffffff 50%, #ffffff 100%)`,
    boxShadow: `0 0 0 1.5px rgba(160, 160, 180, 0.4), 0 10px 20px -5px rgba(0, 0, 0, 0.15)`,
    ...style,
  };

  return (
    <div
      className={`relative rounded-[16px] p-1.5 flex items-center justify-center border border-[#8a8d91] ${className}`}
      style={thickGlassBorderStyle}
    >
      {/* Inner stripe area */}
      <div
        className="relative w-full h-full rounded-[12px] border border-white/80 shadow-[inset_0_2px_8px_rgba(0,0,0,0.08)]"
        style={glassLinesStyle}
      >
        {/* Glossy reflection overlay  */}
        <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none z-10 bg-gradient-to-b from-white/70 to-transparent" />

        {/* Content area */}
        <div className="relative w-full h-full z-0 flex items-center justify-center ">
          {children || (
            <div className="w-full h-full bg-gradient-to-b from-transparent to-white/20" />
          )}
        </div>
      </div>
    </div>
  );
};

export default UmaCard;
