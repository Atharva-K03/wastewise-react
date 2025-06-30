// Tooltip.jsx

import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

/**
 * Used to create a tooltip component that can display additional information on hover or focus.
 *
 * Components:
 * - TooltipWrapper: The main tooltip wrapper that uses OverlayTrigger.
 * - TooltipTrigger: The element that triggers the tooltip.
 * - TooltipContent: The content inside the tooltip.
 *
 * Use case:
 * - To provide additional information or context to users when they hover over or focus on an element.
 *
 * Example:
 * ```jsx
 * <TooltipWrapper content="Additional information">
 *   <button>Hover or focus me</button>
 * </TooltipWrapper>
 * ```
 */

function TooltipWrapper({
  content,
  children,
  placement = "top", // top, bottom, left, right
  delay = { show: 0, hide: 0 },
  ...props
}) {
  return (
    <OverlayTrigger
      placement={placement}
      delay={delay}
      overlay={
        <Tooltip
          data-slot="tooltip-content"
          style={{
            backgroundColor: "var(--bs-primary)",
            color: "var(--bs-primary-contrast, white)",
            fontSize: "0.75rem",              // text-xs
            padding: "0.375rem 0.75rem",       // py-1.5 px-3
            borderRadius: "0.375rem",          // rounded-md
            zIndex: 1060,                      // z-50
            whiteSpace: "nowrap",
            transition:
              "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
            transform: "scale(0.95)",
            opacity: 0,
            animation: "fadeInZoom 0.2s forwards",
          }}
          {...props}
        >
          {content}
        </Tooltip>
      }
    >
      <span data-slot="tooltip-trigger" style={{ display: "inline-block" }}>
        {children}
      </span>
    </OverlayTrigger>
  );
}

// Optional: Define keyframe animations inline using a style tag
const TooltipAnimationStyle = () => (
  <style>
    {`
      @keyframes fadeInZoom {
        0% {
          opacity: 0;
          transform: scale(0.95);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `}
  </style>
);

export { TooltipWrapper, TooltipAnimationStyle };
