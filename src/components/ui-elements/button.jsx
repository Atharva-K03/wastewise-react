import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";

/**
 * Button component for WasteWise using React Bootstrap
 * 100% styling match with original Tailwind + Radix Button
 */

const variantStyles = {
  default: {
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  destructive: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
  },
  outline: {
    backgroundColor: "#fff",
    border: "1px solid #dee2e6",
    color: "#212529",
  },
  secondary: {
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "#212529",
  },
  link: {
    backgroundColor: "transparent",
    color: "#0d6efd",
    textDecoration: "underline",
  },
};

const sizeStyles = {
  default: {
    height: "2.25rem",
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    borderRadius: "0.375rem",
  },
  sm: {
    height: "2rem",
    padding: "0.375rem 0.75rem",
    fontSize: "0.875rem",
    borderRadius: "0.375rem",
  },
  lg: {
    height: "2.5rem",
    padding: "0.5rem 1.5rem",
    fontSize: "0.875rem",
    borderRadius: "0.375rem",
  },
  icon: {
    width: "2.25rem",
    height: "2.25rem",
    padding: "0",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    borderRadius: "50%",
  },
};

const Button = ({
  variant = "default",
  size = "default",
  children,
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    whiteSpace: "nowrap",
    fontWeight: "500",
    outline: "none",
    transition: "all 0.2s ease-in-out",
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? "none" : "auto",
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  return (
    <BootstrapButton
      as="button"
      style={baseStyle}
      className={className}
      disabled={disabled}
      data-slot="button"
      {...props}
    >
      {children}
    </BootstrapButton>
  );
};

export default Button;
