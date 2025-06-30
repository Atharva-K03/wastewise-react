import React from "react";
import { OverlayTrigger, Popover as BootstrapPopover } from "react-bootstrap";

/**
 * Popover component (React Bootstrap-only)
 *
 * Components:
 * - Popover: Root structural container
 * - PopoverTrigger: Element that opens the popover on hover/focus/click
 * - PopoverContent: Inner content styled similarly to Radix
 * - PopoverAnchor: Optional anchor wrapper
 *
 * Radix styles and animations are mimicked with Bootstrap equivalents + inline CSS.
 */

// Root wrapper - for structural compatibility
function Popover({ children }) {
  return <>{children}</>;
}

// Trigger element that shows the popover
function PopoverTrigger({
  children,
  content,
  placement = "right",
  trigger = ["hover", "focus"],
  popoverId = "custom-popover",
  className = "",
  style = {},
}) {
  return (
    <OverlayTrigger
      trigger={trigger}
      placement={placement}
      overlay={
        <BootstrapPopover
          id={popoverId}
          style={{
            zIndex: 1050,
            maxWidth: "18rem",
            borderRadius: "0.375rem",
            border: "1px solid #dee2e6",
            padding: "1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
            ...style,
          }}
          className={className}
        >
          <BootstrapPopover.Body
            style={{
              padding: 0,
              color: "#212529",
              fontSize: "0.875rem",
            }}
          >
            {content}
          </BootstrapPopover.Body>
        </BootstrapPopover>
      }
    >
      {/* Trigger element (e.g., button, span, etc.) */}
      {children}
    </OverlayTrigger>
  );
}

// Used for passing custom JSX content (for structural clarity)
function PopoverContent({ children }) {
  return <>{children}</>;
}

// Anchor wrapper (optional; React Bootstrap handles positioning natively)
function PopoverAnchor({ children }) {
  return <span>{children}</span>;
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
};
