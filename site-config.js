import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  version: '2.5.0',
  author: 'Igor Starostenko',
  siteTitle: 'IgorStar: Blog',
  siteTitleShort: 'IgorStar',
  siteDescription: 'Travel, photography, data and software. Personal blog.',
  siteUrl: 'https://igorstar.com',
  themeColor: '#000',
  backgroundColor: '#fff',
  pathPrefix: null,
  logo: __dirname + '/public/icon.png',
  social: {
    github: 'igor-starostenko',
    fivehundredpx: 'igorstar',
    flickr: 'igor_star',
    linkedin: 'igorstarostenko',
    youtube: 'UCo68YrHvGcKqNWrMb0kV-QA',
  },
};
