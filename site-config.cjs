const { resolve } = require('path');

const config = {
  version: '2.5.0',
  author: 'Igor Starostenko',
  siteTitle: 'IgorStar: Blog',
  siteTitleShort: 'IgorStar',
  siteDescription: 'Travel, photography, data and software. Personal blog.',
  siteUrl: 'https://igorstar.com',
  themeColor: '#000',
  backgroundColor: '#fff',
  pathPrefix: null,
  logo: resolve(__dirname, 'public/icon.png'),
  social: {
    github: 'igor-starostenko',
    fivehundredpx: 'igorstar',
    flickr: 'igor_star',
    linkedin: 'igorstarostenko',
    twitter: null,
    youtube: 'UCo68YrHvGcKqNWrMb0kV-QA',
  },
};

module.exports = config;
