export default function Loader({ fullScreen = false }) {
  const inner = (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-2 border-gold-500/20 rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-gold-500 rounded-full animate-spin" />
      </div>
      <span className="text-xs tracking-widest uppercase text-gold-500 font-semibold">Elivium</span>
    </div>
  );
  if (fullScreen) return (
    <div className="fixed inset-0 bg-obsidian-900 flex items-center justify-center z-50">{inner}</div>
  );
  return <div className="flex items-center justify-center py-20">{inner}</div>;
}