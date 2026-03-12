import { FaGithub } from "react-icons/fa";

const Links = () => {
  return (
    <div className="fixed top-0 right-0 p-6 z-50">
      <a
        href="https://github.com/CelestialSkye/Uma-picker"
        target="_blank"
        rel="noopener noreferrer"
        className="text-inherit"
      >
        <FaGithub size={32} className="text-white" />
      </a>
    </div>
  );
};

export default Links;
