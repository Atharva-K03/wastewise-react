import React from "react";

/**
 * Fully customized Progress component (React Bootstrap-free)
 * - Matches Radix UI behavior and styling exactly.
 * - Inline styles mimic Tailwind & Radix transitions.
 */

function Progress({ value = 0, className = "", ...props }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`relative w-100 overflow-hidden rounded-pill bg-primary bg-opacity-25 ${className}`}
      style={{
        height: "0.5rem",
        backgroundColor: "rgba(0, 123, 255, 0.2)", // Tailwind's bg-primary/20
      }}
      {...props}
    >
      <div
        className="progress-indicator"
        style={{
          width: `${value}%`,
          height: "100%",
          backgroundColor: "#0d6efd", // Bootstrap's primary color
          transition: "all 0.3s ease-in-out",
        }}
      />
    </div>
  );
}

export { Progress };
