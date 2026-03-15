import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/libs/I18nRouting';
import { getBaseUrl } from '@/utils/Helpers';
import { ScanlineOverlay } from '@/components/layout/ScanlineOverlay';
import '@/styles/global.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={outfit.variable}>
      <body className="bg-void text-white antialiased min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-ui)' }}>
        <NextIntlClientProvider>
          {props.children}
        </NextIntlClientProvider>
        <ScanlineOverlay />
      </body>
    </html>
  );
}
