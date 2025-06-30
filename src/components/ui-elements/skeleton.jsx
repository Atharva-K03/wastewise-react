import React, { useEffect } from "react";

/**
 * 100% Match: Skeleton (React Bootstrap only, matches original Tailwind+Radix)
 * - Includes pulse animation like Tailwind's `animate-pulse`
 * - Rounded corners like `rounded-md` (6px)
 * - Accent background color can be customized
 * - Fully self-contained, inline CSS-injected
 */

export function Skeleton({ className = "", style = {}, accentColor = "#f0f0f0", height = "1.25rem", ...props }) {
  useEffect(() => {
    const styleTagId = "skeleton-inline-style";
    if (!document.getElementById(styleTagId)) {
      const styleEl = document.createElement("style");
      styleEl.id = styleTagId;
      styleEl.innerHTML = `
        @keyframes skeleton-pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
        .skeleton-pulse {
          animation: skeleton-pulse 1.5s ease-in-out infinite;
        }
      `;
      document.head.appendChild(styleEl);
    }
  }, []);

  return (
    <div
      data-slot="skeleton"
      className={`skeleton-pulse ${className}`}
      style={{
        backgroundColor: accentColor,           // match bg-accent
        borderRadius: "0.375rem",               // match rounded-md
        height: height,                         // match default height
        width: "100%",                          // optional, customizable
        ...style
      }}
      {...props}
    />
  );
}
