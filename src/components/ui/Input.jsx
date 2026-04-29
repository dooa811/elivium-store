const INPUT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
  .elivium-field-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 14px 18px;
    color: #fff;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    outline: none;
    transition: all 0.3s ease;
    box-sizing: border-box;
  }
  .elivium-field-input:focus {
    border-color: rgba(212,175,55,0.5);
    background: rgba(212,175,55,0.03);
    box-shadow: 0 0 0 4px rgba(212,175,55,0.06);
  }
  .elivium-field-input::placeholder { color: rgba(255,255,255,0.2); }
  .elivium-field-input.has-error { border-color: rgba(239,68,68,0.4); }
  .elivium-field-input.has-error:focus { border-color: rgba(239,68,68,0.6); box-shadow: 0 0 0 4px rgba(239,68,68,0.06); }
`;

export default function Input({ label, error, icon, className = "", style = {}, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <style>{INPUT_STYLES}</style>

      {label && (
        <label style={{
          fontSize: 10, fontWeight: 500,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          fontFamily: "'DM Sans', sans-serif"
        }}>
          {label}
        </label>
      )}

      <div style={{ position: "relative" }}>
        {icon && (
          <span style={{
            position: "absolute", left: 16, top: "50%",
            transform: "translateY(-50%)",
            color: "rgba(255,255,255,0.25)",
            display: "flex", alignItems: "center", pointerEvents: "none"
          }}>
            {icon}
          </span>
        )}
        <input
          className={`elivium-field-input ${error ? "has-error" : ""} ${className}`}
          style={{ paddingLeft: icon ? 44 : undefined, ...style }}
          {...props}
        />
      </div>

      {error && (
        <p style={{
          fontSize: 11, color: "rgba(252,165,165,0.8)",
          fontFamily: "'DM Sans', sans-serif",
          margin: 0, display: "flex", alignItems: "center", gap: 6
        }}>
          <span style={{ fontSize: 10, color: "#ef4444" }}>✕</span>
          {error}
        </p>
      )}
    </div>
  );
}