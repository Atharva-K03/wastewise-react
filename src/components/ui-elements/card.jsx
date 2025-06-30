// src/components/ui/Card.jsx
import React from "react";
import { Card as RBCard } from "react-bootstrap";

/**
 * Card component for structured content display.
 * Components: Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter
 * Use case: User profiles, product info, data containers, etc.
 */

function Card({ children, className = "", ...props }) {
  return (
    <div
      data-slot="card"
      className={`bg-light text-dark border shadow-sm d-flex flex-column gap-4 ${className}`}
      style={{
        borderRadius: "12px", // rounded-xl
        paddingTop: "1.5rem", // py-6
        paddingBottom: "1.5rem",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className = "", ...props }) {
  return (
    <div
      data-slot="card-header"
      className={`w-100 ${className}`}
      style={{
        display: "grid",
        gridAutoRows: "min-content",
        gridTemplateRows: "auto auto",
        gridTemplateColumns: "1fr auto", // If card-action is used
        gap: "0.375rem", // ~gap-1.5
        paddingLeft: "1.5rem", // px-6
        paddingRight: "1.5rem",
        alignItems: "start",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

function CardTitle({ children, className = "", ...props }) {
  return (
    <div
      data-slot="card-title"
      className={`fw-semibold ${className}`}
      style={{
        lineHeight: "1", // leading-none
      }}
      {...props}
    >
      {children}
    </div>
  );
}

function CardDescription({ children, className = "", ...props }) {
  return (
    <div
      data-slot="card-description"
      className={`text-muted ${className}`}
      style={{
        fontSize: "0.875rem", // text-sm
      }}
      {...props}
    >
      {children}
    </div>
  );
}

function CardAction({ children, className = "", ...props }) {
  return (
    <div
      data-slot="card-action"
      className={`${className}`}
      style={{
        gridColumnStart: 2,
        gridRowStart: 1,
        gridRowEnd: "span 2",
        alignSelf: "start",
        justifySelf: "end",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

function CardContent({ children, className = "", ...props }) {
  return (
    <div
      data-slot="card-content"
      className={`${className}`}
      style={{
        paddingLeft: "1.5rem", // px-6
        paddingRight: "1.5rem",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

function CardFooter({ children, className = "", ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={`d-flex align-items-center border-top ${className}`}
      style={{
        paddingLeft: "1.5rem", // px-6
        paddingRight: "1.5rem",
        paddingTop: "1.5rem", // pt-6
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
};
