import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/utils/Seo';
import { getChains, getProtocols } from '@/libs/DefiLlama';
import { BlockchainsTable } from '@/components/crypto/BlockchainsTable';

interface BlockchainsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: BlockchainsPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'BlockchainsPage' });
  return buildMetadata({ title: t('meta_title'), description: t('meta_description'), path: '/blockchains', locale });
}

export default async function BlockchainsPage(props: BlockchainsPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'BlockchainsPage' });

  let chainRows: { name: string; slug: string; tvl: number; tokenSymbol: string; protocolCount: number }[] = [];

  try {
    const [chains, protocols] = await Promise.all([
      getChains(),
      getProtocols(),
    ]);

    // Count protocols per chain
    const protocolCounts: Record<string, number> = {};
    for (const p of protocols) {
      if (p.tvl <= 0) continue;
      for (const chain of p.chains) {
        protocolCounts[chain] = (protocolCounts[chain] || 0) + 1;
      }
    }

    chainRows = chains
      .filter(c => c.tvl > 0)
      .sort((a, b) => b.tvl - a.tvl)
      .map(c => ({
        name: c.name,
        slug: c.name.toLowerCase().replace(/\s+/g, '-'),
        tvl: c.tvl,
        tokenSymbol: c.tokenSymbol || '',
        protocolCount: protocolCounts[c.name] || 0,
      }));
  } catch {
    // handle
  }

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <h1 className="font-pixel text-xl md:text-2xl text-white mb-2" style={{ textShadow: '0 0 20px rgba(0,211,149,0.5)' }}>
        {t('title')}
      </h1>
      <p className="text-subtle text-sm mb-10">{t('description')}</p>

      <BlockchainsTable chains={chainRows} />
    </div>
  );
}
