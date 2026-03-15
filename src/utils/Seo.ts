import type { Metadata } from 'next';
import { AppConfig } from '@/utils/AppConfig';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';

interface MetatagFromDB {
  metaTitle: string;
  metaDescription: string;
  ogImage?: string | null;
  canonicalUrl?: string | null;
}

export function buildMetadataFromDB(opts: {
  metatag: MetatagFromDB;
  path: string;
  locale: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
}): Metadata {
  const { metatag, path, locale, ogType = 'website', noIndex } = opts;
  const baseUrl = getBaseUrl();

  const alternateLanguages: Record<string, string> = {};
  for (const loc of AppConfig.i18n.locales) {
    alternateLanguages[loc] = `${baseUrl}${getI18nPath(path, loc)}`;
  }

  const canonical = metatag.canonicalUrl || `${baseUrl}${getI18nPath(path, locale)}`;
  const ogImageUrl = metatag.ogImage || `${baseUrl}/og-default.png`;

  return {
    title: metatag.metaTitle,
    description: metatag.metaDescription,
    alternates: {
      canonical,
      languages: alternateLanguages,
    },
    openGraph: {
      title: metatag.metaTitle,
      description: metatag.metaDescription,
      type: ogType,
      locale,
      siteName: AppConfig.name,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: metatag.metaTitle,
      description: metatag.metaDescription,
      images: [ogImageUrl],
    },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}

export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  locale: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
}): Metadata {
  return buildMetadataFromDB({
    metatag: {
      metaTitle: opts.title,
      metaDescription: opts.description,
    },
    ...opts,
  });
}
