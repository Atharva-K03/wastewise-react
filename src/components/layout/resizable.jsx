import React, { useRef, useState } from "react";
import { GripVertical } from "react-bootstrap-icons";

/**
 * ResizablePanelGroup:
 * Container that holds multiple resizable panels. Mimics Radix PanelGroup.
 */
export function ResizablePanelGroup({ direction = "horizontal", children, className = "", ...props }) {
  const flexDirection = direction === "vertical" ? "column" : "row";

  return (
    <div
      data-slot="resizable-panel-group"
      className={className}
      style={{
        display: "flex",
        flexDirection,
        height: "100%",
        width: "100%",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * ResizablePanel:
 * Individual panel with customizable size. Mimics Radix Panel.
 */
export function ResizablePanel({ children, initialSize = 50, minSize = 10, className = "", ...props }) {
  return (
    <div
      data-slot="resizable-panel"
      className={className}
      style={{
        flexBasis: `${initialSize}%`,
        flexGrow: 0,
        flexShrink: 0,
        overflow: "auto",
        minWidth: `${minSize}%`,
        minHeight: `${minSize}%`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * ResizableHandle:
 * Drag handle between two panels. Mimics Radix PanelResizeHandle with optional grip.
 */
export function ResizableHandle({ withHandle = true, direction = "horizontal", onDrag, className = "", ...props }) {
  const [isDragging, setDragging] = useState(false);
  const handleRef = useRef(null);
  const isVertical = direction === "vertical";

  const handleMouseDown = (e) => {
    setDragging(true);
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      if (onDrag) onDrag({ deltaX, deltaY });
    };

    const handleMouseUp = () => {
      setDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={handleRef}
      data-slot="resizable-handle"
      role="separator"
      aria-orientation={isVertical ? "horizontal" : "vertical"}
      tabIndex={0}
      onMouseDown={handleMouseDown}
      className={className}
      style={{
        cursor: isVertical ? "row-resize" : "col-resize",
        backgroundColor: "#dee2e6", // border color
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: isVertical ? "100%" : "4px",
        height: isVertical ? "4px" : "100%",
        position: "relative",
        outline: "none",
        zIndex: 1,
      }}
      onFocus={(e) => {
        e.target.style.boxShadow = "0 0 0 1px #6366f1"; // focus-visible:ring-ring
      }}
      onBlur={(e) => {
        e.target.style.boxShadow = "none";
      }}
      {...props}
    >
      {withHandle && (
        <div
          style={{
            backgroundColor: "#dee2e6",
            border: "1px solid #ced4da",
            borderRadius: "4px",
            padding: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "16px",
            width: "12px",
            zIndex: 2,
          }}
        >
          <GripVertical size={12} />
        </div>
      )}
    </div>
  );
}
