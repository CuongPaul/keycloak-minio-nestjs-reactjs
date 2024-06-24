import "./index.css";

const Loading = () => {
  return (
    <div className="loading__container">
      <svg width="240" height="240" viewBox="0 0 240 240">
        <circle
          r="105"
          cx="120"
          cy="120"
          fill="none"
          stroke="#000"
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray="0 660"
          strokeDashoffset="-330"
          className="loading__ring loading__ring--a"
        />
        <circle
          r="35"
          cx="120"
          cy="120"
          fill="none"
          stroke="#000"
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray="0 220"
          strokeDashoffset="-110"
          className="loading__ring loading__ring--b"
        />
        <circle
          r="70"
          cx="85"
          cy="120"
          fill="none"
          stroke="#000"
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray="0 440"
          className="loading__ring loading__ring--c"
        />
        <circle
          r="70"
          cx="155"
          cy="120"
          fill="none"
          stroke="#000"
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray="0 440"
          className="loading__ring loading__ring--d"
        />
      </svg>
    </div>
  );
};

export default Loading;
