// Textarea.jsx

import React from "react";
import Form from "react-bootstrap/Form";

/**
 * Used to create a multiline textarea component for user input.
 *
 * Components:
 * - Textarea: The main component that wraps the textarea functionality.
 *
 * Use case:
 * - Use the Textarea component to allow users to input multiline text, such as comments or descriptions.
 * - The className prop allows for customization of the textarea's appearance.
 * - The component supports various props to control its behavior, such as placeholder text and disabled state.
 * - Visually and behaviorally mimics the Tailwind-styled original version, using inline CSS.
 */

function Textarea({ className = "", style = {}, ...props }) {
  const baseStyle = {
    border: "1px solid #ced4da",                         // border-input
    backgroundColor: "transparent",                      // bg-transparent
    borderRadius: "0.375rem",                            // rounded-md
    padding: "0.5rem 0.75rem",                           // px-3 py-2
    width: "100%",                                       // w-full
    minHeight: "4rem",                                   // min-h-16
    fontSize: "1rem",                                    // text-base
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",           // shadow-xs
    outline: "none",
    resize: "vertical",
    transition: "box-shadow 0.2s, border-color 0.2s",     // transition
    color: "#212529",                                     // text color
    placeholderColor: "#6c757d",                          // placeholder
  };

  const focusStyle = {
    borderColor: "#6366f1",                              // focus-visible:border-ring
    boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.5)",       // focus-visible:ring-ring/50
  };

  const disabledStyle = {
    cursor: "not-allowed",                               // disabled:cursor-not-allowed
    opacity: 0.5,                                        // disabled:opacity-50
    backgroundColor: "#f8f9fa",
  };

  const handleFocus = (e) => {
    Object.assign(e.target.style, focusStyle);
  };

  const handleBlur = (e) => {
    Object.assign(e.target.style, {
      ...baseStyle,
      ...(props.disabled ? disabledStyle : {}),
      ...style,
    });
  };

  return (
    <Form.Control
      as="textarea"
      data-slot="textarea"
      className={className}
      style={{
        ...baseStyle,
        ...(props.disabled ? disabledStyle : {}),
        ...style,
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
}

export { Textarea };
