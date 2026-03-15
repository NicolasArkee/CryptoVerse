interface PriceChangeProps {
  value: number | null | undefined;
}

export function PriceChange({ value }: PriceChangeProps) {
  if (value === null || value === undefined) {
    return <span className="text-muted text-sm">--</span>;
  }

  const isPositive = value >= 0;
  const color = isPositive ? 'text-green' : 'text-red';
  const arrow = isPositive ? '\u25B2' : '\u25BC';

  return (
    <span className={`${color} text-sm font-medium tabular-nums`}>
      {arrow} {Math.abs(value).toFixed(2)}%
    </span>
  );
}
