import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/utils/Seo';
import { getTrending, getCoins, formatCurrency, getLocaleForIntl } from '@/libs/CoinGecko';
import { Link } from '@/libs/I18nNavigation';
import { PriceChange } from '@/components/crypto/PriceChange';

interface TrendingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: TrendingPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'TrendingPage' });
  return buildMetadata({ title: t('meta_title'), description: t('meta_description'), path: '/trending', locale });
}

export default async function TrendingPage(props: TrendingPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'TrendingPage' });
  const intlLocale = getLocaleForIntl(locale);

  const [trending, coins] = await Promise.all([
    getTrending().catch(() => []),
    getCoins(1, 100).catch(() => []),
  ]);

  const sorted = [...coins].sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0));
  const gainers = sorted.slice(0, 10);
  const losers = sorted.slice(-10).reverse();

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <h1 className="font-pixel text-xl md:text-2xl text-white mb-2" style={{ textShadow: '0 0 20px rgba(0,211,149,0.5)' }}>
        {t('title')}
      </h1>
      <p className="text-subtle text-sm mb-10">{t('description')}</p>

      {/* Trending */}
      <section className="mb-12">
        <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">&#9654; {t('trending')}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {trending.slice(0, 10).map(({ item }) => (
            <Link key={item.id} href={`/tokens/${item.id}`} className="bg-dark border border-border hover:border-green/30 p-4 transition-colors block">
              <div className="flex items-center gap-2 mb-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.thumb} alt={item.name} width={24} height={24} />
                <span className="text-white text-sm font-medium truncate">{item.name}</span>
              </div>
              <div className="text-muted text-xs uppercase">{item.symbol}</div>
              {item.data?.price && (
                <div className="text-white text-sm tabular-nums mt-1">${item.data.price.toFixed(item.data.price >= 1 ? 2 : 6)}</div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Gainers & Losers */}
      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">&#9654; {t('top_gainers')}</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {gainers.map(coin => (
                  <tr key={coin.id} className="border-b border-border/50">
                    <td className="py-2.5 px-2">
                      <Link href={`/tokens/${coin.id}`} className="flex items-center gap-2 hover:text-green transition-colors">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={coin.image} alt={coin.name} width={20} height={20} />
                        <span className="text-light">{coin.name}</span>
                      </Link>
                    </td>
                    <td className="py-2.5 px-2 text-right text-white tabular-nums">{formatCurrency(coin.current_price, 'USD', intlLocale)}</td>
                    <td className="py-2.5 px-2 text-right"><PriceChange value={coin.price_change_percentage_24h} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="font-pixel text-[0.42rem] text-red tracking-[0.12em] mb-4">&#9654; {t('top_losers')}</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {losers.map(coin => (
                  <tr key={coin.id} className="border-b border-border/50">
                    <td className="py-2.5 px-2">
                      <Link href={`/tokens/${coin.id}`} className="flex items-center gap-2 hover:text-green transition-colors">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={coin.image} alt={coin.name} width={20} height={20} />
                        <span className="text-light">{coin.name}</span>
                      </Link>
                    </td>
                    <td className="py-2.5 px-2 text-right text-white tabular-nums">{formatCurrency(coin.current_price, 'USD', intlLocale)}</td>
                    <td className="py-2.5 px-2 text-right"><PriceChange value={coin.price_change_percentage_24h} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
