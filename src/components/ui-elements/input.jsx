import React from "react";
import { FormControl } from "react-bootstrap";

/**
 * Input component using React Bootstrap
 * Fully mimics original Tailwind-based version with:
 * - Focus ring
 * - aria-invalid styling
 * - File input customization
 * - Dark mode safe background
 * - Disabled state
 * - Inline styles for total control
 */

function Input({ className = "", type = "text", style = {}, ...props }) {
  const isFile = type === "file";
  const isInvalid = props["aria-invalid"] === true || props["aria-invalid"] === "true";
  const isDisabled = props.disabled;

  const baseStyles = {
    height: "2.25rem", // h-9
    width: "100%",
    minWidth: 0,
    borderRadius: "0.375rem", // rounded-md
    border: "1px solid",
    borderColor: isInvalid ? "#dc3545" : "#ced4da", // red if invalid
    backgroundColor: "rgba(255, 255, 255, 0.9)", // matches light bg
    padding: "0.25rem 0.75rem", // py-1 px-3
    fontSize: "1rem", // text-base
    fontWeight: 400,
    boxShadow: "inset 0 0 0 transparent",
    color: "#212529", // text color
    transition: "all 0.2s ease-in-out",
    outline: "none",
    opacity: isDisabled ? 0.5 : 1,
    pointerEvents: isDisabled ? "none" : "auto",
    cursor: isDisabled ? "not-allowed" : "text",
    ...(!isFile && {
      "::selection": {
        backgroundColor: "#0d6efd", // selection:bg-primary
        color: "#fff", // selection:text-primary-foreground
      },
    }),
    ...style,
  };

  const fileStyles = {
    height: "1.75rem", // file:h-7
    fontSize: "0.875rem", // file:text-sm
    fontWeight: 500, // file:font-medium
    backgroundColor: "transparent",
    border: "none",
    paddingLeft: 0,
    paddingRight: 0,
    color: "#212529",
    ...style,
  };

  const focusStyle = (e) => {
    if (!isFile) {
      e.target.style.borderColor = "#0d6efd"; // ring color
      e.target.style.boxShadow = isInvalid
        ? "0 0 0 3px rgba(220, 53, 69, 0.25)"
        : "0 0 0 3px rgba(13, 110, 253, 0.25)";
    }
  };

  const blurStyle = (e) => {
    if (!isFile) {
      e.target.style.borderColor = isInvalid ? "#dc3545" : "#ced4da";
      e.target.style.boxShadow = "none";
    }
  };

  return (
    <FormControl
      type={type}
      data-slot="input"
      className={className}
      style={isFile ? fileStyles : baseStyles}
      onFocus={focusStyle}
      onBlur={blurStyle}
      {...props}
    />
  );
}

export { Input };
