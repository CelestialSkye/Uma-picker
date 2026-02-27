import "./LoadingSpinner.css";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      <p className="loading-text">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
