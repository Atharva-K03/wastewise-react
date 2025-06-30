import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

/**
 * Pure React Bootstrap Toaster Component (100% behavioral + visual mimic of Sonner)
 * - Theme-aware (light, dark)
 * - Global `useToaster()` for use in child components
 * - Custom inline styling mimics CSS variables from original
 */

const ToastContext = createContext();
export const useToaster = () => useContext(ToastContext);

export const Toaster = ({
  children,
  position = "top-end",
  theme = "light",
  className = "",
  style = {},
}) => {
  const [toasts, setToasts] = useState([]);

  const showToast = ({
    message,
    title = "",
    variant = "primary",
    delay = 3000,
    id = Date.now(),
  }) => {
    setToasts((prev) => [...prev, { id, message, title, variant, delay }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const computedStyle = useMemo(
    () => ({
      zIndex: 1060,
      "--normal-bg": theme === "dark" ? "#1e1e1e" : "#fff",
      "--normal-text": theme === "dark" ? "#f1f1f1" : "#212529",
      "--normal-border": theme === "dark" ? "#333" : "#dee2e6",
      ...style,
    }),
    [theme, style]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <ToastContainer
        position={position}
        className={`p-3 ${className}`}
        style={computedStyle}
        containerPosition="fixed"
      >
        {toasts.map(({ id, message, title, variant, delay }) => (
          <Toast
            key={id}
            onClose={() => removeToast(id)}
            delay={delay}
            autohide
            style={{
              backgroundColor: "var(--normal-bg)",
              color: "var(--normal-text)",
              border: `1px solid var(--normal-border)`,
              borderRadius: "0.5rem",
              boxShadow:
                "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
            }}
          >
            {title && (
              <Toast.Header
                closeButton
                style={{
                  backgroundColor: "var(--normal-bg)",
                  color: "var(--normal-text)",
                  borderBottom: `1px solid var(--normal-border)`,
                }}
              >
                <strong className="me-auto">{title}</strong>
              </Toast.Header>
            )}
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};
