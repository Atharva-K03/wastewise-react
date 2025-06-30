import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Dropdown,
  FormCheck,
} from "react-bootstrap";

/**
 * Menubar component using React Bootstrap
 * Behaves like Radix Menubar with Tailwind styling:
 * - Root container styled as rounded, shadowed bar
 * - Supports menus, items, checkbox items, radio items, labels, separators, submenus
 * - Inline styles approximate gap, padding, text sizing, and focus/open states
 */

const MENUBAR_HEIGHT = "2.25rem"; // same as Tailwind h-9
const FONT_SIZE = "0.875rem";     // same as text-sm
const ITEM_PADDING = "0.375rem 0.5rem"; // px-2 py-1
const ACCENT_BG = "#e7f1ff";      // example accent background
const ACCENT_FG = "#084298";      // example accent text

export function Menubar({ children, className = "", ...props }) {
  return (
    <Navbar
      bg="light"
      className={`rounded border shadow-sm ${className}`}
      style={{ height: MENUBAR_HEIGHT, padding: "0 0.25rem" }}
      {...props}
    >
      <Nav>{children}</Nav>
    </Navbar>
  );
}

/**
 * MenubarMenu for dropdown menus
 * Replaces Radix MenubarMenu component.
 */
export function MenubarMenu({ title, children, id, className = "" }) {
  return (
    <NavDropdown
      title={title}
      id={id}
      className={className}
      renderMenuOnMount
      style={{ fontSize: FONT_SIZE }}
      menuVariant="light"
    >
      {children}
    </NavDropdown>
  );
}

// Base style for all menu items
const baseItemStyle = {
  padding: ITEM_PADDING,
  fontSize: FONT_SIZE,
  cursor: "pointer",
};

// Focus (open/hover) style mimic
const focusStyle = {
  backgroundColor: ACCENT_BG,
  color: ACCENT_FG,
};

/**
 * MenubarItem: basic clickable menu item
 * Supports optional shortcut display
 */
export function MenubarItem({ children, onClick, disabled, shortcut }) {
  const [hover, setHover] = useState(false);

  return (
    <Dropdown.Item
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseItemStyle,
        ...(hover ? focusStyle : {}),
      }}
      className="d-flex justify-content-between align-items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      {shortcut && <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "#6c757d" }}>{shortcut}</span>}
    </Dropdown.Item>
  );
}

/**
 * MenubarCheckboxItem: menu item with checkbox
 */
export function MenubarCheckboxItem({ children, checked, onChange, disabled }) {
  const [hover, setHover] = useState(false);

  return (
    <Dropdown.Item
      as="div"
      disabled={disabled}
      style={{
        ...baseItemStyle,
        ...(hover ? focusStyle : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <FormCheck
        type="checkbox"
        label={children}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        style={{ margin: 0 }}
      />
    </Dropdown.Item>
  );
}

/**
 * MenubarRadioItem: menu item with radio button
 */
export function MenubarRadioItem({ children, name, checked, onChange, disabled }) {
  const [hover, setHover] = useState(false);

  return (
    <Dropdown.Item
      as="div"
      disabled={disabled}
      style={{
        ...baseItemStyle,
        ...(hover ? focusStyle : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <FormCheck
        type="radio"
        name={name}
        label={children}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        style={{ margin: 0 }}
      />
    </Dropdown.Item>
  );
}

/**
 * MenubarLabel: non-interactive label in menu
 */
export function MenubarLabel({ children }) {
  return (
    <Dropdown.Header style={{ padding: ITEM_PADDING, fontSize: FONT_SIZE, fontWeight: 500 }}>
      {children}
    </Dropdown.Header>
  );
}

/**
 * MenubarSeparator: horizontal rule in menu
 */
export function MenubarSeparator() {
  return <Dropdown.Divider style={{ margin: "0.25rem 0" }} />;
}

/**
 * MenubarSub: support nested sub-menu (via NavDropdown within menu)
 */
export function MenubarSub({ title, children, id, className = "" }) {
  return (
    <NavDropdown
      title={title}
      id={id}
      className={className}
      drop="end"
      renderMenuOnMount
      style={{ fontSize: FONT_SIZE }}
      menuVariant="light"
    >
      {children}
    </NavDropdown>
  );
}
