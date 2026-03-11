import { useEffect, useState, useRef } from "react";

export const useImagePreload = (imageSources) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imagesRef = useRef([]);

  useEffect(() => {
    if (
      !imageSources ||
      (Array.isArray(imageSources) && imageSources.length === 0)
    ) {
      setIsLoaded(true);
      return;
    }

    const sources = Array.isArray(imageSources) ? imageSources : [imageSources];
    let loadedCount = 0;
    const loadedImages = [];

    sources.forEach((src) => {
      const img = new Image();
      img.src = src;
      loadedImages.push(img); // reference to prevent garbage collection

      // .decode() ensures the image is uncompressed and uploaded to gpu
      img
        .decode()
        .then(() => {
          loadedCount++;
          if (loadedCount === sources.length) {
            setIsLoaded(true);
          }
        })
        .catch((err) => {
          console.error(`Preload failed for: ${src}`, err);
          setError(true);
          loadedCount++;
          if (loadedCount === sources.length) {
            setIsLoaded(true);
          }
        });
    });

    // store images in ref to keep them in memory
    imagesRef.current = loadedImages;
  }, [imageSources]);

  return { isLoaded, error };
};
