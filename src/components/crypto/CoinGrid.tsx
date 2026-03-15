import { CoinCard } from './CoinCard';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: number;
  priceChange24h: number | null;
  marketCap: number;
  sparkline?: number[];
  rank?: number;
}

interface CoinGridProps {
  coins: CoinData[];
  locale?: string;
}

export function CoinGrid({ coins, locale = 'en' }: CoinGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {coins.map(coin => (
        <CoinCard
          key={coin.id}
          id={coin.id}
          name={coin.name}
          symbol={coin.symbol}
          image={coin.image}
          currentPrice={coin.currentPrice}
          priceChange24h={coin.priceChange24h}
          marketCap={coin.marketCap}
          sparkline={coin.sparkline}
          rank={coin.rank}
          locale={locale}
        />
      ))}
    </div>
  );
}
