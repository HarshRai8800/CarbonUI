import React, { useState } from "react";

export const InputForm = ({
  title = "Contact Us",
  description = "Fill out the form below and we'll get back to you shortly.",
  fields = [
    { label: "Name", type: "text", placeholder: "John Doe" },
    { label: "Email", type: "email", placeholder: "john@example.com" },
    { label: "Message", type: "textarea", placeholder: "Your message here..." }
  ],
  submitText = "Submit",
  accent = "#6366f1",
  bg = "#0f172a",
  onSubmit = () => {}
}) => {
  const [formData, setFormData] = useState({});
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };

  const handleChange = (e, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={{
      background: bg,
      borderRadius: "20px",
      padding: "28px",
      width: "400px",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
      fontFamily: "system-ui,sans-serif"
    }}>
      <h2 style={{
        fontSize: "22px",
        fontWeight: "700",
        color: "#fff",
        margin: "0 0 8px",
        textAlign: "center"
      }}>{title}</h2>
      
      <p style={{
        fontSize: "14px",
        color: "rgba(255,255,255,0.5)",
        margin: "0 0 24px",
        textAlign: "center",
        lineHeight: 1.5
      }}>{description}</p>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {fields.map((field, i) => (
            <div key={i}>
              <label style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "600",
                color: "rgba(255,255,255,0.7)",
                marginBottom: "6px"
              }}>{field.label}</label>
              
              {field.type === "textarea" ? (
                <textarea
                  onChange={(e) => handleChange(e, field.label)}
                  placeholder={field.placeholder}
                  style={{
                    width: "100%",
                    minHeight: "100px",
                    padding: "12px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    resize: "vertical",
                    outline: "none",
                    transition: "border-color 0.2s"
                  }}
                />
              ) : (
                <input
                  type={field.type}
                  onChange={(e) => handleChange(e, field.label)}
                  placeholder={field.placeholder}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.2s"
                  }}
                />
              )}
            </div>
          ))}
          
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              fontFamily: "inherit",
              marginTop: "10px",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
          >
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
};