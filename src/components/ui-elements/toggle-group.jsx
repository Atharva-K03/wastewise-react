// ToggleGroup.jsx

import React, { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

/**
 * Used to create a group of toggle buttons that can be selected or deselected.
 * 
 * Components:
 * - ToggleGroup: The container for the toggle buttons.
 * - ToggleGroupItem: Individual toggle button within the group.
 * 
 * Use case:
 * - To allow users to select one or more options from a set of toggle buttons.
 * 
 * Example:
 * <ToggleGroup type="radio">
 *   <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
 *   <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
 * </ToggleGroup>
 */

function ToggleGroup({
  className = "",
  type = "radio",
  name = "toggle-group",
  defaultValue = [],
  onChange,
  children,
  ...props
}) {
  const isRadio = type === "radio";
  const [selected, setSelected] = useState(defaultValue);

  const handleSelect = (value) => {
    let updated = isRadio ? value : selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setSelected(updated);
    if (onChange) onChange(updated);
  };

  const context = { selected, isRadio, handleSelect };

  return (
    <ButtonGroup
      data-slot="toggle-group"
      className={`d-flex flex-wrap ${className}`}
      style={{
        display: "flex",
        width: "fit-content",
        alignItems: "center",
        borderRadius: "0.375rem",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)", // shadow-xs
        overflow: "hidden",
      }}
      {...props}
    >
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, { context, index, total: children.length, name })
      )}
    </ButtonGroup>
  );
}

function ToggleGroupItem({
  children,
  value,
  context,
  name,
  index,
  total,
  variant = "outline-primary",
  size = "sm",
  className = "",
  ...props
}) {
  if (!context) return null;

  const isActive = context.isRadio
    ? context.selected === value
    : context.selected.includes(value);

  const style = {
    minWidth: 0,
    flex: 1,
    borderRadius: "0px",
    boxShadow: "none",
    zIndex: 0,
    ...(index === 0 && {
      borderTopLeftRadius: "0.375rem",
      borderBottomLeftRadius: "0.375rem",
      borderLeft: "1px solid #dee2e6",
    }),
    ...(index === total - 1 && {
      borderTopRightRadius: "0.375rem",
      borderBottomRightRadius: "0.375rem",
    }),
    ...(index !== 0 && {
      borderLeft: "none", // data-[variant=outline]:first:border-l
    }),
    transition: "background-color 0.2s, border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <Button
      type={context.isRadio ? "radio" : "checkbox"}
      data-slot="toggle-group-item"
      name={name}
      value={value}
      size={size}
      variant={variant}
      active={isActive}
      onClick={() => context.handleSelect(value)}
      style={style}
      className={`text-nowrap ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

export { ToggleGroup, ToggleGroupItem };
