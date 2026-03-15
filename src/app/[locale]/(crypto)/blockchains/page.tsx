import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/utils/Seo';
import { getChains } from '@/libs/DefiLlama';
import { ChainCard } from '@/components/crypto/ChainCard';

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

  let chains: Awaited<ReturnType<typeof getChains>> = [];
  try {
    chains = (await getChains())
      .filter(c => c.tvl > 0)
      .sort((a, b) => b.tvl - a.tvl);
  } catch {
    // handle
  }

  return (
    <div className="mx-auto max-w-[80rem] px-6 py-12">
      <h1 className="font-pixel text-xl md:text-2xl text-white mb-2" style={{ textShadow: '0 0 20px rgba(0,211,149,0.5)' }}>
        {t('title')}
      </h1>
      <p className="text-subtle text-sm mb-10">{t('description')}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {chains.slice(0, 40).map(chain => (
          <ChainCard key={chain.name} name={chain.name} tvl={chain.tvl} tokenSymbol={chain.tokenSymbol || ''} />
        ))}
      </div>
    </div>
  );
}
