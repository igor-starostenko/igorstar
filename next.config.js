import withBundleAnalyzer from '@next/bundle-analyzer';

const next_config = {
  images: {
    unoptimized: true,
    loader: 'img',
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
