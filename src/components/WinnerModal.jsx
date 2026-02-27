const WinnerModal = ({ winnerData, onClose }) => {
  if (!winnerData) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-950/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className=" p-8" onClick={(e) => e.stopPropagation()}>
        <div>
          <img src={winnerData.image} alt="winner" />
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
