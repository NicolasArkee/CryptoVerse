import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/utils/Seo';
import { getCoins, formatCurrency, getLocaleForIntl } from '@/libs/CoinGecko';
import { Link } from '@/libs/I18nNavigation';
import { PriceChange } from '@/components/crypto/PriceChange';
import { SparklineChart } from '@/components/crypto/SparklineChart';

interface TokensPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata(props: TokensPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'TokensPage' });
  return buildMetadata({
    title: t('meta_title'),
    description: t('meta_description'),
    path: '/tokens',
    locale,
  });
}

export default async function TokensPage(props: TokensPageProps) {
  const { locale } = await props.params;
  const sp = await props.searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'TokensPage' });
  const intlLocale = getLocaleForIntl(locale);

  const page = Math.max(1, parseInt(sp.page || '1', 10));
  const perPage = 50;

  let coins: Awaited<ReturnType<typeof getCoins>> = [];
  try {
    coins = await getCoins(page, perPage);
  } catch {
    // handle API error
  }

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <div className="mb-8">
        <h1 className="font-pixel text-xl md:text-2xl text-white mb-2" style={{ textShadow: '0 0 20px rgba(0,211,149,0.5)' }}>
          {t('title')}
        </h1>
        <p className="text-subtle text-sm">{t('description')}</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted text-[0.72rem] uppercase tracking-wider">
              <th className="text-left py-3 px-2">#</th>
              <th className="text-left py-3 px-2">Token</th>
              <th className="text-right py-3 px-2">{t('price')}</th>
              <th className="text-right py-3 px-2">{t('change_24h')}</th>
              <th className="text-right py-3 px-2 hidden md:table-cell">{t('market_cap')}</th>
              <th className="text-right py-3 px-2 hidden md:table-cell">{t('volume_24h')}</th>
              <th className="text-right py-3 px-2 hidden lg:table-cell">7d</th>
            </tr>
          </thead>
          <tbody>
            {coins.map(coin => {
              const sparklineColor = (coin.price_change_percentage_24h ?? 0) >= 0 ? '#00D395' : '#FF4444';
              return (
                <tr key={coin.id} className="border-b border-border/50 hover:bg-dark/50 transition-colors">
                  <td className="py-3 px-2 text-muted tabular-nums">{coin.market_cap_rank}</td>
                  <td className="py-3 px-2">
                    <Link href={`/tokens/${coin.id}`} className="flex items-center gap-2.5 hover:text-green transition-colors">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={coin.image} alt={coin.name} width={24} height={24} className="shrink-0" />
                      <span className="font-medium text-light">{coin.name}</span>
                      <span className="text-muted text-[0.68rem] uppercase">{coin.symbol}</span>
                    </Link>
                  </td>
                  <td className="py-3 px-2 text-right text-white tabular-nums font-medium">
                    {formatCurrency(coin.current_price, 'USD', intlLocale)}
                  </td>
                  <td className="py-3 px-2 text-right">
                    <PriceChange value={coin.price_change_percentage_24h} />
                  </td>
                  <td className="py-3 px-2 text-right text-light tabular-nums hidden md:table-cell">
                    {formatCurrency(coin.market_cap, 'USD', intlLocale)}
                  </td>
                  <td className="py-3 px-2 text-right text-light tabular-nums hidden md:table-cell">
                    {formatCurrency(coin.total_volume, 'USD', intlLocale)}
                  </td>
                  <td className="py-3 px-2 text-right hidden lg:table-cell">
                    {coin.sparkline_in_7d?.price && (
                      <div className="flex justify-end">
                        <SparklineChart data={coin.sparkline_in_7d.price} color={sparklineColor} width={80} height={28} />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        {page > 1 && (
          <Link
            href={`/tokens?page=${page - 1}`}
            className="border border-border hover:border-border-light text-subtle hover:text-white px-5 py-2.5 text-sm transition-colors"
          >
            &larr;
          </Link>
        )}
        <span className="border border-border px-5 py-2.5 text-sm text-white bg-dark">
          {page}
        </span>
        {coins.length === perPage && (
          <Link
            href={`/tokens?page=${page + 1}`}
            className="border border-border hover:border-border-light text-subtle hover:text-white px-5 py-2.5 text-sm transition-colors"
          >
            &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
