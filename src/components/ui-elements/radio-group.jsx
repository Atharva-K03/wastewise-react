import React from "react";

/**
 * ✅ Fully mimics Radix UI RadioGroup using only React Bootstrap (customized).
 *
 * Components:
 * - RadioGroup: Root radio group.
 * - RadioGroupItem: Individual radio items (with focus ring, circular border, indicator).
 *
 * Use Case:
 * - Used in settings, forms, and filters where a single option must be selected.
 * - This version matches Radix behavior and styling, including custom indicators and accessibility.
 */

// Main container for radio group
function RadioGroup({ name, options = [], value, onChange, className = "", ...props }) {
  return (
    <form className={`d-grid gap-3 ${className}`} {...props}>
      {options.map((option, idx) => (
        <RadioGroupItem
          key={idx}
          name={name}
          label={option.label}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
        />
      ))}
    </form>
  );
}

// Individual radio button item with styled indicator
function RadioGroupItem({
  name,
  label,
  value,
  checked,
  onChange,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <label
      htmlFor={`${name}-${value}`}
      className={`d-inline-flex align-items-center gap-2 position-relative user-select-none ${className}`}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <input
        type="radio"
        id={`${name}-${value}`}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          width: "1rem",
          height: "1rem",
          border: "2px solid #ced4da",
          borderRadius: "50%",
          outline: "none",
          display: "grid",
          placeContent: "center",
          position: "relative",
          transition: "border-color 0.2s ease-in-out, box-shadow 0.2s",
        }}
        onFocus={(e) =>
          (e.target.style.boxShadow = "0 0 0 3px rgba(13,110,253,.5)")
        }
        onBlur={(e) => (e.target.style.boxShadow = "none")}
      />
      {/* Inner indicator only if checked */}
      {checked && (
        <span
          className="position-absolute"
          style={{
            pointerEvents: "none",
            width: "0.5rem",
            height: "0.5rem",
            backgroundColor: "#0d6efd", // Bootstrap primary
            borderRadius: "50%",
            top: "50%",
            left: "0.25rem",
            transform: "translateY(-50%)",
          }}
        />
      )}
      <span>{label}</span>
    </label>
  );
}

export { RadioGroup, RadioGroupItem };
