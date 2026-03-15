interface SentimentBarProps {
  upPercentage: number | null;
  downPercentage: number | null;
}

export function SentimentBar({ upPercentage, downPercentage }: SentimentBarProps) {
  if (upPercentage == null || downPercentage == null) return null;
  if (upPercentage === 0 && downPercentage === 0) return null;

  return (
    <div className="bg-dark border border-border p-4 max-w-xl">
      <div className="flex justify-between text-xs mb-2">
        <span className="text-green tabular-nums">{upPercentage.toFixed(1)}% Bullish</span>
        <span className="text-red tabular-nums">{downPercentage.toFixed(1)}% Bearish</span>
      </div>
      <div className="h-3 flex overflow-hidden bg-[#2A2A3E]">
        <div
          className="bg-green transition-all"
          style={{ width: `${upPercentage}%` }}
        />
        <div
          className="bg-red transition-all"
          style={{ width: `${downPercentage}%` }}
        />
      </div>
    </div>
  );
}
