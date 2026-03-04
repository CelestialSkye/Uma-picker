import ConeLight from "../assets/lighteffect.png";

const LightEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${ConeLight})`,
          backgroundSize: "120% 100%",
          mixBlendMode: "screen",
          opacity: 0.6,
        }}
      />
    </div>
  );
};
export default LightEffect;
