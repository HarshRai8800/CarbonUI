import React, { useState, useEffect } from "react";

export const CardLoader = ({
  width = "300px",
  height = "200px",
  borderRadius = "16px",
  accent = "#6366f1",
  bg = "#0f172a",
  speed = 1.5,
  shimmerWidth = 100
}) => {
  const [position, setPosition] = useState(-shimmerWidth);
  
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  
  useEffect(() => {
    const animation = setInterval(() => {
      setPosition(prev => {
        if (prev > parseInt(width.replace('px', '')) + shimmerWidth) {
          return -shimmerWidth;
        }
        return prev + 2;
      });
    }, 20 / speed);
    
    return () => clearInterval(animation);
  }, [width, speed, shimmerWidth]);
  
  return (
    <div 
      style={{
        width: width,
        height: height,
        background: bg,
        borderRadius: borderRadius,
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)"
      }}
    >
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: position,
          width: shimmerWidth + "px",
          height: "100%",
          background: `linear-gradient(90deg, transparent, ${alpha(accent, 0.15)}, transparent)`,
          transform: "skewX(-20deg)"
        }}
      />
      
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ 
          width: "60%", 
          height: "20px", 
          background: "rgba(255,255,255,0.05)", 
          borderRadius: "4px" 
        }} />
        <div style={{ 
          width: "40%", 
          height: "16px", 
          background: "rgba(255,255,255,0.05)", 
          borderRadius: "4px" 
        }} />
        <div style={{ 
          width: "100%", 
          height: "12px", 
          background: "rgba(255,255,255,0.05)", 
          borderRadius: "4px", 
          marginTop: "8px" 
        }} />
        <div style={{ 
          width: "90%", 
          height: "12px", 
          background: "rgba(255,255,255,0.05)", 
          borderRadius: "4px" 
        }} />
        <div style={{ 
          width: "80%", 
          height: "12px", 
          background: "rgba(255,255,255,0.05)", 
          borderRadius: "4px" 
        }} />
      </div>
      
      <div style={{ 
        position: "absolute", 
        bottom: "20px", 
        right: "20px", 
        width: "30%", 
        height: "36px", 
        background: "rgba(255,255,255,0.05)", 
        borderRadius: "8px" 
      }} />
    </div>
  );
};