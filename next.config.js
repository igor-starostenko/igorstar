const next_config = {
  images: {
    domains: ['images.ctfassets.net'],
    ...{ ...(process.env.IMAGE_OPTIMIZATION ? {} : { loader: 'custom' }) },
  },
};

module.exports = { ...next_config };
