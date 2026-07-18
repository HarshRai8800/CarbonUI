import React, { useState } from "react";

export const Button = ({
  text = "Click Me",
  bgColor = "#4CAF50",
  hoverColor = "#45a049",
  textColor = "#ffffff",
  size = "medium",
  onClick = () => {},
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const sizeStyles = {
    small: { padding: "6px 12px", fontSize: "12px" },
    medium: { padding: "10px 20px", fontSize: "16px" },
    large: { padding: "14px 28px", fontSize: "20px" },
  };

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    onClick(clickCount + 1);
  };

  const buttonStyle = {
    backgroundColor: isHovered ? hoverColor : bgColor,
    color: textColor,
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    ...sizeStyles[size],
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {text} {clickCount > 0 ? `(${clickCount})` : ""}
    </button>
  );
};
