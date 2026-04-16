import { useState, useEffect, useMemo, useRef } from "react";

type SpriteAnimationProps = {
  image: string;
  cols: number;
  rows: number;
  width?: number | string;
  height?: number | string;
  fps?: number;
  frames?: number;
  loop?: boolean;
  onFinish?: () => void;
};

const SpriteAnimation = ({
  image,
  cols,
  rows,
  width = 200,
  height = 200,
  fps,
  frames,
  onFinish,
  loop,
}: SpriteAnimationProps) => {
  const [frame, setFrame] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const baseWidth: number = typeof width === "number" ? width : 200;
  const baseHeight: number = typeof height === "number" ? height : 200;
  const displayWidth: string = typeof width === "string" ? width : `${width}px`;
  const displayHeight: string =
    typeof height === "string" ? height : `${height}px`;

  const getPixelValue = (value: string | number): number => {
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      const num = parseFloat(value);
      if (value.includes("vmin"))
        return (num / 100) * Math.min(window.innerWidth, window.innerHeight);
      if (value.includes("vmax"))
        return (num / 100) * Math.max(window.innerWidth, window.innerHeight);
      if (value.includes("vw")) return (num / 100) * window.innerWidth;
      if (value.includes("vh")) return (num / 100) * window.innerHeight;
      return num;
    }
    return 200;
  };

  // Track pixel dimensions with RAF batching for smooth resize
  const rafRef = useRef<number | null>(null);
  const [pixelValues, setPixelValues] = useState(() => ({
    w: Math.round(getPixelValue(displayWidth)),
    h: Math.round(getPixelValue(displayHeight)),
  }));

  useEffect(() => {
    const handleResize = (): void => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        setPixelValues({
          w: Math.round(getPixelValue(displayWidth)),
          h: Math.round(getPixelValue(displayHeight)),
        });
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [displayWidth, displayHeight]);

  const displayPixelWidth: number = pixelValues.w;
  const displayPixelHeight: number = pixelValues.h;
  const config = useMemo(
    () => ({
      image,
      cols,
      rows,
      width: baseWidth,
      height: baseHeight,
      fps,
      frames,
    }),
    [image, cols, rows, baseWidth, baseHeight, fps, frames],
  );

  useEffect(() => {
    setTimeout(() => setFrame(0), 0);
  }, [image]);

  // Preload image before starting animation
  useEffect(() => {
    if (!config.image) {
      return;
    }

    let isMounted: boolean = true;
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

    const msPerFrame = 1000 / config.fps;
    let lastTime: number | null = null;
    let rafId: number;

    const tick = (timestamp: number): void => {
      if (lastTime === null) lastTime = timestamp;
      const elapsed = timestamp - lastTime;

      if (elapsed >= msPerFrame) {
        lastTime = timestamp - (elapsed % msPerFrame);
        setFrame((prevFrame) => {
          const nextFrame = prevFrame + 1;
          if (nextFrame >= config.frames) {
            if (loop) return 0;
            onFinish?.();
            return prevFrame;
          }
          return nextFrame;
        });
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [imageLoaded, config.fps, config.frames, loop, onFinish]);

  // GRID MATH
  const col: number = frame % config.cols;
  const row: number = Math.floor(frame / config.cols);
  return (
    <div
      style={{
        width: displayWidth,
        height: displayHeight,
        backgroundImage: `url(${config.image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${Math.round(displayPixelWidth * config.cols)}px ${Math.round(displayPixelHeight * config.rows)}px`,
        backgroundPosition: `-${Math.round(col * displayPixelWidth)}px -${Math.round(row * displayPixelHeight)}px`,
        imageRendering: "pixelated",
        contain: "layout paint",
        willChange: "background-position",
        transition: "none",
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
    />
  );
};

export default SpriteAnimation;
