import withBundleAnalyzer from '@next/bundle-analyzer';
import dotenv from 'dotenv';

// Load .env file to make CONTENTFUL_* variables available at build time
dotenv.config({ path: '.env', override: true });

const next_config = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'live.staticflickr.com',
      },
    ],
  },
  productionBrowserSourceMaps: true,
  turbopack: {},
};

export default withBundleAnalyzer()(next_config);
