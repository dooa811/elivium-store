// ─── Button ────────────────────────────────────────────────────────────────────
import { motion } from "framer-motion";

const BUTTON_STYLES = `
  @keyframes spin-btn{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  .elivium-btn-gold {
    background: linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%);
    background-size: 200% 200%; color: #0a0a0a; border: none;
  }
  .elivium-btn-gold:hover:not(:disabled) { box-shadow: 0 8px 25px rgba(212,175,55,0.3); }
  .elivium-btn-outline {
    background: transparent;
    border: 1px solid rgba(212,175,55,0.4); color: #d4af37;
  }
  .elivium-btn-outline:hover:not(:disabled) { background: rgba(212,175,55,0.08); }
  .elivium-btn-ghost {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.6);
  }
  .elivium-btn-ghost:hover:not(:disabled) { background: rgba(255,255,255,0.08); color: #fff; }
  .elivium-btn-dark {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1); color: #fff;
  }
  .elivium-btn-dark:hover:not(:disabled) { background: rgba(255,255,255,0.1); }
  .elivium-btn-danger {
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.2); color: rgba(239,68,68,0.7);
  }
  .elivium-btn-danger:hover:not(:disabled) { background: rgba(239,68,68,0.14); color: #fca5a5; }
  .elivium-btn-white {
    background: #fff; border: none; color: #0a0a0a;
  }
  .elivium-btn-white:hover:not(:disabled) { background: #f5f5f5; }
`;

const variantClass = {
  gold: "elivium-btn-gold",
  outline: "elivium-btn-outline",
  ghost: "elivium-btn-ghost",
  dark: "elivium-btn-dark",
  danger: "elivium-btn-danger",
  white: "elivium-btn-white",
};

const sizePadding = {
  sm: "8px 16px",
  md: "11px 22px",
  lg: "14px 30px",
  xl: "18px 40px",
};

const sizeFontSize = {
  sm: "10px",
  md: "11px",
  lg: "12px",
  xl: "13px",
};

export default function Button({
  children, variant = "gold", size = "md",
  className = "", loading = false, icon, style = {}, ...props
}) {
  return (
    <>
      <style>{BUTTON_STYLES}</style>
      <motion.button
        whileHover={{ scale: props.disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: props.disabled || loading ? 1 : 0.97 }}
        className={`${variantClass[variant] || variantClass.gold} ${className}`}
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
          fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase",
          borderRadius: 10, cursor: loading || props.disabled ? "not-allowed" : "pointer",
          opacity: props.disabled ? 0.5 : 1,
          transition: "all 0.25s", outline: "none",
          padding: sizePadding[size] || sizePadding.md,
          fontSize: sizeFontSize[size] || sizeFontSize.md,
          ...style
        }}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ animation: "spin-btn 1s linear infinite" }}>
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        ) : icon ? (
          <span style={{ width: 14, height: 14, display: "flex" }}>{icon}</span>
        ) : null}
        {children}
      </motion.button>
    </>
  );
}