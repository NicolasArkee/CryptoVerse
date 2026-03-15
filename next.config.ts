import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import './src/libs/Env';

const baseConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  outputFileTracingIncludes: {
    '/': ['./migrations/**/*'],
  },
};

const configWithPlugins = createNextIntlPlugin('./src/libs/I18n.ts')(baseConfig);

const nextConfig = configWithPlugins;
export default nextConfig;
