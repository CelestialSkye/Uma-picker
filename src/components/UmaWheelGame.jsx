import { useEffect, useState, useCallback, Ref, useRef } from "react";
import DataBase from "../data/umamusume.json";
import Controls from "./Controls";
import Wheel from "./Wheel";

const UmaWheelGame = () => {
  const [winner, setWinner] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [rotation, setRotation] = useState(0);

  const spinSpeed = 2; // degrees per ms

  const rotationRef = useRef(0);

  const stopSpinning = useCallback(() => {
    setIsSpinning(false);
    const currentRotation = rotationRef.current; // Use the ref!

    const degreesPerSlice = 360 / DataBase.trainees.length;
    const currentPosition = (360 - (currentRotation % 360)) % 360;
    const winnerIndex = Math.floor(currentPosition / degreesPerSlice);

    setWinner(DataBase.trainees[winnerIndex]);
  }, []); // Empty dependency array = stable function

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
        stopSpinning();
      }, randomDuration);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [isSpinning, startTime, stopSpinning]);

  const handlePickRandom = () => {
    const now = Date.now();

    if (!isSpinning) {
      setIsSpinning(true);
      setStartTime(now);
    } else {
      stopSpinning();

      // //pick a winner randomly
      // const list = DataBase.trainees;
      // const randomIndex = Math.floor(Math.random() * list.length);
      // const degreesPerSlice = 360 / list.length;

      // // Calculate the stop pos
      // const targetRotation =
      //   randomIndex * degreesPerSlice + degreesPerSlice / 2;

      // const finalRotation =
      //   rotation + 360 + (targetRotation - (rotation % 360));

      // console.log("Winner:", list[randomIndex].name);
      // console.log("Target Rotation:", targetRotation);
      // console.log("Current Rotation:", rotation);
      // console.log("Current Position (wrapped):", rotation % 360);
      // console.log("Final Rotation:", finalRotation);
      // console.log("Final Position (wrapped):", finalRotation % 360);

      // setRotation(finalRotation);
      // setWinner(list[randomIndex]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-4xl font-bold text-pink-600">
        {winner ? winner.name : "Pick your next trainee"}
      </h1>

      <Wheel
        items={DataBase.trainees}
        rotation={rotation}
        isSpinning={isSpinning}
      />

      <Controls onSpin={handlePickRandom} isSpinning={isSpinning} />
    </div>
  );
};

export default UmaWheelGame;
