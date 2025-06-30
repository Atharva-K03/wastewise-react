import React from "react";

/**
 * Checkbox component using React Bootstrap-like styles and behavior.
 * Matches original Radix UI + Tailwind version visually and functionally.
 *
 * Props:
 * - checked: boolean - whether the checkbox is checked
 * - onChange: function - event handler for changes
 * - disabled: boolean - whether checkbox is disabled
 * - invalid: boolean - whether checkbox is in an invalid state
 * - className: string - additional wrapper classes
 * - ...props: additional props passed to input
 */
function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  invalid = false,
  className = "",
  ...props
}) {
  const baseStyle = {
    width: "1rem",
    height: "1rem",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    backgroundColor: checked ? "#0d6efd" : "transparent", // Bootstrap primary
    color: checked ? "#fff" : "transparent",
    border: `1px solid ${invalid ? "#dc3545" : "#ccc"}`,
    outline: "none",
  };

  const focusStyle = {
    boxShadow: "0 0 0 3px rgba(13, 110, 253, 0.25)", // focus ring
    borderColor: "#0d6efd",
  };

  return (
    <label
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        gap: "0.5rem",
      }}
    >
      <div
        style={{
          ...baseStyle,
          ...(props["aria-invalid"] || invalid ? { borderColor: "#dc3545" } : {}),
        }}
        tabIndex={0}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = focusStyle.boxShadow;
          e.currentTarget.style.borderColor = focusStyle.borderColor;
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = baseStyle.boxShadow;
          e.currentTarget.style.borderColor = baseStyle.border.split(" ")[2];
        }}
      >
        {checked && (
          <span
            style={{
              fontSize: "0.75rem", // size-3.5 approx 14px
              lineHeight: 1,
              fontWeight: "bold",
            }}
          >
            ✓
          </span>
        )}
      </div>

      {/* Hidden input */}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={invalid}
        {...props}
        style={{
          display: "none",
        }}
      />
    </label>
  );
}

export { Checkbox };
