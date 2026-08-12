import siteConfig from './site-config.cjs';

const siteUrl = process.env.SITE_URL || siteConfig.siteUrl;

export default {
  siteUrl,
  generateRobotsTxt: true,
  // Use trailing slash to match Next.js trailingSlash config
  trailingSlash: true,
};
