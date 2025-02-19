import React from 'react';

const PlaneIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transform rotate-45"
  >
    <path
      d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AnimatedPlanes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <style>
        {`
          @keyframes plane1 {
            from { transform: translateX(-50px); }
            to { transform: translateX(calc(100vw + 50px)); }
          }
          @keyframes plane2 {
            from { transform: translateX(calc(100vw + 50px)); }
            to { transform: translateX(-50px); }
          }
          @keyframes plane3 {
            from { transform: translateX(-50px) translateY(20px); }
            to { transform: translateX(calc(100vw + 50px)) translateY(-20px); }
          }
          @keyframes plane4 {
            from { transform: translateX(calc(100vw + 50px)) translateY(-20px); }
            to { transform: translateX(-50px) translateY(20px); }
          }
          @keyframes plane5 {
            from { transform: translateX(-50px) translateY(-20px); }
            to { transform: translateX(calc(100vw + 50px)) translateY(20px); }
          }
        `}
      </style>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute text-gray-200"
          style={{
            animation: `plane${i + 1} ${20 + i * 5}s linear infinite`,
            top: `${15 + i * 20}%`,
            left: '-50px',
            opacity: 0.3,
          }}
        >
          <PlaneIcon />
        </div>
      ))}
    </div>
  );
};

export default AnimatedPlanes;