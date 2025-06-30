import React, { useState, useRef } from "react";
import { Navbar, Nav, Overlay } from "react-bootstrap";

/**
 * ✅ NavigationMenu Component Set (React Bootstrap Only)
 *
 * Fully mimics the original Radix + Tailwind version using:
 * - Inline CSS
 * - Bootstrap structure and components
 * - No external Tailwind classes or Radix dependency
 *
 * Components:
 * - NavigationMenu: The wrapper navigation bar
 * - NavigationMenuList: List container
 * - NavigationMenuItem: Menu item with trigger + dropdown
 * - NavigationMenuLink: A clickable nav item
 * - NavigationMenuIndicator: Triangle indicator for dropdown
 * - NavigationMenuViewport: The visible dropdown area
 */

// ✅ Root navigation menu
export function NavigationMenu({ children, className = "" }) {
  return (
    <Navbar expand="md" bg="light" className={`p-2 ${className}`}>
      <Nav className="w-100 justify-content-center">{children}</Nav>
    </Navbar>
  );
}

// ✅ Navigation menu list
export function NavigationMenuList({ children }) {
  return <>{children}</>;
}

// ✅ Dropdown trigger + content wrapper
export function NavigationMenuItem({ title, children, id }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleToggle = (visible) => () => setShow(visible);

  return (
    <div
      className="position-relative mx-2"
      onMouseEnter={handleToggle(true)}
      onMouseLeave={handleToggle(false)}
    >
      <Nav.Link
        ref={target}
        id={id}
        className="d-flex align-items-center px-3 py-2 rounded bg-white border"
        style={{
          fontWeight: 500,
          fontSize: "0.9rem",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
        }}
      >
        {title}
        <span
          style={{
            marginLeft: "0.25rem",
            display: "inline-block",
            transform: show ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          ▼
        </span>
      </Nav.Link>

      {/* ✅ Dropdown Content (Viewport + Indicator) */}
      <Overlay target={target.current} show={show} placement="bottom">
        {({ props }) => (
          <div
            {...props}
            style={{
              zIndex: 9999,
              marginTop: "4px",
              minWidth: "200px",
              padding: "0.5rem",
              backgroundColor: "white",
              border: "1px solid #dee2e6",
              borderRadius: "0.375rem",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
              transition: "opacity 0.2s ease, transform 0.2s ease",
              transform: show ? "translateY(0)" : "translateY(-5px)",
              opacity: show ? 1 : 0,
              ...props.style,
            }}
          >
            {/* ✅ Triangle indicator */}
            <div
              style={{
                position: "absolute",
                top: "-6px",
                left: "calc(50% - 6px)",
                width: "12px",
                height: "12px",
                backgroundColor: "white",
                border: "1px solid #dee2e6",
                transform: "rotate(45deg)",
                zIndex: 0,
              }}
            />
            {children}
          </div>
        )}
      </Overlay>
    </div>
  );
}

// ✅ Link item inside the dropdown
export function NavigationMenuLink({ children, href, onClick }) {
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick && onClick()}
      style={{
        padding: "0.5rem 0.75rem",
        fontSize: "0.875rem",
        borderRadius: "0.25rem",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f1f3f5")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      {children}
    </div>
  );
}
