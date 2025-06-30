import React, { useState } from "react";
import { Collapse } from "react-bootstrap";

/**
 * Collapsible component using React Bootstrap.
 * Mimics Radix UI Collapsible behavior with state management and accessibility.
 *
 * Components:
 * - Collapsible: The wrapper managing open/closed state.
 * - CollapsibleTrigger: A customizable button/element to toggle the collapse.
 * - CollapsibleContent: The content shown or hidden based on collapse state.
 */

/**
 * @component Collapsible
 * @param {boolean} defaultOpen - Whether the collapsible starts open.
 * @param {React.ReactNode} children - Child components (Trigger + Content).
 * @returns {JSX.Element}
 */
function Collapsible({ defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);

  // Inject open/toggleOpen props into children
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, {
      open,
      toggleOpen: () => setOpen((prev) => !prev),
    });
  });

  return (
    <div
      data-slot="collapsible"
      data-state={open ? "open" : "closed"}
      className="mb-2"
    >
      {enhancedChildren}
    </div>
  );
}

/**
 * @component CollapsibleTrigger
 * @param {function} toggleOpen - Toggles the collapsible state.
 * @param {boolean} open - Current open state (optional for a11y).
 * @param {string} as - The tag or component to use (default: 'button').
 * @param {React.ReactNode} children - Trigger content.
 * @param {string} className - Optional class names.
 * @returns {JSX.Element}
 */
function CollapsibleTrigger({
  toggleOpen,
  open,
  as: Component = "button",
  children,
  className = "",
  ...props
}) {
  return (
    <Component
      onClick={toggleOpen}
      data-slot="collapsible-trigger"
      aria-expanded={open}
      className={`btn btn-outline-primary ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * @component CollapsibleContent
 * @param {boolean} open - Whether the content is visible.
 * @param {React.ReactNode} children - Collapsible content.
 * @returns {JSX.Element}
 */
function CollapsibleContent({ open, children, ...props }) {
  return (
    <Collapse in={open} {...props}>
      <div data-slot="collapsible-content" className="mt-2">
        {children}
      </div>
    </Collapse>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
