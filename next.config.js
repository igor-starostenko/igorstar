import withBundleAnalyzer from '@next/bundle-analyzer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env', override: true });

const next_config = {
  output: 'export',
  images: {
    loaderFile: './src/lib/contentfulLoader.js',
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
