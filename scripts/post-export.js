require('dotenv').config();
const { generateSitemap } = require('./sitemap');
const { siteUrl } = require('../site-config');
generateSitemap(siteUrl, './public/');
