// AlertDialog.jsx

import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * A customizable alert dialog component using only React Bootstrap,
 * mimicking Radix UI + Tailwind's appearance and behavior exactly.
 */

const AlertDialog = ({
  show,
  onHide,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  backdrop = true,
  keyboard = true,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop={backdrop}
      keyboard={keyboard}
      centered
      animation
      style={{
        backdropFilter: "blur(2px)",
      }}
      contentClassName="custom-alert-content"
      dialogClassName="custom-alert-dialog"
    >
      <Modal.Header
        closeButton
        style={{
          borderBottom: "none",
          paddingBottom: 0,
        }}
      >
        <Modal.Title
          style={{
            fontSize: "1.125rem",
            fontWeight: 600,
            textAlign: "left",
            width: "100%",
          }}
        >
          {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          paddingTop: "0.5rem",
          paddingBottom: "1rem",
        }}
      >
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6c757d",
            marginBottom: 0,
          }}
        >
          {description}
        </p>
      </Modal.Body>

      <Modal.Footer
        className="d-flex flex-column-reverse flex-sm-row justify-content-end gap-2"
        style={{
          borderTop: "none",
          paddingTop: 0,
        }}
      >
        <Button
          variant="outline-secondary"
          onClick={onHide}
          style={{
            minWidth: "6rem",
          }}
        >
          {cancelText}
        </Button>
        <Button
          variant="danger"
          onClick={onConfirm}
          style={{
            minWidth: "6rem",
          }}
        >
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertDialog;
