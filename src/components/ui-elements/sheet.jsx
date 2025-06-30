import React from "react";
import { Offcanvas, Button, CloseButton } from "react-bootstrap";

/**
 * Sheet Component using only React Bootstrap
 * ✅ Closely mimics Radix Sheet behavior
 */

function Sheet({
  side = "end", // 'start' | 'end' | 'top' | 'bottom'
  show,
  onHide,
  backdrop = true,
  scroll = false,
  children,
  ...props
}) {
  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement={side}
      backdrop={backdrop}
      scroll={scroll}
      style={{
        width: side === "start" || side === "end" ? "75%" : undefined,
        maxWidth: "400px",
        borderLeft: side === "end" ? "1px solid #dee2e6" : undefined,
        borderRight: side === "start" ? "1px solid #dee2e6" : undefined,
        borderTop: side === "bottom" ? "1px solid #dee2e6" : undefined,
        borderBottom: side === "top" ? "1px solid #dee2e6" : undefined,
      }}
      {...props}
    >
      {children}
    </Offcanvas>
  );
}

function SheetTrigger({ onClick, children, ...props }) {
  return (
    <Button onClick={onClick} {...props}>
      {children}
    </Button>
  );
}

function SheetClose({ onClick, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className="position-absolute top-0 end-0 m-3 btn btn-light p-1 border-0 rounded-circle"
      style={{
        opacity: 0.7,
        transition: "opacity 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
      {...props}
    >
      <span aria-hidden="true">&times;</span>
      <span className="visually-hidden">Close</span>
    </button>
  );
}

function SheetContent({ className = "", children, ...props }) {
  return (
    <Offcanvas.Body className={`d-flex flex-column gap-3 ${className}`} {...props}>
      {children}
    </Offcanvas.Body>
  );
}

function SheetHeader({ className = "", children, ...props }) {
  return (
    <div className={`p-4 border-bottom ${className}`} {...props}>
      {children}
    </div>
  );
}

function SheetFooter({ className = "", children, ...props }) {
  return (
    <div className={`mt-auto p-4 border-top d-flex flex-column gap-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

function SheetTitle({ className = "", children, ...props }) {
  return (
    <h5 className={`fw-semibold mb-1 ${className}`} {...props}>
      {children}
    </h5>
  );
}

function SheetDescription({ className = "", children, ...props }) {
  return (
    <p className={`text-muted small ${className}`} {...props}>
      {children}
    </p>
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
