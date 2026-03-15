import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/utils/Seo';
import { getCoin, getCoinTickers } from '@/libs/CoinGecko';
import { TradingPairRow } from '@/components/crypto/TradingPairRow';

interface TokenMarketsPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata(props: TokenMarketsPageProps): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const t = await getTranslations({ locale, namespace: 'TokenMarketsPage' });
  let name = slug;
  try {
    const coin = await getCoin(slug);
    name = coin.name;
  } catch { /* fallback */ }
  return buildMetadata({
    title: t('meta_title', { name }),
    description: t('meta_description', { name }),
    path: `/tokens/${slug}/markets`,
    locale,
  });
}

export default async function TokenMarketsPage(props: TokenMarketsPageProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'TokenMarketsPage' });

  let coin: Awaited<ReturnType<typeof getCoin>>;
  let tickerData: Awaited<ReturnType<typeof getCoinTickers>>;

  try {
    [coin, tickerData] = await Promise.all([
      getCoin(slug),
      getCoinTickers(slug),
    ]);
  } catch {
    notFound();
  }

  const tickers = tickerData?.tickers || [];

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coin.image.small} alt={coin.name} width={32} height={32} />
        <h1 className="font-pixel text-lg md:text-xl text-white" style={{ textShadow: '0 0 20px rgba(0,211,149,0.5)' }}>
          {t('title', { name: coin.name })}
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted text-[0.72rem] uppercase tracking-wider">
              <th className="text-left py-3 px-2">{t('exchange')}</th>
              <th className="text-left py-3 px-2">{t('pair')}</th>
              <th className="text-right py-3 px-2">{t('price')}</th>
              <th className="text-right py-3 px-2">{t('volume')}</th>
              <th className="text-right py-3 px-2">{t('trust')}</th>
              <th className="text-right py-3 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {tickers.map((ticker, i) => (
              <TradingPairRow key={i} ticker={ticker} />
            ))}
          </tbody>
        </table>
      </div>

      {tickers.length === 0 && (
        <div className="text-center py-12 text-muted">No trading pairs available.</div>
      )}
    </div>
  );
}
