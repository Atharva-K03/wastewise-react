// AspectRatio.jsx

import React from "react";

/**
 * AspectRatio component that maintains a consistent width/height ratio.
 *
 * Mimics Radix UI's AspectRatio.Root.
 *
 * Props:
 * - ratio: The desired aspect ratio (width / height), default is 16 / 9.
 * - children: The content to render inside the box.
 * - className: Optional CSS class.
 * - style: Optional inline styles.
 * - ...props: Any additional props passed to the outer div.
 */
function AspectRatio({ ratio = 16 / 9, children, style = {}, className = "", ...props }) {
  const paddingBottom = `${100 / ratio}%`;

  return (
    <div
      data-slot="aspect-ratio"
      style={{
        position: "relative",
        width: "100%",
        paddingBottom,
        ...style,
      }}
      className={className}
      {...props}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: "100%",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export { AspectRatio };
