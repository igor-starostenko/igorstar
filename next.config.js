const path = require('path');
const Dotenv = require('dotenv-webpack');
const { getPostsPaths } = require('./src/contentClient');

const next_config = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  webpack: config => {
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

  // Exporting all available blog posts when building and exporting our website
  exportPathMap: async () => {
    const posts = await getPostsPaths();

    const insights = posts.reduce(
      (pages, { params }) =>
        Object.assign({}, pages, {
          [`/posts/${params.path}`]: {
            page: '/posts',
            query: { post: params.path },
          },
        }),
      {}
    );

    const pages = {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/feed': { page: '/feed' },
      '/gallery': { page: '/gallery' },
      '/posts': { page: '/posts' },
    };

    return Object.assign({}, pages, insights);
  },
};

module.exports = { ...next_config };
