import { createClient } from 'contentful';
import { config } from 'dotenv';
config();

const limit = parseInt(process.env.CONTENTFUL_LIMIT || '100');

const client = createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_TOKEN,
});

export const parseFields = item => {
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

export const getEntries = async options => {
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
