import React, { useState, useEffect, useMemo } from "react";

const SpriteAnimation = ({
  image,
  cols,
  width,
  height,
  fps,
  frames,
  onFinish,
  loop,
}) => {
  const [frame, setFrame] = useState(0);
  const config = useMemo(
    () => ({ image, cols, width, height, fps, frames }),
    [image, cols, width, height, fps, frames],
  );

  useEffect(() => {
    if (!config.fps || !config.frames) return;

    const msPerFrame = Math.floor(1000 / config.fps);

    const ticker = setInterval(() => {
      setFrame((prevFrame) => {
        const nextFrame = prevFrame + 1;
        if (nextFrame >= config.frames) {
          if (loop) {
            return 0;
          } else {
            onFinish?.();
            return prevFrame;
          }
        }
        return nextFrame;
      });
    }, msPerFrame);

    return () => {
      clearInterval(ticker);
    };
  }, [config.image, config.fps, config.frames, loop, onFinish]);

  // GRID MATH
  const col = frame % config.cols;
  const row = Math.floor(frame / config.cols);

  return (
    <div
      style={{
        width: `${config.width}px`,
        height: `${config.height}px`,
        backgroundImage: `url(${config.image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${config.width * config.cols}px auto`,
        backgroundPosition: `-${col * config.width}px -${row * config.height}px`,
        imageRendering: "pixelated",
      }}
    />
  );
};

export default SpriteAnimation;
