const contentful = require('contentful');
const fs = require('fs');
require('dotenv').config();

const directory = process.env.CONTENTFUL_DIRECTORY || '.';
const limit = parseInt(process.env.CONTENTFUL_LIMIT || '100');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_TOKEN,
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
    saveFile(JSON.stringify(response, null, 4), 'contentfulContentTypes.json');
    return response;
  })
  .then(contentTypes => {
    for (let i = 0; i <= contentTypes.total; i += 1) {
      const {
        sys: { id },
        name,
      } = contentTypes.items[i];
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
  })
  .catch(err => console.log(err));
