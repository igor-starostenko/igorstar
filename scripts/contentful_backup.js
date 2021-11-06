const contentful = require('contentful');
const fs = require('fs');
require('dotenv').config();

const directory = process.env.CONTENTFUL_DIRECTORY || '.';
const limit = parseInt(process.env.CONTENTFUL_LIMIT || '100');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
});

/* eslint-disable no-console */
const saveFile = (data, fileName) => {
  fs.writeFile(fileName, data, err => {
    if (err) {
      return console.log(`Failed to save ${fileName}`, err);
    }

    console.log(`Loaded into ${fileName}`);
  });
};

client
  .getContentTypes({ limit })
  .then(response => {
    console.log(`Saving ${response.total} Content Types`);
    saveFile(
      JSON.stringify(response, null, 4),
      `${directory}/ContentTypes.json`
    );
    return response;
  })
  .then(contentTypes => {
    for (let i = 0; i <= contentTypes.total; i += 1) {
      const item = contentTypes.items[i];
      if (item) {
        const {
          sys: { id },
          name,
        } = item;
        client
          .getEntries({ content_type: id, limit })
          .then(response => {
            console.log(`Saving ${response.total} "${name}" Entries`);
            saveFile(
              JSON.stringify(response, null, 4),
              `${directory}/${name}.json`
            );
          })
          .catch(err => console.log(err));
      }
    }
  })
  .catch(err => console.log(err));
