// Toggle.jsx
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

/**
 * Used to create a toggle button that can be part of a toggle group.
 *
 * Components:
 * - Toggle: Individual toggle button within the group or standalone.
 *
 * Use case:
 * - To allow users to select or deselect an option within a toggle group.
 *
 * Example:
 * ```jsx
 * <Toggle value="option1">Option 1</Toggle>
 * ```
 */

function Toggle({
  className = "",
  variant = "default", // "default" | "outline"
  size = "default",    // "sm" | "default" | "lg"
  defaultPressed = false,
  onChange,
  disabled = false,
  children,
  ...props
}) {
  const [pressed, setPressed] = useState(defaultPressed);

  const togglePressed = () => {
    const newPressed = !pressed;
    setPressed(newPressed);
    if (onChange) onChange(newPressed);
  };

  const sizeStyles = {
    sm: { height: "2rem", padding: "0 0.375rem", minWidth: "2rem", fontSize: "0.875rem" }, // h-8, px-1.5
    default: { height: "2.25rem", padding: "0 0.5rem", minWidth: "2.25rem", fontSize: "0.875rem" }, // h-9, px-2
    lg: { height: "2.5rem", padding: "0 0.625rem", minWidth: "2.5rem", fontSize: "0.875rem" }, // h-10, px-2.5
  };

  const activeStyles = pressed
    ? {
        backgroundColor: "var(--bs-primary-bg-subtle)",
        color: "var(--bs-primary-text-emphasis)",
        borderColor: "var(--bs-primary-border-subtle)",
      }
    : {};

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    fontWeight: 500,
    borderRadius: "0.375rem", // rounded-md
    transition: "all 0.2s ease-in-out",
    whiteSpace: "nowrap",
    userSelect: "none",
    pointerEvents: disabled ? "none" : "auto",
    opacity: disabled ? 0.5 : 1,
    boxShadow: "none",
    ...sizeStyles[size],
    ...(variant === "outline"
      ? {
          border: "1px solid #ced4da",
          backgroundColor: "transparent",
        }
      : { backgroundColor: "transparent" }),
    ...activeStyles,
  };

  return (
    <Button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={togglePressed}
      className={className}
      variant="light"
      style={baseStyle}
      data-slot="toggle"
      {...props}
    >
      {children}
    </Button>
  );
}

export { Toggle };
