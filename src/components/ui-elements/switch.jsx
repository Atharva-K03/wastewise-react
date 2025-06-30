import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

/**
 * Fully custom Switch component using React Bootstrap
 * Matches Radix UI Switch behavior and styles
 */

export const Switch = ({
  checked,
  onChange,
  disabled = false,
  className = "",
  ...props
}) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = checked !== undefined;

  const handleToggle = (e) => {
    const newValue = e.target.checked;
    if (!isControlled) {
      setInternalChecked(newValue);
    }
    onChange?.(newValue);
  };

  useEffect(() => {
    // Inject styles once
    const styleId = "custom-switch-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        .custom-switch .form-check-input {
          width: 2rem;
          height: 1.15rem;
          background-color: #e9ecef; /* input background */
          border-radius: 999px;
          border: none;
          transition: background-color 0.2s ease-in-out;
          box-shadow: inset 0 0 0 1px #ccc;
          position: relative;
        }

        .custom-switch .form-check-input:checked {
          background-color: #0d6efd; /* Bootstrap primary */
        }

        .custom-switch .form-check-input::before {
          content: "";
          position: absolute;
          top: 1px;
          left: 1px;
          width: 1rem;
          height: 1rem;
          background-color: white;
          border-radius: 50%;
          transition: transform 0.2s ease-in-out;
        }

        .custom-switch .form-check-input:checked::before {
          transform: translateX(0.85rem); /* Move to right */
        }

        .custom-switch .form-check-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .custom-switch .form-check-input:focus {
          box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <Form.Check
      type="switch"
      id="custom-switch"
      className={`custom-switch ${className}`}
      checked={isControlled ? checked : internalChecked}
      onChange={handleToggle}
      disabled={disabled}
      {...props}
    />
  );
};
