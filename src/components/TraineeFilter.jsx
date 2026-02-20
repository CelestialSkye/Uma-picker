import { useState } from "react";

const TraineeFilter = ({
  allTrainees,
  onClose,
  selectedTrainees,
  onConfirm,
}) => {
  const [selected, setSelected] = useState(selectedTrainees);
  const requiredTrainees = 8;

  const handleToggle = (traineeId) => {
    let newSelected;

    if (selected.includes(traineeId)) {
      newSelected = selected.filter((id) => id !== traineeId);
    } else {
      newSelected = [...selected, traineeId];
    }

    setSelected(newSelected);
    onConfirm(newSelected);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-5000" onClick={onClose}>
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5000 bg-white rounded-lg p-6 max-h-[80vh] overflow-y-auto text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>
          Select your trainees ({selected.length} / {requiredTrainees})
          {selected.length !== requiredTrainees && (
            <p className="text-red-600 text-sm font-semibold">
              Must select exactly {requiredTrainees} trainees
            </p>
          )}
        </h2>

        {allTrainees.map((trainee) => (
          <label key={trainee.id}>
            <input
              type="checkbox"
              checked={selected.includes(trainee.id)}
              onChange={() => handleToggle(trainee.id)}
            />
            {trainee.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TraineeFilter;
