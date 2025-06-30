// Accordion.jsx
import React, { useState } from "react";
import { Accordion as BootstrapAccordion, useAccordionButton, AccordionContext } from "react-bootstrap";
import { ChevronDown } from "react-bootstrap-icons";
import { useContext } from "react";

/**
 * Accordion component using React Bootstrap that mimics Radix UI behavior
 */

export const Accordion = ({ defaultActiveKey = "0", children, ...props }) => {
  return (
    <BootstrapAccordion defaultActiveKey={defaultActiveKey} {...props}>
      {children}
    </BootstrapAccordion>
  );
};

export const AccordionItem = ({ eventKey, children }) => {
  return (
    <BootstrapAccordion.Item eventKey={eventKey} style={{ borderBottom: "1px solid #dee2e6" }}>
      {children}
    </BootstrapAccordion.Item>
  );
};

export const AccordionTrigger = ({ children, eventKey }) => {
  const currentEventKey = useContext(AccordionContext);
  const isCurrent = currentEventKey === eventKey;

  const toggleAccordion = useAccordionButton(eventKey);

  return (
    <BootstrapAccordion.Header
      onClick={toggleAccordion}
      as="div"
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1rem 1.25rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        borderRadius: "0.375rem",
        textAlign: "left",
        cursor: "pointer",
        userSelect: "none",
        transition: "all 0.2s ease-in-out",
      }}
      className="accordion-trigger hover-underline"
    >
      <span>{children}</span>
      <ChevronDown
        size={16}
        style={{
          transition: "transform 0.2s",
          transform: isCurrent ? "rotate(180deg)" : "rotate(0deg)",
          marginTop: "0.125rem",
          color: "#6c757d",
        }}
      />
    </BootstrapAccordion.Header>
  );
};

export const AccordionContent = ({ children }) => {
  return (
    <BootstrapAccordion.Body
      style={{
        fontSize: "0.875rem",
        padding: "0 1.25rem 1rem",
        overflow: "hidden",
        animation: "fadeDown 0.2s ease-out",
      }}
    >
      {children}
    </BootstrapAccordion.Body>
  );
};

// Animation (mimicking accordion-down/up)
const styleSheet = document.styleSheets[0];
const animationStyles = `
@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeUp {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-4px); }
}
`;
if (styleSheet && styleSheet.insertRule) {
  styleSheet.insertRule(animationStyles, styleSheet.cssRules.length);
}
