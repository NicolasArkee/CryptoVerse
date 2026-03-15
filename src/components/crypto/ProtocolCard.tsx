import { Link } from '@/libs/I18nNavigation';
import { formatTVL } from '@/libs/DefiLlama';

interface ProtocolCardProps {
  name: string;
  slug: string;
  logo: string;
  category: string;
  tvl: number;
  change1d: number | null;
  chains: string[];
}

export function ProtocolCard({ name, slug, logo, category, tvl, change1d, chains }: ProtocolCardProps) {
  return (
    <Link
      href={`/defi/${slug}`}
      className="bg-dark border border-border hover:border-green/30 p-4 transition-colors block"
    >
      <div className="flex items-center gap-3 mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={name} width={32} height={32} className="rounded-full" />
        <div>
          <div className="text-white font-medium text-sm">{name}</div>
          <div className="text-muted text-xs">{category}</div>
        </div>
      </div>
      <div className="text-xl font-bold text-white tabular-nums mb-1">{formatTVL(tvl)}</div>
      <div className="flex items-center justify-between">
        {change1d !== null && (
          <span className={`text-xs tabular-nums ${change1d >= 0 ? 'text-green' : 'text-red'}`}>
            {change1d >= 0 ? '+' : ''}{change1d.toFixed(2)}% 24h
          </span>
        )}
        <span className="text-muted text-xs">{chains.length} chain{chains.length > 1 ? 's' : ''}</span>
      </div>
    </Link>
  );
}
