import React from "react";
import { Button, Offcanvas } from "react-bootstrap";

/**
 * 100% Mimicked Drawer using React Bootstrap Offcanvas
 * Fully styled and split as in the original Vaul-based Drawer
 */

function Drawer({
  show,
  onHide,
  placement = "end",
  scroll = false,
  backdrop = true,
  children,
}) {
  const directionClasses = {
    top: {
      style: {
        borderBottom: "1px solid #dee2e6",
        borderRadius: "0 0 0.75rem 0.75rem",
        maxHeight: "80vh",
        marginBottom: "6rem",
      },
    },
    bottom: {
      style: {
        borderTop: "1px solid #dee2e6",
        borderRadius: "0.75rem 0.75rem 0 0",
        maxHeight: "80vh",
        marginTop: "6rem",
      },
      showGrip: true,
    },
    start: {
      style: {
        borderRight: "1px solid #dee2e6",
        width: "75%",
        maxWidth: "400px",
        borderRadius: "0 0.75rem 0.75rem 0",
      },
    },
    end: {
      style: {
        borderLeft: "1px solid #dee2e6",
        width: "75%",
        maxWidth: "400px",
        borderRadius: "0.75rem 0 0 0.75rem",
      },
    },
  };

  const config = directionClasses[placement] || {};

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement={placement}
      scroll={scroll}
      backdrop={backdrop}
      aria-modal="true"
      role="dialog"
      data-slot="drawer"
      style={{
        background: "#fff",
        boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15)",
        ...config.style,
      }}
    >
      {config.showGrip && (
        <div
          className="mx-auto my-3 bg-secondary"
          style={{
            height: "8px",
            width: "100px",
            borderRadius: "999px",
            background: "#dee2e6",
          }}
        />
      )}
      {children}
    </Offcanvas>
  );
}

function DrawerTrigger({ onClick, children }) {
  return (
    <Button variant="primary" onClick={onClick} data-slot="drawer-trigger">
      {children}
    </Button>
  );
}

function DrawerClose({ onClick }) {
  return (
    <Button
      variant="light"
      onClick={onClick}
      aria-label="Close drawer"
      className="position-absolute top-2 end-2"
      data-slot="drawer-close"
      style={{ fontSize: "1.5rem", lineHeight: "1rem", padding: "0.25rem 0.5rem" }}
    >
      &times;
    </Button>
  );
}

function DrawerHeader({ children }) {
  return (
    <div
      className="p-3 border-bottom"
      data-slot="drawer-header"
      style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      {children}
    </div>
  );
}

function DrawerTitle({ children }) {
  return (
    <h5
      className="fw-semibold"
      data-slot="drawer-title"
      style={{ margin: 0 }}
    >
      {children}
    </h5>
  );
}

function DrawerDescription({ children }) {
  return (
    <p
      className="text-muted small"
      data-slot="drawer-description"
      style={{ marginBottom: 0 }}
    >
      {children}
    </p>
  );
}

function DrawerContent({ children }) {
  return (
    <div
      className="p-3"
      data-slot="drawer-content"
      style={{ flex: 1, overflowY: "auto" }}
    >
      {children}
    </div>
  );
}

function DrawerFooter({ children }) {
  return (
    <div
      className="p-3 border-top"
      data-slot="drawer-footer"
      style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      {children}
    </div>
  );
}

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerContent,
  DrawerFooter,
};
