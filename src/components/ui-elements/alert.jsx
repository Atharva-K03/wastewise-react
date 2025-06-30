// Alert.jsx

import React from "react";
import { Alert as BootstrapAlert } from "react-bootstrap";

/**
 * Fully styled Alert component using React Bootstrap.
 * Features:
 * - Matches original Tailwind styles (grid, spacing, font, alignment)
 * - Supports variants like "destructive"
 * - Title and description alignment
 * - Supports optional icon (manual insertion)
 */

const Alert = ({
  variant = "default",
  className = "",
  children,
  style = {},
  ...props
}) => {
  const isDestructive = variant === "destructive";

  return (
    <BootstrapAlert
      variant={isDestructive ? "danger" : "light"}
      role="alert"
      style={{
        display: "grid",
        gridTemplateColumns: "0 1fr",
        gap: "0.25rem 0.75rem",
        alignItems: "start",
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
        position: "relative",
        border: "1px solid #dee2e6",
        color: isDestructive ? "#dc3545" : "#212529",
        backgroundColor: isDestructive ? "#fff" : "#f8f9fa",
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </BootstrapAlert>
  );
};

const AlertTitle = ({ children, className = "", style = {}, ...props }) => {
  return (
    <div
      style={{
        gridColumnStart: 2,
        fontWeight: 500,
        lineHeight: 1.25,
        minHeight: "1rem",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

const AlertDescription = ({ children, className = "", style = {}, ...props }) => {
  return (
    <div
      style={{
        gridColumnStart: 2,
        fontSize: "0.875rem",
        color: "#6c757d",
        display: "grid",
        gap: "0.25rem",
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

export { Alert, AlertTitle, AlertDescription };
