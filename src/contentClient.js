const { createClient } = require('contentful');
const { config } = require('dotenv');
config();

const limit = parseInt(process.env.CONTENTFUL_LIMIT || '100');

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
});

const parseFields = (item) => {
  if (!item || !item.sys) {
    return null;
  }

  const { sys, fields } = item;
  return {
    id: sys.id,
    createdAt: sys.createdAt,
    updatedAt: sys.updatedAt,
    ...fields,
  };
};

const parseImage = (file) => {
  const { width, height } = file.details.image;
  return {
    src: `https:${file.url}`,
    width,
    height,
  };
};

const parseItem = (data) => {
  const { file, ...fields } = parseFields(data);
  return { ...fields, ...parseImage(file) };
};

const getEntries = async (options) => {
  const response = await client.getEntries({
    limit,
    ...options,
  });
  return {
    limit: response.limit,
    skip: response.skip,
    total: response.total,
    items: response.items.map(parseFields),
  };
};

const getPostsPaths = async (options) => {
  const posts = await getEntries({ content_type: 'post', ...options });
  return posts.items.map(({ path }) => ({ params: { path } }));
};

module.exports = {
  parseFields,
  parseImage,
  parseItem,
  getEntries,
  getPostsPaths,
};
