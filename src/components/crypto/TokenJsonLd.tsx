interface TokenJsonLdProps {
  name: string;
  symbol: string;
  description: string;
  image: string;
  priceUsd: number;
  marketCap: number;
  slug: string;
}

export function TokenJsonLd({ name, symbol, description, image, priceUsd, marketCap, slug }: TokenJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: `${name} (${symbol.toUpperCase()})`,
    description: description.slice(0, 300),
    image,
    identifier: symbol.toUpperCase(),
    url: `https://cryptoverse-self-nu.vercel.app/tokens/${slug}`,
    offers: {
      '@type': 'Offer',
      price: priceUsd,
      priceCurrency: 'USD',
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Market Capitalization',
        value: marketCap,
        unitCode: 'USD',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
