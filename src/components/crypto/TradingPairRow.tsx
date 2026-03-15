import type { CoinTicker } from '@/libs/CoinGecko';

interface TradingPairRowProps {
  ticker: CoinTicker;
}

export function TradingPairRow({ ticker }: TradingPairRowProps) {
  const trustColor = ticker.trust_score === 'green' ? 'text-green' : ticker.trust_score === 'yellow' ? 'text-gold' : 'text-red';
  const volume = ticker.converted_volume?.usd || 0;
  const fmtVol = volume >= 1e6
    ? `$${(volume / 1e6).toFixed(2)}M`
    : volume >= 1e3
      ? `$${(volume / 1e3).toFixed(1)}K`
      : `$${volume.toFixed(0)}`;

  return (
    <tr className="border-b border-border/50 hover:bg-dark/50 transition-colors text-sm">
      <td className="py-2.5 px-2 text-white">{ticker.market.name}</td>
      <td className="py-2.5 px-2 text-subtle">
        {ticker.base}/{ticker.target}
      </td>
      <td className="py-2.5 px-2 text-right text-white tabular-nums">
        ${ticker.converted_last?.usd?.toFixed(ticker.converted_last.usd >= 1 ? 2 : 6) || '--'}
      </td>
      <td className="py-2.5 px-2 text-right text-light tabular-nums">{fmtVol}</td>
      <td className="py-2.5 px-2 text-right">
        <span className={trustColor}>●</span>
      </td>
      <td className="py-2.5 px-2 text-right">
        {ticker.trade_url && (
          <a href={ticker.trade_url} target="_blank" rel="noopener noreferrer" className="text-green text-xs hover:underline">
            Trade →
          </a>
        )}
      </td>
    </tr>
  );
}
