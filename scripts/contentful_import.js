const contentful = require('contentful-management');
const fs = require('fs');
require('dotenv').config();

const data = fs.readFileSync(process.env.IMPORT_FILE_NAME, 'utf8');
const json = JSON.parse(data);
const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_PAT;

const client = contentful.createClient({ space, accessToken });

/* eslint-disable no-console */
client
  .getSpace(space)
  .then(space => {
    space.getEnvironment('master').then(async environment => {
      const { items: assets } = await environment.getAssets({ limit: 250 });
      const startWith = 13;
      for (let i = startWith; i <= json.items.length; i += 1) {
        const id = i + 1;
        let feedNum = id.toString();
        if (feedNum.length === 2) {
          feedNum = `0${feedNum}`;
        } else if (feedNum.length === 1) {
          feedNum = `00${feedNum}`;
        }
        const title = `feed-${feedNum}`;
        const image = assets.find(
          ({ fields }) => fields.title['en-US'] === title
        );
        const item = json.items[i];
        try {
          const response = await environment.createEntry(json.content, {
            fields: {
              id: {
                'en-US': id,
              },
              date: {
                'en-US': new Date(item.date.replace(/-/g, '/')),
              },
              image: {
                'en-US': {
                  sys: { type: 'Asset', id: image.sys.id, linkType: 'Asset' },
                },
              },
              locationText: {
                'en-US': item.location,
              },
              description: {
                'en-US': item.desc,
              },
            },
          });
          console.log(
            `${i} - Successfully created ${json.content} with id: ${response.sys.id}`
          );
        } catch (err) {
          console.log(`${i} - Failed`, err);
        }
      }
    });
  })
  .then(entry => console.log(entry))
  .catch(console.error);
