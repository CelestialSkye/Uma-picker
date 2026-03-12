import { useEffect, useRef, useState } from "react";

export const useAudioPreload = (audioSources) => {
  // Audio loading doesn't block rendering — mobile browsers block canplaythrough until user interaction.
  // Audio objects are still created and fully usable for .play()/.pause() when needed.
  const [isAudioLoaded] = useState(true);
  const audiosRef = useRef({});

  useEffect(() => {
    if (!audioSources || audioSources.length === 0) return;

    const sources = Array.isArray(audioSources) ? audioSources : [audioSources];
    const audios = {};

    sources.forEach((src) => {
      const audio = new Audio();
      audio.preload = "auto";
      audio.volume = 0.5;
      audio.src = src;
      audio.load();
      audios[src] = audio;
    });

    audiosRef.current = audios;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isAudioLoaded, audiosRef };
};
