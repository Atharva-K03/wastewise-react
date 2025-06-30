import React, { useState, useRef, createContext, useContext } from "react";

/**
 * OTP Input Components:
 * - InputOTP: Root wrapper, manages state
 * - InputOTPGroup: Groups input slots
 * - InputOTPSlot: Renders character + fake caret (like div)
 * - InputOTPSeparator: Separator component
 */

// Context to store active index
const OTPContext = createContext();

export function InputOTP({ length = 6, onChange = () => {}, value = "", ...props }) {
  const [otp, setOtp] = useState(value.padEnd(length, ""));
  const [activeIndex, setActiveIndex] = useState(0);
  const refs = useRef([]);

  const handleChange = (index, val) => {
    const updated = otp.split("");
    updated[index] = val.slice(-1); // only last char
    const newVal = updated.join("");
    setOtp(newVal);
    onChange(newVal);

    // move focus
    if (val && index < length - 1) {
      refs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const updated = otp.split("");
        updated[index - 1] = "";
        setOtp(updated.join(""));
        refs.current[index - 1]?.focus();
        setActiveIndex(index - 1);
      }
    }
  };

  return (
    <OTPContext.Provider value={{ activeIndex }}>
      <div className="d-flex align-items-center gap-2" {...props}>
        {[...Array(length)].map((_, idx) => (
          <InputOTPSlot
            key={idx}
            index={idx}
            char={otp[idx] || ""}
            inputRef={(el) => (refs.current[idx] = el)}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
          />
        ))}
      </div>
    </OTPContext.Provider>
  );
}

export function InputOTPGroup({ children, ...props }) {
  return (
    <div className="d-flex align-items-center" {...props}>
      {children}
    </div>
  );
}

export function InputOTPSlot({
  index,
  char,
  onChange,
  onKeyDown,
  inputRef,
}) {
  const { activeIndex } = useContext(OTPContext);
  const isActive = index === activeIndex;

  return (
    <div
      className={`position-relative d-flex justify-content-center align-items-center border rounded ${
        isActive ? "border-primary shadow" : "border-secondary"
      }`}
      style={{
        width: "2.25rem",
        height: "2.25rem",
        fontSize: "1.125rem",
        fontWeight: "500",
        transition: "all 0.2s ease",
        backgroundColor: "#fff",
        zIndex: isActive ? 2 : 1,
      }}
      data-active={isActive}
    >
      <input
        ref={inputRef}
        type="text"
        maxLength={1}
        value={char}
        onChange={onChange}
        onKeyDown={onKeyDown}
        aria-label={`OTP character ${index + 1}`}
        onFocus={() => {}}
        style={{
          position: "absolute",
          opacity: 0,
          width: "100%",
          height: "100%",
          cursor: "text",
        }}
      />
      {char || ""}
      {isActive && !char && (
        <span
          className="position-absolute"
          style={{
            width: "1px",
            height: "1.25rem",
            backgroundColor: "#000",
            animation: "blink 1s step-start 0s infinite",
          }}
        />
      )}
    </div>
  );
}

export function InputOTPSeparator({ children = "-", ...props }) {
  return (
    <span
      className="mx-2 text-muted"
      role="separator"
      aria-hidden="true"
      {...props}
    >
      {children}
    </span>
  );
}

// CSS animation for fake caret
const style = document.createElement("style");
style.innerHTML = `
@keyframes blink {
  0%, 100% { opacity: 1 }
  50% { opacity: 0 }
}`;
document.head.appendChild(style);
