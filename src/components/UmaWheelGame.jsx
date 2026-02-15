import { useState } from "react";
import DataBase from "../data/umamusume.json";
import Controls from "./Controls";

const UmaWheelGame = () => {
  const [winner, setWinner] = useState(null);

  const handlePickRandom = () => {
    const list = DataBase.trainees;

    const randomIndex = Math.floor(Math.random() * list.length);
    setWinner(list[randomIndex]);
  };

  return (
    <>
      <h1>{winner !== null ? winner?.name : "Spin the wheel!"}</h1>

      <Controls onSpin={handlePickRandom}></Controls>
    </>
  );
};

export default UmaWheelGame;
