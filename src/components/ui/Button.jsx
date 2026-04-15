import { motion } from "framer-motion";

const variants = {
  gold:         "bg-gold-500 hover:bg-gold-400 text-obsidian-900 shadow-gold-sm hover:shadow-gold-md",
  outline:      "border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-obsidian-900",
  ghost:        "bg-transparent text-gray-300 hover:text-white hover:bg-white/8 border border-white/10 hover:border-white/25",
  dark:         "bg-obsidian-600 hover:bg-obsidian-500 text-white border border-obsidian-400",
  danger:       "bg-red-900/30 hover:bg-red-800/40 text-red-400 border border-red-700/40",
  white:        "bg-white text-obsidian-900 hover:bg-gray-100",
};

const sizes = {
  sm:  "px-4 py-2 text-xs tracking-widest",
  md:  "px-6 py-3 text-sm tracking-widest",
  lg:  "px-8 py-4 text-sm tracking-widest",
  xl:  "px-10 py-5 text-base tracking-widest",
};

export default function Button({
  children, variant = "gold", size = "md",
  className = "", loading = false, icon, ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold uppercase transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-gold-500/40
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading
        ? <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        : icon && <span className="w-4 h-4">{icon}</span>
      }
      {children}
    </motion.button>
  );
}