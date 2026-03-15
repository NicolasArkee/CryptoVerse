import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/utils/Seo';
import {
  getCoin,
  getCoinMarketChart,
  getCoinTickers,
  formatCurrency,
  formatPercent,
  getLocaleForIntl,
  getLocalizedDescription,
} from '@/libs/CoinGecko';
import { Link } from '@/libs/I18nNavigation';
import { PriceChange } from '@/components/crypto/PriceChange';
import { PriceChart } from '@/components/crypto/PriceChart';
import { CategoryBadge } from '@/components/crypto/CategoryBadge';
import { SupplyBar } from '@/components/crypto/SupplyBar';
import { CommunityStats } from '@/components/crypto/CommunityStats';
import { TradingPairRow } from '@/components/crypto/TradingPairRow';
import { PriceConverter } from '@/components/crypto/PriceConverter';
import { ROICalculator } from '@/components/crypto/ROICalculator';

interface TokenDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata(props: TokenDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const t = await getTranslations({ locale, namespace: 'TokenDetailPage' });

  let title = `${slug} | CryptoVerse`;
  let description = '';

  try {
    const coin = await getCoin(slug);
    title = `${coin.name} (${coin.symbol.toUpperCase()}) — ${t('price')}, ${t('market_cap')} | CryptoVerse`;
    description = `${coin.name} ${t('price')}: ${formatCurrency(coin.market_data.current_price.usd || 0)}. ${t('market_cap')}, ${t('volume')}, ${t('circulating_supply')} — CryptoVerse`;
  } catch {
    // fallback
  }

  return buildMetadata({ title, description, path: `/tokens/${slug}`, locale });
}

