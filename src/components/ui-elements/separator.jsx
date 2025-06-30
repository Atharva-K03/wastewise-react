import React from "react";

/**
 * Separator component using React Bootstrap-compatible styling only.
 * 
 * ✔ Use case: Horizontal or vertical rule between sections of content.
 * ✔ Props:
 *   - orientation: "horizontal" | "vertical"
 *   - decorative: boolean (if false, adds role and aria attributes)
 *   - className: additional Bootstrap-compatible class names
 */

function Separator({
  orientation = "horizontal",
  decorative = true,
  className = "",
  ...props
}) {
  const isHorizontal = orientation === "horizontal";

  const style = {
    width: isHorizontal ? "100%" : "1px",
    height: isHorizontal ? "1px" : "100%",
    backgroundColor: "#dee2e6", // Bootstrap border color
    margin: isHorizontal ? "0.5rem 0" : "0 0.5rem",
    flexShrink: 0, // Prevent shrinking in flex layouts
  };

  return (
    <div
      role={decorative ? undefined : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      style={style}
      className={className}
      {...props}
    />
  );
}

export default Separator;
