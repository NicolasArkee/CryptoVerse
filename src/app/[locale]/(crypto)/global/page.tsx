import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/utils/Seo';
import { getGlobalData, getGlobalDeFiData, getExchangeRates, formatCurrency, getLocaleForIntl } from '@/libs/CoinGecko';
import { getBTCStats, formatHashRate, formatDifficulty } from '@/libs/BlockchainInfo';
import { getFearGreedIndex, getFearGreedLabel } from '@/libs/FearGreed';
import { getLatestNews } from '@/libs/CryptoPanic';
import { MarketDominanceBar } from '@/components/crypto/MarketDominanceBar';
import { FearGreedGauge } from '@/components/crypto/FearGreedGauge';
import { NewsFeed } from '@/components/crypto/NewsFeed';

interface GlobalPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: GlobalPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'GlobalPage' });
  return buildMetadata({ title: t('meta_title'), description: t('meta_description'), path: '/global', locale });
}

export default async function GlobalPage(props: GlobalPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'GlobalPage' });
  const intlLocale = getLocaleForIntl(locale);

  const [globalData, defiData, btcStats, fgData, btcRates, latestNews] = await Promise.all([
    getGlobalData().catch(() => null),
    getGlobalDeFiData().catch(() => null),
    getBTCStats().catch(() => null),
    getFearGreedIndex(1).catch(() => []),
    getExchangeRates().catch(() => null),
    getLatestNews('hot').catch(() => []),
  ]);

  const gd = globalData?.data;
  const fgValue = fgData?.[0] ? parseInt(fgData[0].value) : 50;
  const fgLabel = getFearGreedLabel(fgValue);

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <h1 className="font-pixel text-xl md:text-2xl text-white mb-2" style={{ textShadow: '0 0 20px rgba(0,211,149,0.5)' }}>
        {t('title')}
      </h1>
      <p className="text-subtle text-sm mb-10">{t('description')}</p>

      {/* Market Stats */}
      {gd && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">&#9654; {t('market_stats')}</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-dark border border-border p-4">
              <div className="text-[0.72rem] text-muted mb-1">{t('total_market_cap')}</div>
              <div className="text-lg font-bold text-white tabular-nums">{formatCurrency(gd.total_market_cap.usd || 0, 'USD', intlLocale)}</div>
            </div>
            <div className="bg-dark border border-border p-4">
              <div className="text-[0.72rem] text-muted mb-1">{t('total_volume')}</div>
              <div className="text-lg font-bold text-white tabular-nums">{formatCurrency(gd.total_volume.usd || 0, 'USD', intlLocale)}</div>
            </div>
            <div className="bg-dark border border-border p-4">
              <div className="text-[0.72rem] text-muted mb-1">{t('active_cryptos')}</div>
              <div className="text-lg font-bold text-white tabular-nums">{gd.active_cryptocurrencies.toLocaleString()}</div>
            </div>
            <div className="bg-dark border border-border p-4">
              <div className="text-[0.72rem] text-muted mb-1">{t('markets')}</div>
              <div className="text-lg font-bold text-white tabular-nums">{gd.markets.toLocaleString()}</div>
            </div>
          </div>
        </section>
      )}

      {/* Market Dominance */}
      {gd?.market_cap_percentage && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">&#9654; {t('dominance')}</div>
          <div className="bg-dark border border-border p-4">
            <MarketDominanceBar percentages={gd.market_cap_percentage} />
          </div>
        </section>
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* DeFi Stats */}
        {defiData && (
          <section>
            <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">&#9654; {t('defi_stats')}</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark border border-border p-4">
                <div className="text-[0.72rem] text-muted mb-1">{t('defi_market_cap')}</div>
                <div className="text-base font-bold text-white tabular-nums">{formatCurrency(parseFloat(defiData.data.defi_market_cap), 'USD', intlLocale)}</div>
              </div>
              <div className="bg-dark border border-border p-4">
                <div className="text-[0.72rem] text-muted mb-1">{t('defi_volume')}</div>
                <div className="text-base font-bold text-white tabular-nums">{formatCurrency(parseFloat(defiData.data.trading_volume_24h), 'USD', intlLocale)}</div>
              </div>
              <div className="bg-dark border border-border p-4">
                <div className="text-[0.72rem] text-muted mb-1">{t('defi_dominance')}</div>
                <div className="text-base font-bold text-white tabular-nums">{parseFloat(defiData.data.defi_dominance).toFixed(2)}%</div>
              </div>
            </div>
          </section>
        )}

        {/* BTC Network */}
        {btcStats && (
          <section>
            <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">&#9654; {t('btc_network')}</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark border border-border p-4">
                <div className="text-[0.72rem] text-muted mb-1">{t('hash_rate')}</div>
                <div className="text-base font-bold text-white tabular-nums">{formatHashRate(btcStats.hash_rate * 1e9)}</div>
              </div>
              <div className="bg-dark border border-border p-4">
                <div className="text-[0.72rem] text-muted mb-1">{t('difficulty')}</div>
                <div className="text-base font-bold text-white tabular-nums">{formatDifficulty(btcStats.difficulty)}</div>
              </div>
              <div className="bg-dark border border-border p-4">
                <div className="text-[0.72rem] text-muted mb-1">{t('blocks_mined')}</div>
                <div className="text-base font-bold text-white tabular-nums">{btcStats.n_blocks_mined}</div>
              </div>
              <div className="bg-dark border border-border p-4">
                <div className="text-[0.72rem] text-muted mb-1">{t('transactions')}</div>
                <div className="text-base font-bold text-white tabular-nums">{btcStats.n_tx.toLocaleString()}</div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Sentiment */}
      <section className="mb-10">
        <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">&#9654; {t('sentiment')}</div>
        <div className="bg-dark border border-border p-6 flex justify-center">
          <FearGreedGauge value={fgValue} label={t(fgLabel as 'extreme_fear' | 'fear' | 'neutral' | 'greed' | 'extreme_greed')} />
        </div>
      </section>

      {/* BTC Exchange Rates (Forex mini) */}
      {btcRates?.rates && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">&#9654; {t('exchange_rates')}</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(btcRates.rates)
              .filter(([, r]) => r.type === 'fiat')
              .sort(([a], [b]) => a.localeCompare(b))
              .slice(0, 8)
              .map(([code, rate]) => (
                <div key={code} className="bg-dark border border-border p-3">
                  <div className="text-[0.65rem] text-muted mb-1">{rate.name}</div>
                  <div className="text-sm font-semibold text-white tabular-nums">
                    {rate.unit}{Math.round(rate.value).toLocaleString(intlLocale)}
                  </div>
                  <div className="text-[0.55rem] text-subtle">{code}</div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Latest News */}
      {latestNews.length > 0 && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">&#9654; Latest News</div>
          <NewsFeed posts={latestNews} maxItems={5} />
        </section>
      )}
    </div>
  );
}
