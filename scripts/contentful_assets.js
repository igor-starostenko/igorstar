const fs = require('fs');
const fetch = require('node-fetch');
const contentful = require('contentful');
require('dotenv').config();

const imageDirectory = process.env.IMAGE_DIRECTORY || './public/images/';
const replaceImages = parseInt(process.env.REPLACE_IMAGES || '0');
const limit = parseInt(process.env.CONTENTFUL_LIMIT || '100');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
});

const saveFile = async (i, url, name) => {
  const path = imageDirectory + name;
  if (fs.existsSync(path)) {
    return console.log(`${i + 1}. ${path} already exists`);
  }

  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFile(path, buffer, () =>
    console.log(`${i + 1}. Saved ${url} into ${path}`)
  );
};

const getAllAssets = async (options) => {
  let records = { items: [] };
  // Ensure we load all records, regardless of the API limit
  while (records.total != 0 && records.items.length < (records.total || 1)) {
    let response = await client.getAssets({
      ...options, // skip can't be overriden
      skip: records.items.length,
    });
    records = { ...response, items: [...records.items, ...response.items] };
  }
  return records;
};

const saveAllAssets = async (items) => {
  for (let i = 0; i < items.length; i += 1) {
    const src = `https:${items[i].fields.file.url}`;
    const fileName = `${items[i].sys.id}_${items[i].fields.file.fileName}`;
    await saveFile(i, src, fileName);
  }
};

(async () => {
  const assets = await getAllAssets({ limit });
  console.log(`Total assets: ${assets.total}`);
  await saveAllAssets(assets.items);
})();
