interface SupplyBarProps {
  circulating: number;
  total: number | null;
  max: number | null;
  locale?: string;
}

export function SupplyBar({ circulating, total, max, locale = 'en-US' }: SupplyBarProps) {
  const reference = max || total || circulating;
  const pct = reference > 0 ? (circulating / reference) * 100 : 100;
  const fmt = (v: number) => new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 2 }).format(v);

  return (
    <div>
      <div className="flex justify-between text-xs text-muted mb-2">
        <span>{fmt(circulating)}</span>
        <span>{reference === circulating ? '∞' : fmt(reference)}</span>
      </div>
      <div className="h-3 bg-dark border border-border overflow-hidden">
        <div className="h-full bg-green" style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
      <div className="text-xs text-subtle mt-1">{pct.toFixed(1)}%</div>
    </div>
  );
}
