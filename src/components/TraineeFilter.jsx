import { useState } from "react";
import Button from "./Button";

const TraineeFilter = ({
  allTrainees,
  onClose,
  selectedTrainees,
  onConfirm,
}) => {
  const [selected, setSelected] = useState(selectedTrainees);
  const [searchTerm, setSearchTerm] = useState("");

  const requiredTrainees = 8;

  const filteredTrainees = allTrainees.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleToggle = (traineeId) => {
    let newSelected = selected.includes(traineeId)
      ? selected.filter((id) => id !== traineeId)
      : [...selected, traineeId];
    setSelected(newSelected);
  };

  const handleConfirm = () => {
    if (selected.length === requiredTrainees) {
      onConfirm(selected);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[5000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[85vh] flex flex-col text-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="mb-4">
          <h2 className="text-xl font-bold">
            Select Trainees ({selected.length} / {requiredTrainees})
          </h2>

          <input
            type="text"
            placeholder="Search by name..."
            className="w-full mt-3 p-3 border-2 border-gray-100 rounded-xl focus:border-pink-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {selected.length !== requiredTrainees && (
            <p className="text-pink-600 text-sm font-semibold mt-2">
              Must select exactly {requiredTrainees} trainees
            </p>
          )}
        </div>

        {/* grid area  */}
        <div className="overflow-y-auto grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
          {filteredTrainees.map((trainee) => {
            const isSelected = selected.includes(trainee.id);
            return (
              <label
                key={trainee.id}
                className={`relative flex flex-col items-center p-3 rounded-xl cursor-pointer border-2 transition-all
                  ${isSelected ? "border-pink-500 bg-pink-50" : "border-gray-100 bg-white"}`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isSelected}
                  onChange={() => handleToggle(trainee.id)}
                />
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm mb-2">
                  <img
                    src={trainee.image}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <span className="text-[10px] font-bold text-center uppercase">
                  {trainee.name}
                </span>
                {isSelected && (
                  <div className="absolute top-1 right-1 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    ✓
                  </div>
                )}
              </label>
            );
          })}
        </div>

        <Button
          disabled={selected.length !== requiredTrainees}
          className={`mt-6 w-full py-4 rounded-xl font-bold transition-all ${
            selected.length === requiredTrainees
              ? "bg-pink-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-400"
          }`}
          onClick={handleConfirm}
          text="Confirm"
        />

        {/* <button
          disabled={selected.length !== requiredTrainees}
          className={`mt-6 w-full py-4 rounded-xl font-bold transition-all ${
            selected.length === requiredTrainees
              ? "bg-pink-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-400"
          }`}
          onClick={handleConfirm}
        >
          Confirm
        </button> */}
      </div>
    </div>
  );
};

export default TraineeFilter;
