// Table.jsx

import React from "react";
import TableBootstrap from "react-bootstrap/Table";

/**
 * Used to create a table component with customizable headers, rows, and cells.
 *
 * Components:
 * - Table: The main wrapper component for the table structure.
 * - TableHeader: A header section for the table, typically containing column titles.
 * - TableBody: The body section of the table, containing the data rows.
 * - TableFooter: A footer section of the table, typically used for summaries or actions.
 * - TableRow: A single row in the table that contains multiple cells.
 * - TableHead: A header cell, typically used in the table header row.
 * - TableCell: A standard data cell in the table.
 * - TableCaption: A caption for the table, describing the table's purpose.
 *
 * Use case:
 * - Use the Table components to create structured, responsive data displays with custom styling.
 * - This React Bootstrap version mimics the Tailwind + Radix UI-based original, with inline styling support.
 * - `data-slot` attributes are preserved for design tooling or testing.
 */

const styles = {
  table: {
    fontSize: "0.875rem", // Tailwind's text-sm
  },
  tableHeader: {
    borderBottom: "1px solid #dee2e6",
  },
  tableFooter: {
    backgroundColor: "#f8f9fa", // muted/50
    borderTop: "1px solid #dee2e6",
    fontWeight: 500, // font-medium
  },
  rowBase: {
    borderBottom: "1px solid #dee2e6",
    transition: "background-color 0.2s ease", // transition-colors
  },
  rowHover: {
    backgroundColor: "#f8f9fa", // hover:bg-muted/50
  },
  rowSelected: {
    backgroundColor: "#e2e6ea", // similar to data-[state=selected]:bg-muted
  },
  tableHead: {
    height: "2.5rem",
    padding: "0.5rem",
    textAlign: "left",
    verticalAlign: "middle",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  tableCell: {
    padding: "0.5rem",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
  caption: {
    marginTop: "1rem",
    fontSize: "0.875rem",
    color: "#6c757d", // muted-foreground
  },
};

/**
 * Main Table component that wraps all rows, headers, and content.
 */
function Table({
  className = "",
  striped = false,
  bordered = false,
  hover = false,
  responsive = true,
  children,
  ...props
}) {
  const tableElement = (
    <TableBootstrap
      striped={striped}
      bordered={bordered}
      hover={hover}
      className={className}
      style={styles.table}
      {...props}
    >
      {children}
    </TableBootstrap>
  );

  return responsive ? (
    <div data-slot="table-container" className="table-responsive">
      {tableElement}
    </div>
  ) : (
    tableElement
  );
}

/**
 * Header section of the table, typically containing <tr> and <th>.
 */
function TableHeader({ children, className = "", ...props }) {
  return (
    <thead
      data-slot="table-header"
      className={className}
      style={styles.tableHeader}
      {...props}
    >
      {children}
    </thead>
  );
}

/**
 * Body section of the table, used to render rows of data.
 */
function TableBody({ children, className = "", ...props }) {
  return (
    <tbody data-slot="table-body" className={className} {...props}>
      {children}
    </tbody>
  );
}

/**
 * Footer section of the table for totals or actions.
 */
function TableFooter({ children, className = "", ...props }) {
  return (
    <tfoot
      data-slot="table-footer"
      className={className}
      style={styles.tableFooter}
      {...props}
    >
      {children}
    </tfoot>
  );
}

/**
 * A row in the table. Supports hover and selected states.
 *
 * Props:
 * - data-state="selected": applies a muted background like Tailwind.
 */
function TableRow({ children, className = "", style = {}, ...props }) {
  const isSelected =
    props["data-state"] === "selected" || props["aria-selected"] === "true";

  const combinedStyle = {
    ...styles.rowBase,
    ...(isSelected ? styles.rowSelected : {}),
    ...style,
  };

  const handleMouseEnter = (e) =>
    (e.currentTarget.style.backgroundColor = styles.rowHover.backgroundColor);
  const handleMouseLeave = (e) =>
    (e.currentTarget.style.backgroundColor = isSelected
      ? styles.rowSelected.backgroundColor
      : "");

  return (
    <tr
      data-slot="table-row"
      className={className}
      style={combinedStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </tr>
  );
}

/**
 * A column header cell in the table.
 */
function TableHead({ children, className = "", ...props }) {
  return (
    <th
      data-slot="table-head"
      className={className}
      style={styles.tableHead}
      {...props}
    >
      {children}
    </th>
  );
}

/**
 * A standard data cell in the table body.
 */
function TableCell({ children, className = "", ...props }) {
  return (
    <td
      data-slot="table-cell"
      className={className}
      style={styles.tableCell}
      {...props}
    >
      {children}
    </td>
  );
}

/**
 * A caption for the table, usually displayed below the table.
 */
function TableCaption({ children, className = "", ...props }) {
  return (
    <caption
      data-slot="table-caption"
      className={className}
      style={styles.caption}
      {...props}
    >
      {children}
    </caption>
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
