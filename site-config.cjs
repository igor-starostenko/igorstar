const { resolve } = require('path');

// Test configuration with non-personal data
const config = {
  version: '2.5.0',
  author: 'Test Author',
  siteTitle: 'Blog Site',
  siteTitleShort: 'Site',
  siteDescription: 'Test description for blog content.',
  siteUrl: 'https://example.com',
  themeColor: '#000',
  backgroundColor: '#fff',
  pathPrefix: null,
  logo: resolve(__dirname, 'public/icon.png'),
  social: {
    github: 'testuser',
    fivehundredpx: 'testuser',
    flickr: 'testuser',
    linkedin: 'testuser',
    youtube: 'testchannel',
  },
};

module.exports = config;
