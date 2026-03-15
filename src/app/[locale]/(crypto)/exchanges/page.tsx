import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/utils/Seo';
import { getExchanges, formatCurrency, getLocaleForIntl } from '@/libs/CoinGecko';
import { Link } from '@/libs/I18nNavigation';

interface ExchangesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: ExchangesPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'ExchangesPage' });
  return buildMetadata({
    title: t('meta_title'),
    description: t('meta_description'),
    path: '/exchanges',
    locale,
  });
}

function renderTrustScore(score: number) {
  const dots = [];
  for (let i = 0; i < 10; i++) {
    const color = i < score ? '#00D395' : '#2A2A3E';
    dots.push(
      <span
        key={i}
        className="inline-block w-2 h-2 mr-0.5"
        style={{ backgroundColor: color }}
      />,
    );
  }
  return <div className="flex items-center">{dots}</div>;
}

export default async function ExchangesPage(props: ExchangesPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'ExchangesPage' });
  const intlLocale = getLocaleForIntl(locale);

  let exchanges: Awaited<ReturnType<typeof getExchanges>> = [];
  try {
    exchanges = await getExchanges(1, 50);
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
              <th className="text-left py-3 px-2">Exchange</th>
              <th className="text-center py-3 px-2">{t('trust_score')}</th>
              <th className="text-right py-3 px-2">{t('volume_24h')}</th>
              <th className="text-right py-3 px-2 hidden md:table-cell">{t('year_established')}</th>
              <th className="text-right py-3 px-2 hidden md:table-cell">{t('country')}</th>
            </tr>
          </thead>
          <tbody>
            {exchanges.map(exchange => (
              <tr key={exchange.id} className="border-b border-border/50 hover:bg-dark/50 transition-colors">
                <td className="py-3 px-2 text-muted tabular-nums">{exchange.trust_score_rank}</td>
                <td className="py-3 px-2">
                  <Link href={`/exchanges/${exchange.id}`} className="flex items-center gap-2.5 hover:text-green transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={exchange.image} alt={exchange.name} width={24} height={24} className="shrink-0" />
                    <span className="font-medium text-light">{exchange.name}</span>
                  </Link>
                </td>
                <td className="py-3 px-2">
                  <div className="flex justify-center">
                    {renderTrustScore(exchange.trust_score)}
                  </div>
                </td>
                <td className="py-3 px-2 text-right text-light tabular-nums">
                  {formatCurrency(exchange.trade_volume_24h_btc * 60000, 'USD', intlLocale)}
                </td>
                <td className="py-3 px-2 text-right text-muted hidden md:table-cell">
                  {exchange.year_established || '--'}
                </td>
                <td className="py-3 px-2 text-right text-muted hidden md:table-cell">
                  {exchange.country || '--'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
