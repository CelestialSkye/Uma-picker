import { useEffect, useState, useRef } from "react";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const useSpritePreload = (spriteConfig) => {
  const [spritesLoaded, setSpritesLoaded] = useState(false);
  const imagesRef = useRef([]);

  useEffect(() => {
    if (!spriteConfig || Object.keys(spriteConfig).length === 0) {
      setSpritesLoaded(true);
      return;
    }

    const sprites = Object.values(spriteConfig);
    let loadedCount = 0;
    const loadedImages = [];

    sprites.forEach((anim) => {
      const img = new Image();
      loadedImages.push(img); // reference to prevent garbage collection

      const handleDone = () => {
        loadedCount++;
        if (loadedCount === sprites.length) {
          setSpritesLoaded(true);
        }
      };

      if (isMobile) {
        // On mobile, skip .decode() — forcing GPU decompression of large sprites
        // (e.g. 17MB idle.png = ~108MB RAM) crashes iOS Safari
        img.onload = handleDone;
        img.onerror = handleDone;
        img.src = anim.file;
      } else {
        img.src = anim.file;
        img.decode().then(handleDone).catch((err) => {
          console.error("Sprite failed to decode:", anim.file, err);
          handleDone();
        });
      }
    });

    // store images in ref to keep them in memory
    imagesRef.current = loadedImages;
  }, [spriteConfig]);

  return { spritesLoaded };
};
