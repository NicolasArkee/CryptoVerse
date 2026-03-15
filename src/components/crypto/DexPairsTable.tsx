import type { DexPair } from '@/libs/DexScreener';
import { formatDexChain } from '@/libs/DexScreener';

interface DexPairsTableProps {
  pairs: DexPair[];
  maxItems?: number;
}

function formatVolume(val: number): string {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(2)}M`;
  if (val >= 1_000) return `$${(val / 1_000).toFixed(1)}K`;
  return `$${val.toFixed(0)}`;
}

export function DexPairsTable({ pairs, maxItems = 10 }: DexPairsTableProps) {
  if (!pairs || pairs.length === 0) return null;

  const displayed = pairs
    .sort((a, b) => (b.volume?.h24 || 0) - (a.volume?.h24 || 0))
    .slice(0, maxItems);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-muted text-[0.72rem] uppercase tracking-wider">
            <th className="text-left py-2 px-2">Pair</th>
            <th className="text-left py-2 px-2">DEX</th>
            <th className="text-left py-2 px-2">Chain</th>
            <th className="text-right py-2 px-2">Price</th>
            <th className="text-right py-2 px-2">Vol 24h</th>
            <th className="text-right py-2 px-2">Liquidity</th>
            <th className="text-right py-2 px-2"></th>
          </tr>
        </thead>
        <tbody>
          {displayed.map((pair) => (
            <tr key={pair.pairAddress} className="border-b border-border/50 hover:bg-dark/50">
              <td className="py-2 px-2 text-white">
                {pair.baseToken.symbol}/{pair.quoteToken.symbol}
              </td>
              <td className="py-2 px-2 text-muted capitalize">{pair.dexId}</td>
              <td className="py-2 px-2 text-muted">{formatDexChain(pair.chainId)}</td>
              <td className="py-2 px-2 text-right text-white tabular-nums">
                {pair.priceUsd ? `$${parseFloat(pair.priceUsd) < 1 ? parseFloat(pair.priceUsd).toFixed(6) : parseFloat(pair.priceUsd).toFixed(2)}` : '--'}
              </td>
              <td className="py-2 px-2 text-right text-white tabular-nums">
                {pair.volume?.h24 ? formatVolume(pair.volume.h24) : '--'}
              </td>
              <td className="py-2 px-2 text-right text-white tabular-nums">
                {pair.liquidity?.usd ? formatVolume(pair.liquidity.usd) : '--'}
              </td>
              <td className="py-2 px-2 text-right">
                {pair.url && (
                  <a href={pair.url} target="_blank" rel="noopener noreferrer" className="text-green text-xs hover:underline">
                    Trade &rarr;
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
