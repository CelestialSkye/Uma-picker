import { useEffect, useState, useRef } from "react";

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
      img.src = anim.file;
      loadedImages.push(img); // reference to prevent garbage collection

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

    // store images in ref to keep them in memory
    imagesRef.current = loadedImages;
  }, [spriteConfig]);

  return { spritesLoaded };
};
