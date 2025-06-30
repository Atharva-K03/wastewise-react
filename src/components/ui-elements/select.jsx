import React from "react";
import { Dropdown, Form, ButtonGroup } from "react-bootstrap";

/**
 * Used to create a dropdown menu for selecting options using React Bootstrap only.
 *
 * Components:
 * - Select: Root component
 * - SelectTrigger: Clickable element to open dropdown
 * - SelectContent: Dropdown content with scroll, groups, etc.
 * - SelectItem: Individual dropdown option
 * - SelectGroup, SelectLabel, SelectSeparator: Optional group/label elements
 * - SelectValue: Displays current selected item
 * - Scroll behavior is implemented via inline CSS
 */

function Select({
  options = [],
  value,
  onChange,
  label,
  grouped = false,
  placeholder = "Select an option",
  disabled = false,
}) {
  const handleSelect = (val) => {
    if (onChange) onChange(val);
  };

  const selectedLabel =
    options
      .flatMap(opt => (opt.options ? opt.options : [opt]))
      .find(opt => opt.value === value)?.label || placeholder;

  return (
    <Form.Group className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}

      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          variant="outline-secondary"
          id="select-dropdown"
          disabled={disabled}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
            minWidth: "10rem",
            padding: "0.375rem 0.75rem",
            fontSize: "0.875rem",
            borderRadius: "0.375rem",
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            borderColor: "#ced4da",
            backgroundColor: "transparent",
          }}
        >
          {selectedLabel}
          <span style={{ opacity: 0.5 }}>▼</span>
        </Dropdown.Toggle>

        <Dropdown.Menu
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            minWidth: "100%",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            borderRadius: "0.375rem",
          }}
        >
          {grouped
            ? options.map((group, i) => (
                <React.Fragment key={i}>
                  <Dropdown.Header style={{ fontSize: "0.75rem", padding: "0.5rem 1rem" }}>
                    {group.label}
                  </Dropdown.Header>
                  {group.options.map((opt) => (
                    <Dropdown.Item
                      key={opt.value}
                      active={value === opt.value}
                      onClick={() => handleSelect(opt.value)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      {value === opt.value && <span>✔</span>}
                      {opt.label}
                    </Dropdown.Item>
                  ))}
                  {i < options.length - 1 && <Dropdown.Divider />}
                </React.Fragment>
              ))
            : options.map((opt) => (
                <Dropdown.Item
                  key={opt.value}
                  active={value === opt.value}
                  onClick={() => handleSelect(opt.value)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                >
                  {value === opt.value && <span>✔</span>}
                  {opt.label}
                </Dropdown.Item>
              ))}
        </Dropdown.Menu>
      </Dropdown>
    </Form.Group>
  );
}

export default Select;
