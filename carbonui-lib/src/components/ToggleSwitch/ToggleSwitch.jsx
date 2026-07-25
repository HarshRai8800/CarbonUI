import React, { useState } from "react";

export const ToggleSwitch = ({
  defaultChecked = false,
  onColor = "#6366f1",
  offColor = "#334155",
  size = "md",
  onChange = () => {}
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  const sizes = { sm: { width: 36, height: 20 }, md: { width: 48, height: 24 }, lg: { width: 60, height: 28 } };
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div
      onClick={() => {
        setChecked(!checked);
        onChange(!checked);
      }}
      style={{
        width: sizes[size].width,
        height: sizes[size].height,
        borderRadius: "100px",
        background: checked ? alpha(onColor, 0.25) : alpha(offColor, 0.25),
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s",
        border: "1px solid " + (checked ? alpha(onColor, 0.3) : alpha(offColor, 0.3))
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: checked ? sizes[size].width - sizes[size].height + 2 : 2,
          width: sizes[size].height - 4,
          height: sizes[size].height - 4,
          borderRadius: "50%",
          background: checked ? onColor : offColor,
          transition: "left 0.2s, background 0.2s",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
        }}
      />
    </div>
  );
};