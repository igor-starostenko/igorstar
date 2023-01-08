const imageOptimization = (process.env.IMAGE_OPTIMIZATION || '1') === '1';

const next_config = {
  images: {
    domains: ['images.ctfassets.net'],
    ...{ ...(imageOptimization ? {} : { loader: 'custom' }) },
  },
  env: {
    imageOptimization,
  },
  productionBrowserSourceMaps: true,
};

module.exports = { ...next_config };
