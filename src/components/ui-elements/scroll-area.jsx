import React from "react";

/**
 * Used to create a scrollable area with custom scrollbars using React Bootstrap–compatible styles only.
 * Components:
 * - ScrollArea: Scrollable container with custom scrollbar.
 * Use case:
 * - To display overflowing content within a limited viewport with styled scrollbars.
 */

// CSS styles for the scrollbar (injected at runtime)
const scrollbarCSS = `
  .scroll-area {
    position: relative;
    overflow: auto;
    max-height: 300px;
    border-radius: 0.5rem;
    padding: 0.5rem;
    scrollbar-width: thin;
    scrollbar-color: #6c757d transparent;
  }

  .scroll-area::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .scroll-area::-webkit-scrollbar-track {
    background: transparent;
  }

  .scroll-area::-webkit-scrollbar-thumb {
    background-color: #6c757d;
    border-radius: 8px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  .scroll-area::-webkit-scrollbar-thumb:hover {
    background-color: #495057;
  }
`;

// Main component
function ScrollArea({ children, className = "", style = {}, ...props }) {
  return (
    <>
      {/* Inject custom scrollbar CSS */}
      <style>{scrollbarCSS}</style>

      <div
        className={`scroll-area ${className}`}
        style={style}
        {...props}
      >
        {children}
      </div>
    </>
  );
}

export { ScrollArea };
