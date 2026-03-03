const MuteButton = ({ isMuted, toggleMute }) => {
  return (
    <div className="game-container">
      <button onClick={toggleMute} className="mute-btn">
        {isMuted ? "🔇 Muted" : "🔊 Playing"}
      </button>
    </div>
  );
};

export default MuteButton;
