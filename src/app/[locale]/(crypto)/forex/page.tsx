import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/utils/Seo';
import { getExchangeRates, formatCurrency, getLocaleForIntl } from '@/libs/CoinGecko';
import { getLatestRates, getCurrencies } from '@/libs/Frankfurter';
import { ForexRatesTable } from '@/components/crypto/ForexRatesTable';

interface ForexPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: ForexPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'ForexPage' });
  return buildMetadata({ title: t('meta_title'), description: t('meta_description'), path: '/forex', locale });
}

export default async function ForexPage(props: ForexPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'ForexPage' });
  const intlLocale = getLocaleForIntl(locale);

  const [btcRates, fiatRates, currencies] = await Promise.all([
    getExchangeRates().catch(() => null),
    getLatestRates('USD').catch(() => null),
    getCurrencies().catch(() => ({} as Record<string, string>)),
  ]);

  // Extract top crypto rates from BTC exchange rates
  const cryptoRates = btcRates?.rates
    ? Object.entries(btcRates.rates)
        .filter(([, r]) => r.type === 'crypto')
        .sort(([, a], [, b]) => a.value - b.value)
        .slice(0, 20)
    : [];

  // BTC price in fiat currencies
  const btcFiatRates = btcRates?.rates
    ? Object.entries(btcRates.rates)
        .filter(([, r]) => r.type === 'fiat')
        .sort(([a], [b]) => a.localeCompare(b))
    : [];

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <h1 className="font-pixel text-xl md:text-2xl text-white mb-2" style={{ textShadow: '0 0 20px rgba(0,211,149,0.5)' }}>
        {t('title')}
      </h1>
      <p className="text-subtle text-sm mb-10">{t('description')}</p>

      {/* BTC Price in Major Fiat */}
      {btcFiatRates.length > 0 && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">
            &#9654; {t('btc_price_in')}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {btcFiatRates.slice(0, 12).map(([code, rate]) => (
              <div key={code} className="bg-dark border border-border p-4">
                <div className="text-[0.72rem] text-muted mb-1">{rate.name}</div>
                <div className="text-base font-semibold text-white tabular-nums">
                  {rate.unit}{rate.value >= 1 ? Math.round(rate.value).toLocaleString(intlLocale) : rate.value.toFixed(4)}
                </div>
                <div className="text-[0.6rem] text-subtle">{code}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Crypto Exchange Rates (BTC-based) */}
      {cryptoRates.length > 0 && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">
            &#9654; {t('crypto_rates')}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted text-[0.72rem] uppercase tracking-wider">
                  <th className="text-left py-2 px-2">{t('currency')}</th>
                  <th className="text-left py-2 px-2">Name</th>
                  <th className="text-right py-2 px-2">1 BTC =</th>
                </tr>
              </thead>
              <tbody>
                {cryptoRates.map(([code, rate]) => (
                  <tr key={code} className="border-b border-border/50">
                    <td className="py-2 px-2 text-white">{code}</td>
                    <td className="py-2 px-2 text-muted">{rate.name}</td>
                    <td className="py-2 px-2 text-right text-white tabular-nums">
                      {rate.value < 1 ? rate.value.toFixed(8) : formatCurrency(rate.value, 'USD', intlLocale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Fiat Exchange Rates (USD-based, Frankfurter/ECB) */}
      {fiatRates && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">
            &#9654; {t('fiat_rates')}
          </div>
          <div className="text-xs text-muted mb-3">
            {t('last_updated')}: {fiatRates.date} (ECB)
          </div>
          <ForexRatesTable rates={fiatRates.rates} base={fiatRates.base} currencyNames={currencies} />
        </section>
      )}
    </div>
  );
}
