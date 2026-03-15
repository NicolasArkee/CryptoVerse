interface MarketDominanceBarProps {
  percentages: Record<string, number>;
}

const COLORS: Record<string, string> = {
  btc: '#F7931A',
  eth: '#627EEA',
  usdt: '#26A17B',
  bnb: '#F0B90B',
  sol: '#9945FF',
  xrp: '#00AAE4',
  usdc: '#2775CA',
};

export function MarketDominanceBar({ percentages }: MarketDominanceBarProps) {
  const sorted = Object.entries(percentages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);
  const othersTotal = 100 - sorted.reduce((s, [, v]) => s + v, 0);

  return (
    <div>
      <div className="h-6 flex overflow-hidden border border-border">
        {sorted.map(([key, pct]) => (
          <div
            key={key}
            style={{ width: `${pct}%`, backgroundColor: COLORS[key] || '#555' }}
            className="h-full"
            title={`${key.toUpperCase()}: ${pct.toFixed(1)}%`}
          />
        ))}
        {othersTotal > 0 && (
          <div
            style={{ width: `${othersTotal}%`, backgroundColor: '#333' }}
            className="h-full"
            title={`Others: ${othersTotal.toFixed(1)}%`}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-3 mt-2">
        {sorted.map(([key, pct]) => (
          <div key={key} className="flex items-center gap-1.5 text-xs">
            <span className="w-2.5 h-2.5 inline-block" style={{ backgroundColor: COLORS[key] || '#555' }} />
            <span className="text-subtle">{key.toUpperCase()}</span>
            <span className="text-white tabular-nums">{pct.toFixed(1)}%</span>
          </div>
        ))}
        {othersTotal > 0 && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="w-2.5 h-2.5 inline-block bg-[#333]" />
            <span className="text-subtle">Others</span>
            <span className="text-white tabular-nums">{othersTotal.toFixed(1)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
