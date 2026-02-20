function Controls({ onSpin, traineeCount }) {
  const isValid = traineeCount === 8;

  return (
    <>
      <div>
        <button
          onClick={onSpin}
          disabled={!isValid}
          className={!isValid ? "opacity-50 cursor-not-allowed" : ""}
        >
          Spin the wheel!
        </button>
        {!isValid && (
          <p className="text-red-600 text-sm mt-2">
            Select exactly 8 trainees to spin
          </p>
        )}
      </div>
    </>
  );
}

export default Controls;
