import React from "react";
import "./Wheel.css";
import UmaWheelGame from "./UmaWheelGame";

const Wheel = ({ items, rotation }) => {
  const sliceAngle = 360 / items.length;

  return (
    <div className="relative w-96 h-96">
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-3xl z-10 text-gray-800">
        ▼
      </div>
      <div
        className="w-full h-full rounded-full relative overflow-hidden border-8 border-gray-800 
          transition-transform duration-1000 ease-out "
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="absolute w-1/2 h-1/2 top-0 right-0 origin-[0%_100%] flex items-center justify-center"
            style={{
              transform: `rotate(${index * sliceAngle}deg)`,

              backgroundColor: index % 2 === 0 ? "#ff6b6b" : "#feca57",
            }}
          >
            <span className="font-bold text-white drop-shadow-md rotate-45 text-center px-2 text-sm">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wheel;
