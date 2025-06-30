import React, { useEffect, useMemo, useState } from "react";
import Form from "react-bootstrap/Form";

/**
 * Slider Component (React Bootstrap only)
 *
 * A visual slider component mimicking Radix + Tailwind:
 * - Supports single and range values
 * - Styles track and thumb to match Tailwind's appearance
 * - Uses custom injected CSS and dual input[type=range] for range slider
 */

export function Slider({
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className = "",
  ...props
}) {
  const isRange = Array.isArray(value || defaultValue);
  const [sliderValue, setSliderValue] = useState(
    value ?? defaultValue ?? (isRange ? [min, max] : min)
  );

  useEffect(() => {
    injectSliderStyles();
  }, []);

  const handleChange = (index, rawValue) => {
    const parsed = parseInt(rawValue, 10);
    let updated;

    if (isRange) {
      updated = [...sliderValue];
      updated[index] = parsed;
      updated.sort((a, b) => a - b);
    } else {
      updated = parsed;
    }

    setSliderValue(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className={`slider-wrapper position-relative ${className}`} {...props}>
      {isRange ? (
        <>
          <Form.Range
            min={min}
            max={max}
            step={step}
            value={sliderValue[0]}
            onChange={(e) => handleChange(0, e.target.value)}
            className="custom-slider"
          />
          <Form.Range
            min={min}
            max={max}
            step={step}
            value={sliderValue[1]}
            onChange={(e) => handleChange(1, e.target.value)}
            className="custom-slider"
          />
        </>
      ) : (
        <Form.Range
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={(e) => handleChange(null, e.target.value)}
          className="custom-slider"
        />
      )}
    </div>
  );
}

// Inject custom styles to match Tailwind look
function injectSliderStyles() {
  const id = "custom-slider-style";
  if (document.getElementById(id)) return;

  const style = document.createElement("style");
  style.id = id;
  style.innerHTML = `
    .custom-slider {
      appearance: none;
      width: 100%;
      height: 6px;
      background-color: #e5e7eb; /* Tailwind's bg-muted */
      border-radius: 9999px; /* fully rounded */
      margin: 12px 0;
      position: relative;
    }

    .custom-slider::-webkit-slider-thumb {
      appearance: none;
      width: 16px;
      height: 16px;
      background: #fff;
      border: 2px solid #0d6efd; /* Bootstrap primary */
      border-radius: 50%;
      box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.4); /* Tailwind-like ring */
      transition: box-shadow 0.2s ease;
      cursor: pointer;
    }

    .custom-slider::-moz-range-thumb {
      width: 16px;
      height: 16px;
      background: #fff;
      border: 2px solid #0d6efd;
      border-radius: 50%;
      box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.4);
      transition: box-shadow 0.2s ease;
      cursor: pointer;
    }

    .custom-slider:focus::-webkit-slider-thumb {
      box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.5);
    }

    .custom-slider:focus::-moz-range-thumb {
      box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.5);
    }
  `;
  document.head.appendChild(style);
}
