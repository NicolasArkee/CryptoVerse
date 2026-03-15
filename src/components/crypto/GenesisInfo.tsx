interface GenesisInfoProps {
  genesisDate: string | null;
}

function getAge(dateStr: string): string {
  const genesis = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - genesis.getTime();
  const days = Math.floor(diffMs / 86400000);
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);

  if (years > 0) {
    return months > 0 ? `${years}y ${months}m` : `${years}y`;
  }
  if (months > 0) return `${months}m`;
  return `${days}d`;
}

export function GenesisInfo({ genesisDate }: GenesisInfoProps) {
  if (!genesisDate) return null;

  const date = new Date(genesisDate);
  const formatted = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <span className="text-xs text-muted">
      Born {formatted} ({getAge(genesisDate)})
    </span>
  );
}