export default async function TokenDetailPage(props: TokenDetailPageProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'TokenDetailPage' });
  const intlLocale = getLocaleForIntl(locale);

  let coin: Awaited<ReturnType<typeof getCoin>>;
  let chartData: Awaited<ReturnType<typeof getCoinMarketChart>>;
  let tickers: Awaited<ReturnType<typeof getCoinTickers>> | null = null;

  try {
    [coin, chartData, tickers] = await Promise.all([
      getCoin(slug),
      getCoinMarketChart(slug, 30),
      getCoinTickers(slug).catch(() => null),
    ]);
  } catch {
    notFound();
  }

  const md = coin.market_data;
  const description = getLocalizedDescription(coin.description, locale);
  const cleanDescription = description.replace(/<[^>]*>/g, '');
  const topTickers = tickers?.tickers?.slice(0, 10) || [];

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start gap-6 mb-10">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coin.image.large} alt={coin.name} width={64} height={64} />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{coin.name}</h1>
              <span className="text-muted text-lg uppercase">{coin.symbol}</span>
            </div>
            {coin.market_cap_rank && (
              <div className="font-pixel text-[0.4rem] text-muted mt-1">{t('rank')} #{coin.market_cap_rank}</div>
            )}
          </div>
        </div>

        <div className="md:ml-auto text-right">
          <div className="text-3xl font-bold text-white tabular-nums">
            {formatCurrency(md.current_price.usd || 0, 'USD', intlLocale)}
          </div>
          <div className="flex items-center gap-4 mt-1 justify-end">
            <PriceChange value={md.price_change_percentage_24h} />
            <span className="text-muted text-xs">24h</span>
            <span className={`text-xs tabular-nums ${md.price_change_percentage_7d >= 0 ? 'text-green' : 'text-red'}`}>
              {formatPercent(md.price_change_percentage_7d)}
            </span>
            <span className="text-muted text-xs">7d</span>
            <span className={`text-xs tabular-nums ${md.price_change_percentage_30d >= 0 ? 'text-green' : 'text-red'}`}>
              {formatPercent(md.price_change_percentage_30d)}
            </span>
            <span className="text-muted text-xs">30d</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">{t('market_cap')}</div>
          <div className="text-base font-semibold text-white tabular-nums">
            {formatCurrency(md.market_cap.usd || 0, 'USD', intlLocale)}
          </div>
        </div>
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">{t('volume')}</div>
          <div className="text-base font-semibold text-white tabular-nums">
            {formatCurrency(md.total_volume.usd || 0, 'USD', intlLocale)}
          </div>
        </div>
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">{t('circulating_supply')}</div>
          <div className="text-base font-semibold text-white tabular-nums">
            {md.circulating_supply ? new Intl.NumberFormat(intlLocale).format(md.circulating_supply) : '--'}
          </div>
        </div>
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">{t('total_supply')}</div>
          <div className="text-base font-semibold text-white tabular-nums">
            {md.total_supply ? new Intl.NumberFormat(intlLocale).format(md.total_supply) : '--'}
          </div>
        </div>
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">{t('max_supply')}</div>
          <div className="text-base font-semibold text-white tabular-nums">
            {md.max_supply ? new Intl.NumberFormat(intlLocale).format(md.max_supply) : '--'}
          </div>
        </div>
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">{t('ath')}</div>
          <div className="text-base font-semibold text-green tabular-nums">
            {formatCurrency(md.ath.usd || 0, 'USD', intlLocale)}
          </div>
          <div className="text-[0.65rem] text-red tabular-nums">
            {formatPercent(md.ath_change_percentage.usd || 0)}
          </div>
        </div>
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">{t('atl')}</div>
          <div className="text-base font-semibold text-red tabular-nums">
            {formatCurrency(md.atl.usd || 0, 'USD', intlLocale)}
          </div>
          <div className="text-[0.65rem] text-green tabular-nums">
            {formatPercent(md.atl_change_percentage.usd || 0)}
          </div>
        </div>
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">24h High / Low</div>
          <div className="text-sm text-white tabular-nums">
            {formatCurrency(md.high_24h.usd || 0, 'USD', intlLocale)}
          </div>
          <div className="text-sm text-muted tabular-nums">
            {formatCurrency(md.low_24h.usd || 0, 'USD', intlLocale)}
          </div>
        </div>
      </div>

      {/* Supply Distribution */}
      {md.circulating_supply > 0 && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">
            &#9654; {t('supply')}
          </div>
          <div className="bg-dark border border-border p-4 max-w-xl">
            <SupplyBar circulating={md.circulating_supply} total={md.total_supply} max={md.max_supply} locale={intlLocale} />
          </div>
        </section>
      )}

      {/* Price Chart */}
      <section className="mb-10">
        <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">
          &#9654; {t('price_chart')}
        </div>
        <div className="bg-dark border border-border p-4">
          <PriceChart data={chartData.prices} />
        </div>
      </section>

      {/* Community & Social */}
      <CommunityStats
        twitterFollowers={coin.community_data?.twitter_followers}
        redditSubscribers={coin.community_data?.reddit_subscribers}
        githubStars={coin.developer_data?.stars}
        githubForks={coin.developer_data?.forks}
      />
      {(coin.community_data?.twitter_followers || coin.community_data?.reddit_subscribers || coin.developer_data?.stars || coin.developer_data?.forks) && (
        <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4 -mt-6">
          &#9654; {t('community')}
        </div>
      )}

      {/* Trading Pairs */}
      {topTickers.length > 0 && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">
            &#9654; {t('trading_pairs')}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted text-[0.72rem] uppercase tracking-wider">
                  <th className="text-left py-2 px-2">Exchange</th>
                  <th className="text-left py-2 px-2">Pair</th>
                  <th className="text-right py-2 px-2">Price</th>
                  <th className="text-right py-2 px-2">Volume</th>
                  <th className="text-right py-2 px-2">Trust</th>
                  <th className="text-right py-2 px-2"></th>
                </tr>
              </thead>
              <tbody>
                {topTickers.map((ticker, i) => (
                  <TradingPairRow key={i} ticker={ticker} />
                ))}
              </tbody>
            </table>
          </div>
          <Link
            href={`/tokens/${slug}/markets`}
            className="inline-block mt-3 text-green text-sm hover:underline"
          >
            {t('view_all_markets')} &rarr;
          </Link>
        </section>
      )}

      {/* Price Converter */}
      {(md.current_price?.usd ?? 0) > 0 && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">
            &#9654; {t('converter')}
          </div>
          <div className="bg-dark border border-border p-4 max-w-xl">
            <PriceConverter symbol={coin.symbol} priceUsd={md.current_price.usd!} />
          </div>
        </section>
      )}

      {/* ROI Calculator */}
      {(md.atl?.usd ?? 0) > 0 && (md.current_price?.usd ?? 0) > 0 && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">
            &#9654; {t('roi_calculator')}
          </div>
          <div className="bg-dark border border-border p-4 max-w-xl">
            <ROICalculator
              currentPrice={md.current_price.usd!}
              atl={md.atl.usd!}
              atlDate={md.atl_date?.usd || ''}
              symbol={coin.symbol}
            />
          </div>
        </section>
      )}

      {/* Description */}
      {cleanDescription && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">
            &#9654; {t('description')}
          </div>
          <div className="bg-dark border border-border p-6 text-light text-sm leading-relaxed max-w-3xl">
            {cleanDescription}
          </div>
        </section>
      )}

      {/* Links */}
      {coin.links && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">
            &#9654; {t('links')}
          </div>
          <div className="flex flex-wrap gap-3">
            {coin.links.homepage.filter(Boolean).map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="border border-border hover:border-green/50 text-subtle hover:text-white px-4 py-2 text-sm transition-colors">
                {t('website')} &rarr;
              </a>
            ))}
            {coin.links.whitepaper && (
              <a href={coin.links.whitepaper} target="_blank" rel="noopener noreferrer" className="border border-border hover:border-gold/50 text-subtle hover:text-white px-4 py-2 text-sm transition-colors">
                {t('whitepaper')} &rarr;
              </a>
            )}
            {coin.links.blockchain_site.filter(Boolean).slice(0, 3).map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="border border-border hover:border-border-light text-subtle hover:text-white px-4 py-2 text-sm transition-colors">
                {t('explorer')} &rarr;
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {coin.categories && coin.categories.filter(Boolean).length > 0 && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">
            &#9654; {t('categories')}
          </div>
          <div className="flex flex-wrap gap-2">
            {coin.categories.filter(Boolean).map(cat => (
              <CategoryBadge key={cat} name={cat} slug={cat.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
