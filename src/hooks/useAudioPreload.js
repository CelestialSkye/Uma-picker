import { useEffect, useRef, useState } from "react";

export const useAudioPreload = (audioSources) => {
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const audiosRef = useRef({});

  useEffect(() => {
    if (!audioSources || audioSources.length === 0) {
      setIsAudioLoaded(true);
      return;
    }

    const sources = Array.isArray(audioSources) ? audioSources : [audioSources];
    let loadedCount = 0;
    const audios = {};

    sources.forEach((src) => {
      const audio = new Audio();

      const handleReady = () => {
        loadedCount++;
        if (loadedCount === sources.length) {
          setIsAudioLoaded(true);
        }
      };

      // canplaythrough means the browser has buffered enough to play without interruption
      audio.addEventListener("canplaythrough", handleReady, { once: true });
      audio.addEventListener("error", () => {
        console.error(`Preload failed for audio: ${src}`);
        handleReady();
      }, { once: true });

      audio.preload = "auto";
      audio.src = src;
      audio.load();

      audios[src] = audio;
    });

    // Store immediately so handlers have access before load completes
    audiosRef.current = audios;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount — sources are static

  return { isAudioLoaded, audiosRef };
};
