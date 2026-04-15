export default function ProductRating({ rating, reviews, size = "sm" }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rating)) return "full";
    if (i < rating) return "half";
    return "empty";
  });

  const sz = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {stars.map((type, i) => (
          <svg key={i} className={`${sz} ${type === "empty" ? "text-obsidian-400" : "text-gold-400"}`}
            fill={type === "empty" ? "none" : type === "half" ? "url(#half)" : "currentColor"}
            stroke="currentColor" viewBox="0 0 24 24">
            {type === "half" && (
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="#e8bb35"/>
                  <stop offset="50%" stopColor="transparent"/>
                </linearGradient>
              </defs>
            )}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
          </svg>
        ))}
      </div>
      {reviews !== undefined && (
        <span className="text-xs text-obsidian-300">({reviews})</span>
      )}
    </div>
  );
}