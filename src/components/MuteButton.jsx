const MuteButton = ({ isMuted, toggleMute }) => {
  return (
    <div className="fixed top-0 left-0 p-4 z-50">
      <label className="relative inline-flex cursor-pointer items-center group">
        <input
          onChange={toggleMute}
          checked={!isMuted}
          type="checkbox"
          className="peer sr-only"
        />
        <span className="pr-3 font-bold text-white">Music</span>

        {/* The Track (h-7 = 28px) */}
        <div
          className="peer relative h-7 w-16 rounded-full bg-slate-300 transition-all 
          peer-checked:bg-[linear-gradient(to_bottom,#539608_0%,#95DB09_100%)]
          
          shadow-[inset_0_2px_4px_rgba(83,150,8,0.6)]
          tracking-wide
          /* the 'OFF' text */
          before:absolute before:tracking-widest before:right-2 before:top-1/2 before:-translate-y-1/2 before:text-[14px] before:font-bold before:text-white before:content-['OFF']
          
          /* Tte 'ON' text */
          peer-checked:before:left-2 before:tracking-widest peer-checked:before:right-auto peer-checked:before:content-['ON']
          
          /* The Sliding Circle (h-9 = 36px) */
after:absolute after:left-[-4px] after:top-1/2 after:h-7 after:w-7 
after:-translate-y-1/2 after:rounded-full after:transition-all after:content-['']
after:shadow-md after:border after:border-gray-400/50

/* The Half-Circle Shadow/Reflection Effect */
after:bg-[linear-gradient(135deg,#ffffff_50%,#F0EFF0_50%)]

          /* The Slide: Moves the circle to the right side */
          peer-checked:after:translate-x-10 peer-checked:after:-translate-y-1/2"
        ></div>
      </label>
    </div>
  );
};

export default MuteButton;
