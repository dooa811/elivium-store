export default function Input({ label, error, icon, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</label>}
      <div className="relative">
        {icon && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4">{icon}</span>}
        <input
          className={`
            w-full bg-obsidian-700 border border-obsidian-500 text-white
            placeholder-obsidian-300 px-4 py-3.5 text-sm
            focus:outline-none focus:border-gold-500 transition-colors duration-200
            ${icon ? "pl-11" : ""}
            ${error ? "border-red-500/60" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}