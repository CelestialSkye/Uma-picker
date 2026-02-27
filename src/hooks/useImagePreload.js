import { useEffect, useState } from "react";

/**
 * Hook to preload images and track loading state
 * @param {string|string[]} imageSources - Single image URL or array of URLs
 * @returns {object} { isLoaded: boolean, error: boolean }
 */
export const useImagePreload = (imageSources) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!imageSources) {
      setIsLoaded(false);
      return;
    }

    const sources = Array.isArray(imageSources) ? imageSources : [imageSources];
    let loadedCount = 0;
    const totalCount = sources.length;

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === totalCount) {
        setIsLoaded(true);
      }
    };

    const handleError = () => {
      setError(true);
      setIsLoaded(true);
    };

    sources.forEach((src) => {
      const img = new Image();
      img.onload = handleLoad;
      img.onerror = handleError;
      img.src = src;
    });

    return () => {
      // Cleanup
      loadedCount = 0;
    };
  }, [imageSources]);

  return { isLoaded, error };
};
