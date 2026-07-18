import React, { useState } from "react";

export const Profilecard = ({
  name = "John Doe",
  role = "Software Engineer",
  bio = "Passionate about building clean and efficient web applications.",
  avatarUrl = "https://via.placeholder.com/120",
  bgColor = "#ffffff",
  hoverBgColor = "#f9f9f9",
  textColor = "#222222",
  accentColor = "#4CAF50",
  size = "medium",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const sizeStyles = {
    small: { width: "220px", avatar: "80px", fontSize: "12px" },
    medium: { width: "280px", avatar: "110px", fontSize: "14px" },
    large: { width: "340px", avatar: "140px", fontSize: "16px" },
  };

  const cardStyle = {
    width: sizeStyles[size].width,
    backgroundColor: isHovered ? hoverBgColor : bgColor,
    color: textColor,
    borderRadius: "16px",
    boxShadow: isHovered
      ? "0 10px 24px rgba(0,0,0,0.15)"
      : "0 4px 12px rgba(0,0,0,0.08)",
    transform: isHovered ? "translateY(-6px)" : "translateY(0)",
    transition: "all 0.3s ease",
    textAlign: "center",
    padding: "24px 20px",
    fontFamily: "Arial, sans-serif",
  };

  const avatarStyle = {
    width: sizeStyles[size].avatar,
    height: sizeStyles[size].avatar,
    borderRadius: "50%",
    objectFit: "cover",
    border: `3px solid ${accentColor}`,
    marginBottom: "12px",
  };

  const nameStyle = {
    margin: "0 0 4px 0",
    fontSize: "1.3em",
    fontWeight: "700",
  };

  const roleStyle = {
    margin: "0 0 10px 0",
    fontSize: sizeStyles[size].fontSize,
    color: accentColor,
    fontWeight: "600",
  };

  const bioStyle = {
    margin: "0 0 16px 0",
    fontSize: sizeStyles[size].fontSize,
    lineHeight: "1.4",
    opacity: 0.8,
  };

  const buttonStyle = {
    backgroundColor: isFollowing ? "#ccc" : accentColor,
    color: isFollowing ? "#333" : "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "8px 20px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={avatarUrl} alt={name} style={avatarStyle} />
      <h3 style={nameStyle}>{name}</h3>
      <p style={roleStyle}>{role}</p>
      <p style={bioStyle}>{bio}</p>
      <button
        style={buttonStyle}
        onClick={() => setIsFollowing((prev) => !prev)}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
};