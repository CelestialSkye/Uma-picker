const WinnerModal = ({ winnerData, onClose }) => {
  if (!winnerData) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-white text-4xl font-black mb-6 drop-shadow-lg uppercase tracking-tighter italic">
          {winnerData.name}
        </h1>

        <img
          src={winnerData.image}
          alt="winner"
          className="
            w-[70vw]           /* Take up 70% of screen width on small devices */
            max-w-[100px]      /* Never grow larger than 500px on desktop */
            min-w-[50px]      /* Never shrink smaller than 250px */
            h-auto             /* Maintain aspect ratio */
            object-contain     /* Ensure the whole image fits without cropping */
            drop-shadow-2xl    /* Make the character pop off the background */
          "
        />

        <p className="text-white/60 mt-8 font-bold animate-pulse">
          CLICK ANYWHERE TO CLOSE
        </p>
      </div>
    </div>
  );
};

export default WinnerModal;
