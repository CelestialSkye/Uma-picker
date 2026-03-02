import { useEffect, useState } from "react";

export const useImagePreload = (imageSources) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // 1. Safety check for empty data
    if (
      !imageSources ||
      (Array.isArray(imageSources) && imageSources.length === 0)
    ) {
      setIsLoaded(true);
      return;
    }

    const sources = Array.isArray(imageSources) ? imageSources : [imageSources];
    let loadedCount = 0;

    // 2. Load and decode images
    sources.forEach((src) => {
      const img = new Image();
      img.src = src;

      // .decode() ensures the image is uncompressed and uploaded to GPU
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
  }, [imageSources]);

  return { isLoaded, error };
};
