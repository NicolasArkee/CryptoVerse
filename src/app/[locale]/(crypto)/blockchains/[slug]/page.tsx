import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/utils/Seo';
import { getChains, getProtocols, getChainHistory, getChainFees, formatTVL } from '@/libs/DefiLlama';
import { ProtocolCard } from '@/components/crypto/ProtocolCard';
import { TVLChart } from '@/components/crypto/TVLChart';
import { Breadcrumbs } from '@/components/crypto/Breadcrumbs';

interface BlockchainDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata(props: BlockchainDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const t = await getTranslations({ locale, namespace: 'BlockchainDetailPage' });
  const name = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  return buildMetadata({
    title: t('meta_title', { name }),
    description: t('meta_description', { name }),
    path: `/blockchains/${slug}`,
    locale,
  });
}

export default async function BlockchainDetailPage(props: BlockchainDetailPageProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'BlockchainDetailPage' });

  let chains: Awaited<ReturnType<typeof getChains>> = [];
  let protocols: Awaited<ReturnType<typeof getProtocols>> = [];

  try {
    [chains, protocols] = await Promise.all([
      getChains(),
      getProtocols(),
    ]);
  } catch {
    notFound();
  }

  const chain = chains.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === slug);
  if (!chain) notFound();

  const chainProtocols = protocols
    .filter(p => p.chains.includes(chain.name))
    .sort((a, b) => b.tvl - a.tvl)
    .slice(0, 20);

  // Fetch TVL history and fees in parallel
  const [history, fees] = await Promise.all([
    getChainHistory(chain.name).catch(() => []),
    getChainFees(chain.name).catch(() => null),
  ]);

  const last90Days = history.slice(-90).map(h => ({
    date: h.date,
    totalLiquidityUSD: h.tvl,
  }));

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <Breadcrumbs items={[
        { label: t('meta_title', { name: '' }).replace(' Blockchain — CryptoVerse', '').trim() || 'Blockchains', href: '/blockchains' },
        { label: chain.name },
      ]} />

      <h1 className="font-pixel text-xl md:text-2xl text-white mb-2" style={{ textShadow: '0 0 20px rgba(0,211,149,0.5)' }}>
        {chain.name}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">{t('tvl')}</div>
          <div className="text-xl font-bold text-white tabular-nums">{formatTVL(chain.tvl)}</div>
        </div>
        {chain.tokenSymbol && (
          <div className="bg-dark border border-border p-4">
            <div className="text-[0.72rem] text-muted mb-1">{t('native_token')}</div>
            <div className="text-xl font-bold text-white">{chain.tokenSymbol}</div>
          </div>
        )}
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">Protocols</div>
          <div className="text-xl font-bold text-white tabular-nums">{chainProtocols.length}</div>
        </div>
        {fees?.total24h != null && (
          <div className="bg-dark border border-border p-4">
            <div className="text-[0.72rem] text-muted mb-1">Fees (24h)</div>
            <div className="text-xl font-bold text-white tabular-nums">{formatTVL(fees.total24h)}</div>
          </div>
        )}
      </div>

      {/* Fees & Revenue */}
      {fees && (fees.total24h != null || fees.total7d != null) && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">&#9654; Fees &amp; Revenue</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {fees.total24h != null && (
              <div className="bg-dark border border-border p-4">
                <div className="text-[0.72rem] text-muted mb-1">Fees 24h</div>
                <div className="text-base font-bold text-white tabular-nums">{formatTVL(fees.total24h)}</div>
              </div>
            )}
            {fees.total7d != null && (
              <div className="bg-dark border border-border p-4">
                <div className="text-[0.72rem] text-muted mb-1">Fees 7d</div>
                <div className="text-base font-bold text-white tabular-nums">{formatTVL(fees.total7d)}</div>
              </div>
            )}
            {fees.total30d != null && (
              <div className="bg-dark border border-border p-4">
                <div className="text-[0.72rem] text-muted mb-1">Fees 30d</div>
                <div className="text-base font-bold text-white tabular-nums">{formatTVL(fees.total30d)}</div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TVL History Chart */}
      {last90Days.length > 1 && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">&#9654; TVL History</div>
          <div className="bg-dark border border-border p-4">
            <TVLChart data={last90Days} />
          </div>
        </section>
      )}

      {/* Top Protocols */}
      {chainProtocols.length > 0 && (
        <section>
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">
            &#9654; {t('top_protocols')}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {chainProtocols.map(p => (
              <ProtocolCard
                key={p.slug}
                name={p.name}
                slug={p.slug}
                logo={p.logo}
                category={p.category}
                tvl={p.tvl}
                change1d={p.change_1d}
                chains={p.chains}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
