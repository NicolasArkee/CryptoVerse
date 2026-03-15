import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/utils/Seo';
import { getStablecoins, formatTVL } from '@/libs/DefiLlama';

interface StablecoinsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: StablecoinsPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'StablecoinsPage' });
  return buildMetadata({ title: t('meta_title'), description: t('meta_description'), path: '/stablecoins', locale });
}

export default async function StablecoinsPage(props: StablecoinsPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'StablecoinsPage' });

  let stables: Awaited<ReturnType<typeof getStablecoins>>['peggedAssets'] = [];
  try {
    const data = await getStablecoins();
    stables = data.peggedAssets
      .filter(s => (s.circulating?.peggedUSD ?? 0) > 0)
      .sort((a, b) => (b.circulating?.peggedUSD || 0) - (a.circulating?.peggedUSD || 0))
      .slice(0, 50);
  } catch {
    // handle error
  }

  const totalMcap = stables.reduce((s, c) => s + (c.circulating?.peggedUSD || 0), 0);

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <h1 className="font-pixel text-xl md:text-2xl text-white mb-2" style={{ textShadow: '0 0 20px rgba(0,211,149,0.5)' }}>
        {t('title')}
      </h1>
      <p className="text-subtle text-sm mb-4">{t('description')}</p>
      <div className="text-white text-lg font-semibold mb-10 tabular-nums">
        Total: {formatTVL(totalMcap)}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted text-[0.72rem] uppercase tracking-wider">
              <th className="text-left py-3 px-2">#</th>
              <th className="text-left py-3 px-2">{t('name')}</th>
              <th className="text-left py-3 px-2">{t('peg')}</th>
              <th className="text-right py-3 px-2">{t('circulating')}</th>
              <th className="text-right py-3 px-2">{t('price')}</th>
              <th className="text-right py-3 px-2 hidden md:table-cell">{t('chains')}</th>
            </tr>
          </thead>
          <tbody>
            {stables.map((s, i) => (
              <tr key={s.id} className="border-b border-border/50 hover:bg-dark/50 transition-colors">
                <td className="py-3 px-2 text-muted tabular-nums">{i + 1}</td>
                <td className="py-3 px-2">
                  <div className="text-white font-medium">{s.name}</div>
                  <div className="text-muted text-xs uppercase">{s.symbol}</div>
                </td>
                <td className="py-3 px-2 text-subtle text-xs">{s.pegType?.replace('pegged', '').replace('to', ' ').trim() || 'USD'}</td>
                <td className="py-3 px-2 text-right text-white tabular-nums">{formatTVL(s.circulating?.peggedUSD || 0)}</td>
                <td className="py-3 px-2 text-right text-white tabular-nums">{s.price ? `$${s.price.toFixed(4)}` : '--'}</td>
                <td className="py-3 px-2 text-right text-muted hidden md:table-cell">{s.chains?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
