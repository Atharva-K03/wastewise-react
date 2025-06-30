import React from "react";
import { Breadcrumb as BootstrapBreadcrumb } from "react-bootstrap";
import { ChevronRight, MoreHorizontal } from "react-bootstrap-icons"; // closest icon alternative

/**
 * Breadcrumb component mimicking Radix + Tailwind styles using React Bootstrap only.
 * Components: Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis
 */

export const Breadcrumb = ({ children, ...props }) => {
  return (
    <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props}>
      {children}
    </nav>
  );
};

export const BreadcrumbList = ({ children, className = "", ...props }) => {
  return (
    <BootstrapBreadcrumb
      className={`d-flex flex-wrap align-items-center text-muted small ${className}`}
      listProps={{ className: "mb-0 d-flex flex-wrap align-items-center gap-2" }}
      {...props}
    >
      {children}
    </BootstrapBreadcrumb>
  );
};

export const BreadcrumbItem = ({ children, active = false, href = "#", className = "", ...props }) => {
  return (
    <li
      className={`d-inline-flex align-items-center gap-1 ${className}`}
      data-slot="breadcrumb-item"
      {...props}
    >
      {active ? (
        <BreadcrumbPage>{children}</BreadcrumbPage>
      ) : (
        <BreadcrumbLink href={href}>{children}</BreadcrumbLink>
      )}
    </li>
  );
};

export const BreadcrumbLink = ({ children, href = "#", className = "", ...props }) => {
  return (
    <a
      href={href}
      className={`text-decoration-none text-body transition-all hover:text-dark ${className}`}
      style={{
        transition: "color 0.2s ease",
      }}
      data-slot="breadcrumb-link"
      {...props}
    >
      {children}
    </a>
  );
};

export const BreadcrumbPage = ({ children, className = "", ...props }) => {
  return (
    <span
      aria-current="page"
      role="link"
      aria-disabled="true"
      className={`fw-normal text-dark ${className}`}
      data-slot="breadcrumb-page"
      {...props}
    >
      {children}
    </span>
  );
};

export const BreadcrumbSeparator = ({ className = "", children, ...props }) => {
  return (
    <li
      aria-hidden="true"
      role="presentation"
      className={`d-flex align-items-center px-1 text-muted ${className}`}
      data-slot="breadcrumb-separator"
      {...props}
    >
      {children || <ChevronRight size={14} />}
    </li>
  );
};

export const BreadcrumbEllipsis = ({ className = "", ...props }) => {
  return (
    <span
      className={`d-inline-flex align-items-center justify-content-center text-muted`}
      style={{
        width: "2.25rem",
        height: "2.25rem",
      }}
      role="presentation"
      aria-hidden="true"
      data-slot="breadcrumb-ellipsis"
      {...props}
    >
      <MoreHorizontal size={16} />
      <span className="visually-hidden">More</span>
    </span>
  );
};
