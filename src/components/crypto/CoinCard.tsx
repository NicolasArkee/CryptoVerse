import { Link } from '@/libs/I18nNavigation';
import { SparklineChart } from './SparklineChart';
import { PriceChange } from './PriceChange';
import { formatCurrency, getLocaleForIntl } from '@/libs/CoinGecko';

interface CoinCardProps {
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: number;
  priceChange24h: number | null;
  marketCap: number;
  sparkline?: number[];
  rank?: number;
  locale?: string;
}

export function CoinCard({
  id,
  name,
  symbol,
  image,
  currentPrice,
  priceChange24h,
  marketCap,
  sparkline,
  rank,
  locale = 'en',
}: CoinCardProps) {
  const intlLocale = getLocaleForIntl(locale);
  const sparklineColor = (priceChange24h ?? 0) >= 0 ? '#00D395' : '#FF4444';

  return (
    <Link
      href={`/tokens/${id}`}
      className="group block bg-dark border border-border hover:border-border-light transition-colors relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ backgroundColor: sparklineColor }}
      />
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={name}
              width={32}
              height={32}
              className="shrink-0"
            />
            <div>
              <div className="text-sm font-semibold text-light group-hover:text-white transition-colors leading-tight">
                {name}
              </div>
              <div className="text-[0.68rem] text-muted uppercase">{symbol}</div>
            </div>
          </div>
          {rank && (
            <span className="font-pixel text-[0.35rem] text-muted">
              #{rank}
            </span>
          )}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-base font-semibold text-white tabular-nums">
              {formatCurrency(currentPrice, 'USD', intlLocale)}
            </div>
            <PriceChange value={priceChange24h} />
          </div>
          {sparkline && sparkline.length > 0 && (
            <SparklineChart
              data={sparkline}
              color={sparklineColor}
              width={80}
              height={32}
            />
          )}
        </div>

        <div className="mt-2 text-[0.68rem] text-muted tabular-nums">
          MCap: {formatCurrency(marketCap, 'USD', intlLocale)}
        </div>
      </div>
    </Link>
  );
}
