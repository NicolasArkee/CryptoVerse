import { Link } from '@/libs/I18nNavigation';
import { formatTVL } from '@/libs/DefiLlama';

interface ChainCardProps {
  name: string;
  tvl: number;
  tokenSymbol: string;
}

export function ChainCard({ name, tvl, tokenSymbol }: ChainCardProps) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  return (
    <Link
      href={`/blockchains/${slug}`}
      className="bg-dark border border-border hover:border-green/30 p-4 transition-colors block"
    >
      <div className="text-white font-medium mb-2">{name}</div>
      <div className="text-xl font-bold text-white tabular-nums mb-1">{formatTVL(tvl)}</div>
      {tokenSymbol && (
        <div className="text-muted text-xs">Token: {tokenSymbol}</div>
      )}
    </Link>
  );
}
