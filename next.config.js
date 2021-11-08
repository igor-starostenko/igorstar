const path = require('path');
const Dotenv = require('dotenv-webpack');

const next_config = {
  images: {
    domains: ['images.ctfassets.net'],
    ...{ ...(process.env.IMAGE_OPTIMIZATION ? {} : { loader: 'custom' }) },
  },
  webpack: (config) => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,
      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ];

    return config;
  },
};

module.exports = { ...next_config };
