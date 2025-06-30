// components/Badge.jsx

import React from "react";
import { Badge as BootstrapBadge } from "react-bootstrap";

/**
 * Badge component mimicking Radix + Tailwind styles using React Bootstrap only.
 * Handles variants: default, secondary, destructive, outline.
 */

const variantStyles = {
  default: {
    backgroundColor: "#0d6efd", // Bootstrap primary
    color: "#fff",
    hover: "#0b5ed7",
  },
  secondary: {
    backgroundColor: "#6c757d", // Bootstrap secondary
    color: "#fff",
    hover: "#5c636a",
  },
  destructive: {
    backgroundColor: "#dc3545", // Bootstrap danger
    color: "#fff",
    hover: "#bb2d3b",
  },
  outline: {
    backgroundColor: "transparent",
    color: "#212529", // text-dark
    border: "1px solid #212529",
    hover: "#e2e6ea",
  },
};

const Badge = ({
  variant = "default",
  className = "",
  children,
  as: Component = "span",
  ...props
}) => {
  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 8px", // matches px-2 py-0.5 (Tailwind)
    fontSize: "0.75rem", // text-xs
    fontWeight: 500,
    borderRadius: "6px", // rounded-md
    whiteSpace: "nowrap",
    gap: "4px",
    lineHeight: "1",
    transition: "all 0.2s ease-in-out",
    ...variantStyles[variant],
    ...(variant === "outline" && { backgroundColor: "transparent" }),
  };

  return (
    <Component
      data-slot="badge"
      style={style}
      className={className}
      role="status"
      {...props}
    >
      {children}
    </Component>
  );
};

export default Badge;
