import DataBase from "./data/umamusume.json";
import "./App.css";
import UmaWheelGame from "./components/UmaWheelGame";

function App() {
  console.log("My Trainees:", DataBase.trainees);
  return (
    <>
      <h1 className="text-red-500">
        DataBase loaded {DataBase.trainees.length}
      </h1>
      <UmaWheelGame />
    </>
  );
}

export default App;
