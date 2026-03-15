import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/libs/I18nNavigation';
import { buildMetadata } from '@/utils/Seo';
import { getCoins, getTrending, getGlobalData, formatCurrency, formatNumber, getLocaleForIntl } from '@/libs/CoinGecko';
import { CoinCard } from '@/components/crypto/CoinCard';
import { GlobalSearch } from '@/components/layout/GlobalSearch';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: HomePageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  return buildMetadata({
    title: t('meta_title'),
    description: t('meta_description'),
    path: '',
    locale,
  });
}

export default async function HomePage(props: HomePageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  const tc = await getTranslations({ locale, namespace: 'Common' });
  const intlLocale = getLocaleForIntl(locale);

  // Fetch data in parallel
  let trending: Awaited<ReturnType<typeof getTrending>> = [];
  let topCoins: Awaited<ReturnType<typeof getCoins>> = [];
  let globalData: Awaited<ReturnType<typeof getGlobalData>> | null = null;

  try {
    [trending, topCoins, globalData] = await Promise.all([
      getTrending(),
      getCoins(1, 8),
      getGlobalData(),
    ]);
  } catch {
    // If API fails, render with empty data
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-deep border-b border-border overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,211,149,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,211,149,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,rgba(0,211,149,0.15),transparent_65%)]" />

        <div className="relative mx-auto max-w-[80rem] px-6 py-24 md:py-32">
          <div className="font-pixel text-[0.5rem] text-green border border-green/50 inline-block px-3 py-1.5 mb-8 tracking-widest">
            &#9733; {t('subtitle').toUpperCase()}
          </div>
          <h1
            className="font-pixel text-3xl md:text-5xl text-white leading-relaxed"
            style={{ textShadow: '0 0 40px rgba(0,211,149,0.8), 0 0 80px rgba(0,211,149,0.4)' }}
          >
            {t('title')}
          </h1>
          <p className="font-pixel text-[0.6rem] text-green-bright mt-3 tracking-widest">
            &#9654; {t('subtitle').toUpperCase()}
          </p>
          <p className="mt-6 text-subtle max-w-lg font-light leading-relaxed">
            {t('meta_description')}
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-md">
            <GlobalSearch
              placeholder={tc('search_crypto')}
              noResultsLabel={tc('search_no_results')}
              viewLabel={tc('view')}
            />
          </div>

          <div className="mt-6 flex gap-4">
            <Link
              href="/tokens"
              className="bg-green hover:bg-green-dark text-white px-6 py-3 text-sm font-semibold transition-colors"
            >
              {t('explore_tokens')} &rarr;
            </Link>
            <Link
              href="/categories"
              className="border border-border hover:border-border-light text-subtle hover:text-white px-6 py-3 text-sm transition-colors"
            >
              {t('explore_categories')}
            </Link>
          </div>
        </div>
      </section>

      {/* Global Market Stats */}
      {globalData && (
        <section className="mx-auto max-w-[80rem] px-6 py-16">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-8">
            &#9654; {t('global_stats')}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-dark border border-border p-5">
              <div className="text-[0.72rem] text-muted mb-1">{t('total_market_cap')}</div>
              <div className="text-lg font-semibold text-white tabular-nums">
                {formatCurrency(globalData.data.total_market_cap.usd || 0, 'USD', intlLocale)}
              </div>
            </div>
            <div className="bg-dark border border-border p-5">
              <div className="text-[0.72rem] text-muted mb-1">{t('total_volume')}</div>
              <div className="text-lg font-semibold text-white tabular-nums">
                {formatCurrency(globalData.data.total_volume.usd || 0, 'USD', intlLocale)}
              </div>
            </div>
            <div className="bg-dark border border-border p-5">
              <div className="text-[0.72rem] text-muted mb-1">{t('btc_dominance')}</div>
              <div className="text-lg font-semibold text-gold tabular-nums">
                {(globalData.data.market_cap_percentage.btc || 0).toFixed(1)}%
              </div>
            </div>
            <div className="bg-dark border border-border p-5">
              <div className="text-[0.72rem] text-muted mb-1">{t('active_coins')}</div>
              <div className="text-lg font-semibold text-white tabular-nums">
                {formatNumber(globalData.data.active_cryptocurrencies, intlLocale)}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trending Coins */}
      {trending.length > 0 && (
        <section className="mx-auto max-w-[80rem] px-6 py-16 border-t border-border">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-8">
            &#9654; {t('trending')}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trending.slice(0, 8).map((item) => (
              <Link
                key={item.item.id}
                href={`/tokens/${item.item.id}`}
                className="group block bg-dark border border-border hover:border-border-light transition-colors p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.item.small} alt={item.item.name} width={28} height={28} className="shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-light group-hover:text-white transition-colors">{item.item.name}</div>
                    <div className="text-[0.65rem] text-muted uppercase">{item.item.symbol}</div>
                  </div>
                </div>
                {item.item.data && (
                  <div className="text-sm font-medium text-white tabular-nums">
                    {formatCurrency(item.item.data.price, 'USD', intlLocale)}
                  </div>
                )}
                {item.item.market_cap_rank && (
                  <div className="text-[0.65rem] text-muted mt-1">#{item.item.market_cap_rank}</div>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Top Coins by Market Cap */}
      {topCoins.length > 0 && (
        <section className="mx-auto max-w-[80rem] px-6 py-16 border-t border-border">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-8">
            &#9654; {t('top_coins')}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topCoins.map(coin => (
              <CoinCard
                key={coin.id}
                id={coin.id}
                name={coin.name}
                symbol={coin.symbol}
                image={coin.image}
                currentPrice={coin.current_price}
                priceChange24h={coin.price_change_percentage_24h}
                marketCap={coin.market_cap}
                sparkline={coin.sparkline_in_7d?.price}
                rank={coin.market_cap_rank}
                locale={locale}
              />
            ))}
          </div>
        </section>
      )}

      {/* Quick Links */}
      <section className="mx-auto max-w-[80rem] px-6 py-16 border-t border-border">
        <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-8">
          &#9654; EXPLORE
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/tokens"
            className="group bg-dark border border-border hover:border-border-light transition-colors p-6 text-center"
          >
            <div className="text-2xl mb-3 text-green-bright opacity-60 group-hover:opacity-100 transition-opacity">
              &#9670;
            </div>
            <div className="text-sm font-semibold text-light group-hover:text-white transition-colors uppercase tracking-wide">
              {t('explore_tokens')}
            </div>
          </Link>
          <Link
            href="/categories"
            className="group bg-dark border border-border hover:border-border-light transition-colors p-6 text-center"
          >
            <div className="text-2xl mb-3 text-gold opacity-60 group-hover:opacity-100 transition-opacity">
              &#9672;
            </div>
            <div className="text-sm font-semibold text-light group-hover:text-white transition-colors uppercase tracking-wide">
              {t('explore_categories')}
            </div>
          </Link>
          <Link
            href="/exchanges"
            className="group bg-dark border border-border hover:border-border-light transition-colors p-6 text-center"
          >
            <div className="text-2xl mb-3 text-green-bright opacity-60 group-hover:opacity-100 transition-opacity">
              &#9673;
            </div>
            <div className="text-sm font-semibold text-light group-hover:text-white transition-colors uppercase tracking-wide">
              {t('explore_exchanges')}
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
