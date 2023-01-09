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

const parseImage = (id, title, file) => {
  const { width, height } = file.details.image;
  return {
    src: `/images/${id}_${file.fileName}`,
    backupSrc: `https:${file.url}`,
    alt: title,
    width,
    height,
  };
};

const parseItem = (data) => {
  const item = parseFields(data);

  if (!item) {
    return null;
  }

  const { id, title, file, ...fields } = item;
  return { id, ...fields, ...parseImage(id, title, file) };
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

const getAllEntries = async (options) => {
  let records = { items: [] };
  // Ensure we load all records, regardless of the API limit
  while (records.total != 0 && records.items.length < (records.total || 1)) {
    let response = await getEntries({
      ...options, // skip can't be overriden
      skip: records.items.length,
    });
    records = { ...response, items: [...records.items, ...response.items] };
  }
  return records;
};

const getCategoriesPaths = async (options) => {
  const posts = await getEntries({ content_type: 'post', ...options });
  const categories = [...new Set(posts.items.map(({ category }) => category))];
  return categories.map((category) => ({ params: { category } }));
};

const getPostsPaths = async (options) => {
  const posts = await getEntries({ content_type: 'post', ...options });
  return posts.items.map(({ category, path }) => ({
    params: { category, post: path },
  }));
};

module.exports = {
  parseFields,
  parseImage,
  parseItem,
  getEntries,
  getAllEntries,
  getCategoriesPaths,
  getPostsPaths,
};
