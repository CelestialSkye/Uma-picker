import { useState, useEffect, useMemo } from "react";

const SpriteAnimation = ({
  image,
  cols,
  width = 200,
  height = 200,
  fps,
  frames,
  onFinish,
  loop,
}) => {
  const [frame, setFrame] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const baseWidth = typeof width === "number" ? width : 200;
  const baseHeight = typeof height === "number" ? height : 200;
  const displayWidth = typeof width === "string" ? width : `${width}px`;
  const displayHeight = typeof height === "string" ? height : `${height}px`;

  const getPixelValue = (value) => {
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      const num = parseFloat(value);
      if (value.includes("vmin")) return (num / 100) * Math.min(window.innerWidth, window.innerHeight);
      if (value.includes("vmax")) return (num / 100) * Math.max(window.innerWidth, window.innerHeight);
      if (value.includes("vw")) return (num / 100) * window.innerWidth;
      if (value.includes("vh")) return (num / 100) * window.innerHeight;
      return num;
    }
    return 200;
  };

  const displayPixelWidth = getPixelValue(displayWidth);
  const displayPixelHeight = getPixelValue(displayHeight);
  const config = useMemo(
    () => ({ image, cols, width: baseWidth, height: baseHeight, fps, frames }),
    [image, cols, baseWidth, baseHeight, fps, frames],
  );

  useEffect(() => {
    setTimeout(() => setFrame(0), 0);
  }, [image]);

  // Preload image before starting animation
  useEffect(() => {
    if (!config.image) {
      return;
    }

    let isMounted = true;
    const img = new Image();

    const handleLoad = () => {
      if (isMounted) setImageLoaded(true);
    };
    const handleError = () => {
      // Even on error, set as loaded to prevent infinite loading
      if (isMounted) setImageLoaded(true);
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = config.image;

    return () => {
      isMounted = false;
    };
  }, [config.image]);

  // Start animation only after image is loaded
  useEffect(() => {
    if (!imageLoaded || !config.fps || !config.frames) return;

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
  }, [imageLoaded, config.fps, config.frames, loop, onFinish]);

  // GRID MATH
  const col = frame % config.cols;
  const row = Math.floor(frame / config.cols);

  return (
    <div
      style={{
        width: displayWidth,
        height: displayHeight,
        backgroundImage: `url(${config.image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${displayPixelWidth * config.cols}px auto`,
        backgroundPosition: `-${col * displayPixelWidth}px -${row * displayPixelHeight}px`,
        imageRendering: "pixelated",
      }}
    />
  );
};

export default SpriteAnimation;
