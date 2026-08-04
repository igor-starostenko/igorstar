import withBundleAnalyzer from '@next/bundle-analyzer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env', override: true });

const next_config = {
  output: 'export',
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048, 3840],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    qualities: [30, 35, 75],
    loader: 'custom',
    loaderFile: './src/helpers/contentfulLoader.js',
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