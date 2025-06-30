/**
 * React-Bootstrap version of the context menu.
 *
 * Components:
 * - ContextMenu: Wraps the Dropdown logic.
 * - ContextMenuTrigger: The toggle element that activates the menu.
 * - ContextMenuContent: The menu content (Dropdown.Menu).
 * - ContextMenuItem: A normal menu item.
 * - ContextMenuCheckboxItem: A menu item with checkbox behavior.
 * - ContextMenuRadioItem: A radio button menu item.
 * - ContextMenuLabel: A text label (Header).
 * - ContextMenuSeparator: A divider line.
 * - ContextMenuShortcut: Displays keyboard shortcut.
 * - ContextMenuGroup: A group container (Wrapper div).
 * - ContextMenuPortal: Render context menu via React.Fragment.
 * - ContextMenuSub: Nested dropdown.
 * - ContextMenuSubTrigger: Trigger for sub-menu.
 * - ContextMenuSubContent: Sub-menu content.
 * - ContextMenuRadioGroup: Group wrapper for radio items.
 *
 * ⚠ Note: React-Bootstrap does not have full parity with Radix. Some features are approximated.
 */

import React, { Fragment } from "react";
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Form,
  Button
} from "react-bootstrap";
import { Check, ChevronRight, Circle } from "react-bootstrap-icons";

// Main wrapper
function ContextMenu({ children }) {
  return <div>{children}</div>;
}

// Trigger for right-click (custom)
function ContextMenuTrigger({ children, ...props }) {
  return (
    <div onContextMenu={(e) => e.preventDefault()} {...props}>
      {children}
    </div>
  );
}

// Content of the menu
const ContextMenuContent = Dropdown.Menu;

// Grouping
function ContextMenuGroup({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

// Portal (not needed in Bootstrap, so just return children)
const ContextMenuPortal = Fragment;

// Nested Sub menu
function ContextMenuSub({ children }) {
  return <Dropdown drop="end">{children}</Dropdown>;
}

function ContextMenuSubTrigger({ children }) {
  return (
    <Dropdown.Toggle as={Button} size="sm" variant="light">
      {children}
      <ChevronRight className="ms-auto" />
    </Dropdown.Toggle>
  );
}

function ContextMenuSubContent({ children }) {
  return <Dropdown.Menu show>{children}</Dropdown.Menu>;
}

// Radio group wrapper
function ContextMenuRadioGroup({ children }) {
  return <Form>{children}</Form>;
}

// Menu item
function ContextMenuItem({ children, onClick, disabled = false }) {
  return (
    <Dropdown.Item onClick={onClick} disabled={disabled}>
      {children}
    </Dropdown.Item>
  );
}

// Checkbox item
function ContextMenuCheckboxItem({ children, checked, onChange }) {
  return (
    <Form.Check
      type="checkbox"
      label={children}
      checked={checked}
      onChange={onChange}
      className="px-3 py-1"
    />
  );
}

// Radio item
function ContextMenuRadioItem({ name, value, checked, onChange, children }) {
  return (
    <Form.Check
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      label={
        <span>
          <Circle className="me-2" size={12} />
          {children}
        </span>
      }
      className="px-3 py-1"
    />
  );
}

// Label
function ContextMenuLabel({ children }) {
  return <Dropdown.Header>{children}</Dropdown.Header>;
}

// Separator
function ContextMenuSeparator() {
  return <Dropdown.Divider />;
}

// Shortcut display
function ContextMenuShortcut({ children }) {
  return (
    <span style={{ float: "right", fontSize: "0.75rem", opacity: 0.6 }}>
      {children}
    </span>
  );
}

// Export block (FIXED)
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuRadioGroup
};
