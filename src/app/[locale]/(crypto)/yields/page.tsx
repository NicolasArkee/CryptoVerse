import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/utils/Seo';
import { getYieldPools, formatTVL } from '@/libs/DefiLlama';
import { YieldPoolsTable } from '@/components/crypto/YieldPoolsTable';

interface YieldsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: YieldsPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'YieldsPage' });
  return buildMetadata({ title: t('meta_title'), description: t('meta_description'), path: '/yields', locale });
}

export default async function YieldsPage(props: YieldsPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'YieldsPage' });

  let pools: Awaited<ReturnType<typeof getYieldPools>> = [];

  try {
    const allPools = await getYieldPools();
    // Filter: only pools with >$100K TVL and positive APY, sorted by TVL
    pools = allPools
      .filter(p => p.tvlUsd > 100_000 && p.apy > 0 && p.apy < 10000)
      .sort((a, b) => b.tvlUsd - a.tvlUsd)
      .slice(0, 500);
  } catch {
    // handle
  }

  const totalTVL = pools.reduce((sum, p) => sum + p.tvlUsd, 0);
  const avgApy = pools.length > 0 ? pools.reduce((sum, p) => sum + p.apy, 0) / pools.length : 0;

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <h1 className="font-pixel text-xl md:text-2xl text-white mb-2" style={{ textShadow: '0 0 20px rgba(0,211,149,0.5)' }}>
        {t('title')}
      </h1>
      <p className="text-subtle text-sm mb-10">{t('description')}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">{t('tvl')}</div>
          <div className="text-xl font-bold text-white tabular-nums">{formatTVL(totalTVL)}</div>
        </div>
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">Avg APY</div>
          <div className="text-xl font-bold text-green tabular-nums">{avgApy.toFixed(2)}%</div>
        </div>
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">Pools</div>
          <div className="text-xl font-bold text-white tabular-nums">{pools.length}</div>
        </div>
      </div>

      {/* Pools Table */}
      <YieldPoolsTable pools={pools} />
    </div>
  );
}
