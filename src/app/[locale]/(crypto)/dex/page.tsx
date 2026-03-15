import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/utils/Seo';
import { getDexVolumes, formatTVL } from '@/libs/DefiLlama';

interface DexPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: DexPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'DexPage' });
  return buildMetadata({ title: t('meta_title'), description: t('meta_description'), path: '/dex', locale });
}

export default async function DexPage(props: DexPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'DexPage' });

  let dexes: Awaited<ReturnType<typeof getDexVolumes>> = [];

  try {
    const allDexes = await getDexVolumes();
    dexes = allDexes
      .filter(d => d.total24h != null && (d.total24h ?? 0) > 0)
      .sort((a, b) => (b.total24h ?? 0) - (a.total24h ?? 0));
  } catch {
    // handle
  }

  const totalVolume24h = dexes.reduce((sum, d) => sum + (d.total24h ?? 0), 0);

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <h1 className="font-pixel text-xl md:text-2xl text-white mb-2" style={{ textShadow: '0 0 20px rgba(0,211,149,0.5)' }}>
        {t('title')}
      </h1>
      <p className="text-subtle text-sm mb-10">{t('description')}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">{t('volume_24h')}</div>
          <div className="text-xl font-bold text-white tabular-nums">{formatTVL(totalVolume24h)}</div>
        </div>
        <div className="bg-dark border border-border p-4">
          <div className="text-[0.72rem] text-muted mb-1">DEXes</div>
          <div className="text-xl font-bold text-white tabular-nums">{dexes.length}</div>
        </div>
      </div>

      {/* DEX Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted text-[0.72rem] uppercase tracking-wider">
              <th className="text-left py-2 px-2">#</th>
              <th className="text-left py-2 px-2">{t('dex_name')}</th>
              <th className="text-left py-2 px-2">{t('chain')}</th>
              <th className="text-right py-2 px-2">{t('volume_24h')}</th>
              <th className="text-right py-2 px-2">{t('volume_7d')}</th>
              <th className="text-right py-2 px-2">{t('change_1d')}</th>
            </tr>
          </thead>
          <tbody>
            {dexes.slice(0, 50).map((dex, i) => (
              <tr key={dex.name} className="border-b border-border/50 hover:bg-dark/50">
                <td className="py-2 px-2 text-muted">{i + 1}</td>
                <td className="py-2 px-2 text-white font-medium">
                  {dex.displayName || dex.name}
                </td>
                <td className="py-2 px-2 text-muted text-xs">
                  {dex.chains?.slice(0, 3).join(', ')}{dex.chains?.length > 3 ? ` +${dex.chains.length - 3}` : ''}
                </td>
                <td className="py-2 px-2 text-right text-white tabular-nums">
                  {dex.total24h != null ? formatTVL(dex.total24h) : '--'}
                </td>
                <td className="py-2 px-2 text-right text-white tabular-nums">
                  {dex.total7d != null ? formatTVL(dex.total7d) : '--'}
                </td>
                <td className={`py-2 px-2 text-right tabular-nums ${(dex.change_1d ?? 0) >= 0 ? 'text-green' : 'text-red'}`}>
                  {dex.change_1d != null ? `${dex.change_1d >= 0 ? '+' : ''}${dex.change_1d.toFixed(2)}%` : '--'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
