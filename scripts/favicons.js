const { favicons } = require('favicons');
const path = require('path');
const fs = require('fs');

const {
  author,
  siteTitleShort,
  siteDescription,
  siteUrl,
  themeColor,
  backgroundColor,
} = require('../site-config');

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
  version: '1.0',
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
