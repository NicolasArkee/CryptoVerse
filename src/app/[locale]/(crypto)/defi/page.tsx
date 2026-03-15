import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/utils/Seo';
import { getGlobalDeFiData } from '@/libs/CoinGecko';
import { getProtocols, formatTVL } from '@/libs/DefiLlama';
import { Link } from '@/libs/I18nNavigation';

interface DefiPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: DefiPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'DefiPage' });
  return buildMetadata({ title: t('meta_title'), description: t('meta_description'), path: '/defi', locale });
}

export default async function DefiPage(props: DefiPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'DefiPage' });

  let globalDefi: Awaited<ReturnType<typeof getGlobalDeFiData>> | null = null;
  let protocols: Awaited<ReturnType<typeof getProtocols>> = [];

  try {
    [globalDefi, protocols] = await Promise.all([
      getGlobalDeFiData().catch(() => null),
      getProtocols(),
    ]);
  } catch {
    // handle
  }

  const topProtocols = protocols
    .filter(p => p.tvl > 0)
    .sort((a, b) => b.tvl - a.tvl)
    .slice(0, 50);

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <h1 className="font-pixel text-xl md:text-2xl text-white mb-2" style={{ textShadow: '0 0 20px rgba(0,211,149,0.5)' }}>
        {t('title')}
      </h1>
      <p className="text-subtle text-sm mb-10">{t('description')}</p>

      {/* DeFi Stats */}
      {globalDefi && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-dark border border-border p-4">
            <div className="text-[0.72rem] text-muted mb-1">{t('total_tvl')}</div>
            <div className="text-xl font-bold text-white tabular-nums">{formatTVL(parseFloat(globalDefi.data.defi_market_cap))}</div>
          </div>
          <div className="bg-dark border border-border p-4">
            <div className="text-[0.72rem] text-muted mb-1">{t('defi_dominance')}</div>
            <div className="text-xl font-bold text-white tabular-nums">{parseFloat(globalDefi.data.defi_dominance).toFixed(2)}%</div>
          </div>
          <div className="bg-dark border border-border p-4">
            <div className="text-[0.72rem] text-muted mb-1">{t('top_protocol')}</div>
            <div className="text-xl font-bold text-white">{globalDefi.data.top_coin_name}</div>
          </div>
        </div>
      )}

      {/* Protocols Table */}
      <section>
        <div className="font-pixel text-[0.42rem] text-green-bright tracking-[0.12em] mb-4">&#9654; {t('protocols')}</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted text-[0.72rem] uppercase tracking-wider">
                <th className="text-left py-3 px-2">#</th>
                <th className="text-left py-3 px-2">{t('name')}</th>
                <th className="text-left py-3 px-2 hidden md:table-cell">{t('category')}</th>
                <th className="text-right py-3 px-2">{t('tvl')}</th>
                <th className="text-right py-3 px-2">{t('change_1d')}</th>
                <th className="text-right py-3 px-2 hidden md:table-cell">{t('chains')}</th>
              </tr>
            </thead>
            <tbody>
              {topProtocols.map((p, i) => (
                <tr key={p.slug} className="border-b border-border/50 hover:bg-dark/50 transition-colors">
                  <td className="py-3 px-2 text-muted tabular-nums">{i + 1}</td>
                  <td className="py-3 px-2">
                    <Link href={`/defi/${p.slug}`} className="flex items-center gap-2 hover:text-green transition-colors">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.logo} alt={p.name} width={20} height={20} className="rounded-full" />
                      <span className="text-white font-medium">{p.name}</span>
                    </Link>
                  </td>
                  <td className="py-3 px-2 text-subtle text-xs hidden md:table-cell">{p.category}</td>
                  <td className="py-3 px-2 text-right text-white tabular-nums">{formatTVL(p.tvl)}</td>
                  <td className="py-3 px-2 text-right">
                    {p.change_1d !== null && (
                      <span className={`text-sm tabular-nums ${p.change_1d >= 0 ? 'text-green' : 'text-red'}`}>
                        {p.change_1d >= 0 ? '+' : ''}{p.change_1d.toFixed(2)}%
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-right text-muted hidden md:table-cell">{p.chains.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
