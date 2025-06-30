import React from "react";
import { FormLabel } from "react-bootstrap";

/**
 * Label Component (React Bootstrap)
 * 100% Equivalent to Tailwind + Radix original
 */
function Label({
  className = "",
  disabled = false,
  style = {},
  ...props
}) {
  const combinedStyle = {
    display: "flex",              // flex
    alignItems: "center",         // items-center
    gap: "0.5rem",                // gap-2
    fontSize: "0.875rem",         // text-sm
    lineHeight: "1",              // leading-none
    fontWeight: 500,              // font-medium
    userSelect: "none",           // select-none
    opacity: disabled ? 0.5 : 1,  // disabled styles
    pointerEvents: disabled ? "none" : "auto",
    cursor: disabled ? "not-allowed" : "inherit",
    ...style,
  };

  return (
    <FormLabel
      data-slot="label"
      className={className}
      style={combinedStyle}
      {...props}
    />
  );
}

export { Label };
