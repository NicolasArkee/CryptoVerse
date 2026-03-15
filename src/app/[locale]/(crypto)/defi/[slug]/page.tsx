import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/utils/Seo';
import { getProtocol, formatTVL } from '@/libs/DefiLlama';
import { TVLChart } from '@/components/crypto/TVLChart';

interface DefiDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata(props: DefiDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const t = await getTranslations({ locale, namespace: 'DefiDetailPage' });
  const name = slug.charAt(0).toUpperCase() + slug.slice(1);
  return buildMetadata({
    title: t('meta_title', { name }),
    description: t('meta_description', { name }),
    path: `/defi/${slug}`,
    locale,
  });
}

export default async function DefiDetailPage(props: DefiDetailPageProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'DefiDetailPage' });

  let protocol: Awaited<ReturnType<typeof getProtocol>>;
  try {
    protocol = await getProtocol(slug);
  } catch {
    notFound();
  }

  const currentTVL = protocol.tvl?.length > 0 ? protocol.tvl[protocol.tvl.length - 1]!.totalLiquidityUSD : 0;
  const last90Days = protocol.tvl?.slice(-90) || [];

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={protocol.logo} alt={protocol.name} width={48} height={48} className="rounded-full" />
        <div>
          <h1 className="text-2xl font-bold text-white">{protocol.name}</h1>
          <div className="text-muted text-sm">{protocol.category}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">{t('tvl')}</div>
          <div className="text-xl font-bold text-white tabular-nums">{formatTVL(currentTVL)}</div>
        </div>
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">{t('category')}</div>
          <div className="text-xl font-bold text-white">{protocol.category}</div>
        </div>
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">Chains</div>
          <div className="text-xl font-bold text-white">{protocol.chains?.length || 0}</div>
        </div>
      </div>

      {/* TVL History Chart */}
      {last90Days.length > 1 && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">&#9654; {t('tvl_history')}</div>
          <div className="bg-dark border border-border p-4">
            <TVLChart data={last90Days} />
          </div>
        </section>
      )}

      {/* Chain Breakdown */}
      {protocol.currentChainTvls && Object.keys(protocol.currentChainTvls).length > 0 && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">&#9654; {t('chain_breakdown')}</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(protocol.currentChainTvls)
              .filter(([key]) => !key.includes('-'))
              .sort(([, a], [, b]) => b - a)
              .slice(0, 12)
              .map(([chain, tvl]) => (
                <div key={chain} className="bg-dark border border-border p-3">
                  <div className="text-white font-medium text-sm">{chain}</div>
                  <div className="text-subtle text-sm tabular-nums">{formatTVL(tvl)}</div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* About */}
      {protocol.description && (
        <section className="mb-10">
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">&#9654; {t('about')}</div>
          <div className="bg-dark border border-border p-6 text-light text-sm leading-relaxed max-w-3xl">
            {protocol.description}
          </div>
        </section>
      )}

      {/* Links */}
      {protocol.url && (
        <section>
          <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">&#9654; {t('links')}</div>
          <div className="flex flex-wrap gap-3">
            <a href={protocol.url} target="_blank" rel="noopener noreferrer" className="border border-border hover:border-green/50 text-subtle hover:text-white px-4 py-2 text-sm transition-colors">
              Website &rarr;
            </a>
            {protocol.twitter && (
              <a href={`https://twitter.com/${protocol.twitter}`} target="_blank" rel="noopener noreferrer" className="border border-border hover:border-green/50 text-subtle hover:text-white px-4 py-2 text-sm transition-colors">
                Twitter &rarr;
              </a>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
