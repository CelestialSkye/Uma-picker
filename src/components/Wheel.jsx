import { useEffect, useState, useCallback } from "react";
import "./Wheel.css";
import TapButton from "../assets/TapButton.png";
import SkipButton from "../assets/SkipButton.png";
import RedShape from "../assets/redShape.svg";
import SpriteAnimation from "./SpriteAnimation";
import { MAMBO_ANIMS } from "../data/SPRITE_CONFIG";
import LoadingSpinner from "./LoadingSpinner";

const Wheel = ({
  items,
  rotation,
  onSpin,
  isSpinning,
  traineeCount,
  winner,
  isIntroFinished,
  setIsIntroFinished,
}) => {
  const [spritesLoaded, setSpritesLoaded] = useState(false);
  const sliceAngle = 360 / items.length;
  const innerRadius = 50;

  // Memoize the onFinish callback to prevent infinite effect loops
  const handleAnimationFinish = useCallback(() => {
    // Defer state update to avoid updating parent during child render
    setTimeout(() => setIsIntroFinished(true), 0);
  }, [setIsIntroFinished]);

  useEffect(() => {
    if (isSpinning || !winner) {
      setIsIntroFinished(false);
    }
  }, [isSpinning, winner, setIsIntroFinished]);

  // Preload all sprite images properly
  useEffect(() => {
    const sprites = Object.values(MAMBO_ANIMS);
    let loadedCount = 0;

    sprites.forEach((anim) => {
      const img = new Image();
      img.src = anim.file;

      img
        .decode()
        .then(() => {
          loadedCount++;
          if (loadedCount === sprites.length) {
            setSpritesLoaded(true);
          }
        })
        .catch((err) => {
          console.error("Sprite failed to decode:", anim.file, err);
          loadedCount++;
          if (loadedCount === sprites.length) {
            setSpritesLoaded(true);
          }
        });
    });
  }, []);

  // Determine animation type based on game state
  const getAnimationType = () => {
    if (isSpinning) return "RUNNING";
    if (winner) {
      return isIntroFinished ? "WINNER_LOOP" : "WINNER";
    }
    return "IDLE";
  };

  const animationType = getAnimationType();
  const currentAnim = MAMBO_ANIMS[animationType] || MAMBO_ANIMS["IDLE"];

  const getRingClipPath = (index) => {
    const startAngle = index * sliceAngle - 90;
    const steps = 20;

    const points = [];

    // Outer arc
    for (let i = 0; i <= steps; i++) {
      const angle = startAngle + (i / steps) * sliceAngle;
      const rad = (angle * Math.PI) / 180;
      const x = 50 + 50 * Math.cos(rad);
      const y = 50 + 50 * Math.sin(rad);
      points.push(`${x}% ${y}%`);
    }

    // Inner arc
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
      style={{
        width: "min(72vmin, 580px)",
        height: "min(72vmin, 580px)",
        willChange: "transform",
        backfaceVisibility: "hidden",
        marginTop: "120px",
      }}
    >
      {!spritesLoaded && (
        <div
          className="absolute inset-0 z-999 flex items-center justify-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderRadius: "50%",
          }}
        >
          <LoadingSpinner text="Loading sprites..." />
        </div>
      )}
      {/* Red Shape Overlay */}
      <div className="absolute inset-0 pointer-events-none z-200">
        {Array.from({ length: 11 }).map((_, index) => {
          // add 1 to index so we skip the 0 position
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
                width: "21%",
                height: "21%",
                top: `${y}%`,
                left: `${x}%`,
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              }}
            />
          );
        })}
      </div>

      {/* Indicator (this is where the uma should be)*/}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: "-21vmin", zIndex: 9999 }}
      >
        <SpriteAnimation
          key={winner ? `winner-${winner.id}` : "not-winner"}
          image={currentAnim.file}
          cols={currentAnim.cols}
          width="24vmin"
          height="24vmin"
          fps={currentAnim.fps}
          frames={currentAnim.frames}
          loop={animationType !== "WINNER"}
          onFinish={handleAnimationFinish}
        />
      </div>

      {/* Wheel Ring */}
      <div
        className="absolute overflow-hidden border-8 border-[#FBD62D] rounded-full z-20 shadow-[0_0_0_5px_rgba(219,187,113,1),inset_0_0_0_4px_rgba(236,185,43,1)]"
        style={{
          width: "82%",
          height: "82%",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: "auto",
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning
            ? "transform 0.05s linear"
            : "transform 1.5s ease-out",
        }}
      >
        {items.map((item, index) => {
          const segmentAngle = index * sliceAngle + sliceAngle / 2 - 90;
          const rad = (segmentAngle * Math.PI) / 180;
          const distance = 36;
          const posX = 50 + distance * Math.cos(rad);
          const posY = 50 + distance * Math.sin(rad);

          return (
            <div
              key={item.id}
              className="absolute w-full h-full"
              style={{
                clipPath: getRingClipPath(index),
                backgroundColor: index % 2 === 0 ? "#EFC37D" : "#DC9A65",
              }}
            >
              {/* Positioning anchor — placed at the segment midpoint, rotated to face outward */}
              <div
                style={{
                  position: "absolute",
                  left: `${posX}%`,
                  top: `${posY}%`,
                  transform: `translate(-50%, -50%) rotate(${segmentAngle + 90}deg)`,
                  width: "15%",
                  height: "15%",
                }}
              >
                {/* Image wrapper: top extends above anchor, sides/bottom clipped */}
                <div
                  style={{
                    position: "absolute",
                    top: "-25%",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "260%",
                      flexShrink: 0,
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Button */}
      <button
        onClick={onSpin}
        disabled={!spritesLoaded || (!isSpinning && traineeCount !== 8)}
        className="absolute z-30 bg-transparent border-none p-0 outline-none flex items-center justify-center"
        style={{
          width: "calc(min(72vmin, 580px) * 0.75)",
          height: "calc(min(72vmin, 580px) * 0.75)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          transformOrigin: "center",
          clipPath: "circle(20%)",
          WebkitClipPath: "circle(20%)",
          WebkitTapHighlightColor: "transparent",
          willChange: "transform",
        }}
      >
        {isSpinning ? (
          <img
            src={SkipButton}
            alt="Skip"
            className="object-contain pointer-events-none"
            style={{
              width: "85%",
              height: "85%",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          />
        ) : (
          <img
            src={TapButton}
            alt="Spin"
            className="object-contain pointer-events-none"
            style={{
              width: "90%",
              height: "90%",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
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
