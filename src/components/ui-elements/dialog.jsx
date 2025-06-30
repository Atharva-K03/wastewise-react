import React from "react";
import {
  Modal,
  Button,
  CloseButton,
} from "react-bootstrap";

/**
 * Fully React Bootstrap Dialog component that mimics Radix UI behavior.
 * Includes: Dialog, Trigger, Content, Header, Footer, Title, Description, Close.
 * All styles and accessibility attributes matched as closely as possible.
 */

// Main Dialog container
function Dialog({ show, onHide, children }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      contentClassName="border rounded-lg shadow-lg"
      dialogClassName="modal-dialog-centered"
      aria-modal="true"
      role="dialog"
    >
      {children}
    </Modal>
  );
}

// Trigger button to open dialog
function DialogTrigger({ children, onClick }) {
  return (
    <Button variant="primary" onClick={onClick}>
      {children}
    </Button>
  );
}

// Wrapper for dialog body content
function DialogContent({ children }) {
  return (
    <Modal.Body
      style={{
        padding: "1.5rem",
        background: "#fff",
        borderRadius: "0.5rem",
        position: "relative",
      }}
    >
      {children}
    </Modal.Body>
  );
}

// Header section with close button
function DialogHeader({ children }) {
  return (
    <div className="d-flex flex-column gap-2 text-center text-sm-start">
      {children}
    </div>
  );
}

// Dialog title
function DialogTitle({ children }) {
  return (
    <h5
      id="dialog-title"
      className="fw-semibold mb-1"
      style={{ fontSize: "1.125rem", lineHeight: "1.25rem" }}
    >
      {children}
    </h5>
  );
}

// Dialog description
function DialogDescription({ children }) {
  return (
    <p
      id="dialog-description"
      className="text-muted"
      style={{ fontSize: "0.875rem", marginBottom: "1rem" }}
    >
      {children}
    </p>
  );
}

// Footer with action buttons
function DialogFooter({ children }) {
  return (
    <div
      className="d-flex flex-column-reverse gap-2 gap-sm-0 flex-sm-row justify-content-sm-end"
      style={{ marginTop: "1.5rem" }}
    >
      {children}
    </div>
  );
}

// Close button styled similar to Radix
function DialogClose({ onClick }) {
  return (
    <CloseButton
      onClick={onClick}
      style={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        opacity: 0.7,
        transition: "opacity 0.2s ease-in-out",
      }}
      className="btn-close"
    />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
