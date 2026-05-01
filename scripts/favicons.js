import favicons from 'favicons';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteConfig = await import('../site-config.js').then(m => m.default || m);

const {
  author,
  siteTitleShort,
  siteDescription,
  siteUrl,
  themeColor,
  backgroundColor,
  version,
} = siteConfig;

const dir = path.resolve(__dirname, '../public/icons/');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const source = 'public/icon.png';
const configuration = {
  path: '/icons/',
  appName: siteTitleShort,
  appDescription: siteDescription,
  developerName: author,
  developerURL: siteUrl,
  dir: 'auto',
  lang: 'en-US',
  background: backgroundColor,
  theme_color: themeColor,
  display: 'standalone',
  orientation: 'any',
  start_url: '/',
  version,
  logging: true,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    windows: true,
    yandex: false,
  },
};

const callback = function (res) {
  res.images.forEach((image) => {
    fs.writeFile(
      path.resolve(__dirname, '../public/icons/', image.name),
      image.contents,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });

  res.files.forEach((file) => {
    fs.writeFile(
      path.resolve(__dirname, '../public/', file.name),
      file.contents,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
};

(async () => {
  const response = await favicons(source, configuration);
  callback(response);
})();
