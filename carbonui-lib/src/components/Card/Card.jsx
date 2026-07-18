import React, { useState } from "react";

export const Card = ({
  title = "Card Title",
  description = "This is a simple reusable card component description.",
  imageUrl = "https://via.placeholder.com/300x180",
  bgColor = "#ffffff",
  hoverBgColor = "#f9f9f9",
  textColor = "#222222",
  accentColor = "#4CAF50",
  size = "medium",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const sizeStyles = {
    small: { width: "220px", fontSize: "12px" },
    medium: { width: "300px", fontSize: "14px" },
    large: { width: "380px", fontSize: "16px" },
  };

  const cardStyle = {
    width: sizeStyles[size].width,
    backgroundColor: isHovered ? hoverBgColor : bgColor,
    color: textColor,
    borderRadius: "12px",
    boxShadow: isHovered
      ? "0 8px 20px rgba(0,0,0,0.15)"
      : "0 4px 10px rgba(0,0,0,0.08)",
    transform: isHovered ? "translateY(-5px)" : "translateY(0)",
    transition: "all 0.3s ease",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
    cursor: "pointer",
  };

  const imageStyle = {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    display: "block",
  };

  const contentStyle = {
    padding: "16px",
  };

  const titleStyle = {
    margin: "0 0 8px 0",
    fontSize: "1.3em",
    fontWeight: "700",
  };

  const descStyle = {
    margin: "0 0 12px 0",
    fontSize: sizeStyles[size].fontSize,
    lineHeight: "1.4",
    opacity: 0.85,
    display: "-webkit-box",
    WebkitLineClamp: expanded ? "unset" : 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  const buttonStyle = {
    backgroundColor: accentColor,
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "6px 14px",
    fontSize: "13px",
    cursor: "pointer",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={imageUrl} alt={title} style={imageStyle} />
      <div style={contentStyle}>
        <h3 style={titleStyle}>{title}</h3>
        <p style={descStyle}>{description}</p>
        <button
          style={buttonStyle}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      </div>
    </div>
  );
};
