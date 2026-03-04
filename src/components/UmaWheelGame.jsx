import { useEffect, useState, useCallback, useRef } from "react";
import DataBase from "../data/umamusume.json";
import Wheel from "./Wheel";
import TraineeFilter from "./TraineeFilter";
import Button from "./Button";
import WinnerModal from "./WinnerModal";
import { useImagePreload } from "../hooks/useImagePreload";
import { useAudioPreload } from "../hooks/useAudioPreload";
import MuteButton from "./MuteButton";

// Static arrays defined outside component to prevent re-creation on every render
const SOUND_EFFECTS = [
  "/SoundEffects/spin-sound.wav",
  "/SoundEffects/winner-sound.wav",
];
const TRAINEE_IMAGES = DataBase.trainees.map((t) => t.image);

const UmaWheelGame = () => {
  const [winner, setWinner] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isWinnerOpen, setIsWinnerOpen] = useState(false);
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [selectedTrainees, setSelectedTrainees] = useState(
    DataBase.trainees.map((t) => t.id),
  );
  const [isMuted, setIsMuted] = useState(true);
  //Bg music
  const bgMusic = useRef(new Audio("/SoundEffects/bgMusic.wav"));
  // Preload all trainee images
  useImagePreload(TRAINEE_IMAGES);

  // Preload all sound effects and get the Audio objects back for direct playback
  const { audiosRef } = useAudioPreload(SOUND_EFFECTS);

  // Track if sprites are loaded
  const [spritesLoaded, setSpritesLoaded] = useState(false);

  const spinSpeed = 1; // degrees per ms

  const rotationRef = useRef(0);
  const shouldResetIntroRef = useRef(false);
  const performStopRef = useRef(null);

  //Mute function
  useEffect(() => {
    const music = bgMusic.current;
    music.loop = true;
    music.volume = 0.15;

    return () => music.pause();
  }, []);

  useEffect(() => {
    if (isMuted === false) {
      bgMusic.current.play().catch(() => console.log("Music is playing"));
    } else {
      bgMusic.current.pause();
    }
    bgMusic.current.muted = isMuted;
  }, [isMuted]);

  const toggleMute = () => {
    console.log("Button clicked! Previous state:", isMuted);
    setIsMuted((prevMuted) => !prevMuted);
  };

  //Stop spinning function
  const performStop = useCallback(() => {
    const spinAudio = audiosRef.current[SOUND_EFFECTS[0]];
    const winnerAudio = audiosRef.current[SOUND_EFFECTS[1]];

    // Stop spin sound immediately
    try {
      spinAudio?.pause();
      if (spinAudio) spinAudio.currentTime = 0;
    } catch (e) {
      console.log("Error stopping spin sound:", e);
    }

    setIsSpinning(false);

    // Play winner sound immediately
    try {
      if (winnerAudio) {
        winnerAudio.currentTime = 0;
        winnerAudio.play().catch(() => {});
      }
    } catch (e) {
      console.log("Error playing winner sound:", e);
    }

    const currentRotation = rotationRef.current;

    const filteredTrainees = DataBase.trainees.filter((t) =>
      selectedTrainees.includes(t.id),
    );
    const degreesPerSlice = 360 / filteredTrainees.length;
    const currentPosition = (360 - (currentRotation % 360)) % 360;
    const winnerIndex = Math.floor(currentPosition / degreesPerSlice);

    setWinner(filteredTrainees[winnerIndex]);
    //This is to open the Winner modal
    setIsWinnerOpen(true);
  }, [selectedTrainees, audiosRef]);

  // Keep ref updated with latest performStop to avoid dependency issues
  useEffect(() => {
    performStopRef.current = performStop;
  }, [performStop]);

  useEffect(() => {
    const shouldReset = winner === null || isSpinning;
    if (shouldReset && !shouldResetIntroRef.current) {
      shouldResetIntroRef.current = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsIntroFinished(false);
    } else if (!shouldReset) {
      shouldResetIntroRef.current = false;
    }
  }, [winner, isSpinning]);

  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newRotation = elapsed * spinSpeed;
        setRotation(newRotation);
        rotationRef.current = newRotation;
      }, 50);

      // should stop the loop after a random short timer
      const randomDuration = 4000 + Math.random() * 5000;
      const timer = setTimeout(() => {
        performStopRef.current?.();
      }, randomDuration);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [isSpinning, startTime]);

  const handlePickRandom = () => {
    const now = Date.now();

    if (!isSpinning) {
      // play the wheel spin sound effect immediately
      try {
        const spinAudio = audiosRef.current[SOUND_EFFECTS[0]];
        if (spinAudio) {
          spinAudio.currentTime = 0;
          spinAudio.play().catch(() => {});
        }
      } catch (e) {
        console.log("Audio play error:", e);
      }

      setIsSpinning(true);
      setStartTime(now);
    } else {
      performStop();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-black-900 relative">
      {!spritesLoaded && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-75">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* <h1 className="text-4xl font-bold text-pink-600">
        {winner ? winner.name : ""}
        {console.log(winner ? winner.name : "")}
      </h1> */}

      <Wheel
        items={DataBase.trainees.filter((t) => selectedTrainees.includes(t.id))}
        rotation={rotation}
        isSpinning={isSpinning}
        onSpin={handlePickRandom}
        traineeCount={selectedTrainees.length}
        winner={winner}
        isIntroFinished={isIntroFinished}
        setIsIntroFinished={setIsIntroFinished}
        onSpritesLoaded={() => setSpritesLoaded(true)}
      />

      <Button
        onClick={() => setIsFilterOpen(true)}
        className="mt-8 px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg w-48"
      ></Button>

      <MuteButton isMuted={isMuted} toggleMute={toggleMute} />

      {isFilterOpen && (
        <TraineeFilter
          allTrainees={DataBase.trainees}
          selectedTrainees={selectedTrainees}
          onClose={() => setIsFilterOpen(false)}
          onConfirm={(newSelection) => {
            setSelectedTrainees(newSelection);
          }}
        />
      )}

      {isWinnerOpen && (
        <WinnerModal
          winnerData={winner}
          onClose={() => {
            setIsWinnerOpen(false);
            setWinner(null);
          }}
        />
      )}
    </div>
  );
};

export default UmaWheelGame;
