import React, { useState, useRef } from "react";
import { Overlay, Popover } from "react-bootstrap";

/**
 * HoverCard wrapper (no state, just structure)
 */
export function HoverCard({ children }) {
  return <>{children}</>;
}

/**
 * HoverCardTrigger component
 * Controls visibility of HoverCardContent on hover
 */
export function HoverCardTrigger({ children, onHoverChange, setTarget, setShow }) {
  const triggerRef = useRef(null);

  const handleMouseEnter = () => {
    setShow(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
    onHoverChange?.(false);
  };

  return React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    "data-slot": "hover-card-trigger",
    style: { display: "inline-block" },
    ...children.props,
  });
}

/**
 * HoverCardContent component
 * Displays a styled card on hover
 */
export function HoverCardContent({
  target,
  show,
  placement = "top",
  children,
  className = "",
}) {
  return (
    <Overlay target={target} show={show} placement={placement} transition>
      {(props) => (
        <Popover
          {...props}
          data-slot="hover-card-content"
          style={{
            zIndex: 1050,
            minWidth: "16rem",
            borderRadius: "0.375rem",
            padding: "1rem",
            backgroundColor: "white",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
            ...props.style,
          }}
          className={`fade show border ${className}`}
        >
          {children}
        </Popover>
      )}
    </Overlay>
  );
}

/**
 * Full example of HoverCard usage (Controller)
 */
export function HoverCardController({ children, content, placement = "top" }) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const triggerRef = useRef(null);

  const handleMouseEnter = () => setShow(true);
  const handleMouseLeave = () => setShow(false);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }}
    >
      <div ref={(node) => {
        setTarget(node);
        triggerRef.current = node;
      }}>
        {children}
      </div>

      <HoverCardContent show={show} target={target} placement={placement}>
        {content}
      </HoverCardContent>
    </div>
  );
}
