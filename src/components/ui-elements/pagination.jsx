import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";

/**
 * Pagination Component (React Bootstrap only)
 * Mimics the Radix UI + Tailwind CSS pagination structure and styling.
 * Components:
 * - Pagination: Main navigation wrapper
 * - PaginationContent: Container for items (not required in Bootstrap)
 * - PaginationItem: Wrapper for individual items
 * - PaginationLink: Individual page numbers (active/inactive)
 * - PaginationPrevious: "Previous" button
 * - PaginationNext: "Next" button
 * - PaginationEllipsis: Ellipsis indicator (...)
 */

// Main wrapper with role and class
export function Pagination({ className = "", children }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={`d-flex justify-content-center ${className}`}
    >
      <BootstrapPagination className="mb-0">{children}</BootstrapPagination>
    </nav>
  );
}

// Just a passthrough; BootstrapPagination is the content container
export function PaginationContent({ children }) {
  return <>{children}</>;
}

// Just a passthrough wrapper
export function PaginationItem({ children }) {
  return <>{children}</>;
}

// Core page link
export function PaginationLink({
  children,
  isActive = false,
  onClick,
  disabled = false,
}) {
  return (
    <BootstrapPagination.Item
      active={isActive}
      onClick={onClick}
      disabled={disabled}
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      style={{
        minWidth: "36px",
        height: "36px",
        fontSize: "0.875rem",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </BootstrapPagination.Item>
  );
}

// "Previous" button
export function PaginationPrevious({ onClick, disabled = false }) {
  return (
    <BootstrapPagination.Prev
      onClick={onClick}
      disabled={disabled}
      aria-label="Go to previous page"
      className="d-flex align-items-center px-2"
      style={{
        fontSize: "0.875rem",
        fontWeight: 500,
        gap: "0.25rem",
      }}
    >
      ‹<span className="d-none d-sm-inline ms-1">Previous</span>
    </BootstrapPagination.Prev>
  );
}

// "Next" button
export function PaginationNext({ onClick, disabled = false }) {
  return (
    <BootstrapPagination.Next
      onClick={onClick}
      disabled={disabled}
      aria-label="Go to next page"
      className="d-flex align-items-center px-2"
      style={{
        fontSize: "0.875rem",
        fontWeight: 500,
        gap: "0.25rem",
      }}
    >
      <span className="d-none d-sm-inline me-1">Next</span>›
    </BootstrapPagination.Next>
  );
}

// Ellipsis (...)
export function PaginationEllipsis() {
  return (
    <BootstrapPagination.Ellipsis
      data-slot="pagination-ellipsis"
      aria-hidden="true"
      style={{
        minWidth: "36px",
        height: "36px",
        fontSize: "1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <span className="visually-hidden">More pages</span>
    </BootstrapPagination.Ellipsis>
  );
}
