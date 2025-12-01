import React from "react";

const Shipment = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 5H10V13H2V5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 7H13L16 10V13H10V7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="5"
        cy="13"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="13"
        cy="13"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default Shipment;
